import { RootApp, makeOutlet } from 'ether';
import RootRoute from './root-route';
import TwitterRoute from './twitter-route';
import URLRoute from './url-route';
import tweets from './data/tweets';

function filterObjects(array) {
    return array.filter(item => typeof item === 'object' && !Array.isArray(item));
}

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
                    .setup(() => tweets, t => filterObjects(t)),
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
