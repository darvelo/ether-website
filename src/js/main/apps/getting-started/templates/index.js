import { escapeHTML } from 'utils';
import appHTML from './index/app-html';
import { twitterRootAppJS, rootRouteMountJS, twitterRouteMountJS } from './index/twitter-root-app-js';
import twitterURLRouteJS from './index/twitter-url-route-js';
import twitterTwitterRouteJS from './index/twitter-twitter-route-js';
import twitterRootRouteJS from './index/twitter-root-route-js';

export default function gettingStartedIndexTemplate(ctx) {
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
        <p>In addition to <code>TwitterRootApp.create(...)</code>, we could have used <code>new TwitterRootApp(...)</code> with the same options. Check out the docs for <a href="${ctx.hrefs.rootAppDocs}">a description of each option.</a></p>
        <p><strong>Note:</strong> None of the event handlers described above are attached until you call <code>start()</code> on your app instance.</p>
        <p>Since all the event handlers call <code>updatePathbar</code>, we know that the function is essentially called for all navigation events. The function signature for each handler is the same: it gets the relevant DOM event, and a promise that resolves if navigation succeeded or rejects if there was no route matching the URL destination (404). <code>this</code> is the TwitterRootApp instance and <code>sendTo()</code> is the way we communicate to different parts of our application using addresses.</p>
    </section>

    <section class="tutorial">
        <h2>RootApp</h2>
        <p>An Ether app's life begins with a <code>RootApp</code>. It's the starting point for the whole application and the only constructor you call explicitly. Let's <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/root-app.js">check out the code</a> and see how it works.</p>
        <pre><code class="hljs js">${twitterRootAppJS()}</code></pre>
        <p>This may look a bit intimidating, but about 50% of all you need to know to use Ether is in these four methods. We'll break it down by method.</p>
        <h3>createOutlets()</h3>
        <p>Outlets provide a strategy for managing the DOM. As mentioned before, outlets are just wrappers for DOM elements. The idea is that an outlet is owned solely by a single App or Route and survives inside the DOM for the life of the application, but provides a place to add or remove child elements within it. Ether's <code>Outlet</code> class restricts access to a DOM element and some of its methods. The DOM element of an outlet can contain the DOM element of another outlet, so it's important to prevent certain actions such as clearing an outlet's HTML. If you want more control, you can use Ether's <code>MutableOutlet</code> class that gives direct access to the element through its <code>el</code> property. In this example we're using a helper function called <code>makeOutlet</code> to create outlets with an existing element (or created element with a tagname) and add CSS classes without invoking these constructors directly. Here we also say whether we want a MutableOutlet with the <code>mutable</code> option. The <code>outlets</code> object received here is what was passed into <code>TwitterRootApp.create()</code>. Whatever object is returned will be the named outlets owned by the app.</p>
        <h3>mount()</h3>
        <p>Here we declare the routes that exist on the root (relative to basePath) and what class will handle them. What's interesting is we not only can mount a Route at a location, but another App! This flexibility will provide us the encapsulation we need to repurpose pieces of the app for other projects in our <a href="${ctx.hrefs.reusingclasses}">guide on reusing Ether classes</a>. Ether will create a unique instance of each of the classes for each URL path, which allows us to reuse classes for other paths as well.</p>
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
        <h2 id="app">App</h2>
        <p>A RootApp is just a special instance of <code>App</code> with a few features added, so there's nothing left to learn here! You can mount Apps and Routes just as you can on a RootApp to create rich, structured URLs.</p>
    </section>

    <section class="tutorial">
        <h2>Route</h2>
        <p>The App's <code>mount()</code> method allows other Apps to be mounted on a portion of a URL path, but for navigation to succeed a complete URL must terminate at a Route. Apps provide a way to split up the work your app does, but Routes actually handle the navigation requests. In our twitter app we created three routes.</p>
        <h3>URLRoute</h3>
        <p>We want this Route subclass to display the current URL (the URLRoute name isn't special.. we could have used any name). Because it was mounted as a <code>*</code> conditional mount, it'll be rendered regardless of which of the other routes (mounted in <code>TwitterRootApp#mount()</code>) handles a URL request, which makes it useful as a kind of header or persistent widget.</p>
        <pre><code class="hljs js">${twitterURLRouteJS()}</code></pre>
        <p>In the <code>init()</code> method we create <code>&lt;span class="value"&gt;</code> to hold the URL text and assign it to <code>this.text</code>. What's interesting is the <code>receive()</code> method, which takes a <code>url</code> argument and assigns it to the element's text content. How does this work?</p>

        <aside>
            <h4>A Word on API Similarities between Ether Classes</h4>
            <p>Most methods and variables on <code>RootApp</code>, <code>App</code>, and <code>Route</code> overlap, which makes for quick learning of the Ether API surface. <a href="${ctx.hrefs.sharedprops}">Check out the docs to learn more</a>.</p>
        </aside>

        <h3>The expected*() Methods</h3>
        <p>These represent a set of four similar methods:</p>
        <p><code>expectedAddresses()</code> must match the addresses passed into the route when it was mounted with <code>.addresses()</code>. These are the addresses the class responds to when the <code>sendTo(address, data...)</code> method is called elsewhere in the Ether app.</p>
        <p><code>expectedOutlets()</code> must match <code>.outlets()</code>, and also guarantees those named outlets will be available on <code>this.outlets</code>.</p>
        <p><code>expectedSetup()</code> is an opportunity to check the value passed in with <code>.setup()</code> and throw an error if it isn't what the class needs to work properly, before it's passed to init().</p>
        <p><code>expectedParams()</code> is a bit different&mdash;it allows you to return an array of parameter names that have been collected in the URL paths mounted up to this point. You can leave out any you don't need, and only the ones you list will be provided in the render functions (which we'll talk about later). Ether will throw a helpful error if you list parameter names that don't exist on that URL.</p>
        <p><strong>Together, these methods act not only as protection against setup mistakes, but also as documentation.</strong> You'll know exactly which addresses an App or Route goes by and which outlets, URL parameters, and setup values are available inside its member functions.</p>
        <h3>addressesHandlers</h3>
        <p>If expectedAddresses() returns a list of addresses your class goes by, <code>addressesHandlers()</code> returns a list of functions that are called when their respective addresses are sent data from elsewhere in the application with the <code>sendTo(address, data...)</code> method. In our URLRoute code above, we see our URLRoute goes by the address <code>'url'</code> and the function that will be called on <code>sendTo('url', data...)</code> is <code>receive(data...)</code>. There's a reason to split the names and handler functions into two methods: to allow subclasses to use the same handlers after overriding expectedAddresses() and leaving addressesHandlers() untouched.</p>

        <h3>TwitterRoute</h3>
        <p></p>
        <pre><code class="hljs js">${twitterTwitterRouteJS()}</code></pre>
        <h3>RootRoute</h3>
        <p></p>
        <pre><code class="hljs js">${twitterRootRouteJS()}</code></pre>
    </section>

</div>
    `;
}
