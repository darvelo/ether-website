import { Route } from 'ether';
import TweetView from './tweet-view';
import navButton from './templates/nav-button';
import onAnimationEnd from './utils/on-animationend';

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
        if (typeof setupVal === 'object' && typeof setupVal.linkTo === 'object') {
            if (typeof setupVal.linkTo.address !== 'string') {
                throw new Error('TwitterRoute setup: linkTo.address not a string');
            }
            if (typeof setupVal.linkTo.text !== 'string') {
                throw new Error('TwitterRoute setup: linkTo.text not a string');
            }
            if (setupVal.linkTo.params && typeof setupVal.linkTo.params !== 'object') {
                throw new Error('TwitterRoute setup: linkTo.params not an object');
            }
        }
    }

    init(setupVal) {
        // create a view that shows the tweet
        this.view = new TweetView();
        this.outlets.tweet.append(this.view.el);

        // create nav button based on setup
        if (typeof setupVal === 'object' && setupVal.linkTo) {
            let buttonData = setupVal.linkTo;
            let href = this.linkTo(buttonData.address, buttonData.params);
            this.outlets.tweet.append(navButton(href, buttonData.text));
        }
    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {
        return this.view.render(params);
    }
    deactivate() {
        return new Promise(resolve => {
            onAnimationEnd(this.outlets.tweet.get(), resolve);
        });
    }
    render(params, queryParams, diffs) { }
}

export default TwitterRoute;
