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
        if (typeof setupVal === 'object' && typeof setupVal.linkData === 'object') {
            if (typeof setupVal.linkData.address !== 'string') {
                throw new Error('TwitterRoute setup: linkData.address not a string');
            }
            if (typeof setupVal.linkData.text !== 'string') {
                throw new Error('TwitterRoute setup: linkData.text not a string');
            }
            if (setupVal.linkData.params && typeof setupVal.linkData.params !== 'object') {
                throw new Error('TwitterRoute setup: linkData.params not an object');
            }
        }
    }

    init(setupVal) {
        // create a view that shows the tweet
        this.view = new TweetView();
        this.outlets.tweet.appendChild(this.view.el);

        // create nav button based on setup
        if (typeof setupVal === 'object' && setupVal.linkData) {
            let { address, params, text } = setupVal.linkData;
            let href = this.linkTo(address, params);
            this.outlets.tweet.appendChild(navButton(href, text));
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

export default TwitterRoute;
