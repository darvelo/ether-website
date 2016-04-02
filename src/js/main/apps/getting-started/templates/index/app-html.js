import { escapeHTML } from 'utils';

export default function() {
    return escapeHTML`
<div id="twitter"></div>

<script src="/public/vendor/scripts/ether.global.js"></script>
<script src="/public/scripts/app.js"></script>
<script>
    function updatePathbar(event, promise) {
        var self = this;
        promise.then(function() {
            self.sendTo('pathbar', self.fullUrl);
        });
    }
    var myApp = TwitterRootApp.create({
        windowLoad: updatePathbar,
        history: updatePathbar,
        interceptLinks: function all(event, promise) {
            updatePathbar.call(this, event, promise);
        },
        basePath: '/app',
        outlets: {
            twitter: new Ether.MutableOutlet(document.getElementById('twitter')),
        },
    }).start();
</script>
    `;
}
