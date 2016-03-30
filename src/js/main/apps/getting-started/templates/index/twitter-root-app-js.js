import { escapeHTML } from 'utils';

export function rootRouteMountJS() {
    return escapeHTML`
'': RootRoute
        .addresses('root')
        .outlets('root')
        .setup(addTweets, addTwitterAddress, addTweetTransformer),
    `;
}

export function twitterRouteMountJS() {
    return escapeHTML`
'{twitter_username=\\\\w+}/{tweet_id=\\\\d+}':
    TwitterRoute
        .addresses('twitter')
        .outlets('tweet')
        .setup(addButtonData),
    `;
}

export function twitterRootAppJS() {
    return escapeHTML`
import { RootApp, makeOutlet } from 'ether';
import RootRoute from './routes/root';
import TwitterRoute from './routes/twitter';
import URLRoute from './routes/url';

// ...

class TwitterRootApp extends RootApp {
    expectedOutlets() {
        return ['twitter'];
    }
    createOutlets(outlets) {
        outlets.twitter = makeOutlet({
            el: outlets.twitter.el,
            classNames: ['twitter-app'],
            append: [
                outlets.url = makeOutlet({
                    tagName: 'section',
                    classNames: ['url'],
                    mutable: true,
                }),
                outlets.root = makeOutlet({
                    tagName: 'section',
                    classNames: ['root'],
                    mutable: true,
                }),
                outlets.tweet = makeOutlet({
                    tagName: 'section',
                    classNames: ['tweet-container'],
                    mutable: true,
                }),
            ]
        });
        return outlets;
    }
    mount() {
        return {
            '': RootRoute
                    .addresses('root')
                    .outlets('root')
                    .setup(addTweets, addTwitterAddress, addTweetTransformer),
            '{twitter_username=\\\\w+}/{tweet_id=\\\\d+}':
                TwitterRoute
                    .addresses('twitter')
                    .outlets('tweet')
                    .setup(addButtonData),
        };
    }
    mountConditionals() {
        return {
            '*': URLRoute
                    .addresses('url')
                    .outlets('url'),
        };
    }
}
    `;
}
