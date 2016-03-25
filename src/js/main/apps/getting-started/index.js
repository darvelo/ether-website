import { App, makeOutlet } from 'ether';
import IndexRoute from './routes/index';
import TOCRoute from './routes/toc';

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
class GettingStartedApp extends App {
    expectedAddresses() {
        return [':gs'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gs'];
    }
    createOutlets(outlets) {
        let content = outlets.content = makeOutlet({
            tagName: 'section',
            classNames: ['getting-started-content'],
            mutable: true,
        });
        let toc = outlets.toc = makeOutlet({
            tagName: 'aside',
            classNames: ['getting-started-toc'],
            mutable: true,
        });
        outlets.gs.append(content.get());
        outlets.gs.append(toc.get());
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses(':gs.index')
                    .outlets('content'),
        };
    }
    mountConditionals() {
        return {
            '+:gs.index':
                TOCRoute
                    .addresses(':gs.toc')
                    .outlets('toc'),
        };
    }
}

export default GettingStartedApp;
