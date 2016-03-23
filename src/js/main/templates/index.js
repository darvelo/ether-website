export default function indexTemplate() {
    return `
        <section class="intro">
            <section class="container">
                <p class="lead tagline">Ether is a minimalistic framework for creating modular, composable apps.</p>
                <p class="lead">
                    <a class="download-button" href="https://github.com/darvelo/ether">Download Ether</a>
                </p>
            </section>
        </section>
        <section class="features">
            <section class="container">
                <h1>Features</h1>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Minimalistic <em>and</em> Powerful</h2>
                            <p>Ether is a shade over 12K minified and gzipped. There are only 3 major components to learn, and they were designed to have similar APIs that reduce the learning curve.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Library Agnostic</h2>
                            <p>Choose your favorite templating engine, AJAX library, or DOM library. Ether provides a thin layer above the DOM so you can comfortably choose how to assemble your app.</p>
                        </div>
                    </div>
                </div>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Composable, Pluggable Apps</h2>
                            <p>Build pieces of your app as pluggable components you can use again and again. Apps in their own right.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Routing and Addressing</h2>
                            <p>Powerful regex-based declarative routing. Link to and pass data between different parts of your application.</p>
                        </div>
                    </div>
                </div>
                <div class="feature-list">
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Predictable, Asynchronous Render Cycle</h2>
                            <p>Transition between routes asynchronously with AJAX or animations. Use optional CSS hooks to control transitions. The sky's the limit.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <i class="icon"></i>
                        </div>
                        <div class="feature-description">
                            <h2 class="feature-title">Immediate and Descriptive Errors</h2>
                            <p>Made a mistake setting up your App? No problem. Ether will let you know where the issue is right when the app starts. Use debug mode for even more insight.</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    `;
}
