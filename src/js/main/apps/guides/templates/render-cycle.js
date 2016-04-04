import mountExample from './render-cycle/mount';
import {
    scenarios,
    scenario0,
    scenario1,
    scenario2,
    scenario3,
    scenario4,
} from './render-cycle/scenarios';

export default function renderCycleTemplate(ctx) {
    return `
<h1>The Render Cycle</h1>
<p>The render cycle is the algorithm for how Ether determines which Routes and Apps are rendered, and which are not, when a user navigates to a URL.</p>
<p>Each subclass you make of App and Route has three render cycle methods available to it: <code>prerender()</code>, <code>render()</code>, and <code>deactivate()</code>. When each method is called depends on how you've mounted your Apps and Routes using the <code>RootApp/App</code> methods <code>mount()</code> and <code>mountConditionals()</code>.</p>
<p>Let's begin by defining some Apps and Routes:</p>
<pre><code class="hljs js">${mountExample()}</code></pre>

<p>Note that we've omitted method definitions for the Apps, and Route definitions entirely. We're just focusing on the classes themselves and how they relate, to learn about how their render cycle methods will be called and in what order.</p>

<p>When navigating to a URL, Ether inspects the mount hierarchy and determines the navigation path through that hierarchy for the URL. It does this by matching the strings you return from <code>mount()</code> against the URL, descending into mounts and matching against <em>their</em> mounts' strings until a Route subclass is found that matches against the final part of the URL.</p>

<h2>Breaking it Down with Diagrams</h2>
<p>We can show how Ether determines and completes a render cycle by breaking down all possible scenarios into simple diagrams. In these diagrams:</p>
<ul>
    <li><code>o</code> is a node, representing a Route or an App</li>
    <ul>
        <li>nodes with a line extending to the right are Apps</li>
        <li>leaf nodes (no line extending to the right) are Routes</li>
        <li>a line connecting two nodes means the left node contains the right node as a mount</li>
    </ul>
    <li>dashed lines represent the navigation path of the previous URL</li>
    <li>solid lines represent the navigation path of the current URL</li>
</ul>
<pre>${scenarios()}</pre>

<h2>A Word on Call Order and State</h2>
<p><code>prerender()/render()</code> method calls are always made on a RootApp/App <em>before</em> those same methods are called on any of their mounts or conditional mounts. <code>deactivate()</code> method calls are always made on a RootApp/App <em>after</em> that same method is called on <strong>all</strong> currently-rendered mounts and conditional mounts on the RootApp/App.</p>
<p>The reasoning for this is that an App's mounts and conditional mounts may depend on the App itself having been rendered before they can be rendered. Likewise, deactivating an App only seems logical once all of its dependent mounts and conditional mounts are deactivated.</p>
<p>Ether sets state hooks before and after render cycle functions are executed. Check out the section on the <code>this.state</code> property in the <a href="${ctx.hrefs.sharedMethods}">Shared Methods and Properties</a> docs for more info.</p>

<h2>Scenario 0</h2>
<pre>${scenario0()}</pre>
<p>This scenario occurs only on the first call to navigate, either explicitly through the <a href="${ctx.hrefs.sharedMethods}">shared method</a> <code>navigate()</code> or through any of the event handlers set on the <a href="${ctx.hrefs.rootAppDocs}">RootApp constructor options</a>.</p>
<h3>Example: Navigating to <code>/user/1/profile</code></h3>
<h4>Prerender Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#prerender()</code></li>
    <li><code>NotificationsWidgetRoute#prerender()</code></li>
    <li><code>UserWidgetRoute#prerender()</code></li>
</ol>
<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserApp#prerender()</code></li>
    <li><code>UserProfileRoute#prerender()</code></li>
</ol>
<h4>Render Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#render()</code></li>
    <li><code>NotificationsWidgetRoute#render()</code></li>
    <li><code>UserWidgetRoute#render()</code></li>
</ol>
<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserApp#render()</code></li>
    <li><code>UserProfileRoute#render()</code></li>
</ol>

<p>Notice how the stages of the Render Phase match the stages of the Prerender Phase exactly. This is part of what makes the render cycle predictable.</p>


<h2>Scenario 1</h2>
<pre>${scenario1()}</pre>
<p>This scenario occurs when a route has been rendered for a URL, but navigation to a new URL results in a different route within the same parent App being rendered.</p>

<h3>Example: Navigating from <code>/about</code> to <code>/</code></h3>
<p>Because <code>/about</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/</code>:</p>
<ul>
    <li><code>MyRootApp</code></li>
    <li><code>AboutRoute</code></li>
    <li><code>NotificationsWidgetRoute</code></li>
    <li><code>AboutHeaderRoute</code></li>
    <li><code>StaticWidgetRoute</code> (first instance)</li>
    <li><code>StaticWidgetRoute</code> (second instance)</li>
</ul>

<p>We begin the render cycle again when we navigate to <code>/</code>, detailed below.</p>
<h4>Prerender Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#prerender()</code></li>
    <li><code>RootRoute#prerender()</code></li>
    <li><code>NotificationsWidgetRoute#prerender()</code></li>
    <li><code>StaticWidgetRoute#prerender()</code> (first instance)</li>
    <li><code>StaticWidgetRoute#prerender()</code> (second instance)</li>
</ol>
<h4>Deactivate Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>AboutRoute#deactivate()</code></li>
    <li><code>AboutHeaderRoute#deactivate()</code></li>
</ol>
<h4>Render Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#render()</code></li>
    <li><code>RootRoute#render()</code></li>
    <li><code>NotificationsWidgetRoute#render()</code></li>
    <li><code>StaticWidgetRoute#render()</code> (first instance)</li>
    <li><code>StaticWidgetRoute#render()</code> (second instance)</li>
</ol>

<p>Note how the calls to <code>deactivate()</code> take place after all <code>prerender()</code> calls, but before any calls to <code>render()</code>. Also note that <code>NotificationsWidgetRoute#deactivate()</code> is not called, because it's also an active mount on the <code>/</code> URL. <code>NotificationsWidgetRoute#prerender()</code> is called even though the instance is already rendered, but by checking <code>this.state</code> in <code>prerender()</code> we can check for this and act accordingly. <code>MyRootApp#deactivate()</code> is never called under any circumstances; it's always active.</p>

<h2>Scenario 2</h2>
<pre>${scenario2()}</pre>
<p>This scenario occurs when a route has been rendered for a URL, but navigation to a new URL results in a route being rendered that's mounted on an App mounted on the same App as the first route.</p>

<h3>Example: Navigating from <code>/about</code> to <code>/user/1/profile</code></h3>
<p>Because <code>/about</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/user/1/profile</code>:</p>
<ul>
    <li><code>MyRootApp</code></li>
    <li><code>AboutRoute</code></li>
    <li><code>NotificationsWidgetRoute</code></li>
    <li><code>AboutHeaderRoute</code></li>
    <li><code>StaticWidgetRoute</code> (first instance)</li>
    <li><code>StaticWidgetRoute</code> (second instance)</li>
</ul>

<p>We begin the render cycle again when we navigate to <code>/user/1/profile</code>, detailed below.</p>
<h4>Prerender Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#prerender()</code></li>
    <li><code>NotificationsWidgetRoute#prerender()</code></li>
    <li><code>UserWidgetRoute#prerender()</code></li>
</ol>
<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserApp#prerender()</code></li>
    <li><code>UserProfileRoute#prerender()</code></li>
</ol>
<h4>Deactivate Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>AboutRoute#deactivate()</code></li>
    <li><code>AboutHeaderRoute#deactivate()</code></li>
    <li><code>StaticWidgetRoute#deactivate()</code> (first instance)</li>
    <li><code>StaticWidgetRoute#deactivate()</code> (second instance)</li>
</ol>
<h4>Render Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#render()</code></li>
    <li><code>NotificationsWidgetRoute#render()</code></li>
    <li><code>UserWidgetRoute#render()</code></li>
</ol>
<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserApp#render()</code></li>
    <li><code>UserProfileRoute#render()</code></li>
</ol>


<h2>Scenario 3</h2>
<pre>${scenario3()}</pre>

<h3>Example: Navigating from <code>/user/1/profile</code> to <code>/about</code></h3>
<p>Because <code>/user/1/profile</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/about</code>:</p>
<ul>
    <li><code>MyRootApp</code></li>
    <li><code>NotificationsWidgetRoute</code></li>
    <li><code>UserWidgetRoute</code></li>
    <li><code>UserApp</code></li>
    <li><code>UserProfileRoute</code></li>
</ul>

<p>We begin the render cycle again when we navigate to <code>/about</code>, detailed below.</p>
<h4>Prerender Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#prerender()</code></li>
    <li><code>AboutRoute#prerender()</code></li>
    <li><code>NotificationsWidgetRoute#prerender()</code></li>
    <li><code>AboutHeaderRoute#prerender()</code></li>
    <li><code>StaticWidgetRoute#prerender()</code> (first instance)</li>
    <li><code>StaticWidgetRoute#prerender()</code> (second instance)</li>
</ol>
<h4>Deactivate Phase</h4>
<p>First stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserProfileRoute#deactivate()</code></li>
    <li><code>UserApp#deactivate()</code></li>
</ol>
<p>Second stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>UserWidgetRoute#deactivate()</code></li>
</ol>
<h4>Render Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#render()</code></li>
    <li><code>AboutRoute#render()</code></li>
    <li><code>NotificationsWidgetRoute#render()</code></li>
    <li><code>AboutHeaderRoute#render()</code></li>
    <li><code>StaticWidgetRoute#render()</code> (first instance)</li>
    <li><code>StaticWidgetRoute#render()</code> (second instance)</li>
</ol>

<h2>Scenario 4</h2>
<pre>${scenario4()}</pre>

<h3>Example: Navigating from <code>/user/1/profile</code> to <code>/todo/1/detail</code></h3>
<p>Because <code>/user/1/profile</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/todo/1/detail</code>:</p>
<ul>
    <li><code>MyRootApp</code></li>
    <li><code>NotificationsWidgetRoute</code></li>
    <li><code>UserWidgetRoute</code></li>
    <li><code>UserApp</code></li>
    <li><code>UserProfileRoute</code></li>
</ul>

<p>We begin the render cycle again when we navigate to <code>/todo/1/detail</code>, detailed below.</p>
<h4>Prerender Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#prerender()</code></li>
    <li><code>NotificationsWidgetRoute#prerender()</code></li>
</ol>
<p>Second stage, mounts in <code>TodoApp</code>. Functions called:</p>
<ol>
    <li><code>TodoApp#prerender()</code></li>
    <li><code>TodoActionRoute#prerender()</code></li>
</ol>
<h4>Deactivate Phase</h4>
<p>First stage, mounts in <code>UserApp</code>. Functions called:</p>
<ol>
    <li><code>UserProfileRoute#deactivate()</code></li>
    <li><code>UserApp#deactivate()</code></li>
</ol>
<p>Second stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>UserWidgetRoute#deactivate()</code></li>
</ol>
<h4>Render Phase</h4>
<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>
<ol>
    <li><code>MyRootApp#render()</code></li>
    <li><code>NotificationsWidgetRoute#render()</code></li>
</ol>
<p>Second stage, mounts in <code>TodoApp</code>. Functions called:</p>
<ol>
    <li><code>TodoApp#render()</code></li>
    <li><code>TodoActionRoute#render()</code></li>
</ol>

    `;
}
