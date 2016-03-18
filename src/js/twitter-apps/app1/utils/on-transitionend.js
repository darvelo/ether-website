let el = document.createElement('transitionEndNameTest');
let transitionEndEventNames = {
    'transition'       : 'transitionend',
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'    : 'transitionend',
    'OTransition'      : 'oTransitionEnd',
    'msTransition'     : 'MSTransitionEnd',
};
let transitionName;

for (let name in transitionEndEventNames) {
    if (typeof el.style[name] !== 'undefined') {
        transitionName = transitionEndEventNames[name];
    }
}

export default function onTransitionEnd(element, callback) {
    let handler = event => {
        element.removeEventListener(transitionName, handler);
        callback(event);
    };
    element.addEventListener(transitionName, handler, false);
}
