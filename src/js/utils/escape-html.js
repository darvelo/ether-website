let character = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
};

let escapeRegex = /[&<>"']/g;
let escapeFn = function(c) {
    return character[c];
};

export default function escapeHTML(strings, ...interpolated) {
    var result = [];
    let i;
    for (i = 0; i < strings.length; ++i) {
        result.push(strings[i].replace(escapeRegex, escapeFn));
        if (interpolated[i]) {
            result.push(interpolated[i].replace(escapeRegex, escapeFn));
        }
    }
    if (i === 0 && interpolated[i]) {
        result.push(interpolated[i]);
    }
    return result.join('');
}
