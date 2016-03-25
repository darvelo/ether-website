import { escapeHTML } from 'utils';

export default function() {
    return escapeHTML`<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="/public/styles/app.css" />
        <title>My Twitter App</title>
    </head>
    <body>
        <div id="twitter"></div>
        <script src="/public/vendor/scripts/ether.global.js"></script>
        <script src="/public/scripts/app.js"></script>
        <script>
            function changeURLInfo(event, promise) {
                var self = this;
                promise.then(function() {
                    self.sendTo('url', self.fullUrl());
                });
            }
            var myApp = new TwitterApp({
                windowLoad: changeURLInfo,
                history: changeURLInfo,
                interceptLinks: function all(event, promise) {
                    changeURLInfo.call(this, event, promise);
                },
                basePath: '/app',
                outlets: {
                    twitter: new Ether.MutableOutlet(document.getElementById('twitter')),
                },
            }).start();
        </script>
    </body>
</html>`;
}
