import fs from 'fs-extra'
import path from 'path'

import * as log from '../../log'
import * as Remove from '../../../util/remove';

const makeInjector = function (scriptName, isBG) {
  let sc =
    `// Injector file for '${scriptName}'
var context = this;

// http://stackoverflow.com/questions/8403108/calling-eval-in-particular-context/25859853#25859853
function evalInContext(js, context) {
  return function() { return eval(js); }.call(context);
}

`
if (isBG) {
  sc += `
  //
  var request = new XMLHttpRequest();
  request.onload = function(){
    evalInContext(this.responseText, context)
  };
  request.open("get", "https://localhost:5001/${scriptName}", true);
  request.send();

  // BG     
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {      
      if(request.ACTION === 'FETCH_SCRIPT'){
        //console.log(request, new Date())
        fetch("https://localhost:5001/"+request.scriptName)
        .then(response => response.text())
        .then(text => sendResponse({script:text}))
        .catch(error => console.error(error))          
        return true;      
      }      
  })
  `
}else{
  sc+=`
  //
  chrome.runtime.sendMessage({
    ACTION: 'FETCH_SCRIPT',
    scriptName: '${scriptName}'
  }, function(res){    
    //console.log(res, new Date)
    evalInContext(res.script, context)
  })
  `
}
return sc;
}

export default function (scriptName, buildPath, isBgScript) {
  if (process.env.NODE_ENV == 'development') {
    log.pending(`Making injector '${scriptName}'`)

    const injectorScript = makeInjector(scriptName, isBgScript);
    const injectorFilepath = path.join(buildPath, scriptName);
    const injectorPath = Remove.file(injectorFilepath)

    fs.mkdirsSync(injectorPath)
    fs.writeFileSync(injectorFilepath, injectorScript, { encoding: 'utf8' })

    log.done()
  }
}
