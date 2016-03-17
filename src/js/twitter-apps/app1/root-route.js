import { Route } from 'ether';
import tweetButton from './templates/tweet-button';

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
        if (typeof setupVal !== 'object' ||
            typeof setupVal.username !== 'string' ||
            typeof setupVal.tweetId  !== 'string')
        {
            throw new TypeError('Twitter data was not setup properly.');
        }
    }

    // initialization code
    init(setupVal) {
        this.model = setupVal;
    }

    template(model) {
        let opts = {
            // map the destination route's param
            // names to the model's properties
            transformer: paramName => {
                switch(paramName) {
                case 'twitter_username':
                    return 'username';
                case 'tweet_id':
                    return 'tweetId';
                }
            }
        };
        let href = this.linkTo('twitter', model, opts);
        return tweetButton(href, 'Get a Tweet!');
    }

    // render-cycle functions
    // if there are no params on the path to a route,
    // and there are never any queryParams during the
    // lifecycle of the Ether app, all three arguments
    // in `prerender()` and in `render()` will always be `null`
    prerender(params, queryParams, diffs) { }
    deactivate() { }
    render(params, queryParams, diffs) {
        this.outlets.root.empty();
        this.outlets.root.append(this.template(this.model));
    }
}

export default RootRoute;
