import { escapeHTML } from 'utils';
import appHTML from './index/app-html';
import twitterRootAppJS from './index/twitter-root-app-js';

export default function gettingStartedIndexTemplate() {
    return `
<div class="container">
    <section class="tutorial tutorial-intro">
        <h1>Getting Started</h1>
        <p>Welcome to development with Ether! This page will ease you into learning the three major components in Ether: <code>RootApp</code>, <code>App</code>, and <code>Route</code>, and how they work together. We'll build a small app that shows random tweets and learn the different ways we can integrate it into a webpage and even other Ether apps. <a href="/app/" target="_blank">Visit the page</a> yourself and notice how the app's pathname bar matches the browser history. The <a href="https://github.com/darvelo/ether-website/src/js/app">source code</a> can be found on GitHub. Here's the whole app embedded in an <code>iframe</code>:</p>
        <iframe id="app-iframe" src="/app/"></iframe>
        <p></p>
    </section>

    <section class="tutorial">
        <h2>Instantiating an App</h2>
        <p>Let's start the process at the end. Constructing our twitter app is very simple. Here are the relevant bits of HTML:</p>
        <pre><code class="hljs html">${appHTML()}</code></pre>
        <p>In addition to <code>new TwitterRootApp(...)</code>, we could have used <code>TwitterRootApp.create(...)</code> with the same options. Here's a description of each option:</p>
        <dl>
            <dt><code>windowLoad</code></dt>
            <dd>If <code>true</code>, the app performs routing with the URL in the address bar when the <code>load</code> event on the <code>window</code> fires. If a <code>function</code>, performs routing <em>and</em> the function is called when the event fires.</dd>
            <dt><code>history</code></dt>
            <dd>If <code>true</code>, the app performs routing with the URL in the address bar when the <code>popstate</code> event on the <code>window</code> fires. If a <code>function</code>, performs routing <em>and</em> the function is called when the event fires. In either case, whenever the app navigates successfully it will perform a HTML5 History <code>pushState</code>.</dd>
            <dd></dd>
            <dt><code>interceptLinks</code></dt>
            <dd>Adds click event handlers to links and performs routing using the <code>href</code> attribute. There are two valid values: <code>'all'</code> and <code>'outlets'</code>. If <code>'all'</code>, the app adds the event handler to the <code>body</code> tag and uses delegation. If <code>'outlets'</code>, the app adds event handlers to all outlets you define throughout your application.</dd>
            <dd></dd>
            <dt><code>basePath</code></dt>
            <dd>Defines the url prefix your app is mounted on. Only URLs that contain this prefix will be handled by the above event handlers, and if you perform manual navigation and <code>history</code> is enabled, the <code>basePath</code> will be prepended to the navigation URL on <code>pushState</code>.</dd>
            <dt><code>outlets</code></dt>
            <dd>A dictionary of named outlets, DOM elements that are wrapped in instances of either <code>Ether.Outlet</code> or <code>Ether.MutableOutlet</code>. You use outlets to control your application's structure.</dd>
        </dl>
        <p><strong>Note:</strong> None of the event handlers described above are attached until you call <code>start()</code> on your app instance.</p>
        <p>Since all the event handlers call <code>updatePathbar</code>, we know that the function is essentially called for all navigation events. The function signature for each handler is the same: it gets the relevant DOM event, and a promise that resolves if navigation succeeded or rejects if there was no route matching the URL destination (404). <code>this</code> is the TwitterRootApp instance and <code>sendTo()</code> is the way we communicate to different parts of our application using addresses.</p>
    </section>

    <section class="tutorial">
        <h2>RootApp</h2>
        <p>An Ether app's life starts with a <code>RootApp</code>. It's the starting point for the whole application and the only class constructor you call explicitly. Let's <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/root-app.js">check out the code</a> and see how it works.</p>
        <pre><code class="hljs js">${twitterRootAppJS()}</code></pre>

        <h2>A Word on API Similarities</h2>
        <p>Most methods on <code>RootApp</code>, <code>App</code>, and <code>Route</code> overlap, which makes for quick learning of the Ether API surface.</p>
        <p>navigate canNavigateTo fullUrl start</p>
    </section>
    <section class="tutorial">
        <h2>App</h2>
        <p>A RootApp is just a special instance of <code>App</code> with a few methods added.</p>
    </section>
</div>
    `;
}
