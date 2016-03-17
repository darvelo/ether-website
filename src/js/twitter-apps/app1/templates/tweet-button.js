export default function tweetButton(href, title) {
    let div = document.createElement('div');
    div.innerHTML = `<a class="tweet-button" href="${href}">${title}</a>`;
    return div.firstChild;
}
