export default function rootappTemplate() {
    return `
<h1>RootApp</h1>

<p>Most methods and properties are shared with <code>App</code> and <code>Route</code>. Please see the section Shared Methods and Properties for details.</p>

<p>What follows are the methods, properties, and options unique to <code>RootApp</code>.</p>

<h2>Constructor Options</h2>

<p>You can pass the following options to <code>RootApp.create()</code>.</p>

<h3><code>windowLoad</code></h3>
<h4>Allowed Values</h4>
<ul>
    <li><code>true</code> &mdash; Ether performs routing with the URL in the address bar when the <code>load</code> event on the <code>window</code> fires.</li>
    <li><code>function(event, promise) { }</code> &mdash; Same as <code>true</code>, but Ether calls the function after kicking off navigation.</li>
</ul>
<h4>Function Arguments</h4>
<ol>
    <li><code>event</code> &mdash; The window load event object.</li>
    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL in the address bar (404).</li>
</ol>

<h3><code>history</code></h3>
<p><strong>Note:</strong> If any value below is given, Ether will perform a HTML5 History <code>pushState</code> on successful navigation.</p>
<h4>Allowed Values</h4>
<ul>
    <li><code>true</code> &mdash; Ether performs routing with the URL in the address bar when the <code>popstate</code> event on the <code>window</code> fires.</li>
    <li><code>function(event, promise) { }</code> &mdash; Same as <code>true</code>, but Ether calls the function after kicking off navigation.</li>
</ul>
<h4>Function Arguments</h4>
<ol>
    <li><code>event</code> &mdash; The popstate event object.</li>
    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL that was in the address bar after popstate fired (404).</li>
</ol>

<h3><code>interceptLinks</code></h3>
<p><strong>Note:</strong> If any value below is given, Ether adds click event handlers to certain links and performs routing using their <code>href</code> attribute.</p>
<h4>Allowed Values</h4>
<ul>
    <li><code>'all'</code> &mdash; Ether adds a click event handler to the <code>body</code> tag and catches bubbling click events.</li>
    <li><code>'outlets'</code> &mdash; Ether adds click event handlers to all outlets you define throughout your application. Any link outside of these outlets will not have its click event handled.</li>
    <li><code>function all(event, promise) { }</code> &mdash; Same as <code>'all'</code>, but Ether calls the function after kicking off navigation. The function <strong>must</strong> have the name <code>all</code> so that Ether knows all links on the page should be handled.</li>
    <li><code>function outlets(event, promise) { }</code> &mdash; Same as <code>'outlets'</code>, but Ether calls the function after kicking off navigation. The function <strong>must</strong> have the name <code>outlets</code> so that Ether knows only links within outlets should be handled.</li>
</ul>
<h4>Function arguments</h4>
<ol>
    <li><code>event</code> &mdash; The click event object.</li>
    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL in the link's href value (404).</li>
</ol>

<h3><code>basePath</code></h3>
<p>Defines the url prefix the Ether app is mounted on. Defaults to <code>/</code>. Only URLs that contain this prefix will be handled by the above event handlers. If you perform manual navigation with the <code>navigate()</code> method and the <code>history</code> option is enabled, the <code>basePath</code> will be prepended to the navigation URL when Ether performs a <code>pushState</code>.</p>

<h3><code>outlets</code></h3>
<p>A hash of Outlets or MutableOutlets. These are passed to the RootApp instance's <code>createOutlets()</code> method.</p>

<h3><code>stripTrailingSlash</code></h3>
<p>Ensures that any URL passed into <code>navigate()</code> has its trailing slash removed before Ether begins searching for a route for the URL.</p>

<h3><code>addTrailingSlash</code></h3>
<p>Ensures that any URL passed into <code>navigate()</code> has a trailing slash appended (if one doesn't already exist) before Ether begins searching for a route for the URL.</p>


<h2>Methods</h2>

<h3><code>start()</code></h3>
<p>Attaches all event handlers configured in the options hash of <code>RootApp.create()</code>.</p>


<h2>Properties</h2>

<h3><code>fullUrl</code></h3>
<p>The last URL passed into <code>navigate()</code> that resulted in a successful navigation.</p>
    `;
}
