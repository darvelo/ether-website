import { Route } from 'ether';
import TweetView from './tweet-view';
import navButton from './templates/nav-button';

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
        this.outlets.tweet.append(navButton(href, 'Back'));
        this.outlets.tweet.append(this.view.el);
    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {
        return this.view.render(params);
    }
    deactivate() { }
    render(params, queryParams, diffs) { }
}

export default TwitterRoute;
