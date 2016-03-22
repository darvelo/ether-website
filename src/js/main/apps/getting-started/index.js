import { App, makeOutlet } from 'ether';
import IndexRoute from './routes/index';

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
        // <iframe id="app1-iframe" src="/app1/"></iframe>
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
    mount() {
        return {
            '': IndexRoute
                    .addresses(':gs.index')
                    .outlets('gs'),
        };
    }
}

export default GettingStartedApp;
