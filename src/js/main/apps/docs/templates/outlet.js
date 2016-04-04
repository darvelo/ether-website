export default function() {
    return `
<h1>Outlet</h1>
<p>An Outlet's purpose is to wrap a DOM element and proxy access to it and to select methods and properties.</p>

<h2>Constructor</h2>
<p><code>new Outlet(element)</code> &mdash; Takes a DOM element and stores it internally.</p>


<h2>Instance Methods</h2>
<p>These are all proxies for the DOM element's own methods.</p>
<ul>
    <li><code>appendChild()</code></li>
    <li><code>removeChild()</code></li>
    <li><code>querySelector()</code></li>
    <li><code>querySelectorAll()</code></li>
</ul>


<h2>Properties</h2>
<p>These are all proxies for the DOM element's own properties.</p>
<ul>
    <li><code>innerHTML</code> &mdash; Allows getting the element's innerHTML, but not setting it.</li>
</ul>
    `;
}
