let el = document.createElement('animationEndNameTest');
let animationEndEventNames = {
    'animation'       : 'animationend',
    'WebkitAnimation' : 'webkitAnimationEnd',
    'MozAnimation'    : 'animationend',
    'OAnimation'      : 'oAnimationEnd',
    'msAnimation'     : 'MSAnimationEnd',
};
let animationName;

for (let name in animationEndEventNames) {
    if (typeof el.style[name] !== 'undefined') {
        animationName = animationEndEventNames[name];
    }
}

export default function onAnimationEnd(element, callback) {
    let handler = event => {
        element.removeEventListener(animationName, handler);
        callback(event);
    };
    element.addEventListener(animationName, handler, false);
}
