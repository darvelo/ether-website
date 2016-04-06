(function (exports,ether,uuid) {
    'use strict';

    uuid = 'default' in uuid ? uuid['default'] : uuid;

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

    var worker = new Worker('/static/webworkers/highlight-worker.js');

    function highlightCode(outlet) {
        return new Promise(function (resolve) {
            var slice = Array.prototype.slice;
            var jobs = {};
            ['html', 'css', 'js'].forEach(function (ft) {
                var id = uuid.v4();
                var els = slice.call(outlet.querySelectorAll('pre code.' + ft));
                jobs[id] = {
                    id: id,
                    ft: ft,
                    done: false,
                    els: els
                };
            });

            function allDone() {
                return Object.keys(jobs).every(function (id) {
                    return jobs[id].done;
                });
            }

            function onMessage(event) {
                var job = jobs[event.data.id];
                if (!job) {
                    return;
                }

                var blocks = event.data.blocks;
                job.els.forEach(function (el, i) {
                    el.innerHTML = blocks[i];
                });
                job.done = true;
                if (allDone()) {
                    worker.removeEventListener('message', onMessage, false);
                    resolve();
                }
            }

            worker.addEventListener('message', onMessage, false);

            Object.keys(jobs).forEach(function (id) {
                var job = jobs[id];
                worker.postMessage({
                    id: job.id,
                    ft: job.ft,
                    blocks: job.els.map(function (el) {
                        return el.innerHTML;
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

}((this.utils = this.utils || {}),Ether,uuid));