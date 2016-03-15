import { Route } from 'ether';

class TwitterRoute extends Route {
    expectedAddresses() {
        return ['twitter'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['tweet'];
    }
    expectedParams() {
        return ['twitter_username', 'tweet_id'];
    }

    generateURL(model) {
        let { username, tweetId: id } = model;
        return `https://api.twitter.com/1/statuses/oembed.json?url=https://twitter.com/${username}/status/${id}`;
    }

    // addresses handlers
    receive() {

    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {

    }
    deactivate() {

    }
    render(params, queryParams, diffs) {

    }
}

export default TwitterRoute;
