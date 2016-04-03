import mountExample from './shared/mount';
import conditionalMountExample from './shared/conditional-mount';
import { paramsExample1, paramsExample2 } from './shared/params-examples';
import stateExample from './shared/state-example';

export default function(ctx) {
    return `
<h1>Shared Methods and Properties</h1>
<p>Ether has three major classes that have been designed to have very similar APIs, which makes Ether easier to learn and code using Ether easier to read.</p>

<h2>Shared between RootApp and App</h2>


<h3>Overridable Methods</h3>

<h4><code>createOutlets()</code></h4>
<p>Outlets provide a strategy for managing the DOM. The idea is that an outlet is owned by a single App or Route, and wraps a DOM element that survives inside the DOM for the life of the application. Ether's <code>Outlet</code> class restricts access to the wrapped DOM element and some of its methods, but exposes methods to add or remove child elements within it. Since an outlet's wrapped element can be made to be an ancestor to the DOM element of another outlet, it's important to prevent actions like clearing the outlet's HTML, which may accidentally remove a child outlet from the DOM. If you want more control, you can use Ether's <code>MutableOutlet</code> class which gives direct access to the element through its <code>el</code> property.</p>
<p>The <code>outlets</code> argument received in createOutlets() is the same object that was passed into <code>RootApp.create(opts)</code> (in <code>opts.outlets</code>) for the RootApp, or those outlets defined by static method <code>.outlets()</code> (described below) for an App. Whatever object is returned by <code>createOutlets()</code> will be set to <code>this.outlets</code>.</p>

<h4>mount()</h4>
<p>The object returned from this method will be used to construct the classes handling URL navigation. Each key of the object should be a string you want matched against the URL in the address bar when the user navigates to a page or clicks a link. Each value of the object should be a subclass of App or Route. By choosing to use an App subclass and only specifying a portion of the URL you want to match against, you allow the rest of the URL to be routing to continue in that subclass, matching against the mounts inside. The final portion of a URL should be mounted on a Route subclass for navigation at that URL to succeed.</p>
<p>Here's an example:</p>
<pre><code class="hljs js">${mountExample()}</code></pre>
<p>For this mount configuration, these are the classes that would be rendered if the user navigated to various URLs:</p>
<ul>
    <li><code>/</code> &mdash; MyRootRoute <span class="arrow">&#10159;</span> RootRoute</li>
    <li><code>/about</code> &mdash; MyRootRoute <span class="arrow">&#10159;</span> AboutRoute</li>
    <li><code>/user/1</code> &mdash; MyRootRoute <span class="arrow">&#10159;</span> UserApp <span class="arrow">&#10159;</span> UserRootRoute; params: {user_id: 1}</li>
    <li><code>/user/1/profile</code> &mdash; MyRootRoute <span class="arrow">&#10159;</span> UserApp <span class="arrow">&#10159;</span> UserProfileRoute; params: {user_id: 1}</li>
    <li><code>/todo/1/details</code> &mdash; MyRootRoute <span class="arrow">&#10159;</span> TodoApp <span class="arrow">&#10159;</span> TodoActionRoute; params: {todo_id: 1, action: 'details'}</li>
    <li><code>/todo/1</code> &mdash; Navigation fails: no Route subclass mounted on <code>''</code> in TodoApp; no change to URL and any previously-rendered mounts</li>
</ul>

<h4>mountConditionals()</h4>
<p>Ether has the unique idea of <em>conditional mounts</em> which are mounts that will be rendered if certain conditions are met. Conditional mounts must be a Route subclass or an array of Route subclasses. Instead of URL paths, there are three logic operators: <code>*</code>, <code>+</code>, and <code>!</code>.</p>
<dl>
    <dt><code>*</code></dt>
    <dd>The route(s) will be rendered if any of the mounts in the <code>mounts()</code> method is rendered.</dd>
    <dt><code>+</code></dt>
    <dd>Takes a comma-separated list of addresses, such as <code>+root,twitter</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was registered with any of the listed addresses.</dd>
    <dt><code>!</code></dt>
    <dd>Takes a comma-separated list of addresses, such as <code>!root</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was <strong>not registered with any</strong> of the addresses listed.</dd>
</dl>
<p>Here's an example using the same <code>MyRootRoute</code> above:</p>
<pre><code class="hljs js">${conditionalMountExample()}</code></pre>
<p>For this conditional mount configuration, these are the conditional mounts that would be rendered if the user navigated to various URLs:</p>
<ul>
    <li><code>/</code> &mdash; NotificationsWidgetRoute; both StaticWidgetRoutes</li>
    <li><code>/about</code> &mdash; NotificationsWidgetRoute; both StaticWidgetRoute</li>
    <li><code>/user/1</code> &mdash; NotificationsWidgetRoute; UserWidgetRoute, params: {user_id: 1}</li>
    <li><code>/user/1/profile</code> &mdash; NotificationsWidgetRoute; UserWidgetRoute, params: {user_id: 1}</li>
    <li><code>/todo/1/details</code> &mdash; NotificationsWidgetRoute</li>
    <li><code>/todo/1</code> &mdash; Navigation fails; URL stays the same and whatever conditional mounts are rendered stay rendered</li>
</ul>
<p>For each case, any other conditional mounts previously-rendered that are not in the list will have their <code>deactivate()</code> method called.</p>


<h2>Shared between RootApp, App, and Route</h2>


<h3>Static Methods</h3>

<p>These methods are only to be used in <code>mount()</code> or <code>mountConditionals()</code> as in the examples above, or before instantiating your RootRoute subclass with <code>.create()</code>. They're all chainable.</p>
<p>Substitute <i>class</i> in your mind with any class or subclass of <code>RootApp</code>, <code>App</code>, or <code>Route</code>.</p>

<h4><code><i>class</i>.addresses(address...)</code></h4>
<p>When an instance of <i>class</i> is instantiated, it will be registered as each address passed in, so that a <code>sendTo(<i>address</i>, data...)</code> call from any class in your Ether app will pass data to it. The addresses should match the list of addresses returned from <i>class</i>'s <code>expectedAddresses()</code> method.</p>
<h4><code><i>class</i>.outlets(outletName...)</code></h4>
<p>When an instance of <i>class</i> is instantiated, it will be passed as each outlet named, so that the <code>this.outlets</code> object will contain each outlet by name. The outlet names should match the list of outlet names returned from <i>class</i>'s <code>expectedOutlets()</code> method and the App <i>class</i> is mounted on should have returned an object with these named outlets inside. The mounting class will lose ownership of the outlets, meaning it won't have the outlets available on <code>this.outlets</code> within its methods, but <i>class</i> will.</p>
<h4><code><i>class</i>.setup(fn...)</code></h4>
<p>Each function will be called in order when the <i>class</i> instance is created. The return value of the first function will be passed in as the only argument to the second function and so on. The return value of the last function will be passed into <i>class</i>'s overridable <code>expectedSetup()</code> method for custom assertion testing, then to <i>class</i>'s <code>init()</code> method as the first argument.</p>


<h3>Overridable Methods</h3>

<h4><code>init()</code></h4>
<p>Any initialization code goes here. Called after RootApp construction, before any rendering, URL matching, or event handling occurs. The return value of the last function from static method <code>setup()</code>, if any, will be passed in as the first argument. All outlets are available on <code>this.outlets</code>.</p>

<h4>The expected*() Methods</h4>
<p>Together, these methods act not only as protection from configuration mistakes, <strong>but also as documentation</strong>. At a glance, you'll know exactly which addresses an App or Route goes by and which outlets, URL parameters, and setup values are available inside its member functions.</p>

<h5><code>expectedAddresses()</code></h5>
<p>The array of strings returned must match, in no particular order, the addresses passed in from static method <code>.addresses()</code>. These are the addresses the class responds to when the <code>sendTo(address, data...)</code> method is called elsewhere in the Ether app.</p>
<h5><code>expectedOutlets()</code></h5>
<p>The array of strings returned must match, in no particular order, the names passed in from static method <code>outlets()</code>. Guarantees those named outlets will be available on <code>this.outlets</code>.</p>
<h5><code>expectedSetup()</code></h5>
<p>Provides an opportunity to check the value passed in with static method <code>setup()</code> and throw an error if it isn't what the class needs to work properly, before it's passed to init().</p>
<h5><code>expectedParams()</code></h5>
<p>As mounts are matched against a URL, each param is parsed and accumulated. This method allows you to return an array of parameter names from this collection whose values you would like to be available in the <code>prerender()</code> and <code>render()</code> methods. Ether will throw a helpful error if you list parameter names that don't exist on that URL.</p>

<h4><code>addressesHandlers()</code></h4>
<p>If <code>expectedAddresses()</code> returns a list of addresses your class goes by, <code>addressesHandlers()</code> returns a list of functions that are called when their respective addreses are sent data from elsewhere in the application with the <code>sendTo(address, data...)</code> method. Each value in the returned array can be a string referencing a method on the class, or an actual function.</p>
<p>Note that this method may be called multiple times, so do not place self-executing functions or logic that has side-effects into it.</p>
<p>It may seem strange to decouple the address names and their handler functions into two methods, but there's a good reason: it makes class reuse easier. Subclasses can override expectedAddresses() while leaving addressesHandlers() untouched.</p>

<h4>The Render Cycle Methods</h4>
<ul>
    <li><code>prerender(params, queryParams, diffs)</code></li>
    <li><code>deactivate()</code></li>
    <li><code>render(params, queryParams, diffs)</code></li>
</ul>

<p>When the user navigates to a new URL, if a class is part of the navigation path, it will have its <code>prerender()</code> and <code>render()</code> methods called in order. If a class is currently rendered but is not part of the navigation path, it will have its <code>deactivate()</code> method called. <a href="${ctx.hrefs.renderCycleGuide}">Learn more about how the render cycle works</a>.</p>

<p><code>prerender()</code> and <code>render()</code> are called with the following arguments (all objects):</p>
<ol>
    <li><code>params</code> &mdash; The params parsed from the URL and also listed in <code>expectedParams()</code>. Null if there were no params to be parsed from the URL, or if <code>expectedParams()</code> returns an empty array.</li>
    <li><code>queryParams</code> &mdash; The query params parsed from the URL. Null if there were no query params.</li>
    <li><code>diffs</code> &mdash; The difference between the params and queryParams parsed from the current URL vs. the URL that last rendered the class. If there was no difference, the value will be null.</li>
</ol>

<p>For example, here are the params for <code>TodoActionRoute</code> described above, on navigating to the following URLs in order:</p>
<ol>
    <li>
        <code>/todo/1/detail?color=red&bold=true&font_size=16</code> (first ever navigation to <code>TodoActionRoute</code>)
        <pre><code class="hljs js">${paramsExample1()}</code></pre>
    </li>
    <li>
        <code>/todo/2/detail?color=red&bold=true&font_size=16</code> (first ever navigation to <code>TodoActionRoute</code>)
        <pre><code class="hljs js">${paramsExample2()}</code></pre>
    </li>
</ol>
<p>If the user then navigates somewhere else then back to the same URL, the params and queryParams arguments will be the same, but the diff argument will be null since neither the params nor queryParams changed compared to the URL when the <code>TodoActionRoute</code> was last rendered.</p>
<p>As an aside, navigating to the same URL twice in a row is a noop in Ether&mdash;no render cycle methods would be called on any class in that case.</p>
<p>Note that <code>TodoApp</code> would not have the <code>action</code> param available to it in its render methods, because at that URL-matching step during navigation it would not yet have been parsed. The same is true for <code>MyRootRoute</code> which has neither the <code>action</code> param nor <code>todo_id</code> param available to its render methods.</p>


<h3>Instance Methods</h3>

<h4><code>navigate(path, opts)</code></h4>
<p>The <code>path</code> argument is a URL path you want to route to within the app (not including the basePath), such as <code>/todo/1/detail</code>. The second is an optional object with one of two boolean properties: <code>pushState</code> or <code>replaceState</code>. The default is <code>pushState: true</code> but it has no effect if you're not using HTML5 History.</p>

<h4><code>canNavigateTo(path)</code></h4>
<p>The <code>path</code> argument is a URL path you want to route to within the app (not including the basePath), such as <code>/todo/1/detail</code>. Returns true if passing that path into <code>navigate</code> would result in a successful navigation, and false otherwise.</p>

<h4><code>linkTo(address, model, opts)</code></h4>
<p>When you use linkTo(), what you're saying is, "I want an href I can use in a link or that I can pass to a direct call to navigate()."</p>
<p>The params you can pass in are:</p>
<ol>
    <li><code>address</code> &mdash; The address of the route you want to create an href for.</li>
    <li><code>model</code> &mdash; Can be a plain object whose keys match the params required by the full URL path the route is mounted on, and whose values will be subsituted into their proper places in that URL. If the URL requires no params, you can leave out this argument entirely. You can also pass a more complicated object if you supply a transformer function into <code>opts</code>.</li>
    <li>
        <code>opts</code> (optional)
        <ul>
            <li><code>basePath</code> &mdash; Whether to prepend the basePath to the href. Default is <code>true</code>.</li>
        <li><code>transformer</code> (<code>function(paramName, model) { }</code>) &mdash; A function called with each param name required by the full URL the route is mounted on, as well as the <code>model</code> argument itself. Should return the value to be substituted into the proper place in the URL for the param name.</li>
        </ul>
    </li>
</ol>

<h4><code>sendTo(address, data...)</code></h4>
<p>When this method is called, the proper handler (from <code>addressesHandlers()</code>) on the class at <code>address</code> will be called with all data arguments applied.</p>

<h3>Properties</h3>
<h4><code>this.outlets</code></h4>
<p>An object with the outlets named in <code>expectedOutlets()</code>.</p>
<h4><code>this.state</code></h4>
<p>Ether updates this object at all phases of the render cycle. <a href="${ctx.hrefs.renderCycleGuide}">Learn more about how the render cycle works</a>.</p>
<p>There are six properties in all:</p>
<dl>
    <dt><code>deactivating</code></dt>
    <dd>Set before <code>deactivate()</code> execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
    <dt><code>deactivated</code></dt>
    <dd>Set after <code>deactivate()</code> execution completes, or if a Promise was returned, when the promise resolves.</dd>
    <dt><code>prerendering</code></dt>
    <dd>Set before <code>prerender()</code> execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
    <dt><code>prerendered</code></dt>
    <dd>Set after <code>prerender()</code> execution completes, or if a Promise was returned, when the promise resolves.</dd>
    <dt><code>rendering</code></dt>
    <dd>Set before <code>render()</code> execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>
    <dt><code>rendered</code></dt>
    <dd>Set after <code>render()</code> execution completes, or if a Promise was returned, when the promise resolves.</dd>
</dl>
<p>Note that if the class is currently rendered and the user navigates to a different URL where the class remains a mount or conditional mount, or the user navigates to the same path but with different params or query params (e.g. <code>/todo/1/detail</code> then <code>/todo/2/detail</code>), the <code>rendered</code> property will continue to be set while the <code>prerendering/prerendered/rendering</code> properties are set then unset in order. If the user navigates away, deactivation occurs and <code>deactivating</code> is set as <code>rendered</code> is unset.</p>
<p>Ether applies state not only to this object, but also to the CSS classes of all outlets on <code>this.outlets</code>. At any time you can inspect <code>this.state</code> and know what states apply to your class and its outlets. Here's en example of <code>this.state</code> for a class currently executing the <code>render()</code> method:</p>
<pre><code class="hljs js">${stateExample()}</code></pre>
    `;
}
