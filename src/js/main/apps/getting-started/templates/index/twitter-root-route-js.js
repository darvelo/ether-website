import { escapeHTML } from 'utils';

export default function twitterRootRouteJS() {
    return escapeHTML`
class RootRoute extends Route {
    // ...

    init(setupVal) {
        this.tweets = setupVal.tweets;
        this.transformer = setupVal.transformer;
        this.twitterAddress = setupVal.address;
    }

    template(model) {
        let opts = {
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
