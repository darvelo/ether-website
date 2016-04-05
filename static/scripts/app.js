var TwitterRootApp = (function (ether) {
    'use strict';

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

    babelHelpers;

    function navButton(href, title) {
        var div = document.createElement('div');
        div.innerHTML = '<a class="nav-button" href="' + href + '">' + title + '</a>';
        return div.firstChild;
    }

    var el = document.createElement('animationEndNameTest');
    var animationEndEventNames = {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    };
    var animationName = void 0;

    for (var name in animationEndEventNames) {
        if (typeof el.style[name] !== 'undefined') {
            animationName = animationEndEventNames[name];
        }
    }

    function onAnimationEnd(element, callback) {
        var handler = function handler(event) {
            element.removeEventListener(animationName, handler);
            callback(event);
        };
        element.addEventListener(animationName, handler, false);
    }

    var RootRoute = function (_Route) {
        babelHelpers.inherits(RootRoute, _Route);

        function RootRoute() {
            babelHelpers.classCallCheck(this, RootRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RootRoute).apply(this, arguments));
        }

        babelHelpers.createClass(RootRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return ['root'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['root'];
            }
        }, {
            key: 'expectedParams',
            value: function expectedParams() {
                return [];
            }
        }, {
            key: 'expectedSetup',
            value: function expectedSetup(setupVal) {
                var tweets = setupVal.tweets;
                if (!Array.isArray(tweets)) {
                    throw new Error('RootRoute#setup() expected an array of tweets.');
                }
                tweets.forEach(function (item) {
                    if (Array.isArray(item) || (typeof item === 'undefined' ? 'undefined' : babelHelpers.typeof(item)) !== 'object' || typeof item.username !== 'string' || typeof item.tweetId !== 'string') {
                        throw new TypeError('Tweets data was not setup properly.');
                    }
                });
                if (typeof setupVal.address !== 'string') {
                    throw new Error('RootRoute#setup() expected an address to link to with tweet data.');
                }
                if (typeof setupVal.transformer !== 'function') {
                    throw new Error('RootRoute#setup() expected a function to map tweet data to the twitter route params.');
                }
            }

            // initialization code

        }, {
            key: 'init',
            value: function init(setupVal) {
                this.tweets = setupVal.tweets;
                this.transformer = setupVal.transformer;
                this.twitterAddress = setupVal.address;
            }
        }, {
            key: 'template',
            value: function template(model) {
                var opts = {
                    // map the twitter route's param names
                    // to the tweet models' properties
                    transformer: this.transformer
                };
                var href = this.linkTo(this.twitterAddress, model, opts);
                return navButton(href, 'Get a random Tweet!');
            }
        }, {
            key: 'getRandomTweet',
            value: function getRandomTweet() {
                var idx = Math.floor(Math.random() * this.tweets.length);
                return this.tweets[idx];
            }

            // render-cycle functions
            // if there are no params on the path to a route,
            // and there are never any queryParams during the
            // lifecycle of the Ether app, all three arguments
            // in `prerender()` and in `render()` will always be `null`

        }, {
            key: 'prerender',
            value: function prerender(params, queryParams, diffs) {
                var template = this.template(this.getRandomTweet());
                this.outlets.root.appendChild(template);
            }
        }, {
            key: 'deactivate',
            value: function deactivate() {
                var _this2 = this;

                return new Promise(function (resolve) {
                    onAnimationEnd(_this2.outlets.root.el, function () {
                        _this2.outlets.root.innerHTML = '';
                        resolve();
                    });
                });
            }
        }, {
            key: 'render',
            value: function render(params, queryParams, diffs) {}
        }]);
        return RootRoute;
    }(ether.Route);

    function ajax(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                return resolve(xhr.responseText);
            };
            xhr.onerror = function () {
                return reject(xhr);
            };
            xhr.send();
        });
    }

    var TweetView = function (_View) {
        babelHelpers.inherits(TweetView, _View);

        function TweetView() {
            babelHelpers.classCallCheck(this, TweetView);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TweetView).apply(this, arguments));
        }

        babelHelpers.createClass(TweetView, [{
            key: 'init',
            value: function init() {
                this.el = document.createElement('div');
                this.el.className = 'tweet-view';
            }
        }, {
            key: 'generateURL',
            value: function generateURL(params) {
                var twitter_username = params.twitter_username;
                var tweet_id = params.tweet_id;

                return '/twitter_json/' + twitter_username + '/' + tweet_id;
            }
        }, {
            key: 'template',
            value: function template(model) {
                return '<article class="tweet-content">' + model.html + '</article>';
            }
        }, {
            key: 'render',
            value: function render(params) {
                var _this2 = this;

                var url = this.generateURL(params);
                return ajax(url).then(function (data) {
                    _this2.el.innerHTML = _this2.template(JSON.parse(data));
                }, function () {
                    _this2.el.innerHTML = 'There was an error getting the tweet.';
                });
            }
        }]);
        return TweetView;
    }(ether.View);

    var TwitterRoute = function (_Route) {
        babelHelpers.inherits(TwitterRoute, _Route);

        function TwitterRoute() {
            babelHelpers.classCallCheck(this, TwitterRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TwitterRoute).apply(this, arguments));
        }

        babelHelpers.createClass(TwitterRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return ['twitter'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return [function () {}];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['tweet'];
            }
        }, {
            key: 'expectedParams',
            value: function expectedParams() {
                return ['twitter_username', 'tweet_id'];
            }
        }, {
            key: 'expectedSetup',
            value: function expectedSetup(setupVal) {
                if ((typeof setupVal === 'undefined' ? 'undefined' : babelHelpers.typeof(setupVal)) === 'object' && babelHelpers.typeof(setupVal.linkData) === 'object') {
                    if (typeof setupVal.linkData.address !== 'string') {
                        throw new Error('TwitterRoute setup: linkData.address not a string');
                    }
                    if (typeof setupVal.linkData.text !== 'string') {
                        throw new Error('TwitterRoute setup: linkData.text not a string');
                    }
                    if (setupVal.linkData.params && babelHelpers.typeof(setupVal.linkData.params) !== 'object') {
                        throw new Error('TwitterRoute setup: linkData.params not an object');
                    }
                }
            }
        }, {
            key: 'init',
            value: function init(setupVal) {
                // create a view that shows the tweet
                this.view = new TweetView();
                this.outlets.tweet.appendChild(this.view.el);

                // create nav button based on setup
                if ((typeof setupVal === 'undefined' ? 'undefined' : babelHelpers.typeof(setupVal)) === 'object' && setupVal.linkData) {
                    var _setupVal$linkData = setupVal.linkData;
                    var address = _setupVal$linkData.address;
                    var params = _setupVal$linkData.params;
                    var text = _setupVal$linkData.text;

                    var href = this.linkTo(address, params);
                    this.outlets.tweet.appendChild(navButton(href, text));
                }
            }

            // render-cycle functions

        }, {
            key: 'prerender',
            value: function prerender(params, queryParams, diffs) {
                return this.view.render(params);
            }
        }, {
            key: 'deactivate',
            value: function deactivate() {
                var _this2 = this;

                return new Promise(function (resolve) {
                    onAnimationEnd(_this2.outlets.tweet.el, resolve);
                });
            }
        }, {
            key: 'render',
            value: function render(params, queryParams, diffs) {}
        }]);
        return TwitterRoute;
    }(ether.Route);

    var PathbarRoute = function (_Route) {
        babelHelpers.inherits(PathbarRoute, _Route);

        function PathbarRoute() {
            babelHelpers.classCallCheck(this, PathbarRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PathbarRoute).apply(this, arguments));
        }

        babelHelpers.createClass(PathbarRoute, [{
            key: 'expectedAddresses',
            value: function expectedAddresses() {
                return ['pathbar'];
            }
        }, {
            key: 'addressesHandlers',
            value: function addressesHandlers() {
                return ['receive'];
            }
        }, {
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['pathbar'];
            }
        }, {
            key: 'expectedParams',
            value: function expectedParams() {
                return [];
            }

            // initialization code

        }, {
            key: 'init',
            value: function init() {
                var p = document.createElement('p');
                p.className = 'pathname';
                p.innerHTML = '<span class="prefix">pathname</span><span class="value"></span>';
                this.outlets.pathbar.appendChild(p);
                this.text = p.querySelector('.value');
            }

            // addresses handlers

        }, {
            key: 'receive',
            value: function receive(url) {
                this.text.textContent = url;
            }
        }]);
        return PathbarRoute;
    }(ether.Route);

    var tweets = [{
        username: 'neiltyson',
        tweetId: '709051416564912128'
    }, {
        username: 'CuteEmergency',
        tweetId: '715711549139263489'
    }, {
        username: 'IronMaiden',
        tweetId: '710136681685385216'
    }];

    var twitterAddress = 'twitter';

    /* Root Route Setup */

    function addTweets() {
        return { tweets: tweets };
    }

    function addTwitterAddress(setup) {
        setup.address = twitterAddress;
        return setup;
    }

    function addTweetTransformer(setup) {
        // map the twitter route's param names
        // to the tweet model's properties
        setup.transformer = function (paramName, model) {
            switch (paramName) {
                case 'twitter_username':
                    return model.username;
                case 'tweet_id':
                    return model.tweetId;
            }
        };
        return setup;
    }

    /* Twitter Route Setup */

    function addButtonData() {
        return {
            linkData: { address: 'root', text: 'Back' }
        };
    }

    var TwitterRootApp = function (_RootApp) {
        babelHelpers.inherits(TwitterRootApp, _RootApp);

        function TwitterRootApp() {
            babelHelpers.classCallCheck(this, TwitterRootApp);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TwitterRootApp).apply(this, arguments));
        }

        babelHelpers.createClass(TwitterRootApp, [{
            key: 'expectedOutlets',
            value: function expectedOutlets() {
                return ['twitter'];
            }
        }, {
            key: 'createOutlets',
            value: function createOutlets(outlets) {
                outlets.twitter = ether.makeOutlet({
                    el: outlets.twitter.el,
                    classNames: ['twitter-app'],
                    append: [outlets.pathbar = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['pathbar'],
                        mutable: true
                    }), outlets.root = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['root'],
                        mutable: true
                    }), outlets.tweet = ether.makeOutlet({
                        tagName: 'section',
                        classNames: ['tweet-container'],
                        mutable: true
                    })]
                });
                return outlets;
            }
        }, {
            key: 'mount',
            value: function mount() {
                return {
                    '': RootRoute.addresses('root').outlets('root').setup(addTweets, addTwitterAddress, addTweetTransformer),
                    '{twitter_username=\\w+}/{tweet_id=\\d+}': TwitterRoute.addresses(twitterAddress).outlets('tweet').setup(addButtonData)
                };
            }
        }, {
            key: 'mountConditionals',
            value: function mountConditionals() {
                return {
                    '*': PathbarRoute.addresses('pathbar').outlets('pathbar')
                };
            }
        }]);
        return TwitterRootApp;
    }(ether.RootApp);

    return TwitterRootApp;

}(Ether));