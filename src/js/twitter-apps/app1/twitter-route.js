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

    init() {
        this.view = new TweetView();
        let href = this.linkTo('root');
        this.outlets.tweet.append(this.view.el);
        this.outlets.tweet.append(navButton(href, 'Back'));
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
