import { Route } from 'ether';

class RootRoute extends Route {
    expectedAddresses() {
        return ['root'];
    }
    addressesHandlers() {
        return ['receiveModel'];
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
            transformer: paramName => {
                switch(paramName) {
                case 'username':
                    return 'twitter_username';
                case 'tweetId':
                    return 'tweet_id';
                }
            }
        };
        let twitterHref = this.linkTo('twitter', model, opts);
        let div = document.createElement('div');
        div.innerHTML = `<a href="${twitterHref}">Go to Twitter Widget</a>`;
        return div.firstChild;
    }

    // addresses handlers
    receiveModel(model) {
        this.model = model;
    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {
        this.outlets.root.empty();
        this.outlets.root.append(this.template(this.model));
    }
    deactivate() {

    }
    render(params, queryParams, diffs) {

    }
}

export default RootRoute;
