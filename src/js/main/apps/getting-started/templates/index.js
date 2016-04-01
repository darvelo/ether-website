import appHTML from './index/app-html';
import { twitterRootAppJS, rootRouteMountJS, twitterRouteMountJS } from './index/twitter-root-app-js';
import twitterURLRouteJS from './index/twitter-url-route-js';
import twitterTwitterRouteJS from './index/twitter-twitter-route-js';
import twitterTwitterRouteCSS from './index/twitter-twitter-route-css';
import stateExample from './index/state-example-js';
import twitterRootRouteJS from './index/twitter-root-route-js';
import { paramsExample1, paramsExample2 } from './index/params-examples';
import { twitterDataJSON, twitterDataTransformer } from './index/twitter-data-json';

export default function gettingStartedIndexTemplate(ctx) {
    return `
<div class="container">
    <section class="tutorial">
        <h1>Getting Started</h1>
        <p>Welcome to development with Ether! This page will ease you into learning the three major components in Ether and how they work together. They are RootApp, App, and Route. We'll build <a href="/app/" target="_blank">a small app</a> that shows random tweets and learn how to integrate it into a webpage. The <a href="https://github.com/darvelo/ether-website/tree/master/src/js/app">source code</a> is available on GitHub. Here's the app in action:</p>
        <iframe id="app-iframe" src="/app/"></iframe>
        <p>If you're not using ES2015, you can use the extend() method on each of the major classes, such as <code>Route.extend()</code>, instead of the <code>class ... extends ...</code> syntax. Be aware that the import file structure has no particular meaning, and you can use whatever file structure you like.</p>
    </section>

    <section class="tutorial">
        <h2>Instantiating an App</h2>
        <p>Let's start the process at the end. Constructing our twitter app is very simple. Here are the relevant bits of HTML:</p>
        <pre><code class="hljs html">${appHTML()}</code></pre>
        <p>In addition to <code>TwitterRootApp.create(...)</code>, we could have used <code>new TwitterRootApp(...)</code> with the same options. The first three can take event handler functions. Check out the docs for <a href="${ctx.hrefs.rootAppDocs}">a description of each option.</a></p>
        <p>Since all the event handlers call <code>updatePathbar</code>, we know that the function is called for all navigation events. The function signature for each handler is the same: it gets the relevant DOM event and a promise that resolves if navigation succeeded or rejects if there was no route matching the URL destination (404). <code>this</code> is the TwitterRootApp instance and <code>sendTo()</code> is the way we communicate to different parts of our application using addresses, which we'll talk about later.</p>
        <p><strong>Note:</strong> Event handlers are not attached until you call <code>start()</code> on your RootApp instance.</p>
    </section>

    <section class="tutorial">
        <h2>RootApp</h2>
        <p>A RootApp is the starting point for the whole application and the only constructor you call explicitly. Let's <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/root-app.js">check out the code</a> and see how it works.</p>
        <pre><code class="hljs js">${twitterRootAppJS()}</code></pre>
        <p>This may look a bit intimidating, but about 50% of all you need to know to use Ether is in these four methods. We'll break it down by method.</p>
        <h3>createOutlets()</h3>
        <p>Outlets provide a strategy for managing the DOM. The idea is that an outlet is owned by a single App or Route, and wraps a DOM element that survives inside the DOM for the life of the application. Ether's <code>Outlet</code> class restricts access to the wrapped DOM element and some of its methods, but exposes methods to add or remove child elements within it. Since an outlet's wrapped element can be made to be an ancestor to the DOM element of another outlet, it's important to prevent actions like clearing the outlet's HTML, which may accidentally remove a child outlet from the DOM. If you want more control, you can use Ether's <code>MutableOutlet</code> class which gives direct access to the element through its <code>el</code> property.</p>
        <p>In this example we're using the <code>makeOutlet</code> helper function to create outlets and add CSS classes without invoking these constructors directly. We can pass in an existing element or ask it to create one with a specific tagname. We also determine whether we want a MutableOutlet with the <code>mutable</code> option.</p>
        <p>The <code>outlets</code> argument received in createOutlets() is the same object that was passed into <code>TwitterRootApp.create()</code>. Whatever object is returned by createOutlets() will be the named outlets owned by the app, set to <code>this.outlets</code>.</p>
        <h3>mount()</h3>
        <p>Here we declare the routes that exist on the root (relative to basePath) and what class will handle them. What's interesting is we not only can mount a Route at a location, but another App! This flexibility will provide us the encapsulation we need to repurpose pieces of the app for other projects in our <a href="${ctx.hrefs.reusingClassesGuide}">guide on reusing Ether classes</a>. Ether will create a unique instance of each of the classes for each URL path, which allows us to reuse classes for other paths as well.</p>
        <pre><code class="hljs js">${rootRouteMountJS()}</code></pre>
        <p>An instance of the RootRoute class will be mounted on the root URL path (the leading slash in a path string is optional) and registered as having the address <code>root</code>. It'll also receive the <code>root</code> outlet created in the createOutlets() method, making the TwitterRootApp lose ownership of that outlet, meaning it'll no longer be available as <code>this.outlets.root</code> in TwitterRootApp methods but will be in RootRoute methods. Any number of addresses can be registered or outlets transferred by adding to the number of parameters. The <code>.setup()</code> method takes any number of functions, which will be called in order when the instance is created. The return value of the first function will be passed in as the only argument to the second function and so on. The return value of the last function will be passed into the RootRoute's init() method as the first argument.</p>
        <pre><code class="hljs js">${twitterRouteMountJS()}</code></pre>
        <p>The TwitterRoute's URL path has a more interesting syntax. The curly braces provide a way to parse parameters from the URL using real regular expressions, and associate those parameters with names when the route is rendered. For example, the param named <code>tweet_id</code> will be a string of digits. So if a user navigated to <code>/app/neiltyson/12345</code> the TwitterRoute would handle that request and receive the values of both parameters as strings:
        <pre><code class="hljs js">{"twitter_username": "neiltyson", "tweet_id": "12345"}</code></pre>
        <p>Note that because the URL path is a string, we have to escape the backslash character. The only other rule is that you can't use slashes or capturing groups (unescaped parentheses) within the regex value, but <code>[^/]</code>, <code>(?:</code>, <code>(?!</code>, and <code>(?=</code> are allowed.</p>
        <p>When a URL is being matched against URL paths in mount() during navigation, matching begins with the path having the most slash characters and proceeds until matching last against the path with the least slash characters.</p>
        <h3>mountConditionals()</h3>
        <p>Ether has the unique idea of <em>conditional mounts</em> which are mounts that will be rendered if certain conditions are met. Conditional mounts must be a Route class or an array of Route classes or subclasses. Instead of URL paths, there are three logic operators: <code>*</code>, <code>+</code>, and <code>!</code>.</p>
        <dl>
            <dt><code>*</code></dt>
            <dd>The route(s) will be rendered if any of the mounts in the <code>mounts()</code> method is rendered.</dd>
            <dt><code>+</code></dt>
            <dd>Takes a comma-separated list of addresses, such as <code>+root,twitter</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was registered with any of the listed addresses.</dd>
            <dt><code>!</code></dt>
            <dd>Takes a comma-separated list of addresses, such as <code>!root</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was <strong>not registered with any</strong> of the addresses listed.</dd>
        </dl>
        <p>For instance, the URLRoute in our twitter app is mounted using the <code>*</code> logic, so it'll be rendered no matter what URL matching occurs. If we instead mounted it on <code>+twitter</code>, it would only be rendered when the TwitterRoute was rendered, on a URL path like <code>/app/neiltyson/12345</code>, but not <code>/app/</code>. If we mounted it on <code>!twitter</code>, it would be rendered whenever any mount is rendered <em>except TwitterRoute,</em> which in this case is only RootRoute, on URL path <code>/app/</code> and nowhere else.</p>
        <p>Conditional mounts are ideal for things like navigation bars, sidebars, footers, notifications, or other widgets. Any time you need a specific component or section to be available on different URL paths, a conditional mount may be just what you need.</p>
    </section>

    <section class="tutorial">
        <h2 id="app">App</h2>
        <p>A RootApp is just a special instance of App with a few features added, so there's not much new to learn here! Our twitter app never mounts an App, but if it did, its createOutlets() would receive all outlets passed in from <code>.outlets()</code> when the App was mounted, and would set those outlets to <code>this.outlets</code> on the App if not overridden. You can mount Apps and Routes onto an App just as you can on the RootApp to create structured URLs, grouping related routes together and rendering outlets on the App that its mounted Routes depend on.</p>
    </section>

    <section class="tutorial">
        <h2>Route</h2>
        <p>The App's mount() method allows other Apps to be mounted on a portion of a URL path, but for navigation to succeed a Route must be mounted on the final portion of the URL. In our twitter app we created three routes.</p>
        <h3>URLRoute</h3>
        <p>We want this Route subclass to display the current URL (the URLRoute name isn't special.. we could have used any name). Because it was mounted as a <code>*</code> conditional mount, it'll be rendered regardless of which of the other routes (mounted in <code>TwitterRootApp#mount()</code>) handles a URL request, which makes it useful as a kind of header or persistent widget.</p>
        <pre><code class="hljs js">${twitterURLRouteJS()}</code></pre>
        <p>In the init() method we create <code>&lt;span class="value"&gt;</code> to hold the URL text and assign it to <code>this.text</code>. What's interesting is the receive() method, which takes a url argument and assigns it to the element's text content. How does this work?</p>

        <aside class="right-side">
            <h4>A Word on API Similarities between Ether Classes</h4>
            <p>Most methods and variables on RootApp, App, and Route overlap, which makes for quick learning of the Ether API surface. <a href="${ctx.hrefs.sharedPropsDocs}">Check out the docs to learn more</a>.</p>
        </aside>

        <h4>The expected*() Methods</h4>
        <p>These represent a set of four similar methods:</p>
        <p>expectedAddresses() must match the addresses passed into the route when it was mounted with <code>.addresses()</code>. These are the addresses the class responds to when the <code>sendTo(address, data...)</code> method is called elsewhere in the Ether app.</p>
        <p><code>expectedOutlets()</code> must match <code>.outlets()</code>, and also guarantees those named outlets will be available on <code>this.outlets</code>.</p>
        <p>expectedSetup() is an opportunity to check the value passed in with <code>.setup()</code> and throw an error if it isn't what the class needs to work properly, before it's passed to init().</p>
        <p>expectedParams() is a bit different&mdash;it allows you to return an array of parameter names that have been collected in the URL paths mounted up to this point. You can leave out any you don't need, and only the ones you list will be provided in the render functions (which we'll talk about later). Ether will throw a helpful error if you list parameter names that don't exist on that URL.</p>
        <p><strong>Together, these methods act not only as protection against setup mistakes, but also as documentation.</strong> You'll know exactly which addresses an App or Route goes by and which outlets, URL parameters, and setup values are available inside its member functions.</p>
        <h4>addressesHandlers</h4>
        <p>If expectedAddresses() returns a list of addresses your class goes by, addressesHandlers() returns a list of functions that are called when their respective addreses are sent data from elsewhere in the application with the <code>sendTo(address, data...)</code> method. We see in the code that our URLRoute goes by the address <code>'url'</code> and that the function that will be called on <code>sendTo('url', data...)</code> is <code>receive(data...)</code>. Now you know why the <code>updatePathbar</code> function in the HTML at the beginning of this article works: after navigation succeeds the RootApp instance passes the current URL to URLRoute with <code>self.sendTo('url', self.fullUrl)</code>.</p>
        <p>It may seem strange to decouple the address names and their handler functions into two methods, but there's a good reason: it makes class reuse easier. Subclasses can override expectedAddresses() while leaving addressesHandlers() untouched.</p>

        <h3>TwitterRoute</h3>
        <p>The <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/routes/twitter.js">TwitterRoute</a> shows the contents of a tweet. Let's dive in.</p>
        <pre><code class="hljs js">${twitterTwitterRouteJS()}</code></pre>
        <p>From what we've learned before, we know that TwitterRoute goes by the <code>'twitter'</code> address, but since we don't need it to handle any data we use an empty function to handle sendTo() calls on that address. init() creates a <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/views/tweet.js">simple view</a> and appends its element to the outlet guaranteed to exist by expectedOutlets(), and uses the data passed in through .setup() to create and append to the outlet what is essentially a back button.</p>

        <p>What's really interesting is the new prerender()/deactivate()/render() functions. These are called when the user navigates to, or away from, a Route or App.</p>
        <p>The TwitterRoute is rendered when the user navigates to the URL <code>'/app/{twitter_username=\\\\w+}/{tweet_id=\\\\d+}'</code>. Since expectedParams() lists both params, the route will have both <code>twitter_username</code> and <code>tweet_id</code> available in the <code>params</code> argument of its prerender() and render() methods. Also, any query params in the URL will be in the <code>queryParams</code> argument. The <code>diff</code> argument is the difference between the params and queryParams parsed from the current URL vs. the URL that last rendered the class. If there was no difference, the value will be null.</p>
        <p>For example, if the user navigates to the TwitterRoute for the first time through <code>/app/neiltyson/12345?color=red&amp;bold=true&amp;font_size=16</code>, the prerender() and render() methods will be called in order with the following arguments:</p>
        <pre><code class="hljs js">${paramsExample1()}</code></pre>
        <p>If the user then navigates to <code>/app/neiltyson/6789?color=red&amp;bold=true&amp;font_size=16</code>, the methods will be called again with:</p>
        <pre><code class="hljs js">${paramsExample2()}</code></pre>
        <p>If the user then navigates somewhere else then back to the same URL, the params and queryParams arguments will be the same, but the diff argument will be null since neither the params nor queryParams changed compared to the URL when the TwitterRoute was last rendered.</p>
        <p>As an aside, navigating to the same URL twice in a row is a noop in Ether&mdash;no methods would be called in that case.</p>

        <aside>
            <h4>A Simple Render Cycle Example</h4>
            <p>prerender() and render() are called in order when the Route or App is a mount on the navigation path. deactivate() is called when a mount has been rendered for a navigation path but a new navigation call is made to a different path where that Route or App is not mounted. Here's an example.</p>
            <p>Let's say we have two mounts, Route1 and Route2, mounted on different URLs within the same App. If Route1 is currently rendered and the user navigates to Route2, the function calls will happen in this order:<p>
            <ol>
                <li>Route2#prerender()</li>
                <li>Route1#deactivate()</li>
                <li>Route2#render()</li>
            </ol>
            <p>If any of the three methods returns a Promise, Ether will wait for it to resolve before making the next call.</p>
            <p>How does this process empower the developer? Let's say both routes' outlets are styled as cards that slide in from the side of the page.</p>
            <ol>
                <li>Route2#prerender() fetches data from the server and populates its HTML offscreen. It returns a promise that resolves when this has finished and its outlet is ready to be rendered onscreen.</li>
                <li>Route1#deactivate() performs a slide-out animation on its outlet and returns a promise that resolves when the animation has finished.</li>
                <li>Route2#render() performs a slide-in animation and does not return a promise because in this case nothing depends on waiting for the animation to complete.</li>
            </ol>
            <p>This is just a small example of the power of the render cycle. By mounting Apps and Routes and using their render functions in creative ways you can achieve amazing things. <a href="${ctx.hrefs.renderCycleGuide}">Learn more about how the render cycle works</a>.</p>
        </aside>

        <p><code>TwitterRoute#prerender()</code> sends the params to its view, which fetches data from the server and populates itself with the resulting data. Since <code>view.render()</code> returns a Promise, Ether will wait until the view is ready before continuing with the rendering process.</p>

        <p><code>TwitterRoute#deactivate()</code> hooks into a CSS animation event and resolves when the animation completes. This relies on how Ether handles CSS classes on outlets.</p>

        <h4>Ether State</h4>
        <p><code>TwitterRoute#render()</code> is empty, but this is because TwitterRoute takes advantage of the fact that Ether sets special classes on all outlets at all phases of the render cycle. By styling the outlet for when it receives these CSS classes, we achieve the bounce animation effect. Here's the CSS.</p>

        <pre><code class="hljs css">${twitterTwitterRouteCSS()}</code></pre>

        <p>There are six CSS classes in all:</p>
        <dl>
            <dt>ether-deactivating</dt>
            <dd>Set before deactivate() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
            <dt>ether-deactivated</dt>
            <dd>Set after deactivate() execution completes, or if a Promise was returned, when the promise resolves.</dd>
            <dt>ether-prerendering</dt>
            <dd>Set before prerender() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
            <dt>ether-prerendered</dt>
            <dd>Set after prerender() execution completes, or if a Promise was returned, when the promise resolves.</dd>
            <dt>ether-rendering</dt>
            <dd>Set before render() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
            <dt>ether-rendered</dt>
            <dd>Set after render() execution completes, or if a Promise was returned, when the promise resolves.</dd>
        </dl>
        <p>Note that if an Ether class is currently rendered and the user navigates to a URL where the class remains a mount or conditional mount, or the user navigates to the same path but with different params or query params (e.g. <code>/app/neiltyson/12345</code> then <code>/app/IronMaiden/6789</code>), the <code>ether-rendered</code> CSS class will continue to apply while the <code>ether-prerendering/ether-prerendered/ether-rendering</code> CSS classes are applied. If the user navigates away, deactivation occurs and <code>ether-deactivating</code> is applied as <code>ether-rendered</code> is removed.</p>
        <p>Ether applies this state not only to outlets, but to the Ether classes themselves. At any time you can inspect <code>this.state</code> in an App or Route and know what states apply to your class and its outlets. Here's en example of <code>this.state</code> for a class currently executing the render() method:</p>
        <pre><code class="hljs js">${stateExample()}</code></pre>

        <h3>RootRoute</h3>
        <p>We've come nearly to the end. You've learned almost everything there is to know about Ether development.</p>
        <p></p>

        <pre><code class="hljs js">${twitterRootRouteJS()}</code></pre>

        <p>Since this route is mounted on a URL path with no params, the params argument in prerender() and render() methods will always be null. If the user never manually enters query params into the address bar and we never use links that have them, the queryParams argument will also always be null.</p>
        <p>There's only one thing left in this file we haven't already touched on, and that's what linkTo() is and how it works. linkTo() takes three arguments, the last of which is optional: an address, an hash of param names whose values can fill the URL at that address, and an options hash.</p>
        <p>When you use linkTo(), what you're saying is, "I want an href I can use in a link or that I can pass to a direct call to navigate()." In <code>RootRoute#template()</code> we create a button that when clicked, kicks off navigation to the TwitterRoute, passing the data it needs to render the tweet through the URL. That data is the <code>twitter_username</code> and <code>tweet_id</code> params we've seen before.</p>
        <p>There's a problem, though.. TwitterRoute is mounted on this URL:</p>
        <pre><code class="hljs js">'{twitter_username=\\\\w+}/{tweet_id=\\\\d+}'</code></pre>
        <p>But the data we have looks like this:</p>
        <pre><code class="hljs js">${twitterDataJSON()}</code></pre>
        <p>How can we populate the href to the TwitterRoute when the param names and data property names don't match? The answer is to use a transformer function that maps param names to keys on the data model. <code>RootRoute#init()</code> received such a function from <code>.setup()</code> and it looks like this:</p>
        <pre><code class="hljs js">${twitterDataTransformer()}</code></pre>
        <p>We can see that the setup function attaches a transformer function as a property to the object passed to <code>RootRoute#init()</code>. The transformer function is called with each param name that exists on the navigation path to TwitterRoute, namely <code>twitter_username</code> and <code>tweet_id</code>, and returns the corresponding property name on the data model where the value can be found. The fact that this transformer can be passed in through <code>.setup()</code> is fantastic because it means we can reuse TwitterRoute on any mount with any param names or data format we want, as long as we pass in a working transformer function!</p>
        <p>So what we're really saying with <code>let href = this.linkTo(this.twitterAddress, model, opts);</code> is, "When creating the href to the TwitterRoute, map the param names to the properties on the data model and populate the URL with those values." That's how we get back an href like <code>/app/neiltyson/709051416564912128</code>. If we wanted an href we could use in a direct call to <code>navigate()</code> we would also need to pass the option <code>basePath: false</code> to get an href without the basePath prepended.</p>
    </section>

    <section class="tutorial">
        <h2>Conclusion</h2>
        <p>If you've made it this far, you are truly an Ether master! Give yourself a pat on the back. You learned about the three major Ether classes, how to combine them as mounts to make routing possible, how to use outlets and the render cycle to your advantage, and how to use addresses to allow different parts of your application to communicate.</p>
        <p>Ether is a simple but powerful framework, and there's more to explore. Head on over to the <a href="${ctx.hrefs.guides}">Guides</a> to learn tips and tricks or topics in more depth, or to the <a href="${ctx.hrefs.docs}">Docs</a> for the nitty gritty on function signatures and the like. Whatever you do, I hope your journey with Ether is a fun and fruitful one!</p>
    </section>
</div>
    `;
}
