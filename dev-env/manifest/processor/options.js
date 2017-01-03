import html from './lib/html'

const process = function ({page, buildPath, scripts}) {
    if (!page) return

    scripts.push(html(page, buildPath))

    return true
}

export default function (manifest, {buildPath}) {
    const {options_ui} = manifest;

    if (!options_ui) return;

    const scripts = []

    process({page: options_ui.page, buildPath, scripts});

    return {scripts};
}