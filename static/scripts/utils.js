(function (exports,ether) {
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

    var character = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;'
    };

    var escapeRegex = /[&<>"']/g;
    var escapeFn = function escapeFn(c) {
        return character[c];
    };

    function trimLeft(str) {
        return str.replace(/^[\s\uFEFF\xA0]+/, '');
    }

    function trimRight(str) {
        return str.replace(/[\s\uFEFF\xA0]+$/, '');
    }

    function escapeHTML(strings) {
        var result = [];

        for (var _len = arguments.length, interpolated = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            interpolated[_key - 1] = arguments[_key];
        }

        for (var i = 0, len = strings.length, len2 = interpolated.length; i < len; ++i) {
            var str = strings[i];
            if (len === 1) {
                str = str.trim();
            } else if (i === 0) {
                str = trimLeft(str);
            } else if (i === len - 1) {
                str = trimRight(str);
            }
            result.push(str.replace(escapeRegex, escapeFn));
            if (i < len2) {
                result.push(interpolated[i].replace(escapeRegex, escapeFn));
            }
        }
        return result.join('');
    }

    var ScrollApp = function (_App) {
        babelHelpers.inherits(ScrollApp, _App);

        function ScrollApp() {
            babelHelpers.classCallCheck(this, ScrollApp);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ScrollApp).apply(this, arguments));
        }

        babelHelpers.createClass(ScrollApp, [{
            key: 'deactivate',
            value: function deactivate() {
                if ('scrollRestoration' in window.history) {
                    this.scrollTop = window.scrollY;
                } else {
                    this.scrollTop = 0;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                window.scrollTo(0, this.scrollTop);
            }
        }]);
        return ScrollApp;
    }(ether.App);

    var ScrollRoute = function (_Route) {
        babelHelpers.inherits(ScrollRoute, _Route);

        function ScrollRoute() {
            babelHelpers.classCallCheck(this, ScrollRoute);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ScrollRoute).apply(this, arguments));
        }

        babelHelpers.createClass(ScrollRoute, [{
            key: 'deactivate',
            value: function deactivate() {
                if ('scrollRestoration' in window.history) {
                    this.scrollTop = window.scrollY;
                } else {
                    this.scrollTop = 0;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                window.scrollTo(0, this.scrollTop);
            }
        }]);
        return ScrollRoute;
    }(ether.Route);

    function highlightCode(outlet) {
        return new Promise(function (resolve) {
            var slice = Array.prototype.slice;
            var worker = new Worker('/static/webworkers/highlight-worker.js');
            var types = {
                html: {
                    done: false,
                    blocks: slice.call(outlet.querySelectorAll('pre code.html'))
                },
                css: {
                    done: false,
                    blocks: slice.call(outlet.querySelectorAll('pre code.css'))
                },
                js: {
                    done: false,
                    blocks: slice.call(outlet.querySelectorAll('pre code.js'))
                }
            };

            function allDone() {
                return Object.keys(types).every(function (type) {
                    return types[type].done;
                });
            }

            worker.onmessage = function (event) {
                var t = types[event.data.type];
                var blocks = event.data.blocks;
                t.blocks.forEach(function (block, i) {
                    block.innerHTML = blocks[i];
                });
                t.done = true;
                if (allDone()) {
                    worker.terminate();
                    resolve();
                }
            };

            Object.keys(types).forEach(function (type) {
                worker.postMessage({
                    type: type,
                    blocks: types[type].blocks.map(function (block) {
                        return block.innerHTML;
                    })
                });
            });
        });
    }

    var index = {
        escapeHTML: escapeHTML
    };

    exports.escapeHTML = escapeHTML;
    exports.ScrollApp = ScrollApp;
    exports.ScrollRoute = ScrollRoute;
    exports.highlightCode = highlightCode;
    exports['default'] = index;

}((this.utils = this.utils || {}),Ether));