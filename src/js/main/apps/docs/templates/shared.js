export default function() {
    return `
<h1>Shared Methods and Properties</h1>
<h2>Static Methods</h2>
<ul>
    <li><i>class</i>.addresses()</li>
    <li><i>class</i>.outlets()</li>
    <li><i>class</i>.setup()</li>
</ul>
<h2>Instance Methods</h2>
<ul>
    <li>this.init()</li>
    <li>this.navigate()</li>
    <li>this.canNavigateTo()</li>
    <li>this.linkTo()</li>
    <li>this.sendTo()</li>
    <li>this.prerender()/deactivate()/render()</li>
</ul>
<h2>Variables</h2>
<ul>
    <li>this.state</li>
    <li>this.outlets</li>
</ul>
<dl>
    <dt><code>navigate()</code></dt>
    <dd>Takes two arguments: <code>path</code> and <code>opts</code>. The first is a URL path you want to route to within the app (not including the basePath), such as <code>/my/inner/path/12345</code>. The second is an optional object with one of two boolean properties: <code>pushState</code> or <code>replaceState</code>. The default is <code>pushState: true</code> but it has no effect if you're not using HTML6 History.</dd>
    <dt><code>canNavigateTo()</code></dt>
    <dd>Takes one argument: <code>path</code>, and returns true if passing that path into <code>navigate</code> would succeed, or false otherwise.</dd>
</dl>
    `;
}
