var MainApp = (function (ether,utils) {
    'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers.taggedTemplateLiteral = function (strings, raw) {
      return Object.freeze(Object.defineProperties(strings, {
        raw: {
          value: Object.freeze(raw)
        }
      }));
    };

    babelHelpers;

    var GettingStartedIndexRoute = function (_Route) {
        babelHelpers.inherits(GettingStartedIndexRoute, _Route);

        function GettingStartedIndexRoute() {
            babelHelpers.classCallCheck(this, GettingStartedIndexRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GettingStartedIndexRoute).apply(this, arguments));
        }

        babelHelpers.createClass(GettingStartedIndexRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':gs.index'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return [];
            }
        }]);
        return GettingStartedIndexRoute;
    }(ether.Route);

    var _templateObject = babelHelpers.taggedTemplateLiteral(['\n<div id="twitter"></div>\n\n<script src="/static/vendor/scripts/ether.global.js"></script>\n<script src="/static/scripts/app.js"></script>\n<script>\n    function updatePathbar(event, promise) {\n        var self = this;\n        promise.then(function() {\n            self.sendTo(\'pathbar\', self.fullUrl);\n        });\n    }\n    var myApp = TwitterRootApp.create({\n        windowLoad: updatePathbar,\n        history: updatePathbar,\n        interceptLinks: function all(event, promise) {\n            updatePathbar.call(this, event, promise);\n        },\n        basePath: \'/app\',\n        outlets: {\n            twitter: new Ether.MutableOutlet(document.getElementById(\'twitter\')),\n        },\n    }).start();\n</script>\n    '], ['\n<div id="twitter"></div>\n\n<script src="/static/vendor/scripts/ether.global.js"></script>\n<script src="/static/scripts/app.js"></script>\n<script>\n    function updatePathbar(event, promise) {\n        var self = this;\n        promise.then(function() {\n            self.sendTo(\'pathbar\', self.fullUrl);\n        });\n    }\n    var myApp = TwitterRootApp.create({\n        windowLoad: updatePathbar,\n        history: updatePathbar,\n        interceptLinks: function all(event, promise) {\n            updatePathbar.call(this, event, promise);\n        },\n        basePath: \'/app\',\n        outlets: {\n            twitter: new Ether.MutableOutlet(document.getElementById(\'twitter\')),\n        },\n    }).start();\n</script>\n    ']);

    function appHTML () {
        return utils.escapeHTML(_templateObject);
    }

    var _templateObject$1 = babelHelpers.taggedTemplateLiteral(['\n\'\': RootRoute\n        .addresses(\'root\')\n        .outlets(\'root\')\n        .setup(addTweets, addTwitterAddress, addTweetTransformer),\n    '], ['\n\'\': RootRoute\n        .addresses(\'root\')\n        .outlets(\'root\')\n        .setup(addTweets, addTwitterAddress, addTweetTransformer),\n    ']);
    var _templateObject2 = babelHelpers.taggedTemplateLiteral(['\n\'{twitter_username=\\\\w+}/{tweet_id=\\\\d+}\':\n    TwitterRoute\n        .addresses(\'twitter\')\n        .outlets(\'tweet\')\n        .setup(addButtonData),\n    '], ['\n\'{twitter_username=\\\\\\\\w+}/{tweet_id=\\\\\\\\d+}\':\n    TwitterRoute\n        .addresses(\'twitter\')\n        .outlets(\'tweet\')\n        .setup(addButtonData),\n    ']);
    var _templateObject3 = babelHelpers.taggedTemplateLiteral(['\nimport { RootApp, makeOutlet } from \'ether\';\nimport RootRoute from \'./routes/root\';\nimport TwitterRoute from \'./routes/twitter\';\nimport PathbarRoute from \'./routes/pathbar\';\n\n// ...\n\nclass TwitterRootApp extends RootApp {\n    expectedOutlets() {\n        return [\'twitter\'];\n    }\n    createOutlets(outlets) {\n        outlets.twitter = makeOutlet({\n            el: outlets.twitter.el,\n            classNames: [\'twitter-app\'],\n            append: [\n                outlets.pathbar = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'pathbar\'],\n                    mutable: true,\n                }),\n                outlets.root = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'root\'],\n                    mutable: true,\n                }),\n                outlets.tweet = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'tweet-container\'],\n                    mutable: true,\n                }),\n            ]\n        });\n        return outlets;\n    }\n    mount() {\n        return {\n            \'\': RootRoute\n                    .addresses(\'root\')\n                    .outlets(\'root\')\n                    .setup(addTweets, addTwitterAddress, addTweetTransformer),\n            \'{twitter_username=\\\\w+}/{tweet_id=\\\\d+}\':\n                TwitterRoute\n                    .addresses(\'twitter\')\n                    .outlets(\'tweet\')\n                    .setup(addButtonData),\n        };\n    }\n    mountConditionals() {\n        return {\n            \'*\': PathbarRoute\n                    .addresses(\'pathbar\')\n                    .outlets(\'pathbar\'),\n        };\n    }\n}\n    '], ['\nimport { RootApp, makeOutlet } from \'ether\';\nimport RootRoute from \'./routes/root\';\nimport TwitterRoute from \'./routes/twitter\';\nimport PathbarRoute from \'./routes/pathbar\';\n\n// ...\n\nclass TwitterRootApp extends RootApp {\n    expectedOutlets() {\n        return [\'twitter\'];\n    }\n    createOutlets(outlets) {\n        outlets.twitter = makeOutlet({\n            el: outlets.twitter.el,\n            classNames: [\'twitter-app\'],\n            append: [\n                outlets.pathbar = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'pathbar\'],\n                    mutable: true,\n                }),\n                outlets.root = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'root\'],\n                    mutable: true,\n                }),\n                outlets.tweet = makeOutlet({\n                    tagName: \'section\',\n                    classNames: [\'tweet-container\'],\n                    mutable: true,\n                }),\n            ]\n        });\n        return outlets;\n    }\n    mount() {\n        return {\n            \'\': RootRoute\n                    .addresses(\'root\')\n                    .outlets(\'root\')\n                    .setup(addTweets, addTwitterAddress, addTweetTransformer),\n            \'{twitter_username=\\\\\\\\w+}/{tweet_id=\\\\\\\\d+}\':\n                TwitterRoute\n                    .addresses(\'twitter\')\n                    .outlets(\'tweet\')\n                    .setup(addButtonData),\n        };\n    }\n    mountConditionals() {\n        return {\n            \'*\': PathbarRoute\n                    .addresses(\'pathbar\')\n                    .outlets(\'pathbar\'),\n        };\n    }\n}\n    ']);
    function rootRouteMountJS() {
        return utils.escapeHTML(_templateObject$1);
    }

    function twitterRouteMountJS() {
        return utils.escapeHTML(_templateObject2);
    }

    function twitterRootAppJS() {
        return utils.escapeHTML(_templateObject3);
    }

    var _templateObject$2 = babelHelpers.taggedTemplateLiteral(['\nimport { Route } from \'ether\';\n\nclass PathbarRoute extends Route {\n    expectedAddresses() {\n        return [\'pathbar\'];\n    }\n    addressesHandlers() {\n        return [\'receive\'];\n    }\n    expectedOutlets() {\n        return [\'pathbar\'];\n    }\n    expectedParams() {\n        return [];\n    }\n\n    // initialization code\n    init() {\n        let p = document.createElement(\'p\');\n        p.className = \'pathname\';\n        p.innerHTML = \'<span class="prefix">pathname</span><span class="value"></span>\';\n        this.outlets.pathbar.appendChild(p);\n        this.text = p.querySelector(\'.value\');\n    }\n\n    // addresses handlers\n    receive(url) {\n        this.text.textContent = url;\n    }\n}\n    '], ['\nimport { Route } from \'ether\';\n\nclass PathbarRoute extends Route {\n    expectedAddresses() {\n        return [\'pathbar\'];\n    }\n    addressesHandlers() {\n        return [\'receive\'];\n    }\n    expectedOutlets() {\n        return [\'pathbar\'];\n    }\n    expectedParams() {\n        return [];\n    }\n\n    // initialization code\n    init() {\n        let p = document.createElement(\'p\');\n        p.className = \'pathname\';\n        p.innerHTML = \'<span class="prefix">pathname</span><span class="value"></span>\';\n        this.outlets.pathbar.appendChild(p);\n        this.text = p.querySelector(\'.value\');\n    }\n\n    // addresses handlers\n    receive(url) {\n        this.text.textContent = url;\n    }\n}\n    ']);

    function twitterPathbarRouteJS () {
        return utils.escapeHTML(_templateObject$2);
    }

    var _templateObject$3 = babelHelpers.taggedTemplateLiteral(['\nimport { Route } from \'ether\';\nimport TweetView from \'../views/tweet\';\nimport navButton from \'../templates/nav-button\';\nimport onAnimationEnd from \'../utils/on-animationend\';\n\nclass TwitterRoute extends Route {\n    addressesHandlers() {\n        return [function(){}];\n    }\n    expectedParams() {\n        return [\'twitter_username\', \'tweet_id\'];\n    }\n\n    // ...\n\n    init(setupVal) {\n        // create a view that shows the tweet\n        this.view = new TweetView();\n        this.outlets.tweet.appendChild(this.view.el);\n\n        // create nav button based on setup\n        if (typeof setupVal === \'object\' && setupVal.linkData) {\n            let { address, params, text } = setupVal.linkData;\n            let href = this.linkTo(address, params);\n            this.outlets.tweet.appendChild(navButton(href, text));\n        }\n    }\n\n    // render-cycle functions\n    prerender(params, queryParams, diffs) {\n        return this.view.render(params);\n    }\n    deactivate() {\n        return new Promise(resolve => {\n            onAnimationEnd(this.outlets.tweet.el, resolve);\n        });\n    }\n    render(params, queryParams, diffs) { }\n}\n    '], ['\nimport { Route } from \'ether\';\nimport TweetView from \'../views/tweet\';\nimport navButton from \'../templates/nav-button\';\nimport onAnimationEnd from \'../utils/on-animationend\';\n\nclass TwitterRoute extends Route {\n    addressesHandlers() {\n        return [function(){}];\n    }\n    expectedParams() {\n        return [\'twitter_username\', \'tweet_id\'];\n    }\n\n    // ...\n\n    init(setupVal) {\n        // create a view that shows the tweet\n        this.view = new TweetView();\n        this.outlets.tweet.appendChild(this.view.el);\n\n        // create nav button based on setup\n        if (typeof setupVal === \'object\' && setupVal.linkData) {\n            let { address, params, text } = setupVal.linkData;\n            let href = this.linkTo(address, params);\n            this.outlets.tweet.appendChild(navButton(href, text));\n        }\n    }\n\n    // render-cycle functions\n    prerender(params, queryParams, diffs) {\n        return this.view.render(params);\n    }\n    deactivate() {\n        return new Promise(resolve => {\n            onAnimationEnd(this.outlets.tweet.el, resolve);\n        });\n    }\n    render(params, queryParams, diffs) { }\n}\n    ']);

    function twitterTwitterRouteJS() {
        return utils.escapeHTML(_templateObject$3);
    }

    var _templateObject$4 = babelHelpers.taggedTemplateLiteral(['\n.tweet-container.ether-prerendering,\n.tweet-container.ether-prerendered,\n.tweet-container.ether-deactivated {\n    display: none;\n}\n\n.tweet-container.ether-deactivating {\n    animation: 0.4s cubic-bezier(0.60, -.50, .50, 1) forwards bounce-down;\n}\n\n.tweet-container.ether-rendering,\n.tweet-container.ether-rendered {\n    animation: 0.4s cubic-bezier(.50, 0, 0.40, 1.50) bounce-up;\n}\n    '], ['\n.tweet-container.ether-prerendering,\n.tweet-container.ether-prerendered,\n.tweet-container.ether-deactivated {\n    display: none;\n}\n\n.tweet-container.ether-deactivating {\n    animation: 0.4s cubic-bezier(0.60, -.50, .50, 1) forwards bounce-down;\n}\n\n.tweet-container.ether-rendering,\n.tweet-container.ether-rendered {\n    animation: 0.4s cubic-bezier(.50, 0, 0.40, 1.50) bounce-up;\n}\n    ']);

    function twitterTwitterRouteCSS() {
        return utils.escapeHTML(_templateObject$4);
    }

    var _templateObject$5 = babelHelpers.taggedTemplateLiteral(['\n// this.state during the render() call\n// on a class not currently already rendered\n{\n    deactivating: false,\n    deactivated:  false,\n    prerendering: false,\n    prerendered:  false,\n    rendering:    true,\n    rendered:     false\n}\n    '], ['\n// this.state during the render() call\n// on a class not currently already rendered\n{\n    deactivating: false,\n    deactivated:  false,\n    prerendering: false,\n    prerendered:  false,\n    rendering:    true,\n    rendered:     false\n}\n    ']);

    function stateExample() {
        return utils.escapeHTML(_templateObject$5);
    }

    var _templateObject$6 = babelHelpers.taggedTemplateLiteral(['\nclass RootRoute extends Route {\n    // ...\n\n    init(setupVal) {\n        this.tweets = setupVal.tweets;\n        this.transformer = setupVal.transformer;\n        this.twitterAddress = setupVal.address;\n    }\n\n    template(model) {\n        let opts = {\n            transformer: this.transformer\n        };\n        let href = this.linkTo(this.twitterAddress, model, opts);\n        return navButton(href, \'Get a random Tweet!\');\n    }\n\n    getRandomTweet() {\n        let idx = Math.floor(Math.random() * this.tweets.length);\n        return this.tweets[idx];\n    }\n\n    // render-cycle functions\n    prerender(params, queryParams, diffs) {\n        let template = this.template(this.getRandomTweet());\n        this.outlets.root.appendChild(template);\n    }\n    deactivate() {\n        return new Promise(resolve => {\n            onAnimationEnd(this.outlets.root.el, () => {\n                this.outlets.root.empty();\n                resolve();\n            });\n        });\n    }\n    render(params, queryParams, diffs) { }\n}\n\nexport default RootRoute;\n    '], ['\nclass RootRoute extends Route {\n    // ...\n\n    init(setupVal) {\n        this.tweets = setupVal.tweets;\n        this.transformer = setupVal.transformer;\n        this.twitterAddress = setupVal.address;\n    }\n\n    template(model) {\n        let opts = {\n            transformer: this.transformer\n        };\n        let href = this.linkTo(this.twitterAddress, model, opts);\n        return navButton(href, \'Get a random Tweet!\');\n    }\n\n    getRandomTweet() {\n        let idx = Math.floor(Math.random() * this.tweets.length);\n        return this.tweets[idx];\n    }\n\n    // render-cycle functions\n    prerender(params, queryParams, diffs) {\n        let template = this.template(this.getRandomTweet());\n        this.outlets.root.appendChild(template);\n    }\n    deactivate() {\n        return new Promise(resolve => {\n            onAnimationEnd(this.outlets.root.el, () => {\n                this.outlets.root.empty();\n                resolve();\n            });\n        });\n    }\n    render(params, queryParams, diffs) { }\n}\n\nexport default RootRoute;\n    ']);

    function twitterRootRouteJS() {
        return utils.escapeHTML(_templateObject$6);
    }

    var _templateObject$7 = babelHelpers.taggedTemplateLiteral(['\n// params\n{\n    twitter_username: "neiltyson",\n    tweet_id: "12345"\n}\n// queryParams\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diff\n{\n    params: {\n        twitter_username: [undefined, "neiltyson"],\n        tweet_id: [undefined, "12345"]\n    },\n    queryParams: {\n        color: [undefined, "red"],\n        bold: [undefined, "true"],\n        font_size: [undefined, "16"]\n    }\n}\n    '], ['\n// params\n{\n    twitter_username: "neiltyson",\n    tweet_id: "12345"\n}\n// queryParams\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diff\n{\n    params: {\n        twitter_username: [undefined, "neiltyson"],\n        tweet_id: [undefined, "12345"]\n    },\n    queryParams: {\n        color: [undefined, "red"],\n        bold: [undefined, "true"],\n        font_size: [undefined, "16"]\n    }\n}\n    ']);
    var _templateObject2$1 = babelHelpers.taggedTemplateLiteral(['\n// params - tweet_id has changed\n{\n    twitter_username: "neiltyson",\n    tweet_id: "6789"\n}\n// queryParams - same as before\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diff\n// - contains the differences vs. the last call\n// - a param is null if no difference\n// - a base property is null is none of its params differed (like queryParams here)\n// - the entire diff argument is null if neither base property had any differences\n{\n    params: {\n        tweet_id: ["12345", "6789"]\n        // twitter_username missing since there was no difference from the last call\n    },\n    // no difference in any of the queryParams compared to the last call\n    queryParams: null\n}\n    '], ['\n// params - tweet_id has changed\n{\n    twitter_username: "neiltyson",\n    tweet_id: "6789"\n}\n// queryParams - same as before\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diff\n// - contains the differences vs. the last call\n// - a param is null if no difference\n// - a base property is null is none of its params differed (like queryParams here)\n// - the entire diff argument is null if neither base property had any differences\n{\n    params: {\n        tweet_id: ["12345", "6789"]\n        // twitter_username missing since there was no difference from the last call\n    },\n    // no difference in any of the queryParams compared to the last call\n    queryParams: null\n}\n    ']);
    function paramsExample1() {
        return utils.escapeHTML(_templateObject$7);
    }

    function paramsExample2() {
        return utils.escapeHTML(_templateObject2$1);
    }

    var _templateObject$8 = babelHelpers.taggedTemplateLiteral(['\nexport default [\n    {\n        username: \'neiltyson\',\n        tweetId:  \'709051416564912128\',\n    },\n    {\n        username: \'CuteEmergency\',\n        tweetId:  \'715711549139263489\',\n    },\n    {\n        username: \'IronMaiden\',\n        tweetId:  \'710136681685385216\',\n    },\n];\n    '], ['\nexport default [\n    {\n        username: \'neiltyson\',\n        tweetId:  \'709051416564912128\',\n    },\n    {\n        username: \'CuteEmergency\',\n        tweetId:  \'715711549139263489\',\n    },\n    {\n        username: \'IronMaiden\',\n        tweetId:  \'710136681685385216\',\n    },\n];\n    ']);
    var _templateObject2$2 = babelHelpers.taggedTemplateLiteral(['\nfunction addTweetTransformer(setup) {\n    // map the twitter route\'s param names\n    // to the tweet model\'s properties\n    setup.transformer = function(paramName, model) {\n        switch(paramName) {\n        case \'twitter_username\':\n            return model.username;\n        case \'tweet_id\':\n            return model.tweetId;\n        }\n    };\n    return setup;\n}\n    '], ['\nfunction addTweetTransformer(setup) {\n    // map the twitter route\'s param names\n    // to the tweet model\'s properties\n    setup.transformer = function(paramName, model) {\n        switch(paramName) {\n        case \'twitter_username\':\n            return model.username;\n        case \'tweet_id\':\n            return model.tweetId;\n        }\n    };\n    return setup;\n}\n    ']);
    function twitterDataJSON() {
        return utils.escapeHTML(_templateObject$8);
    }

    function twitterDataTransformer() {
        return utils.escapeHTML(_templateObject2$2);
    }

    function gettingStartedIndexTemplate(ctx) {
        return '\n<div class="container">\n    <section class="tutorial">\n        <h1>Getting Started</h1>\n        <p>Welcome to development with Ether! This page will ease you into learning the three major components in Ether and how they work together. They are <code>RootApp</code>, <code>App</code>, and <code>Route</code>.</p>\n        <p>We\'ve built <a href="/app/" target="_blank">a small example app</a> and posted the <a href="https://github.com/darvelo/ether-website/tree/master/src/js/app" target="_blank">source code</a> on GitHub. Here\'s the app in action:</p>\n        <iframe id="app-iframe" src="/app/"></iframe>\n    </section>\n\n    <section class="tutorial">\n        <h2>Instantiating an App</h2>\n        <p>Let\'s start the process at the end. Constructing our twitter app is very simple. Here are the relevant bits of HTML:</p>\n        <pre><code class="hljs html">' + appHTML() + '</code></pre>\n        <p>In addition to <code>TwitterRootApp.create(...)</code>, we could have used <code>new TwitterRootApp(...)</code> with the same options. The first three options in this case are event handler functions. Check out the docs for <a href="' + ctx.hrefs.rootAppDocs + '">a description of each option.</a></p>\n        <p>Since all the event handlers call <code>updatePathbar</code>, we know that the function is called for all navigation events. The function signature for each handler is the same: it gets the relevant DOM event and a promise that resolves if navigation succeeded or rejects if there was no route matching the URL destination (404). <code>this</code> is the TwitterRootApp instance and <code>sendTo()</code> is the way we communicate to different parts of our application using addresses, which we\'ll talk about later.</p>\n        <p><strong>Note:</strong> Event handlers are not attached until you call <code>start()</code> on your RootApp instance.</p>\n    </section>\n\n    <section class="tutorial">\n        <h2>RootApp</h2>\n        <p>A RootApp is the starting point for the whole application and the only constructor you call explicitly. Let\'s <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/root-app.js" target="_blank">check out the code</a> and see how it works.</p>\n        <pre><code class="hljs js">' + twitterRootAppJS() + '</code></pre>\n        <p>This may look a bit intimidating, but about 50% of all you need to know to use Ether is in these four methods. We\'ll break it down by method.</p>\n        <p><strong>Note:</strong> If you\'re not using ES2015, you can use the extend() method on each of the major classes, such as <code>RootApp.extend()</code>, instead of the <code>class ... extends ...</code> syntax. Be aware that the import file structure has no particular meaning, so you\'re free to use whatever file structure you like.</p>\n        <h3>createOutlets()</h3>\n        <p>Outlets provide a strategy for managing the DOM. The idea is that an outlet is owned by a single App or Route, and wraps a DOM element that survives inside the DOM for the life of the application. Ether\'s <code>Outlet</code> class restricts access to the wrapped DOM element and its methods, but exposes methods to find, add, or remove child elements within it. Since an outlet\'s wrapped element can be made to be an ancestor to the DOM element of another outlet, it\'s important to prevent actions like clearing the outlet\'s HTML, which may accidentally remove a child outlet from the DOM. If you want more control, you can use Ether\'s <code>MutableOutlet</code> class which gives direct access to the element through its <code>el</code> property.</p>\n        <p>In this example we\'re using the <code>makeOutlet</code> helper function to create outlets and add CSS classes without invoking these constructors directly. We can pass in an existing element or ask it to create one with a specific tagname. We also determine whether we want a MutableOutlet with the <code>mutable</code> option.</p>\n        <p>The <code>outlets</code> argument received in createOutlets() is the same object that was passed into <code>TwitterRootApp.create()</code>. Whatever object is returned by createOutlets() will be the named outlets owned by the app, set to <code>this.outlets</code>.</p>\n        <h3>mount()</h3>\n        <p>Here we declare the routes that exist on the root (relative to basePath) and what class will handle them. What\'s interesting is we not only can mount a Route at a location, but another App! This flexibility will provide us the encapsulation we need to repurpose pieces of the app for other projects in our <a href="' + ctx.hrefs.reusingClassesGuide + '">guide on reusing Ether classes</a>. Ether will create a unique instance of each of the classes for each URL path, which allows us to reuse classes for other paths as well.</p>\n        <pre><code class="hljs js">' + rootRouteMountJS() + '</code></pre>\n        <p>An instance of the RootRoute class will be mounted on the root URL path (the leading slash in a path string is optional) and registered as having the address <code>root</code>. It\'ll also receive the <code>root</code> outlet created in the createOutlets() method, making the TwitterRootApp lose ownership of that outlet, meaning it\'ll no longer be available as <code>this.outlets.root</code> in TwitterRootApp methods but will be in RootRoute methods. Any number of addresses can be registered or outlets transferred by adding to the number of parameters. The <code>.setup()</code> method takes any number of functions, which will be called in order when the instance is created. The return value of the first function will be passed in as the only argument to the second function and so on. The return value of the last function will be passed into the RootRoute\'s init() method as the first argument.</p>\n        <pre><code class="hljs js">' + twitterRouteMountJS() + '</code></pre>\n        <p>The TwitterRoute\'s URL path has a more interesting syntax. The curly braces provide a way to parse parameters from the URL using real regular expressions, and associate those parameters with names when the route is rendered. For example, the param named <code>tweet_id</code> will be a string of digits. So if a user navigated to <code>/app/neiltyson/12345</code> the TwitterRoute would handle that request and receive the values of both parameters as strings:\n        <pre><code class="hljs js">{"twitter_username": "neiltyson", "tweet_id": "12345"}</code></pre>\n        <p>Note that because the URL path is a string, we have to escape the backslash character. The only other rule is that you can\'t use slashes or capturing groups (unescaped parentheses) within the regex value, but <code>[^/]</code>, <code>(?:</code>, <code>(?!</code>, and <code>(?=</code> are allowed.</p>\n        <p>When a URL is being matched against URL paths in mount() during navigation, matching begins with the path having the most slash characters and proceeds until matching last against the path with the least slash characters.</p>\n        <h3>mountConditionals()</h3>\n        <p>Ether has the unique idea of <em>conditional mounts</em> which are mounts that will be rendered if certain conditions are met. Conditional mounts must be a Route subclass or an array of Route subclasses. Instead of URL paths, there are three logic operators: <code>*</code>, <code>+</code>, and <code>!</code>.</p>\n        <dl>\n            <dt><code>*</code></dt>\n            <dd>The route(s) will be rendered if any of the mounts in the <code>mounts()</code> method is rendered.</dd>\n            <dt><code>+</code></dt>\n            <dd>Takes a comma-separated list of addresses, such as <code>+root,twitter</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was registered with any of the listed addresses.</dd>\n            <dt><code>!</code></dt>\n            <dd>Takes a comma-separated list of addresses, such as <code>!root</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was <strong>not registered with any</strong> of the addresses listed.</dd>\n        </dl>\n        <p>For instance, the PathbarRoute in our twitter app is mounted using the <code>*</code> logic, so it\'ll be rendered no matter what URL matching occurs. If we instead mounted it on <code>+twitter</code>, it would only be rendered when the TwitterRoute was rendered, on a URL path like <code>/app/neiltyson/12345</code>, but not <code>/app/</code>. If we mounted it on <code>!twitter</code>, it would be rendered whenever any mount is rendered <em>except TwitterRoute,</em> which in this case is only RootRoute, on URL path <code>/app/</code> and nowhere else.</p>\n        <p>Conditional mounts are ideal for things like navigation bars, sidebars, footers, notifications, or other widgets. Any time you need a specific component or section to be available on different URL paths, a conditional mount may be just what you need.</p>\n    </section>\n\n    <section class="tutorial">\n        <h2 id="app">App</h2>\n        <p>A RootApp is just a special instance of App with a few features added, so there\'s not much new to learn here! Our twitter app never mounts an App, but if it did, its createOutlets() would receive all outlets passed in from <code>.outlets()</code> when the App was mounted, and would set those outlets to <code>this.outlets</code> on the App if not overridden. You can mount Apps and Routes onto an App just as you can on the RootApp to create structured URLs, grouping related routes together and rendering outlets on the App that its mounted Routes depend on.</p>\n    </section>\n\n    <section class="tutorial">\n        <h2>Route</h2>\n        <p>The App\'s mount() method allows other Apps to be mounted on a portion of a URL path, but for navigation to succeed a Route must be mounted on the final portion of the URL. In our twitter app we created three routes.</p>\n        <h3>PathbarRoute</h3>\n        <p>We want this Route subclass to display the current URL. Because it was mounted as a <code>*</code> conditional mount, it\'ll be rendered regardless of which of the other routes (mounted in <code>TwitterRootApp#mount()</code>) handles a URL request, which makes it useful as a kind of header or persistent widget.</p>\n        <pre><code class="hljs js">' + twitterPathbarRouteJS() + '</code></pre>\n        <p>In the init() method we create <code>&lt;span class="value"&gt;</code> to hold the URL text and assign it to <code>this.text</code>. What\'s interesting is the receive() method, which takes a url argument and assigns it to the element\'s text content. How does this work?</p>\n\n        <aside class="right-side">\n            <h4>A Word on API Similarities between Ether Classes</h4>\n            <p>Most methods and properties on RootApp, App, and Route overlap, which makes for quick learning of the Ether API surface. <a href="' + ctx.hrefs.sharedPropsDocs + '">Check out the docs to learn more</a>.</p>\n        </aside>\n\n        <h4>The expected*() Methods</h4>\n        <p>These represent a set of four similar methods:</p>\n        <p>expectedAddresses() must match the addresses passed into the route when it was mounted with <code>.addresses()</code>. These are the addresses the class responds to when the <code>sendTo(address, data...)</code> method is called elsewhere in the Ether app.</p>\n        <p><code>expectedOutlets()</code> must match <code>.outlets()</code>, and also guarantees those named outlets will be available on <code>this.outlets</code>.</p>\n        <p>expectedSetup() is an opportunity to check the value passed in with <code>.setup()</code> and throw an error if it isn\'t what the class needs to work properly, before it\'s passed to init().</p>\n        <p>expectedParams() is a bit different&mdash;it allows you to return an array of parameter names that have been collected in the URL paths mounted up to this point. You can leave out any you don\'t need, and only the ones you list will be provided in the render functions (which we\'ll talk about later). Ether will throw a helpful error if you list parameter names that don\'t exist on that URL.</p>\n        <p><strong>Together, these methods act not only as protection against setup mistakes, but also as documentation.</strong> You\'ll know exactly which addresses an App or Route goes by and which outlets, URL parameters, and setup values are available inside its member functions.</p>\n        <h4>addressesHandlers</h4>\n        <p>If expectedAddresses() returns a list of addresses your class goes by, addressesHandlers() returns a list of functions that are called when their respective addreses are sent data from elsewhere in the application with the <code>sendTo(address, data...)</code> method. We see in the code that our PathbarRoute goes by the address <code>\'pathbar\'</code> and that the function that will be called on <code>sendTo(\'pathbar\', data...)</code> is <code>receive(data...)</code>. Now you know why the <code>updatePathbar</code> function in the HTML at the beginning of this article works: after navigation succeeds the RootApp instance passes the current URL to PathbarRoute with <code>self.sendTo(\'pathbar\', self.fullUrl)</code>.</p>\n        <p>It may seem strange to decouple the address names and their handler functions into two methods, but there\'s a good reason: it makes class reuse easier. Subclasses can override expectedAddresses() while leaving addressesHandlers() untouched.</p>\n\n        <h3>TwitterRoute</h3>\n        <p>The <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/routes/twitter.js" target="_blank">TwitterRoute</a> shows the contents of a tweet. Let\'s dive in.</p>\n        <pre><code class="hljs js">' + twitterTwitterRouteJS() + '</code></pre>\n        <p>From what we\'ve learned before, we know that TwitterRoute goes by the <code>\'twitter\'</code> address, but since we don\'t need it to handle any data we use an empty function to handle sendTo() calls on that address. init() creates a <a href="https://github.com/darvelo/ether-website/blob/master/src/js/app/views/tweet.js" target="_blank">simple view</a> and appends its element to the outlet guaranteed to exist by expectedOutlets(), and uses the data passed in through .setup() to create and append to the outlet what is essentially a back button.</p>\n\n        <p>What\'s really interesting is the new prerender()/deactivate()/render() functions. These are called when the user navigates to, or away from, a Route or App.</p>\n        <p>The TwitterRoute is rendered when the user navigates to the URL <code>\'/app/{twitter_username=\\\\w+}/{tweet_id=\\\\d+}\'</code>. Since expectedParams() lists both params, the route will have both <code>twitter_username</code> and <code>tweet_id</code> available in the <code>params</code> argument of its prerender() and render() methods. Also, any query params in the URL will be in the <code>queryParams</code> argument. The <code>diff</code> argument is the difference between the params and queryParams parsed from the current URL vs. the URL that last rendered the class. If there was no difference, the value will be null.</p>\n        <p>For example, if the user navigates to the TwitterRoute for the first time through <code>/app/neiltyson/12345?color=red&amp;bold=true&amp;font_size=16</code>, the prerender() and render() methods will be called in order with the following arguments:</p>\n        <pre><code class="hljs js">' + paramsExample1() + '</code></pre>\n        <p>If the user then navigates to <code>/app/neiltyson/6789?color=red&amp;bold=true&amp;font_size=16</code>, the methods will be called again with:</p>\n        <pre><code class="hljs js">' + paramsExample2() + '</code></pre>\n        <p>If the user then navigates somewhere else then back to the same URL, the params and queryParams arguments will be the same, but the diff argument will be null since neither the params nor queryParams changed compared to the URL when the TwitterRoute was last rendered.</p>\n        <p>As an aside, navigating to the same URL twice in a row is a noop in Ether&mdash;no methods would be called in that case.</p>\n\n        <aside>\n            <h4>A Simple Render Cycle Example</h4>\n            <p>prerender() and render() are called in order when the Route or App is a mount on the navigation path. deactivate() is called when a mount has been rendered for a navigation path but a new navigation call is made to a different path where that Route or App is not mounted. Here\'s an example.</p>\n            <p>Let\'s say we have two mounts, Route1 and Route2, mounted on different URLs within the same App. If Route1 is currently rendered and the user navigates to Route2, the function calls will happen in this order:<p>\n            <ol>\n                <li>Route2#prerender()</li>\n                <li>Route1#deactivate()</li>\n                <li>Route2#render()</li>\n            </ol>\n            <p>If any of the three methods returns a Promise, Ether will wait for it to resolve before making the next call.</p>\n            <p>How does this process empower the developer? Let\'s say both routes\' outlets are styled as cards that slide in from the side of the page.</p>\n            <ol>\n                <li>Route2#prerender() fetches data from the server and populates its HTML offscreen. It returns a promise that resolves when this has finished and its outlet is ready to be rendered onscreen.</li>\n                <li>Route1#deactivate() performs a slide-out animation on its outlet and returns a promise that resolves when the animation has finished.</li>\n                <li>Route2#render() performs a slide-in animation and does not return a promise because in this case nothing depends on waiting for the animation to complete.</li>\n            </ol>\n            <p>This is just a small example of the power of the render cycle. By mounting Apps and Routes and using their render functions in creative ways you can achieve amazing things. <a href="' + ctx.hrefs.renderCycleGuide + '">Learn more about how the render cycle works</a>.</p>\n        </aside>\n\n        <p><code>TwitterRoute#prerender()</code> sends the params to its view, which fetches data from the server and populates itself with the resulting data. Since <code>view.render()</code> returns a Promise, Ether will wait until the view is ready before continuing with the rendering process.</p>\n\n        <p><code>TwitterRoute#deactivate()</code> hooks into a CSS animation event and resolves when the animation completes. This relies on how Ether handles CSS classes on outlets.</p>\n\n        <h4>Ether State</h4>\n        <p><code>TwitterRoute#render()</code> is empty, but this is because TwitterRoute takes advantage of the fact that Ether sets special classes on all outlets at all phases of the render cycle. By styling the outlet for when it receives these CSS classes, we achieve the bounce animation effect. Here\'s the CSS.</p>\n\n        <pre><code class="hljs css">' + twitterTwitterRouteCSS() + '</code></pre>\n\n        <p>There are six CSS classes in all:</p>\n        <dl>\n            <dt>ether-deactivating</dt>\n            <dd>Set before deactivate() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n            <dt>ether-deactivated</dt>\n            <dd>Set after deactivate() execution completes, or if a Promise was returned, when the promise resolves. Removed when <code>ether-prerendering</code> is set.</dd>\n            <dt>ether-prerendering</dt>\n            <dd>Set before prerender() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n            <dt>ether-prerendered</dt>\n            <dd>Set after prerender() execution completes, or if a Promise was returned, when the promise resolves. Removed when <code>ether-rendering</code> is set.</dd>\n            <dt>ether-rendering</dt>\n            <dd>Set before render() execution and removed when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n            <dt>ether-rendered</dt>\n            <dd>Set after render() execution completes, or if a Promise was returned, when the promise resolves. Removed when <code>ether-deactivating</code> is set.</dd>\n        </dl>\n        <p>Note that if an Ether class is currently rendered and the user navigates to a different URL where the class remains a mount or conditional mount, or the user navigates to the same path but with different params or query params (e.g. <code>/app/neiltyson/12345</code> then <code>/app/IronMaiden/6789</code>), the <code>ether-rendered</code> CSS class will continue to apply while the <code>ether-prerendering/ether-prerendered/ether-rendering</code> CSS classes are applied. If the user navigates away, deactivation occurs and <code>ether-deactivating</code> is applied as <code>ether-rendered</code> is removed.</p>\n        <p>Ether applies this state not only to outlets, but to the Ether classes themselves. At any time you can inspect <code>this.state</code> in an App or Route and know what states apply to your class and its outlets. Here\'s en example of <code>this.state</code> for a class currently executing the render() method:</p>\n        <pre><code class="hljs js">' + stateExample() + '</code></pre>\n\n        <h3>RootRoute</h3>\n        <p>We\'ve come nearly to the end. You\'ve learned almost everything there is to know about Ether development.</p>\n        <p></p>\n\n        <pre><code class="hljs js">' + twitterRootRouteJS() + '</code></pre>\n\n        <p>Since this route is mounted on a URL path with no params, the params argument in prerender() and render() methods will always be null. If the user never manually enters query params into the address bar and we never use links that have them, the queryParams argument will also always be null.</p>\n        <p>There\'s only one thing left in this file we haven\'t already touched on, and that\'s what linkTo() is and how it works. linkTo() takes three arguments, the last of which is optional: an address, an model whose values can fill the URL at that address, and an options hash.</p>\n        <p>When you use linkTo(), what you\'re saying is, "I want an href I can use in a link or that I can pass to a direct call to navigate()." In <code>RootRoute#template()</code> we create a button that when clicked, kicks off navigation to the TwitterRoute, passing the data it needs to render the tweet through the URL. That data is the <code>twitter_username</code> and <code>tweet_id</code> params we\'ve seen before.</p>\n        <p>There\'s a problem, though.. TwitterRoute is mounted on this URL:</p>\n        <pre><code class="hljs js">\'{twitter_username=\\\\w+}/{tweet_id=\\\\d+}\'</code></pre>\n        <p>But the data we have looks like this:</p>\n        <pre><code class="hljs js">' + twitterDataJSON() + '</code></pre>\n        <p>How can we populate the href to the TwitterRoute when the param names and data property names don\'t match? The answer is to use a transformer function that maps param names to values on the data model. <code>RootRoute#init()</code> received such a function from <code>.setup()</code> and it looks like this:</p>\n        <pre><code class="hljs js">' + twitterDataTransformer() + '</code></pre>\n        <p>We can see that the setup function attaches a transformer function as a property to the object passed to <code>RootRoute#init()</code>. The transformer function is called with each param name that exists on the navigation path to TwitterRoute (namely <code>twitter_username</code> and <code>tweet_id</code>) as well as the model iself, and returns the corresponding value on the model for that param name. The fact that this transformer can be passed in through <code>.setup()</code> is fantastic because it means we can reuse TwitterRoute on any mount with any param names or data format we want, as long as we pass in a working transformer function!</p>\n        <p>So what we\'re really saying with <code>let href = this.linkTo(this.twitterAddress, model, opts);</code> is, "When creating the href to the TwitterRoute, map the param names to their values on the data model and populate the URL with those values." That\'s how we get back an href like <code>/app/neiltyson/709051416564912128</code>. If we wanted an href we could use in a direct call to <code>navigate()</code> we would also need to pass the option <code>basePath: false</code> to get an href without the basePath prepended.</p>\n    </section>\n\n    <section class="tutorial">\n        <h2>Conclusion</h2>\n        <p>If you\'ve made it this far, you are truly an Ether master! Give yourself a pat on the back. You learned about the three major Ether classes, how to combine them as mounts to make routing possible, how to use outlets and the render cycle to your advantage, and how to use addresses to allow different parts of your application to communicate.</p>\n        <p>Ether is a simple but powerful framework, and there\'s more to explore. Head on over to the <a href="' + ctx.hrefs.guides + '">Guides</a> to learn tips and tricks or topics in more depth, or to the <a href="' + ctx.hrefs.docs + '">Docs</a> for the nitty gritty on function signatures and the like. Whatever you do, I hope your journey with Ether is a fun and fruitful one!</p>\n    </section>\n</div>\n    ';
    }

    var GettingStartedApp = function (_ScrollApp) {
        babelHelpers.inherits(GettingStartedApp, _ScrollApp);

        function GettingStartedApp() {
            babelHelpers.classCallCheck(this, GettingStartedApp);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GettingStartedApp).apply(this, arguments));
        }

        babelHelpers.createClass(GettingStartedApp, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':gs'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['gs'];
            }
        }, {
            key: 'mount',
            value: function mount() {
                return {
                    '': GettingStartedIndexRoute.addresses(':gs.index')
                };
            }
        }, {
            key: 'addHighlightedClass',
            value: function addHighlightedClass() {
                this.outlets.gs.el.classList.add('highlighted');
            }
        }, {
            key: 'init',
            value: function init() {
                var _this2 = this;

                var hrefs = {
                    'reusingClassesGuide': this.linkTo(':guides.reusingclasses'),
                    'sharedPropsDocs': this.linkTo(':docs.shared'),
                    'rootAppDocs': this.linkTo(':docs.rootapp'),
                    'renderCycleGuide': this.linkTo(':guides.rendercycle'),
                    'guides': this.linkTo(':guides.index'),
                    'docs': this.linkTo(':docs.index')
                };
                var outlet = this.outlets.gs;
                outlet.innerHTML = gettingStartedIndexTemplate({ hrefs: hrefs });
                if (window.Worker) {
                    this.highlighted = utils.highlightCode(outlet).then(function () {
                        _this2.addHighlightedClass();
                    });
                } else {
                    this.highlighted = null;
                    this.addHighlightedClass();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(GettingStartedApp.prototype), 'render', this).call(this);
                this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
                return this.highlighted;
            }
        }]);
        return GettingStartedApp;
    }(utils.ScrollApp);

    function createLinkTemplate(linkTo) {
        return function (data) {
            var address = data.address;
            var dest = data.dest;
            var params = data.params;
            var text = data.text;

            var href = linkTo(dest || address, params);
            return '\n            <li data-address="' + address + '">\n                <a href=' + href + '>' + text + '</a>\n            </li>\n        ';
        };
    }

    function navbarTemplate(ctx) {
        var linksData = ctx.linksData;
        var linkTo = ctx.linkTo;

        var listItems = linksData.map(createLinkTemplate(linkTo)).join('');
        return '\n        <ul class="guides-sidebar">\n            ' + listItems + '\n        </div>\n    ';
    }

    var SidebarRoute = function (_Route) {
        babelHelpers.inherits(SidebarRoute, _Route);

        function SidebarRoute() {
            babelHelpers.classCallCheck(this, SidebarRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SidebarRoute).apply(this, arguments));
        }

        babelHelpers.createClass(SidebarRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides.sidebar'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return ['receive'];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['sidebar'];
            }
        }, {
            key: 'init',
            value: function init(linksData) {
                var ctx = {
                    linksData: linksData,
                    linkTo: this.linkTo.bind(this)
                };
                var outlet = this.outlets.sidebar;
                outlet.innerHTML = navbarTemplate(ctx);
                this.listItems = Array.prototype.slice.call(outlet.querySelectorAll('li'));
            }
        }, {
            key: 'receive',
            value: function receive(message, data) {
                switch (message) {
                    case 'setActiveLink':
                        this.setActiveLink(data);
                        break;
                    default:
                        break;
                }
            }
        }, {
            key: 'setActiveLink',
            value: function setActiveLink(addresses) {
                this.listItems.forEach(function (li) {
                    var liAddr = li.getAttribute('data-address');
                    if (addresses.some(function (addr) {
                        return addr === liAddr;
                    })) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove('active');
                    }
                });
            }
        }]);
        return SidebarRoute;
    }(ether.Route);

    function guideIndexTemplate() {
        return "\n<h1>Overview</h1>\n<p>Welcome to the Ether Guides! Here you can find in-depth articles on certain aspects of Ether development and ways to use the framework.</p>\n    ";
    }

    var IndexRoute = function (_ScrollRoute) {
        babelHelpers.inherits(IndexRoute, _ScrollRoute);

        function IndexRoute() {
            babelHelpers.classCallCheck(this, IndexRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(IndexRoute).apply(this, arguments));
        }

        babelHelpers.createClass(IndexRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides.index'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['index'];
            }
        }, {
            key: 'init',
            value: function init() {
                var outlet = this.outlets.index;
                outlet.innerHTML = guideIndexTemplate();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(IndexRoute.prototype), 'render', this).call(this);
                this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return IndexRoute;
    }(utils.ScrollRoute);

    var _templateObject$9 = babelHelpers.taggedTemplateLiteral(['\nclass MyRootApp extends RootApp {\n    // ...\n    mount() {\n        return {\n            \'\': RootRoute.addresses(\'root\'),\n            \'about\': AboutRoute.addresses(\'about\'),\n            \'user/{user_id=\\\\d+}\': UserApp.addresses(\'user\'),\n            \'todo/{todo_id=\\\\d+}\': TodoApp.addresses(\'todo\'),\n        };\n    }\n    mountConditionals() {\n        return {\n            \'*\': NotificationsWidgetRoute,\n            \'+user\': UserWidgetRoute,\n            \'+about\': AboutHeaderRoute,\n            \'!user,todo\': [\n                StaticWidgetRoute,\n                StaticWidgetRoute,\n            ],\n        };\n    }\n}\nclass UserApp extends App {\n    // ...\n    mount() {\n        return {\n            \'\': UserRootRoute,\n            \'profile\': UserProfileRoute,\n        };\n    }\n}\nclass TodoApp extends App {\n    // ...\n    mount() {\n        return {\n            \'{action=\\\\w+}\': TodoActionRoute,\n        };\n    }\n}\n    '], ['\nclass MyRootApp extends RootApp {\n    // ...\n    mount() {\n        return {\n            \'\': RootRoute.addresses(\'root\'),\n            \'about\': AboutRoute.addresses(\'about\'),\n            \'user/{user_id=\\\\\\\\d+}\': UserApp.addresses(\'user\'),\n            \'todo/{todo_id=\\\\\\\\d+}\': TodoApp.addresses(\'todo\'),\n        };\n    }\n    mountConditionals() {\n        return {\n            \'*\': NotificationsWidgetRoute,\n            \'+user\': UserWidgetRoute,\n            \'+about\': AboutHeaderRoute,\n            \'!user,todo\': [\n                StaticWidgetRoute,\n                StaticWidgetRoute,\n            ],\n        };\n    }\n}\nclass UserApp extends App {\n    // ...\n    mount() {\n        return {\n            \'\': UserRootRoute,\n            \'profile\': UserProfileRoute,\n        };\n    }\n}\nclass TodoApp extends App {\n    // ...\n    mount() {\n        return {\n            \'{action=\\\\\\\\w+}\': TodoActionRoute,\n        };\n    }\n}\n    ']);

    function mountExample() {
        return utils.escapeHTML(_templateObject$9);
    }

    var _templateObject$10 = babelHelpers.taggedTemplateLiteral(['\nScenario 0: first navigation after RootApp construction\n──o──o──o\n    '], ['\nScenario 0: first navigation after RootApp construction\n──o──o──o\n    ']);
    var _templateObject2$3 = babelHelpers.taggedTemplateLiteral(['\nScenario 1: going from a route to a sibling route\n──o--o\n  └──o\n    '], ['\nScenario 1: going from a route to a sibling route\n──o--o\n  └──o\n    ']);
    var _templateObject3$1 = babelHelpers.taggedTemplateLiteral(['\nScenario 2: going from a route to a route on a sibling app\n──o--o\n  └──o──o\n    '], ['\nScenario 2: going from a route to a route on a sibling app\n──o--o\n  └──o──o\n    ']);
    var _templateObject4 = babelHelpers.taggedTemplateLiteral(['\nScenario 3: going from a deep route to a route on its parent app\'s parent app\n──o--o--o\n  └──o\n    '], ['\nScenario 3: going from a deep route to a route on its parent app\'s parent app\n──o--o--o\n  └──o\n    ']);
    var _templateObject5 = babelHelpers.taggedTemplateLiteral(['\nScenario 4: going from a deep route to a deep route on a different app\n──o--o--o\n  └──o──o\n    '], ['\nScenario 4: going from a deep route to a deep route on a different app\n──o--o--o\n  └──o──o\n    ']);
    function scenario0() {
        return utils.escapeHTML(_templateObject$10);
    }
    function scenario1() {
        return utils.escapeHTML(_templateObject2$3);
    }
    function scenario2() {
        return utils.escapeHTML(_templateObject3$1);
    }
    function scenario3() {
        return utils.escapeHTML(_templateObject4);
    }
    function scenario4() {
        return utils.escapeHTML(_templateObject5);
    }

    function scenarios() {
        return '\n' + scenario0() + '\n\n' + scenario1() + '\n\n' + scenario2() + '\n\n' + scenario3() + '\n\n' + scenario4() + '\n    ';
    }

    function renderCycleTemplate(ctx) {
        return '\n<h1>The Render Cycle</h1>\n<p>The render cycle is the algorithm for how Ether determines which Routes and Apps are rendered, and which are not, when a user navigates to a URL.</p>\n<p>Each subclass you make of App and Route has three render cycle methods available to it: <code>prerender()</code>, <code>render()</code>, and <code>deactivate()</code>. When each method is called depends on how you\'ve mounted your Apps and Routes using the <code>RootApp/App</code> methods <code>mount()</code> and <code>mountConditionals()</code>.</p>\n<p>Let\'s begin by defining some Apps and Routes:</p>\n<pre><code class="hljs js">' + mountExample() + '</code></pre>\n\n<p>Note that we\'ve omitted method definitions for the Apps, and Route definitions entirely. We\'re just focusing on the classes themselves and how they relate, to learn about how their render cycle methods will be called and in what order.</p>\n\n<p>When navigating to a URL, Ether inspects the mount hierarchy and determines the navigation path through that hierarchy for the URL. It does this by matching the strings you return from <code>mount()</code> against the URL, descending into mounts and matching against <em>their</em> mounts\' strings until a Route subclass is found that matches against the final part of the URL.</p>\n\n<h2>Breaking it Down with Diagrams</h2>\n<p>We can show how Ether determines and completes a render cycle by breaking down all possible scenarios into simple diagrams. In these diagrams:</p>\n<ul>\n    <li><code>o</code> is a node, representing a Route or an App</li>\n    <ul>\n        <li>nodes with a line extending to the right are Apps</li>\n        <li>leaf nodes (no line extending to the right) are Routes</li>\n        <li>a line connecting two nodes means the left node contains the right node as a mount</li>\n    </ul>\n    <li>dashed lines represent the navigation path of the previous URL</li>\n    <li>solid lines represent the navigation path of the current URL</li>\n</ul>\n<pre>' + scenarios() + '</pre>\n\n<h2>A Word on Call Order and State</h2>\n<p><code>prerender()/render()</code> method calls are always made on a RootApp/App <em>before</em> those same methods are called on any of their mounts or conditional mounts. <code>deactivate()</code> method calls are always made on a RootApp/App <em>after</em> that same method is called on <strong>all</strong> currently-rendered mounts and conditional mounts on the RootApp/App.</p>\n<p>The reasoning for this is that an App\'s mounts and conditional mounts may depend on the App itself having been rendered before they can be rendered. Likewise, deactivating an App only seems logical once all of its dependent mounts and conditional mounts are deactivated.</p>\n<p>Ether sets state hooks before and after render cycle functions are executed. Check out the section on the <code>this.state</code> property in the <a href="' + ctx.hrefs.sharedMethods + '">Shared Methods and Properties</a> docs for more info.</p>\n\n<h2>Scenario 0</h2>\n<pre>' + scenario0() + '</pre>\n<p>This scenario occurs only on the first call to navigate, either explicitly through the <a href="' + ctx.hrefs.sharedMethods + '">shared method</a> <code>navigate()</code> or through any of the event handlers set on the <a href="' + ctx.hrefs.rootAppDocs + '">RootApp constructor options</a>.</p>\n<h3>Example: Navigating to <code>/user/1/profile</code></h3>\n<h4>Prerender Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#prerender()</code></li>\n    <li><code>NotificationsWidgetRoute#prerender()</code></li>\n    <li><code>UserWidgetRoute#prerender()</code></li>\n</ol>\n<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserApp#prerender()</code></li>\n    <li><code>UserProfileRoute#prerender()</code></li>\n</ol>\n<h4>Render Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#render()</code></li>\n    <li><code>NotificationsWidgetRoute#render()</code></li>\n    <li><code>UserWidgetRoute#render()</code></li>\n</ol>\n<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserApp#render()</code></li>\n    <li><code>UserProfileRoute#render()</code></li>\n</ol>\n\n<p>Notice how the stages of the Render Phase match the stages of the Prerender Phase exactly. This is part of what makes the render cycle predictable.</p>\n\n\n<h2>Scenario 1</h2>\n<pre>' + scenario1() + '</pre>\n<p>This scenario occurs when a route has been rendered for a URL, but navigation to a new URL results in a different route within the same parent App being rendered.</p>\n\n<h3>Example: Navigating from <code>/about</code> to <code>/</code></h3>\n<p>Because <code>/about</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/</code>:</p>\n<ul>\n    <li><code>MyRootApp</code></li>\n    <li><code>AboutRoute</code></li>\n    <li><code>NotificationsWidgetRoute</code></li>\n    <li><code>AboutHeaderRoute</code></li>\n    <li><code>StaticWidgetRoute</code> (first instance)</li>\n    <li><code>StaticWidgetRoute</code> (second instance)</li>\n</ul>\n\n<p>We begin the render cycle again when we navigate to <code>/</code>, detailed below.</p>\n<h4>Prerender Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#prerender()</code></li>\n    <li><code>RootRoute#prerender()</code></li>\n    <li><code>NotificationsWidgetRoute#prerender()</code></li>\n    <li><code>StaticWidgetRoute#prerender()</code> (first instance)</li>\n    <li><code>StaticWidgetRoute#prerender()</code> (second instance)</li>\n</ol>\n<h4>Deactivate Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>AboutRoute#deactivate()</code></li>\n    <li><code>AboutHeaderRoute#deactivate()</code></li>\n</ol>\n<h4>Render Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#render()</code></li>\n    <li><code>RootRoute#render()</code></li>\n    <li><code>NotificationsWidgetRoute#render()</code></li>\n    <li><code>StaticWidgetRoute#render()</code> (first instance)</li>\n    <li><code>StaticWidgetRoute#render()</code> (second instance)</li>\n</ol>\n\n<p>Note how the calls to <code>deactivate()</code> take place after all <code>prerender()</code> calls, but before any calls to <code>render()</code>. Also note that <code>NotificationsWidgetRoute#deactivate()</code> is not called, because it\'s also an active mount on the <code>/</code> URL. <code>NotificationsWidgetRoute#prerender()</code> is called even though the instance is already rendered, but by checking <code>this.state</code> in <code>prerender()</code> we can check for this and act accordingly. <code>MyRootApp#deactivate()</code> is never called under any circumstances; it\'s always active.</p>\n\n<h2>Scenario 2</h2>\n<pre>' + scenario2() + '</pre>\n<p>This scenario occurs when a route has been rendered for a URL, but navigation to a new URL results in a route being rendered that\'s mounted on an App mounted on the same App as the first route.</p>\n\n<h3>Example: Navigating from <code>/about</code> to <code>/user/1/profile</code></h3>\n<p>Because <code>/about</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/user/1/profile</code>:</p>\n<ul>\n    <li><code>MyRootApp</code></li>\n    <li><code>AboutRoute</code></li>\n    <li><code>NotificationsWidgetRoute</code></li>\n    <li><code>AboutHeaderRoute</code></li>\n    <li><code>StaticWidgetRoute</code> (first instance)</li>\n    <li><code>StaticWidgetRoute</code> (second instance)</li>\n</ul>\n\n<p>We begin the render cycle again when we navigate to <code>/user/1/profile</code>, detailed below.</p>\n<h4>Prerender Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#prerender()</code></li>\n    <li><code>NotificationsWidgetRoute#prerender()</code></li>\n    <li><code>UserWidgetRoute#prerender()</code></li>\n</ol>\n<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserApp#prerender()</code></li>\n    <li><code>UserProfileRoute#prerender()</code></li>\n</ol>\n<h4>Deactivate Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>AboutRoute#deactivate()</code></li>\n    <li><code>AboutHeaderRoute#deactivate()</code></li>\n    <li><code>StaticWidgetRoute#deactivate()</code> (first instance)</li>\n    <li><code>StaticWidgetRoute#deactivate()</code> (second instance)</li>\n</ol>\n<h4>Render Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#render()</code></li>\n    <li><code>NotificationsWidgetRoute#render()</code></li>\n    <li><code>UserWidgetRoute#render()</code></li>\n</ol>\n<p>Second stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserApp#render()</code></li>\n    <li><code>UserProfileRoute#render()</code></li>\n</ol>\n\n\n<h2>Scenario 3</h2>\n<pre>' + scenario3() + '</pre>\n\n<h3>Example: Navigating from <code>/user/1/profile</code> to <code>/about</code></h3>\n<p>Because <code>/user/1/profile</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/about</code>:</p>\n<ul>\n    <li><code>MyRootApp</code></li>\n    <li><code>NotificationsWidgetRoute</code></li>\n    <li><code>UserWidgetRoute</code></li>\n    <li><code>UserApp</code></li>\n    <li><code>UserProfileRoute</code></li>\n</ul>\n\n<p>We begin the render cycle again when we navigate to <code>/about</code>, detailed below.</p>\n<h4>Prerender Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#prerender()</code></li>\n    <li><code>AboutRoute#prerender()</code></li>\n    <li><code>NotificationsWidgetRoute#prerender()</code></li>\n    <li><code>AboutHeaderRoute#prerender()</code></li>\n    <li><code>StaticWidgetRoute#prerender()</code> (first instance)</li>\n    <li><code>StaticWidgetRoute#prerender()</code> (second instance)</li>\n</ol>\n<h4>Deactivate Phase</h4>\n<p>First stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserProfileRoute#deactivate()</code></li>\n    <li><code>UserApp#deactivate()</code></li>\n</ol>\n<p>Second stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserWidgetRoute#deactivate()</code></li>\n</ol>\n<h4>Render Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#render()</code></li>\n    <li><code>AboutRoute#render()</code></li>\n    <li><code>NotificationsWidgetRoute#render()</code></li>\n    <li><code>AboutHeaderRoute#render()</code></li>\n    <li><code>StaticWidgetRoute#render()</code> (first instance)</li>\n    <li><code>StaticWidgetRoute#render()</code> (second instance)</li>\n</ol>\n\n<h2>Scenario 4</h2>\n<pre>' + scenario4() + '</pre>\n\n<h3>Example: Navigating from <code>/user/1/profile</code> to <code>/todo/1/detail</code></h3>\n<p>Because <code>/user/1/profile</code> was the previous URL, we know the instances of the following classes were already rendered before the navigation call to <code>/todo/1/detail</code>:</p>\n<ul>\n    <li><code>MyRootApp</code></li>\n    <li><code>NotificationsWidgetRoute</code></li>\n    <li><code>UserWidgetRoute</code></li>\n    <li><code>UserApp</code></li>\n    <li><code>UserProfileRoute</code></li>\n</ul>\n\n<p>We begin the render cycle again when we navigate to <code>/todo/1/detail</code>, detailed below.</p>\n<h4>Prerender Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#prerender()</code></li>\n    <li><code>NotificationsWidgetRoute#prerender()</code></li>\n</ol>\n<p>Second stage, mounts in <code>TodoApp</code>. Functions called:</p>\n<ol>\n    <li><code>TodoApp#prerender()</code></li>\n    <li><code>TodoActionRoute#prerender()</code></li>\n</ol>\n<h4>Deactivate Phase</h4>\n<p>First stage, mounts in <code>UserApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserProfileRoute#deactivate()</code></li>\n    <li><code>UserApp#deactivate()</code></li>\n</ol>\n<p>Second stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>UserWidgetRoute#deactivate()</code></li>\n</ol>\n<h4>Render Phase</h4>\n<p>First stage, mounts in <code>MyRootApp</code>. Functions called:</p>\n<ol>\n    <li><code>MyRootApp#render()</code></li>\n    <li><code>NotificationsWidgetRoute#render()</code></li>\n</ol>\n<p>Second stage, mounts in <code>TodoApp</code>. Functions called:</p>\n<ol>\n    <li><code>TodoApp#render()</code></li>\n    <li><code>TodoActionRoute#render()</code></li>\n</ol>\n\n    ';
    }

    var RenderCycleRoute = function (_ScrollRoute) {
        babelHelpers.inherits(RenderCycleRoute, _ScrollRoute);

        function RenderCycleRoute() {
            babelHelpers.classCallCheck(this, RenderCycleRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RenderCycleRoute).apply(this, arguments));
        }

        babelHelpers.createClass(RenderCycleRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides.rendercycle'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['rendercycle'];
            }
        }, {
            key: 'addHighlightedClass',
            value: function addHighlightedClass(outlet) {
                outlet.el.classList.add('highlighted');
            }
        }, {
            key: 'init',
            value: function init() {
                var _this2 = this;

                var hrefs = {
                    rootAppDocs: this.linkTo(':docs.rootapp'),
                    sharedMethods: this.linkTo(':docs.shared')
                };
                var outlet = this.outlets.rendercycle;
                outlet.innerHTML = renderCycleTemplate({ hrefs: hrefs });
                if (window.Worker) {
                    this.highlighted = utils.highlightCode(outlet).then(function () {
                        _this2.addHighlightedClass(outlet);
                    });
                } else {
                    this.highlighted = null;
                    this.addHighlightedClass(outlet);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(RenderCycleRoute.prototype), 'render', this).call(this);
                this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
                return this.highlighted;
            }
        }]);
        return RenderCycleRoute;
    }(utils.ScrollRoute);

    function reusingClassesTemplate() {
        return "\n<h1>Reusing Classes</h1>\n<p>Coming soon!</p>\n    ";
    }

    var ReusingClassesRoute = function (_ScrollRoute) {
        babelHelpers.inherits(ReusingClassesRoute, _ScrollRoute);

        function ReusingClassesRoute() {
            babelHelpers.classCallCheck(this, ReusingClassesRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ReusingClassesRoute).apply(this, arguments));
        }

        babelHelpers.createClass(ReusingClassesRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides.reusingclasses'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['reusingclasses'];
            }
        }, {
            key: 'init',
            value: function init() {
                // <script>
                //     var app2 = document.createElement('script');
                //     app2.src="/scripts/app2.js"
                //     function changeURLInfo(event, promise) {
                //         var self = this;
                //         promise.then(function() {
                //             self.sendTo('url', self.fullUrl());
                //         });
                //     }
                //     var myApp = new App1({
                //         windowLoad: changeURLInfo,
                //         history: changeURLInfo,
                //         interceptLinks: function all(event, promise) {
                //             changeURLInfo.call(this, event, promise);
                //         },
                //         basePath: '/app1',
                //         outlets: {
                //             twitter: new Ether.MutableOutlet(document.getElementById('twitter')),
                //         },
                //     }).start();
                // </script>
                var outlet = this.outlets.reusingclasses;
                outlet.innerHTML = reusingClassesTemplate();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(ReusingClassesRoute.prototype), 'render', this).call(this);
                this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return ReusingClassesRoute;
    }(utils.ScrollRoute);

    var BestPracticesRoute = function (_ScrollRoute) {
        babelHelpers.inherits(BestPracticesRoute, _ScrollRoute);

        function BestPracticesRoute() {
            babelHelpers.classCallCheck(this, BestPracticesRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BestPracticesRoute).apply(this, arguments));
        }

        babelHelpers.createClass(BestPracticesRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides.bestpractices'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['bestpractices'];
            }
        }, {
            key: 'init',
            value: function init() {
                // choosing addresses for apps and routes

                var h1 = document.createElement('h1');
                h1.textContent = 'Best Practices';
                this.outlets.bestpractices.appendChild(h1);
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(BestPracticesRoute.prototype), 'render', this).call(this);
                this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return BestPracticesRoute;
    }(utils.ScrollRoute);

    function addSidebarLinksData() {
        return [{
            text: 'Overview',
            address: ':guides.index'
        }, {
            text: 'The Render Cycle',
            address: ':guides.rendercycle'
        }, {
            text: 'Reusing Classes',
            address: ':guides.reusingclasses'
        }];
    }

    // {
    //     text: 'Best Practices',
    //     address: ':guides.bestpractices',
    // },

    var GuidesApp = function (_App) {
        babelHelpers.inherits(GuidesApp, _App);

        function GuidesApp() {
            babelHelpers.classCallCheck(this, GuidesApp);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GuidesApp).apply(this, arguments));
        }

        babelHelpers.createClass(GuidesApp, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':guides'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['guides'];
            }
        }, {
            key: 'createOutlets',
            value: function createOutlets(outlets) {
                outlets.docs = ether.makeOutlet({
                    el: outlets.guides.el,
                    append: [outlets.sidebar = ether.makeOutlet({
                        tagName: 'nav',
                        classNames: ['guides-nav'],
                        mutable: true
                    }), outlets.index = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['guides-article'],
                        mutable: true
                    }), outlets.rendercycle = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['guides-article', 'guides-render-cycle'],
                        mutable: true
                    }), outlets.reusingclasses = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['guides-article'],
                        mutable: true
                    })]
                });

                // outlets.bestpractices = makeOutlet({
                //     tagName: 'article',
                //     classNames: ['guides-article'],
                //     mutable: true,
                // }),
                return outlets;
            }
        }, {
            key: 'mount',
            value: function mount() {
                return {
                    '': IndexRoute.addresses(':guides.index').outlets('index'),
                    'the-render-cycle': RenderCycleRoute.addresses(':guides.rendercycle').outlets('rendercycle'),
                    'reusing-classes': ReusingClassesRoute.addresses(':guides.reusingclasses').outlets('reusingclasses')
                };
            }
        }, {
            key: 'mountConditionals',
            // 'best-practices':
            //     BestPracticesRoute
            //         .addresses(':guides.bestpractices')
            //         .outlets('bestpractices'),
            value: function mountConditionals() {
                return {
                    '*': SidebarRoute.addresses(':guides.sidebar').outlets('sidebar').setup(addSidebarLinksData)
                };
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(GuidesApp.prototype), 'render', this).call(this);
                this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return GuidesApp;
    }(ether.App);

    function createLinkTemplate$1(linkTo) {
        return function (data) {
            var address = data.address;
            var dest = data.dest;
            var params = data.params;
            var text = data.text;

            var href = linkTo(dest || address, params);
            return '\n            <li data-address="' + address + '">\n                <a href=' + href + '>' + text + '</a>\n            </li>\n        ';
        };
    }

    function navbarTemplate$1(ctx) {
        var linksData = ctx.linksData;
        var linkTo = ctx.linkTo;

        var listItems = linksData.map(createLinkTemplate$1(linkTo)).join('');
        return '\n        <ul class="docs-sidebar">\n            ' + listItems + '\n        </div>\n    ';
    }

    var SidebarRoute$1 = function (_Route) {
        babelHelpers.inherits(SidebarRoute, _Route);

        function SidebarRoute() {
            babelHelpers.classCallCheck(this, SidebarRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SidebarRoute).apply(this, arguments));
        }

        babelHelpers.createClass(SidebarRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.sidebar'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return ['receive'];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['sidebar'];
            }
        }, {
            key: 'init',
            value: function init(linksData) {
                var ctx = {
                    linksData: linksData,
                    linkTo: this.linkTo.bind(this)
                };
                var outlet = this.outlets.sidebar;
                outlet.innerHTML = navbarTemplate$1(ctx);
                this.listItems = Array.prototype.slice.call(outlet.querySelectorAll('li'));
            }
        }, {
            key: 'receive',
            value: function receive(message, data) {
                switch (message) {
                    case 'setActiveLink':
                        this.setActiveLink(data);
                        break;
                    default:
                        break;
                }
            }
        }, {
            key: 'setActiveLink',
            value: function setActiveLink(addresses) {
                this.listItems.forEach(function (li) {
                    var liAddr = li.getAttribute('data-address');
                    if (addresses.some(function (addr) {
                        return addr === liAddr;
                    })) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove('active');
                    }
                });
            }
        }]);
        return SidebarRoute;
    }(ether.Route);

    function template () {
        return "\n<h1>Overview</h1>\n\n<p>Ether has three major classes that have been designed to have very similar APIs, which makes Ether easier to learn, and code using Ether easier to read. Each section of this documentation shows the methods and properties specific to each class, while the Shared Methods and Properties section shows which they have in common.</p>\n\n<p>Ether has no dependencies except for the assumption that a global Promise constructor is available in your environment.</p>\n    ";
    }

    var IndexRoute$1 = function (_ScrollRoute) {
        babelHelpers.inherits(IndexRoute, _ScrollRoute);

        function IndexRoute() {
            babelHelpers.classCallCheck(this, IndexRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(IndexRoute).apply(this, arguments));
        }

        babelHelpers.createClass(IndexRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.index'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['index'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.index.innerHTML = template();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(IndexRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return IndexRoute;
    }(utils.ScrollRoute);

    function rootappTemplate() {
        return "\n<h1>RootApp</h1>\n\n<p>Most methods and properties on <code>RootApp</code> are shared with <code>App</code> and <code>Route</code>. Please see the section Shared Methods and Properties for details.</p>\n\n<p>What follows are the methods, properties, and options unique to <code>RootApp</code>.</p>\n\n<h2>Constructor</h2>\n<p><code>RootApp.create(opts)</code> &mdash; Creates an instance configured with the options hash passed in.</p>\n\n<h2>Constructor Options</h2>\n\n<p>You can pass the following options to <code>RootApp.create()</code>.</p>\n\n<h3><code>windowLoad</code></h3>\n<h4>Allowed Values</h4>\n<ul>\n    <li><code>true</code> &mdash; Ether performs routing with the URL in the address bar when the <code>load</code> event on the <code>window</code> fires.</li>\n    <li><code>function(event, promise) { }</code> &mdash; Same as <code>true</code>, but Ether calls the function after kicking off navigation.</li>\n</ul>\n<h4>Function Arguments</h4>\n<ol>\n    <li><code>event</code> &mdash; The window load event object.</li>\n    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL in the address bar (404).</li>\n</ol>\n\n<h3><code>history</code></h3>\n<p><strong>Note:</strong> If any value below is given, Ether will perform a HTML5 History <code>pushState</code> on successful navigation.</p>\n<h4>Allowed Values</h4>\n<ul>\n    <li><code>true</code> &mdash; Ether performs routing with the URL in the address bar when the <code>popstate</code> event on the <code>window</code> fires.</li>\n    <li><code>function(event, promise) { }</code> &mdash; Same as <code>true</code>, but Ether calls the function after kicking off navigation.</li>\n</ul>\n<h4>Function Arguments</h4>\n<ol>\n    <li><code>event</code> &mdash; The popstate event object.</li>\n    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL that was in the address bar after popstate fired (404).</li>\n</ol>\n\n<h3><code>interceptLinks</code></h3>\n<p><strong>Note:</strong> If any value below is given, Ether adds click event handlers to certain links and performs routing using their <code>href</code> attribute.</p>\n<h4>Allowed Values</h4>\n<ul>\n    <li><code>'all'</code> &mdash; Ether adds a click event handler to the <code>body</code> tag and catches bubbling click events.</li>\n    <li><code>'outlets'</code> &mdash; Ether adds click event handlers to all outlets you define throughout your application. Any link outside of these outlets will not have its click event handled.</li>\n    <li><code>function all(event, promise) { }</code> &mdash; Same as <code>'all'</code>, but Ether calls the function after kicking off navigation. The function <strong>must</strong> have the name <code>all</code> so that Ether knows all links on the page should be handled.</li>\n    <li><code>function outlets(event, promise) { }</code> &mdash; Same as <code>'outlets'</code>, but Ether calls the function after kicking off navigation. The function <strong>must</strong> have the name <code>outlets</code> so that Ether knows only links within outlets should be handled.</li>\n</ul>\n<h4>Function arguments</h4>\n<ol>\n    <li><code>event</code> &mdash; The click event object.</li>\n    <li><code>promise</code> &mdash; The navigation promise: resolves if navigation succeeds and rejects if no route was found for the URL in the link's href attribute (404).</li>\n</ol>\n\n<h3><code>basePath</code></h3>\n<p>Defines the url prefix the Ether app is mounted on. Defaults to <code>/</code>. Only URLs that contain this prefix will be handled by the above event handlers. If you perform manual navigation with the <code>navigate()</code> method and the <code>history</code> option is enabled, the <code>basePath</code> will be prepended to the navigation URL when Ether performs a <code>pushState</code>.</p>\n\n<h3><code>outlets</code></h3>\n<p>A hash of Outlets or MutableOutlets. These are passed to the RootApp instance's <code>createOutlets()</code> method.</p>\n\n<h3><code>stripTrailingSlash</code></h3>\n<p>Ensures that any URL passed into <code>navigate()</code> has its trailing slash removed (if one exists) before Ether begins searching for a route for the URL. All hrefs returned by the <code>linkTo()</code> method will not have a trailing slash.</p>\n\n<h3><code>addTrailingSlash</code></h3>\n<p>Ensures that any URL passed into <code>navigate()</code> has a trailing slash appended (if one doesn't already exist) before Ether begins searching for a route for the URL. All hrefs returned by the <code>linkTo()</code> method will have a trailing slash.</p>\n\n\n<h2>Methods</h2>\n\n<h3><code>start()</code></h3>\n<p>Attaches all event handlers configured in the options hash of <code>RootApp.create()</code>.</p>\n\n\n<h2>Properties</h2>\n\n<h3><code>fullUrl</code></h3>\n<p>The last URL passed into <code>navigate()</code> that resulted in a successful navigation.</p>\n    ";
    }

    var RootAppRoute = function (_ScrollRoute) {
        babelHelpers.inherits(RootAppRoute, _ScrollRoute);

        function RootAppRoute() {
            babelHelpers.classCallCheck(this, RootAppRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RootAppRoute).apply(this, arguments));
        }

        babelHelpers.createClass(RootAppRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.rootapp'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['rootapp'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.rootapp.innerHTML = rootappTemplate();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(RootAppRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return RootAppRoute;
    }(utils.ScrollRoute);

    function template$1 () {
        return "\n<h1>App</h1>\n<p>All methods and properties on <code>App</code> are shared with <code>RootApp</code> and <code>Route</code>. Please see the section Shared Methods and Properties for details.</p>\n\n<h2>Constructor</h2>\n<p>Apps are not meant to be constructed directly. They're constructed indirectly by using them in the <code>RootApp/App</code> methods <code>mount()</code> and <code>mountConditionals()</code>.</p>\n    ";
    }

    var AppRoute = function (_ScrollRoute) {
        babelHelpers.inherits(AppRoute, _ScrollRoute);

        function AppRoute() {
            babelHelpers.classCallCheck(this, AppRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AppRoute).apply(this, arguments));
        }

        babelHelpers.createClass(AppRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.app'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['app'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.app.innerHTML = template$1();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(AppRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return AppRoute;
    }(utils.ScrollRoute);

    function template$2 () {
        return "\n<h1>Route</h1>\n<p>All methods and properties on <code>Route</code> are shared with <code>RootApp</code> and <code>App</code>. Please see the section Shared Methods and Properties for details.</p>\n\n<h2>Constructor</h2>\n<p>Routes are not meant to be constructed directly. They're constructed indirectly by using them in the <code>RootApp/App</code> methods <code>mount()</code> and <code>mountConditionals()</code>.</p>\n    ";
    }

    var RouteRoute = function (_ScrollRoute) {
        babelHelpers.inherits(RouteRoute, _ScrollRoute);

        function RouteRoute() {
            babelHelpers.classCallCheck(this, RouteRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RouteRoute).apply(this, arguments));
        }

        babelHelpers.createClass(RouteRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.route'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['route'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.route.innerHTML = template$2();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(RouteRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return RouteRoute;
    }(utils.ScrollRoute);

    function template$3 () {
        return "\n<h1>Outlet</h1>\n<p>An Outlet's purpose is to wrap a DOM element and proxy access to it and to select methods and properties.</p>\n\n<h2>Constructor</h2>\n<p><code>new Outlet(element)</code> &mdash; Takes a DOM element and stores it internally.</p>\n\n\n<h2>Instance Methods</h2>\n<p>These are all proxies for the DOM element's own methods.</p>\n<ul>\n    <li><code>appendChild()</code></li>\n    <li><code>removeChild()</code></li>\n    <li><code>querySelector()</code></li>\n    <li><code>querySelectorAll()</code></li>\n</ul>\n\n\n<h2>Properties</h2>\n<p>These are all proxies for the DOM element's own properties.</p>\n<ul>\n    <li><code>innerHTML</code> &mdash; Allows getting the element's innerHTML, but not setting it.</li>\n</ul>\n    ";
    }

    var OutletRoute = function (_ScrollRoute) {
        babelHelpers.inherits(OutletRoute, _ScrollRoute);

        function OutletRoute() {
            babelHelpers.classCallCheck(this, OutletRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(OutletRoute).apply(this, arguments));
        }

        babelHelpers.createClass(OutletRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.outlet'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['outlet'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.outlet.innerHTML = template$3();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(OutletRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return OutletRoute;
    }(utils.ScrollRoute);

    function template$4 () {
        return "\n<h1>MutableOutlet</h1>\n<p>A MutableOutlet's purpose is to wrap a DOM element and proxy access to it and to select methods and properties. It also allows direct access to the element itself, and the ability to wrap a different element instead.</p>\n\n<h2>Constructor</h2>\n<p><code>new MutableOutlet(element)</code> &mdash; Takes a DOM element and stores it internally.</p>\n\n\n<h2>Instance Methods</h2>\n<p>All instance methods are the same as in the <code>Outlet</code> class.</p>\n\n\n<h2>Properties</h2>\n<ul>\n    <li><code>el</code> &mdash; Allows getting or setting the wrapped DOM element.</li>\n    <li><code>innerHTML</code> &mdash; Allows getting or setting the element's innerHTML.</li>\n</ul>\n    ";
    }

    var MutableOutletRoute = function (_ScrollRoute) {
        babelHelpers.inherits(MutableOutletRoute, _ScrollRoute);

        function MutableOutletRoute() {
            babelHelpers.classCallCheck(this, MutableOutletRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MutableOutletRoute).apply(this, arguments));
        }

        babelHelpers.createClass(MutableOutletRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.mutableoutlet'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['mutableoutlet'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.mutableoutlet.innerHTML = template$4();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(MutableOutletRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return MutableOutletRoute;
    }(utils.ScrollRoute);

    var _templateObject$11 = babelHelpers.taggedTemplateLiteral(['\nclass MyRootApp {\n    // ...\n    mount() {\n        return {\n            \'\': RootRoute.addresses(\'root\'),\n            \'about\': AboutRoute.addresses(\'about\'),\n            \'user/{user_id=\\\\d+}\': UserApp.addresses(\'user\'),\n            \'todo/{todo_id=\\\\d+}\': TodoApp.addresses(\'todo\'),\n        };\n    }\n}\nclass UserApp {\n    // ...\n    mount() {\n        return {\n            \'\': UserRootRoute,\n            \'profile\': UserProfileRoute,\n        };\n    }\n}\nclass TodoApp {\n    // ...\n    mount() {\n        return {\n            \'{action=\\\\w+}\': TodoActionRoute,\n        };\n    }\n}\n    '], ['\nclass MyRootApp {\n    // ...\n    mount() {\n        return {\n            \'\': RootRoute.addresses(\'root\'),\n            \'about\': AboutRoute.addresses(\'about\'),\n            \'user/{user_id=\\\\\\\\d+}\': UserApp.addresses(\'user\'),\n            \'todo/{todo_id=\\\\\\\\d+}\': TodoApp.addresses(\'todo\'),\n        };\n    }\n}\nclass UserApp {\n    // ...\n    mount() {\n        return {\n            \'\': UserRootRoute,\n            \'profile\': UserProfileRoute,\n        };\n    }\n}\nclass TodoApp {\n    // ...\n    mount() {\n        return {\n            \'{action=\\\\\\\\w+}\': TodoActionRoute,\n        };\n    }\n}\n    ']);

    function mountExample$1() {
        return utils.escapeHTML(_templateObject$11);
    }

    var _templateObject$12 = babelHelpers.taggedTemplateLiteral(['\nclass MyRootApp {\n    // ...\n    mountConditionals() {\n        return {\n            \'*\': NotificationsWidgetRoute.addresses(\'notify\'),\n            \'+user\': UserWidgetRoute,\n            \'!user,todo\': [\n                StaticWidgetRoute,\n                StaticWidgetRoute,\n            ],\n        };\n    }\n}\n    '], ['\nclass MyRootApp {\n    // ...\n    mountConditionals() {\n        return {\n            \'*\': NotificationsWidgetRoute.addresses(\'notify\'),\n            \'+user\': UserWidgetRoute,\n            \'!user,todo\': [\n                StaticWidgetRoute,\n                StaticWidgetRoute,\n            ],\n        };\n    }\n}\n    ']);

    function conditionalMountExample() {
        return utils.escapeHTML(_templateObject$12);
    }

    var _templateObject$13 = babelHelpers.taggedTemplateLiteral(['\nclass TodoActionRoute extends Route {\n    // ...\n    expectedParams() {\n        return [\'todo_id\', \'action\'];\n    }\n}\n    '], ['\nclass TodoActionRoute extends Route {\n    // ...\n    expectedParams() {\n        return [\'todo_id\', \'action\'];\n    }\n}\n    ']);

    function todoActionRoute() {
        return utils.escapeHTML(_templateObject$13);
    }

    var _templateObject$14 = babelHelpers.taggedTemplateLiteral(['\n// params\n{\n    todo_id: "1",\n    action: "detail"\n}\n// queryParams\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diffs\n{\n    params: {\n        todo_id: [undefined, "1"],\n        action: [undefined, "detail"]\n    },\n    queryParams: {\n        color: [undefined, "red"],\n        bold: [undefined, "true"],\n        font_size: [undefined, "16"]\n    }\n}\n    '], ['\n// params\n{\n    todo_id: "1",\n    action: "detail"\n}\n// queryParams\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diffs\n{\n    params: {\n        todo_id: [undefined, "1"],\n        action: [undefined, "detail"]\n    },\n    queryParams: {\n        color: [undefined, "red"],\n        bold: [undefined, "true"],\n        font_size: [undefined, "16"]\n    }\n}\n    ']);
    var _templateObject2$4 = babelHelpers.taggedTemplateLiteral(['\n// params - todo_id has changed\n{\n    todo_id: "2",\n    action: "detail"\n}\n// queryParams - same as before\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diffs\n// - contains the differences vs. the last call\n// - a param is not included if no difference\n// - a base property is null is none of its params differed (like queryParams here)\n// - the entire diffs argument is null if neither base property had any differences\n{\n    params: {\n        todo_id: ["1", "2"]\n        // "action" omitted since there was no difference from the last call\n    },\n    // no difference in any of the queryParams compared to the last call\n    queryParams: null\n}\n    '], ['\n// params - todo_id has changed\n{\n    todo_id: "2",\n    action: "detail"\n}\n// queryParams - same as before\n{\n    color: "red",\n    bold: "true",\n    font_size: "16"\n}\n// diffs\n// - contains the differences vs. the last call\n// - a param is not included if no difference\n// - a base property is null is none of its params differed (like queryParams here)\n// - the entire diffs argument is null if neither base property had any differences\n{\n    params: {\n        todo_id: ["1", "2"]\n        // "action" omitted since there was no difference from the last call\n    },\n    // no difference in any of the queryParams compared to the last call\n    queryParams: null\n}\n    ']);
    function paramsExample1$1() {
        return utils.escapeHTML(_templateObject$14);
    }

    function paramsExample2$1() {
        return utils.escapeHTML(_templateObject2$4);
    }

    var _templateObject$15 = babelHelpers.taggedTemplateLiteral(['\n// this.state during the render() call\n// on a class not currently already rendered\n{\n    deactivating: false,\n    deactivated:  false,\n    prerendering: false,\n    prerendered:  false,\n    rendering:    true, // "ether-rendering" CSS class is applied to all outlets\n    rendered:     false\n}\n    '], ['\n// this.state during the render() call\n// on a class not currently already rendered\n{\n    deactivating: false,\n    deactivated:  false,\n    prerendering: false,\n    prerendered:  false,\n    rendering:    true, // "ether-rendering" CSS class is applied to all outlets\n    rendered:     false\n}\n    ']);

    function stateExample$1() {
        return utils.escapeHTML(_templateObject$15);
    }

    function sharedMethodsTemplate(ctx) {
        return '\n<h1>Shared Methods and Properties</h1>\n<p>Ether has three major classes that have been designed to have very similar APIs, which makes Ether easier to learn, and code using Ether easier to read.</p>\n\n<h2>Shared between RootApp and App</h2>\n\n\n<h3>Overridable Methods</h3>\n\n<h4><code>createOutlets()</code></h4>\n<p>Outlets provide a strategy for managing the DOM. The idea is that an outlet is owned by a single App or Route, and wraps a DOM element that survives inside the DOM for the life of the application. Ether\'s <code>Outlet</code> class restricts access to the wrapped DOM element and its methods, but exposes methods to find, add, or remove child elements within it. Since an outlet\'s wrapped element can be made to be an ancestor to the DOM element of another outlet, it\'s important to prevent actions like clearing the outlet\'s HTML, which may accidentally remove a child outlet from the DOM. If you want more control, you can use Ether\'s <code>MutableOutlet</code> class which gives direct access to the element through its <code>el</code> property.</p>\n<p>The <code>outlets</code> argument received in <code>createOutlets()</code> is the same object that was passed into <code>RootApp.create(opts)</code> (in <code>opts.outlets</code>) for the RootApp, or those outlets defined by static method <code>outlets()</code> (described below) for an App. Whatever object is returned by <code>createOutlets()</code> will be set to <code>this.outlets</code>.</p>\n\n<h4><code>mount()</code></h4>\n<p>The object returned from this method will be used to construct the classes handling URL navigation. Each key of the object should be a string you want matched against the URL in the address bar when the user navigates to a page or clicks a link. Each value of the object should be a subclass of App or Route. By choosing to use an App subclass and only specifying for its key a portion of the URL you want to match against, you allow the rest of the URL (the unmatched tail portion) to be matched against the mounts inside that App subclass. The final tail portion of a URL should be mounted on a Route subclass for navigation at that URL to succeed.</p>\n<p>Here\'s an example:</p>\n<pre><code class="hljs js">' + mountExample$1() + '</code></pre>\n<p>For this mount configuration, these are the classes that would be rendered if the user navigated to various URLs:</p>\n<ul>\n    <li><code>/</code> &mdash; MyRootApp <span class="arrow">&#10159;</span> RootRoute</li>\n    <li><code>/about</code> &mdash; MyRootApp <span class="arrow">&#10159;</span> AboutRoute</li>\n    <li><code>/user/1</code> &mdash; MyRootApp <span class="arrow">&#10159;</span> UserApp <span class="arrow">&#10159;</span> UserRootRoute; params: {user_id: 1}</li>\n    <li><code>/user/1/profile</code> &mdash; MyRootApp <span class="arrow">&#10159;</span> UserApp <span class="arrow">&#10159;</span> UserProfileRoute; params: {user_id: 1}</li>\n    <li><code>/todo/1/details</code> &mdash; MyRootApp <span class="arrow">&#10159;</span> TodoApp <span class="arrow">&#10159;</span> TodoActionRoute; params: {todo_id: 1, action: \'details\'}</li>\n    <li><code>/todo/1</code> &mdash; Navigation fails: no Route subclass mounted on <code>\'\'</code> in TodoApp; no change to URL nor any previously-rendered mounts</li>\n</ul>\n\n<h4><code>mountConditionals()</code></h4>\n<p>Ether has the unique idea of <em>conditional</em> mounts which are mounts that will be rendered if certain conditions are met. Conditional mounts must be a Route subclass or an array of Route subclasses. Instead of URL paths, there are three logic operators: <code>*</code>, <code>+</code>, and <code>!</code>.</p>\n<dl>\n    <dt><code>*</code></dt>\n    <dd>The route(s) will be rendered if any of the mounts in the <code>mounts()</code> method is rendered.</dd>\n    <dt><code>+</code></dt>\n    <dd>Takes a comma-separated list of addresses, such as <code>+root,user</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> was registered with any of the listed addresses.</dd>\n    <dt><code>!</code></dt>\n    <dd>Takes a comma-separated list of addresses, such as <code>!root</code>. The route(s) will be rendered if the mount rendered in <code>mounts()</code> <strong>does not match any</strong> of the addresses listed.</dd>\n</dl>\n<p>Here\'s an example using the same <code>MyRootApp</code> above:</p>\n<pre><code class="hljs js">' + conditionalMountExample() + '</code></pre>\n<p>For this conditional mount configuration, these are the conditional mounts that would be rendered if the user navigated to various URLs:</p>\n<ul>\n    <li><code>/</code> &mdash; NotificationsWidgetRoute; both StaticWidgetRoutes</li>\n    <li><code>/about</code> &mdash; NotificationsWidgetRoute; both StaticWidgetRoutes</li>\n    <li><code>/user/1</code> &mdash; NotificationsWidgetRoute; UserWidgetRoute, params: {user_id: 1}</li>\n    <li><code>/user/1/profile</code> &mdash; NotificationsWidgetRoute; UserWidgetRoute, params: {user_id: 1}</li>\n    <li><code>/todo/1/details</code> &mdash; NotificationsWidgetRoute</li>\n    <li><code>/todo/1</code> &mdash; Navigation fails; no change to URL nor any previously-rendered conditional mounts</li>\n</ul>\n<p>When navigation succeeds, any previously-rendered conditional mounts (as a result of a prior navigation success) that are not in the list will have their <code>deactivate()</code> method called.</p>\n\n\n<h2>Shared between RootApp, App, and Route</h2>\n\n\n<h3>Static Methods</h3>\n\n<p>These methods are only meant to be used in <code>mount()</code> or <code>mountConditionals()</code> as in the examples above, or before instantiating your RootApp subclass with <code>create()</code>. They\'re all chainable.</p>\n<p>Substitute <i>class</i> in your mind with any class or subclass of <code>RootApp</code>, <code>App</code>, or <code>Route</code>.</p>\n\n<h4><code><i>class</i>.addresses(address...)</code></h4>\n<p>When an instance of <i>class</i> is instantiated, it will be registered as each address passed in, so that a <code>sendTo(<i>address</i>, data...)</code> call from any class in your Ether app will pass data to it. The addresses should match the list of addresses returned from <i>class</i>\'s <code>expectedAddresses()</code> method.</p>\n<h4><code><i>class</i>.outlets(outletName...)</code></h4>\n<p>When an instance of <i>class</i> is instantiated, it will be passed each outlet named here from <code>createOutlets()</code>, so that the <code>this.outlets</code> object will contain each outlet by the same name. The outlet names should match the list of outlet names, in no particular order, returned from <i>class</i>\'s <code>expectedOutlets()</code> method, and the App <i>class</i> is mounted on should have returned an object from <code>createOutlets()</code> with these named outlets inside. The mounting class instance will lose ownership of the outlets, meaning it won\'t have the outlets available on <code>this.outlets</code> within its methods, but the <i>class</i> instance will.</p>\n<h4><code><i>class</i>.setup(fn...)</code></h4>\n<p>Each function will be called in order when the <i>class</i> instance is created. The return value of the first function will be passed in as the only argument to the second function and so on. The return value of the last function will be passed into the <i>class</i> instance\'s overridable <code>expectedSetup()</code> method for custom assertion testing, then to the <i>class</i> instance\'s <code>init()</code> method as the first argument.</p>\n\n\n<h3>Overridable Methods</h3>\n\n<h4><code>init()</code></h4>\n<p>Any initialization code goes here. Called after RootApp construction, before any rendering, URL matching, or event handling occurs. The return value of the last function from static method <code>setup()</code> when the class was mounted, if any, will be passed in as the first argument. All outlets are available on <code>this.outlets</code>.</p>\n\n<h4>The <code>expected*()</code> Methods</h4>\n<p>Together, these methods act not only as protection from configuration mistakes, <strong>but also as documentation</strong>. At a glance, you\'ll know exactly which addresses an App or Route goes by and which outlets, URL parameters, and setup values are available inside its member functions.</p>\n\n<h5><code>expectedAddresses()</code></h5>\n<p>The array of strings returned must match, in no particular order, the addresses passed in from static method <code>addresses()</code>. These are the addresses the class responds to whenever the <code>sendTo(address, data...)</code> method is called elsewhere in the Ether app.</p>\n<h5><code>expectedOutlets()</code></h5>\n<p>The array of strings returned must match, in no particular order, the names passed in from static method <code>outlets()</code>. Guarantees those named outlets will be available on <code>this.outlets</code>.</p>\n<h5><code>expectedSetup()</code></h5>\n<p>Provides an opportunity to check the value passed in from static method <code>setup()</code> and throw an error if it isn\'t what the class needs to work properly, before the value is passed to <code>init()</code>.</p>\n<h5><code>expectedParams()</code></h5>\n<p>As mounts are matched against a URL, each param is parsed and accumulated. This method allows you to return an array of parameter names from this collection whose values you would like available in the <code>prerender()</code> and <code>render()</code> methods. Ether will throw a helpful error if you list parameter names that don\'t exist on the URL accumulated up to that mount point.</p>\n\n<h4><code>addressesHandlers()</code></h4>\n<p>If <code>expectedAddresses()</code> returns a list of addresses your class goes by, <code>addressesHandlers()</code> returns a list of functions that are called when their respective addresses are sent data from elsewhere in the application with the <code>sendTo(address, data...)</code> method. Each value in the returned array can be a string referencing a method on the class, or an actual function.</p>\n<p>Note that this method may be called multiple times, so avoid placing self-executing functions or logic that has side-effects into it.</p>\n<p>It may seem strange to decouple the address names and their handler functions into two methods, but there\'s a good reason: it makes class reuse easier. Subclasses can override expectedAddresses() while leaving addressesHandlers() untouched.</p>\n\n<h4>The Render Cycle Methods</h4>\n<ul>\n    <li><code>prerender(params, queryParams, diffs)</code></li>\n    <li><code>deactivate()</code></li>\n    <li><code>render(params, queryParams, diffs)</code></li>\n</ul>\n\n<p>When the user navigates to a new URL, if a class is part of the navigation path, it will have its <code>prerender()</code> and <code>render()</code> methods called in order. If a class was previously rendered but is not part of the navigation path, it will have its <code>deactivate()</code> method called. <a href="' + ctx.hrefs.renderCycleGuide + '">Learn more about how the render cycle works</a>.</p>\n\n<p><code>prerender()</code> and <code>render()</code> are called with the following arguments (all objects):</p>\n<ol>\n    <li><code>params</code> &mdash; The params parsed from the URL and also listed in <code>expectedParams()</code>. Null if there were no params to be parsed from the URL, or if <code>expectedParams()</code> returns an empty array.</li>\n    <li><code>queryParams</code> &mdash; The query params parsed from the URL. Null if there were no query params.</li>\n    <li><code>diffs</code> &mdash; The difference between the params and queryParams parsed from the current URL vs. the URL that last rendered the class. If there was no difference, the value will be null.</li>\n</ol>\n\n<p>For example, here is the definition for <code>TodoActionRoute</code> and the params it receives on navigating to the following URLs in order:</p>\n<pre><code class="hljs js">' + todoActionRoute() + '</code></pre>\n<ol>\n    <li>\n        <code>/todo/1/detail?color=red&amp;bold=true&amp;font_size=16</code> (first ever navigation to <code>TodoActionRoute</code>)\n        <pre><code class="hljs js">' + paramsExample1$1() + '</code></pre>\n    </li>\n    <li>\n        <code>/todo/2/detail?color=red&amp;bold=true&amp;font_size=16</code> (second navigation to <code>TodoActionRoute</code>)\n        <pre><code class="hljs js">' + paramsExample2$1() + '</code></pre>\n    </li>\n</ol>\n<p>If the user then navigates somewhere else then back to the same URL, the params and queryParams arguments will be the same, but the diffs argument will be null since neither the params nor queryParams changed compared to the URL when the <code>TodoActionRoute</code> was last rendered.</p>\n<p>As an aside, navigating to the same URL twice in a row is a noop in Ether&mdash;no render cycle methods would be called on any class in that case.</p>\n<p>Note that <code>TodoApp</code> would not have the <code>action</code> param available to it in its render methods, because at that URL-matching step during navigation it would not yet have been parsed. The same is true for <code>MyRootApp</code> which has neither the <code>action</code> param nor <code>todo_id</code> param available to its render methods.</p>\n\n\n<h3>Instance Methods</h3>\n\n<h4><code>navigate(path, opts)</code></h4>\n<p>The <code>path</code> argument is a URL path you want to route to within the app (not including the basePath), such as <code>/todo/1/detail</code>. The second is an optional object with one of two boolean properties: <code>pushState</code> or <code>replaceState</code>. The default is <code>pushState: true</code> but it has no effect if you\'re not using HTML5 History.</p>\n\n<h4><code>canNavigateTo(path)</code></h4>\n<p>The <code>path</code> argument is a URL path you want to route to within the app (not including the basePath), such as <code>/todo/1/detail</code>. Returns true if passing that path into <code>navigate</code> would result in a successful navigation, and false otherwise.</p>\n\n<h4><code>linkTo(address, model, opts)</code></h4>\n<p>When you use <code>linkTo()</code>, what you\'re saying is, "I want an href I can use in a link or that I can pass to a direct call to <code>navigate()</code>."</p>\n<p>The params you can pass in are:</p>\n<ol>\n    <li><code>address</code> &mdash; The address of the route you want to create an href for.</li>\n    <li><code>model</code> &mdash; A plain object whose keys match the param names required by the full URL path the route is mounted on. Its values will be substituted into their proper places in the URL. If the URL requires no params, you can leave out this argument entirely. You can also pass a more complicated object if you supply a transformer function into <code>opts</code>.</li>\n    <li>\n        <code>opts</code> (optional)\n        <ul>\n            <li><code>basePath</code> &mdash; Whether to prepend the basePath to the href. Default is <code>true</code>.</li>\n        <li><code>transformer</code> (<code>function(paramName, model) { }</code>) &mdash; A function called with each param name required by the full URL the route is mounted on, as well as the <code>model</code> argument itself. Should return the value to be substituted into the proper place in the URL for the param name.</li>\n        </ul>\n    </li>\n</ol>\n\n<h4><code>sendTo(address, data...)</code></h4>\n<p>When this method is called, the proper handler (from <code>addressesHandlers()</code>) on the class at <code>address</code> will be called with all data arguments applied.</p>\n\n<h3>Properties</h3>\n<h4><code>this.outlets</code></h4>\n<p>An object with the outlets named in <code>expectedOutlets()</code>.</p>\n<h4><code>this.state</code></h4>\n<p>Ether updates this object at all phases of the render cycle. <a href="' + ctx.hrefs.renderCycleGuide + '">Learn more about how the render cycle works</a>.</p>\n<p>There are six properties in all:</p>\n<dl>\n    <dt><code>deactivating</code></dt>\n    <dd>Set before <code>deactivate()</code> execution and unset when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n    <dt><code>deactivated</code></dt>\n    <dd>Set after <code>deactivate()</code> execution completes, or if a Promise was returned, when the promise resolves. Unset when <code>prerendering</code> is set.</dd>\n    <dt><code>prerendering</code></dt>\n    <dd>Set before <code>prerender()</code> execution and unset when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n    <dt><code>prerendered</code></dt>\n    <dd>Set after <code>prerender()</code> execution completes, or if a Promise was returned, when the promise resolves. Unset when <code>rendering</code> is set.</dd>\n    <dt><code>rendering</code></dt>\n    <dd>Set before <code>render()</code> execution and unset when execution completes, or if a Promise was returned, when the promise resolves.</dd>\n    <dt><code>rendered</code></dt>\n    <dd>Set after <code>render()</code> execution completes, or if a Promise was returned, when the promise resolves. Unset when <code>deactivating</code> is set.</dd>\n</dl>\n<p>Note that if the class is currently rendered and the user navigates to a different URL where the class remains a mount or conditional mount, or the user navigates to the same path but with different params or query params (e.g. <code>/todo/1/detail</code> then <code>/todo/2/detail</code>), the <code>rendered</code> property will continue to be set while the <code>prerendering/prerendered/rendering</code> properties are cycled through. If the class is currently rendered and the user navigates to a URL where the class is <em>not</em> a mount or conditional mount, deactivation occurs and <code>deactivating</code> is set as <code>rendered</code> is unset.</p>\n<p>Ether applies state not only to this object, but also to the CSS classes of all outlets on <code>this.outlets</code> as the name of the state prefixed with <code>ether-</code> (e.g. <code>ether-rendered</code>). At any time you can inspect <code>this.state</code> and know what states apply to your class and its outlets. Here\'s en example of <code>this.state</code> for a class currently executing the <code>render()</code> method:</p>\n<pre><code class="hljs js">' + stateExample$1() + '</code></pre>\n    ';
    }

    var SharedRoute = function (_ScrollRoute) {
        babelHelpers.inherits(SharedRoute, _ScrollRoute);

        function SharedRoute() {
            babelHelpers.classCallCheck(this, SharedRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SharedRoute).apply(this, arguments));
        }

        babelHelpers.createClass(SharedRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs.shared'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['shared'];
            }
        }, {
            key: 'addHighlightedClass',
            value: function addHighlightedClass(outlet) {
                outlet.el.classList.add('highlighted');
            }
        }, {
            key: 'init',
            value: function init() {
                var _this2 = this;

                var hrefs = {
                    'renderCycleGuide': this.linkTo(':guides.rendercycle')
                };
                var outlet = this.outlets.shared;
                outlet.innerHTML = sharedMethodsTemplate({ hrefs: hrefs });
                if (window.Worker) {
                    this.highlighted = utils.highlightCode(outlet).then(function () {
                        _this2.addHighlightedClass(outlet);
                    });
                } else {
                    this.highlighted = null;
                    this.addHighlightedClass(outlet);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(SharedRoute.prototype), 'render', this).call(this);
                this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
                return this.highlighted;
            }
        }]);
        return SharedRoute;
    }(utils.ScrollRoute);

    function addSidebarLinksData$1() {
        return [{
            text: 'Overview',
            address: ':docs.index'
        }, {
            text: 'RootApp',
            address: ':docs.rootapp'
        }, {
            text: 'App',
            address: ':docs.app'
        }, {
            text: 'Route',
            address: ':docs.route'
        }, {
            text: 'Outlet',
            address: ':docs.outlet'
        }, {
            text: 'MutableOutlet',
            address: ':docs.mutableoutlet'
        }, {
            text: 'Shared Methods and Properties',
            address: ':docs.shared'
        }];
    }

    var DocsApp = function (_App) {
        babelHelpers.inherits(DocsApp, _App);

        function DocsApp() {
            babelHelpers.classCallCheck(this, DocsApp);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DocsApp).apply(this, arguments));
        }

        babelHelpers.createClass(DocsApp, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':docs'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['docs'];
            }
        }, {
            key: 'createOutlets',
            value: function createOutlets(outlets) {
                outlets.docs = ether.makeOutlet({
                    el: outlets.docs.el,
                    append: [outlets.sidebar = ether.makeOutlet({
                        tagName: 'nav',
                        classNames: ['docs-nav'],
                        mutable: true
                    }), outlets.index = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.rootapp = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.app = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.route = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.outlet = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.mutableoutlet = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article'],
                        mutable: true
                    }), outlets.shared = ether.makeOutlet({
                        tagName: 'article',
                        classNames: ['docs-article', 'docs-shared-methods'],
                        mutable: true
                    })]
                });
                return outlets;
            }
        }, {
            key: 'mount',
            value: function mount() {
                return {
                    '': IndexRoute$1.addresses(':docs.index').outlets('index'),
                    'root-app': RootAppRoute.addresses(':docs.rootapp').outlets('rootapp'),
                    'app': AppRoute.addresses(':docs.app').outlets('app'),
                    'route': RouteRoute.addresses(':docs.route').outlets('route'),
                    'outlet': OutletRoute.addresses(':docs.outlet').outlets('outlet'),
                    'mutable-outlet': MutableOutletRoute.addresses(':docs.mutableoutlet').outlets('mutableoutlet'),
                    'shared-methods-and-properties': SharedRoute.addresses(':docs.shared').outlets('shared')
                };
            }
        }, {
            key: 'mountConditionals',
            value: function mountConditionals() {
                return {
                    '*': SidebarRoute$1.addresses(':docs.sidebar').outlets('sidebar').setup(addSidebarLinksData$1)
                };
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(DocsApp.prototype), 'render', this).call(this);
                this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return DocsApp;
    }(ether.App);

    function indexTemplate() {
        return "\n        <section class=\"intro\">\n            <section class=\"container\">\n                <p class=\"lead tagline\">Ether is a minimalistic framework<br>for creating modular, composable apps.</p>\n                <div class=\"lead download-links\">\n                    <a class=\"btn download-btn-start\" href=\"https://github.com/darvelo/ether\">Download Ether</a>\n                    <div class=\"download-choices\">\n                        <a class=\"btn download-btn-option\" href=\"https://github.com/darvelo/ether/releases/download/v1.0.0/ether.es6.js\">ES6</a>\n                        <a class=\"btn download-btn-option\" href=\"https://github.com/darvelo/ether/releases/download/v1.0.0/ether.amd.js\">AMD</a>\n                        <a class=\"btn download-btn-option\" href=\"https://github.com/darvelo/ether/releases/download/v1.0.0/ether.cjs.js\">CommonJS</a>\n                        <a class=\"btn download-btn-option\" href=\"https://github.com/darvelo/ether/releases/download/v1.0.0/ether.global.js\">Global</a>\n                    </div>\n                </div>\n            </section>\n        </section>\n        <section class=\"features\">\n            <section class=\"container\">\n                <h1>Features</h1>\n                <blockquote>Ether: An omnipresent, completely passive medium for the propagation of magnetic waves. <span class=\"attribution\">&mdash;Robert Metcalfe</span></blockquote>\n                <div class=\"feature-list\">\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-fire\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Minimalistic <em>and</em> Powerful</h2>\n                            <p>Ether is slightly over 12K minified and gzipped. There are <strong>only three major components to learn</strong>, designed to have similar APIs to reduce the learning curve.</p>\n                        </div>\n                    </div>\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-cubes\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Library Agnostic</h2>\n                            <p>Choose your favorite templating engine, AJAX, or DOM libraries. Ether provides a thin layer above the DOM so you can comfortably choose how to assemble your app.</p>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"feature-list\">\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-plug\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Composable, Pluggable Apps</h2>\n                            <p>Build your app as a set of pluggable components you can use again and again. Apps in their own right.</p>\n                        </div>\n                    </div>\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-sitemap\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Routing and Addressing</h2>\n                            <p>Powerful regex-based declarative routing. Addresses allow all parts of your app to link to and communicate with each other at any time.</p>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"feature-list\">\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-refresh\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Asynchronous Render Cycle</h2>\n                            <p>Transition between routes using Promises to run AJAX requests or animations. Use optional CSS hooks to control the look and feel of transitions with or without JavaScript. The sky's the limit.</p>\n                        </div>\n                    </div>\n                    <div class=\"feature\">\n                        <div class=\"feature-icon\">\n                            <i class=\"fa fa-support\"></i>\n                        </div>\n                        <div class=\"feature-description\">\n                            <h2 class=\"feature-title\">Immediate and Descriptive Errors</h2>\n                            <p>Made a mistake setting up your app? No problem. Ether will let you know where the issue is right when the app starts. Use debug mode for even more insight.</p>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"github-cta\">\n                    <p>Ether is open source software.</p>\n                    <a class=\"btn btn-inverted github-btn\" href=\"https://github.com/darvelo/ether\">View on GitHub</a>\n                </div>\n            </section>\n        </section>\n    ";
    }

    var DownloadView = function (_View) {
        babelHelpers.inherits(DownloadView, _View);

        function DownloadView() {
            babelHelpers.classCallCheck(this, DownloadView);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DownloadView).apply(this, arguments));
        }

        babelHelpers.createClass(DownloadView, [{
            key: 'init',
            value: function init(element) {
                this.element = element;
                this.DOMListen(this.element, 'click', 'click');
            }
        }, {
            key: 'reset',
            value: function reset() {
                this.element.classList.remove('active');
            }
        }, {
            key: 'click',
            value: function click(event) {
                if (event.target.classList.contains('download-btn-start')) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.element.classList.add('active');
                }
            }
        }]);
        return DownloadView;
    }(ether.View);

    var IndexRoute$2 = function (_ScrollRoute) {
        babelHelpers.inherits(IndexRoute, _ScrollRoute);

        function IndexRoute() {
            babelHelpers.classCallCheck(this, IndexRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(IndexRoute).apply(this, arguments));
        }

        babelHelpers.createClass(IndexRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':.index'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['index'];
            }
        }, {
            key: 'init',
            value: function init() {
                var outlet = this.outlets.index;
                outlet.innerHTML = indexTemplate();
                var downloadArea = outlet.querySelector('.download-links');
                this.downloadView = new DownloadView(downloadArea);
            }
        }, {
            key: 'prerender',
            value: function prerender() {
                this.downloadView.reset();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(IndexRoute.prototype), 'render', this).call(this);
                this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
            }
        }]);
        return IndexRoute;
    }(utils.ScrollRoute);

    function createLinkTemplate$2(linkTo) {
        return function (data) {
            var address = data.address;
            var dest = data.dest;
            var params = data.params;
            var text = data.text;

            var href = linkTo(dest || address, params);
            return '\n            <li data-address="' + address + '">\n                <a href=' + href + '>' + text + '</a>\n            </li>\n        ';
        };
    }

    function navbarTemplate$2(ctx) {
        var linksData = ctx.linksData;
        var linkTo = ctx.linkTo;

        var listItems = linksData.map(createLinkTemplate$2(linkTo)).join('');
        return '\n        <div class="container navbar-container">\n            <a class="navbar-logo" href=\'/\'>Ether</a>\n            <ul class="navbar-list">\n                ' + listItems + '\n            </ul>\n        </div>\n    ';
    }

    var NavBarRoute = function (_Route) {
        babelHelpers.inherits(NavBarRoute, _Route);

        function NavBarRoute() {
            babelHelpers.classCallCheck(this, NavBarRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NavBarRoute).apply(this, arguments));
        }

        babelHelpers.createClass(NavBarRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':.navbar'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return ['receive'];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['navbar'];
            }
        }, {
            key: 'init',
            value: function init(linksData) {
                var ctx = {
                    linksData: linksData,
                    linkTo: this.linkTo.bind(this)
                };
                var outlet = this.outlets.navbar;
                outlet.innerHTML = navbarTemplate$2(ctx);
                this.listItems = Array.prototype.slice.call(outlet.querySelectorAll('li'));
            }
        }, {
            key: 'receive',
            value: function receive(message, data) {
                switch (message) {
                    case 'setActiveLink':
                        this.setActiveLink(data);
                        break;
                    default:
                        break;
                }
            }
        }, {
            key: 'setActiveLink',
            value: function setActiveLink(addresses) {
                if (addresses === null) {
                    addresses = [];
                }
                this.listItems.forEach(function (li) {
                    var liAddr = li.getAttribute('data-address');
                    if (addresses.some(function (addr) {
                        return addr === liAddr;
                    })) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove('active');
                    }
                });
            }
        }]);
        return NavBarRoute;
    }(ether.Route);

    function footerTemplate() {
        return "\n        <div class=\"container\">\n            <p>Designed and built by <a href=\"https://github.com/darvelo\">@darvelo</a> at <a href=\"https://github.com/CodeForAllOfUs\">Code for All of Us</a>. </p>\n            <p>Code licensed <a href=\"https://github.com/darvelo/ether/blob/master/LICENSE.md\">MIT</a>.</p>\n        </div>\n    ";
    }

    var FooterRoute = function (_Route) {
        babelHelpers.inherits(FooterRoute, _Route);

        function FooterRoute() {
            babelHelpers.classCallCheck(this, FooterRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FooterRoute).apply(this, arguments));
        }

        babelHelpers.createClass(FooterRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':.footer'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['footer'];
            }
        }, {
            key: 'init',
            value: function init() {
                this.outlets.footer.innerHTML = footerTemplate();
            }
        }]);
        return FooterRoute;
    }(ether.Route);

    function the404template() {
        return "\n<h1>Sorry, that page doesn't exist.</h1>\n    ";
    }

    var The404Route = function (_ScrollRoute) {
        babelHelpers.inherits(The404Route, _ScrollRoute);

        function The404Route() {
            babelHelpers.classCallCheck(this, The404Route);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(The404Route).apply(this, arguments));
        }

        babelHelpers.createClass(The404Route, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return [':.404'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['the404'];
            }
        }, {
            key: 'init',
            value: function init() {
                var outlet = this.outlets.the404;
                outlet.innerHTML = the404template();
            }
        }, {
            key: 'render',
            value: function render() {
                babelHelpers.get(Object.getPrototypeOf(The404Route.prototype), 'render', this).call(this);
                this.sendTo(':.navbar', 'setActiveLink', null);
            }
        }]);
        return The404Route;
    }(utils.ScrollRoute);

    function navbarLinksData() {
        return [{
            text: 'Home',
            address: ':.index'
        }, {
            text: 'Getting Started',
            address: ':gs',
            dest: ':gs.index'
        }, {
            text: 'Guides',
            address: ':guides',
            dest: ':guides.index'
        }, {
            text: 'Docs',
            address: ':docs',
            dest: ':docs.index'
        }];
    }

    var EtherWebsite = function (_RootApp) {
        babelHelpers.inherits(EtherWebsite, _RootApp);

        function EtherWebsite() {
            babelHelpers.classCallCheck(this, EtherWebsite);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EtherWebsite).apply(this, arguments));
        }

        babelHelpers.createClass(EtherWebsite, [{
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['main'];
            }
        }, {
            key: 'createOutlets',
            value: function createOutlets(outlets) {
                outlets.main = ether.makeOutlet({
                    el: outlets.main.el,
                    classNames: ['main-app'],
                    append: [outlets.navbar = ether.makeOutlet({
                        tagName: 'nav',
                        classNames: ['navbar'],
                        mutable: true
                    }), outlets.index = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['index'],
                        mutable: true
                    }), outlets.gs = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['getting-started'],
                        mutable: true
                    }), outlets.guides = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['guides', 'container'],
                        mutable: true
                    }), outlets.docs = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['docs', 'container'],
                        mutable: true
                    }), outlets.the404 = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['the404', 'container'],
                        mutable: true
                    }), outlets.footer = ether.makeOutlet({
                        tagName: 'footer',
                        classNames: ['main-footer'],
                        mutable: true
                    })]
                });
                return outlets;
            }
        }, {
            key: 'init',
            value: function init() {
                if ('scrollRestoration' in window.history) {
                    window.history.scrollRestoration = 'manual';
                }
            }
        }, {
            key: 'mount',
            value: function mount() {
                return {
                    '': IndexRoute$2.addresses(':.index').outlets('index'),
                    '404': The404Route.addresses(':.404').outlets('the404'),
                    'getting-started': GettingStartedApp.addresses(':gs').outlets('gs'),
                    'guides': GuidesApp.addresses(':guides').outlets('guides'),
                    'docs': DocsApp.addresses(':docs').outlets('docs')
                };
            }
        }, {
            key: 'mountConditionals',
            value: function mountConditionals() {
                return {
                    '*': [NavBarRoute.addresses(':.navbar').outlets('navbar').setup(navbarLinksData), FooterRoute.addresses(':.footer').outlets('footer')]
                };
            }
        }]);
        return EtherWebsite;
    }(ether.RootApp);

    return EtherWebsite;

}(Ether,utils));