importScripts('/static/vendor/scripts/highlight.pack.js');

var unescape = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
};

var regex = new RegExp(Object.keys(unescape).join('|'), 'g');

function unescapeFn(match) {
    return unescape[match];
}

function highlightBlockHTML(block) {
    block = block.replace(regex, unescapeFn);
    return self.hljs.highlight('html', block);
};

function highlightBlockCSS(block) {
    block = block.replace(regex, unescapeFn);
    return self.hljs.highlight('css', block);
};

function highlightBlockJS(block) {
    block = block.replace(regex, unescapeFn);
    return self.hljs.highlight('js', block);
};

onmessage = function(event) {
    var highlightFn;
    switch(event.data.ft) {
        case 'html':
            highlightFn = highlightBlockHTML;
            break;
        case 'css':
            highlightFn = highlightBlockCSS;
            break;
        case 'js':
            highlightFn = highlightBlockJS;
            break;
        default:
            throw new Error('unsupported highlight type in web worker: ' + event.data.ft);
            break;
    }
    var result = event.data.blocks.map(highlightFn).map(function(highlighted) {
        return highlighted.value;
    });
    postMessage({
        id: event.data.id,
        ft: event.data.ft,
        blocks: result,
    });
};
