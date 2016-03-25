import { escapeHTML } from 'utils';
import appHTML from './index/app-html';

function firstAppJS() {
    return escapeHTML`var x = 10;
var y = 20;
console.log(x + y);`;
}

export default function gettingStartedIndexTemplate() {
    return `
<div class="container">
    <section class="tutorial tutorial-intro">
        <h1>Getting Started</h1>
        <p>Welcome to development with Ether! This page will ease you into learning the three major components in Ether: <code>RootApp</code>, <code>App</code>, and <code>Route</code>, and how they work together. We'll build a small app that shows random tweets and learn the different ways we can integrate it into a webpage and even other Ether apps. <a href="/app1/" target="_blank">Visit the page</a> yourself and notice how the app's pathname bar matches the browser history. The <a href="https://github.com/darvelo/ether-website/src/js/app1">source code</a> can be found on GitHub. Here's the whole app embedded in an <code>iframe</code>:</p>
        <iframe id="app1-iframe" src="/app/"></iframe>
        <p></p>
    </section>
    <section class="tutorial">
        <h2>RootApp</h2>
        <p>An Ether app's life starts with a <code>RootApp</code>. It's the starting point for the whole application and the only class constructor you call explicitly. Here's the HTML we're working with:</p>
        <pre><code class="hljs html">${appHTML()}</code></pre>
        <pre><code class="hljs js">${firstAppJS()}</code></pre>
    </section>
</div>
    `;
}
