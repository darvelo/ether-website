import { RootApp, makeOutlet } from 'ether';

import RootRoute from './root-route';
import TwitterRoute from './twitter-route';
import URLRoute from './url-route';

class MyRootApp extends RootApp {
    expectedOutlets() {
        return ['main'];
    }
    createOutlets(outlets) {
        outlets.main = makeOutlet({
            el: outlets.main.get(),
            classNames: ['twitter-app'],
            append: [
                outlets.url = makeOutlet({
                    tagName: 'section',
                    classNames: ['url'],
                }),
                outlets.root = makeOutlet({
                    tagName: 'section',
                    classNames: ['root'],
                }),
                outlets.tweet = makeOutlet({
                    tagName: 'section',
                    classNames: ['tweet-container'],
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
                .setup(() => ({
                    username: 'neiltyson',
                    tweetId:  '709051416564912128',
                })),
            '{twitter_username=\\w+}/{tweet_id=\\d+}':
                TwitterRoute
                    .addresses('twitter')
                    .outlets('tweet'),
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

export default MyRootApp;
