export default function() {
    return `
<h1>MutableOutlet</h1>
<p>A MutableOutlet's purpose is to wrap a DOM element and proxy access to it and its methods and properties. It also allows direct access to the element itself, and the ability to wrap a different element instead.</p>

<h2>Constructor</h2>
<p><code>new MutableOutlet(element)</code> &mdash; Takes a DOM element and stores it internally.</p>


<h2>Instance Methods</h2>
<p>All instance methods are the same as in the <code>Outlet</code> class.</p>


<h2>Properties</h2>
<ul>
    <li><code>el</code> &mdash; Allows getting or setting the wrapped DOM element.</li>
    <li><code>innerHTML</code> &mdash; Allows getting or setting the element's innerHTML.</li>
</ul>
    `;
}
