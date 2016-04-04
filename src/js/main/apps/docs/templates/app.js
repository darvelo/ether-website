export default function() {
    return `
<h1>App</h1>
<p>All methods and properties on <code>App</code> are shared with <code>RootApp</code> and <code>Route</code>. Please see the section Shared Methods and Properties for details.</p>

<h2>Constructor</h2>
<p>Apps are not meant to be constructed directly. They're constructed indirectly by using them in the <code>RootApp/App</code> methods <code>mount()</code> and <code>mountConditionals()</code>.</p>
    `;
}
