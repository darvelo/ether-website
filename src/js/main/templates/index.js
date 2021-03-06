export default function indexTemplate() {
    return `
        <section class="intro">
            <section class="container">
                <p class="lead tagline">Ether is a minimalistic framework<br>for creating modular, composable apps.</p>
                <div class="lead download-links">
                    <a class="btn download-btn-start" href="https://github.com/darvelo/ether">Download Ether</a>
                    <div class="download-choices">
                        <a class="btn download-btn-option" href="https://github.com/darvelo/ether/releases/download/v1.0.0/ether.es6.js">ES6</a>
                        <a class="btn download-btn-option" href="https://github.com/darvelo/ether/releases/download/v1.0.0/ether.amd.js">AMD</a>
                        <a class="btn download-btn-option" href="https://github.com/darvelo/ether/releases/download/v1.0.0/ether.cjs.js">CommonJS</a>
                        <a class="btn download-btn-option" href="https://github.com/darvelo/ether/releases/download/v1.0.0/ether.global.js">Global</a>
                    </div>
                </div>
            </section>
        </section>
        <section class="features">
            <section class="container">
                <h1>Features</h1>
                <blockquote>Ether: An omnipresent, completely passive medium for the propagation of magnetic waves. <span class="attribution">&mdash;Robert Metcalfe</span></blockquote>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-fire"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Minimalistic <em>and</em> Powerful</h2>
                            <p>Ether is slightly over 12K minified and gzipped. There are <strong>only three major components to learn</strong>, designed to have similar APIs to reduce the learning curve.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-cubes"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Library Agnostic</h2>
                            <p>Choose your favorite templating engine, AJAX, or DOM libraries. Ether provides a thin layer above the DOM so you can comfortably choose how to assemble your app.</p>
                        </div>
                    </div>
                </div>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-plug"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Composable, Pluggable Apps</h2>
                            <p>Build your app as a set of pluggable components you can use again and again. Apps in their own right.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-sitemap"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Routing and Addressing</h2>
                            <p>Powerful regex-based declarative routing. Addresses allow all parts of your app to link to and communicate with each other at any time.</p>
                        </div>
                    </div>
                </div>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-refresh"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Asynchronous Render Cycle</h2>
                            <p>Transition between routes using Promises to run AJAX requests or animations. Use optional CSS hooks to control the look and feel of transitions with or without JavaScript. The sky's the limit.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="fa fa-support"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Immediate and Descriptive Errors</h2>
                            <p>Made a mistake setting up your app? No problem. Ether will let you know where the issue is right when the app starts. Use debug mode for even more insight.</p>
                        </div>
                    </div>
                </div>
                <div class="github-cta">
                    <p>Ether is open source software.</p>
                    <a class="btn btn-inverted github-btn" href="https://github.com/darvelo/ether">View on GitHub</a>
                </div>
            </section>
        </section>
    `;
}
