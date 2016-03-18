import { Route } from 'ether';
import navButton from './templates/nav-button';
import onTransitionEnd from './utils/on-transitionend';

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
        if (!Array.isArray(setupVal)) {
            throw new Error('RootRoute#setup() expected an array.');
        }
        setupVal.forEach(item => {
            if (Array.isArray(item) ||
                typeof item !== 'object' ||
                typeof item.username !== 'string' ||
                typeof item.tweetId  !== 'string')
            {
                throw new TypeError('Twitter data was not setup properly.');
            }
        });
    }

    // initialization code
    init(setupVal) {
        this.data = setupVal;
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
        return navButton(href, 'Get a random Tweet!');
    }

    getRandomTweet() {
        let idx = Math.floor(Math.random() * this.data.length);
        return this.data[idx];
    }

    // render-cycle functions
    // if there are no params on the path to a route,
    // and there are never any queryParams during the
    // lifecycle of the Ether app, all three arguments
    // in `prerender()` and in `render()` will always be `null`
    prerender(params, queryParams, diffs) {
        let template = this.template(this.getRandomTweet());
        this.outlets.root.append(template);
    }
    deactivate() {
        onTransitionEnd(this.outlets.root.get(), () => {
            this.outlets.root.empty();
        });
    }
    render(params, queryParams, diffs) { }
}

export default RootRoute;
