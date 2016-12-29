import choo from 'choo'
import model from './models'
import mainView from './views'
const app = choo()

app.model(model)

app.router({default: '/'},[
	['/', mainView]
])

const tree = app.start()
document.body.appendChild(tree)