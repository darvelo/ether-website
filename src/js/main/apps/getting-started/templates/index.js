import { escapeHTML } from 'utils';
import appHTML from './index/app-html';
import { twitterRootAppJS, rootRouteMountJS, twitterRouteMountJS } from './index/twitter-root-app-js';
import twitterURLRouteJS from './index/twitter-url-route-js';
import twitterTwitterRouteJS from './index/twitter-twitter-route-js';
import twitterRootRouteJS from './index/twitter-root-route-js';

export default function gettingStartedIndexTemplate() {
    return `
<div class="container">
    <section class="tutorial tutorial-intro">
        <h1>Getting Started</h1>
        <p>Welcome to development with Ether! This page will ease you into learning the three major components in Ether: <code>RootApp</code>, <code>App</code>, and <code>Route</code>, and how they work together. We'll build a small app that shows random tweets and learn the different ways we can integrate it into a webpage and even other Ether apps. <a href="/app/" target="_blank">Visit the page</a> yourself and notice how the app's pathname bar matches the browser history. The <a href="https://github.com/darvelo/ether-website/src/js/app">source code</a> can be found on GitHub. Here's the whole app embedded in an <code>iframe</code>:</p>
        <iframe id="app-iframe" src="/app/"></iframe>
        <p>If you're not using ES2015, you can use the <code>extend()</code> method on each of the major classes, such as <code>Route.extend()</code>, instead of the <code>class ... extends ...</code> syntax. Also note that the file structure used in <code>import</code> has no particular meaning, and you can use whatever file structure you like.</p>
    </section>

    <section class="tutorial">
        <h2>Instantiating an App</h2>
        <p>Let's start the process at the end. Constructing our twitter app is very simple. Here are the relevant bits of HTML:</p>
        <pre><code class="hljs html">${appHTML()}</code></pre>
        <p>In addition to <code>TwitterRootApp.create(...)</code>, we could have used <code>new TwitterRootApp(...)</code> with the same options. Here's a description of each option:</p>
        <dl>
            <dt><code>windowLoad</code></dt>
            <dd>If <code>true</code>, the app performs routing with the URL in the address bar when the <code>load</code> event on the <code>window</code> fires. If a <code>function</code>, performs routing <em>and</em> the function is called when the event fires.</dd>
            <dt><code>history</code></dt>
            <dd>If <code>true</code>, the app performs routing with the URL in the address bar when the <code>popstate</code> event on the <code>window</code> fires. If a <code>function</code>, performs routing <em>and</em> the function is called when the event fires. In either case, whenever the app navigates successfully it will perform a HTML5 History <code>pushState</code>.</dd>
            <dd></dd>
            <dt><code>interceptLinks</code></dt>
            <dd>Adds click event handlers to links and performs routing using the <code>href</code> attribute. There are two valid values: <code>'all'</code> and <code>'outlets'</code>. If <code>'all'</code>, the app adds an event handler to the <code>body</code> tag. If <code>'outlets'</code>, the app adds event handlers to all outlets you define throughout your application. Any link outside of these outlets is not intercepted. Instead of a string, you can provide a function that gets called when a link is clicked, but the function <strong>must</strong> have the name <code>all</code> or <code>outlets</code> so that Ether knows which links you want to intercept.</dd>
            <dd></dd>
            <dt><code>basePath</code></dt>
            <dd>Defines the url prefix your app is mounted on. Defaults to <code>/</code>. Only URLs that contain this prefix will be handled by the above event handlers, and if you perform manual navigation and <code>history</code> is enabled, the <code>basePath</code> will be prepended to the navigation URL on <code>pushState</code>.</dd>
            <dt><code>outlets</code></dt>
            <dd>A dictionary of named outlets, DOM elements that are wrapped in instances of either <code>Ether.Outlet</code> or <code>Ether.MutableOutlet</code>. You use outlets to control your application's structure.</dd>
        </dl>
        <p><strong>Note:</strong> None of the event handlers described above are attached until you call <code>start()</code> on your app instance.</p>
        <p>Since all the event handlers call <code>updatePathbar</code>, we know that the function is essentially called for all navigation events. The function signature for each handler is the same: it gets the relevant DOM event, and a promise that resolves if navigation succeeded or rejects if there was no route matching the URL destination (404). <code>this</code> is the TwitterRootApp instance and <code>sendTo()</code> is the way we communicate to different parts of our application using addresses.</p>
        <p>RootApp has a few extra useful features...</p>
        <dl>
            <dt><code>navigate()</code></dt>
            <dd>Takes two arguments: <code>path</code> and <code>opts</code>. The first is a URL path you want to route to within the app (not including the basePath), such as <code>/my/inner/path/12345</code>. The second is an optional object with one of two boolean properties: <code>pushState</code> or <code>replaceState</code>. The default is <code>pushState: true</code> but it has no effect if you're not using HTML6 History.</dd>
            <dt><code>canNavigateTo()</code></dt>
            <dd>Takes one argument: <code>path</code>, and returns true if passing that path into <code>navigate</code> would succeed, or false otherwise.</dd>
            <dt><code>fullUrl</code></dt>
            <dd>A property on the RootApp instance of the last path passed into <code>navigate()</code> that resulted in a successful navigation.</dd>
            <dt><code>start()</code></dt>
            <dd>Attaches all event handlers you configured in <code>.create()</code></dd>
        </dl>
    </section>

    <section class="tutorial">
        <h2>RootApp</h2>
        <p>An Ether app's life begins with a <code>RootApp</code>. It's the starting point for the whole application and the only constructor you call explicitly. Let's <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/root-app.js">check out the code</a> and see how it works.</p>
        <pre><code class="hljs js">${twitterRootAppJS()}</code></pre>
        <p>This may look a bit intimidating, but about 50% of all you need to know to use Ether is in these four methods. We'll break it down by method.</p>
        <h3>createOutlets()</h3>
        <p>Outlets provide a strategy for managing the DOM. As mentioned before, outlets are just wrappers for DOM elements. The idea is that an outlet is owned solely by a single App or Route and survives inside the DOM for the life of the application, but provides a place to add or remove child elements within it. Ether's <code>Outlet</code> class restricts access to a DOM element and some of its methods. The DOM element of an outlet can contain the DOM element of another outlet, so it's important to prevent certain actions such as clearing an outlet's HTML. If you want more control, you can use Ether's <code>MutableOutlet</code> class that gives direct access to the element through its <code>el</code> property. In this example we're using a helper function called <code>makeOutlet</code> to create outlets with an existing element (or created element with a tagname) and add CSS classes without invoking these constructors directly. Here we also say whether we want a MutableOutlet with the <code>mutable</code> option. The <code>outlets</code> object received here is what was passed into <code>TwitterRootApp.create()</code>. Whatever object is returned will be the named outlets owned by the app.</p>
        <h3>mount()</h3>
        <p>Here we declare the routes that exist on the root (relative to basePath) and what class will handle them. What's interesting is we not only can mount a Route at a location, but another App! This flexibility will provide us the encapsulation we need to repurpose an entire section of our app for a completely different project, which we'll see soon. Ether will create a unique instance of each of the classes for each URL path, which allows us to reuse classes for other paths as well.</p>
        <pre><code class="hljs js">${rootRouteMountJS()}</code></pre>
        <p>An instance of the <code>RootRoute</code> class will be mounted on the root URL path (the leading slash in a path string is optional) and registered as having the address <code>root</code>. It'll also receive the <code>root</code> outlet created in the <code>createOutlets()</code> method and the TwitterRootApp will lose ownership of that outlet, meaning it'll no longer be available as <code>this.outlets.root</code> in TwitterRootApp methods but will be in RootRoute methods. Any number of addresses or outlets can be given by adding to the number of parameters. The <code>.setup()</code> method takes any number of functions, which will be called in order when the instance is created. The return value of the first function will be passed in as the first argument to the second function and so on. The return value of the last function will be passed into the RootRoute's <code>init()</code> method.</p>
        <pre><code class="hljs js">${twitterRouteMountJS()}</code></pre>
        <p>The TwitterRoute's URL path has a more interesting syntax. The curly braces provide a way to parse parameters from the URL using <em>real regular expressions,</em> and associate those parameters with names. For example, the param named <code>tweet_id</code> will be a string of digits. So if a user navigated to <code>/app/neiltyson/12345</code> the TwitterRoute would handle that request and receive the values of both parameters as strings:
        <pre><code class="hljs js">{"twitter_username": "neiltyson", "tweet_id": "12345"}</code></pre>
        <p>Note that because the URL path is a string, we have to escape the backslash character. The only other rule is that you can't use slashes or capturing groups (unescaped parentheses) within the regex value, but <code>[^/]</code>, <code>(?:</code>, <code>(?!</code>, and <code>(?=</code> are allowed.</p>
        <h3>mountConditionals()</h3>
        <p>Ether has the unique idea of <em>conditional mounts</em> which are mounts that will be rendered if certain conditions are met. Conditional mounts must be a Route class or an array of Route classes or subclasses. Instead of URL paths, there are three logic operators: <code>*</code>, <code>+</code>, or <code>!</code>.</p>
        <dl>
            <dt><code>*</code></dt>
            <dd>The route(s) will be rendered if any of the mounts in the <code>mounts()</code> method is rendered.</dd>
            <dt><code>+</code></dt>
            <dd>Takes a comma-separated list of addresses, such as <code>+root,twitter</code>. The route(s) will be rendered if any of the mounts referenced by address in the <code>mounts()</code> method is rendered.</dd>
            <dt><code>!</code></dt>
            <dd>Takes a comma-separated list of addresses, such as <code>!root</code>. The route(s) will be rendered if the mount rendered in the <code>mounts()</code> method <strong>does not match any</strong> of the addresses listed.</dd>
        </dl>
        <p>For instance, the URLRoute in our twitter app is mounted using the <code>*</code> logic, so it'll be rendered no matter what URL matching occurs. If we instead mounted it on <code>+twitter</code>, it would only be rendered when the TwitterRoute was rendered, on a URL path like <code>/app/neiltyson/12345</code>, but not <code>/app/</code>. If we mounted it on <code>!twitter</code>, it would be rendered whenever any mount is rendered <em>except TwitterRoute,</em> which in this case is only RootRoute, on URL path <code>/app/</code> and nowhere else.</p>
        <p>Conditional mounts are ideal for things like navigation bars, sidebars, footers, notifications, or other widgets. Any time you need a specific component or section to be available on different URL paths, a conditional mount may be just what you need.</p>
    </section>

    <section class="tutorial">
        <h2>App</h2>
        <p>A RootApp is just a special instance of <code>App</code> with a few features added, so there's nothing left to learn here! You can mount Apps and Routes just as you can on RootApp, creating rich, structured URLs.</p>
    </section>

    <section class="tutorial">
        <h2>Route</h2>
        <p>blah blah</p>
        <h3>URLRoute</h3>
        <pre><code class="hljs js">${twitterURLRouteJS()}</code></pre>
        <p></p>
        <pre><code class="hljs js">${twitterTwitterRouteJS()}</code></pre>
        <p></p>
        <pre><code class="hljs js">${twitterRootRouteJS()}</code></pre>
    </section>

    <aside>
        <h2>A Word on API Similarities</h2>
        <p>Most methods and variables on <code>RootApp</code>, <code>App</code>, and <code>Route</code> overlap, which makes for quick learning of the Ether API surface.</p>
        <p>this.state this.outlets navigate() canNavigateTo() sendTo() linkTo() init() prerender/deactivate/render</p>
        <h3>expectedOutlets()</h3>
        <p>This method is actually one of a set of four similar methods: <code>expectedAddresses()</code>, <code>expectedOutlets()</code>, <code>expectedParams()</code>, <code>expectedSetup()</code>. You register an App or Route instance with any number of addresses and outlets using the <code>.addresses()</code> and <code>.outlets()</code> methods you see elsewhere in the file. If you put a name of an address or outlet into the expectedAddresses() or expectedOutlets() array that you don't pass in using those dot methods, Ether will complain. These methods act not only as protection, but as documentation.</p>
    </aside>
</div>
    `;
}
