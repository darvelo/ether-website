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

function trimLeft(str) {
    return str.replace(/^[\s\uFEFF\xA0]+/, '');
}

function trimRight(str) {
    return str.replace(/[\s\uFEFF\xA0]+$/, '');
}

export default function escapeHTML(strings, ...interpolated) {
    var result = [];
    for (let i = 0, len = strings.length, len2 = interpolated.length; i < len; ++i) {
        let str = strings[i];
        if (len === 1) {
            str = str.trim();
        } else if (i === 0) {
            str = trimLeft(str);
        } else if (i === len-1) {
            str = trimRight(str);
        }
        result.push(str.replace(escapeRegex, escapeFn));
        if (i < len2) {
            result.push(interpolated[i].replace(escapeRegex, escapeFn));
        }
    }
    return result.join('');
}
