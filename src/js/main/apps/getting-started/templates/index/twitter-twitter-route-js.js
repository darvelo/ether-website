import { escapeHTML } from 'utils';

export default function twitterTwitterRouteJS() {
    return escapeHTML`
import { Route } from 'ether';
import TweetView from '../views/tweet';
import navButton from '../templates/nav-button';
import onAnimationEnd from '../utils/on-animationend';

class TwitterRoute extends Route {
    expectedAddresses() {
        return ['twitter'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['tweet'];
    }
    expectedParams() {
        return ['twitter_username', 'tweet_id'];
    }
    expectedSetup(setupVal) {
        // ...
    }

    init(setupVal) {
        // create a view that shows the tweet
        this.view = new TweetView();
        this.outlets.tweet.append(this.view.el);

        // create nav button based on setup
        if (typeof setupVal === 'object' && setupVal.linkTo) {
            let { address, params, text } = setupVal.linkTo;
            let href = this.linkTo(address, params);
            this.outlets.tweet.append(navButton(href, text));
        }
    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {
        return this.view.render(params);
    }
    deactivate() {
        return new Promise(resolve => {
            onAnimationEnd(this.outlets.tweet.el, resolve);
        });
    }
    render(params, queryParams, diffs) { }
}
    `;
}
