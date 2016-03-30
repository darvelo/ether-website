import { escapeHTML } from 'utils';

export default function twitterRootRouteJS() {
    return escapeHTML`
import { Route } from 'ether';
import navButton from '../templates/nav-button';
import onAnimationEnd from '../utils/on-animationend';

class RootRoute extends Route {
    expectedAddresses() {
        return ['root'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['root'];
    }
    expectedParams() {
        return [];
    }
    expectedSetup(setupVal) {
        // ...
    }

    // initialization code
    init(setupVal) {
        this.tweets = setupVal.tweets;
        this.transformer = setupVal.transformer;
        this.twitterAddress = setupVal.address;
    }

    template(model) {
        let opts = {
            // map the twitter route's param names
            // to the tweet models' properties
            transformer: this.transformer
        };
        let href = this.linkTo(this.twitterAddress, model, opts);
        return navButton(href, 'Get a random Tweet!');
    }

    getRandomTweet() {
        let idx = Math.floor(Math.random() * this.tweets.length);
        return this.tweets[idx];
    }

    // render-cycle functions
    // if there are no params on the path to a route,
    // and there are never any queryParams during the
    // lifecycle of the Ether app, all three arguments
    // in prerender() and in render() will always be null
    prerender(params, queryParams, diffs) {
        let template = this.template(this.getRandomTweet());
        this.outlets.root.append(template);
    }
    deactivate() {
        return new Promise(resolve => {
            onAnimationEnd(this.outlets.root.el, () => {
                this.outlets.root.empty();
                resolve();
            });
        });
    }
    render(params, queryParams, diffs) { }
}

export default RootRoute;
    `;
}
