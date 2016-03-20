export default function navButton(href, title) {
    let div = document.createElement('div');
    div.innerHTML = `<a class="nav-button" href="${href}">${title}</a>`;
    return div.firstChild;
}
