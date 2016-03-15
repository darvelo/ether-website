import { RootApp, makeOutlet } from 'ether';

import RootRoute from 'root-route';
import TwitterRoute from 'twitter-route';
import WelcomeRoute from 'welcome-route';

class MyRootApp extends RootApp {
    expectedOutlets() {
        return ['main'];
    }
    createOutlets(outlets) {
        outlets.main = makeOutlet({
            el: outlets.main.get(),
            classNames: ['twitter-app'],
            append: [
                outlets.root = makeOutlet({
                    tagName: 'section',
                    classNames: ['root'],
                }),
                outlets.tweet = makeOutlet({
                    tagName: 'section',
                    classNames: ['tweet-container'],
                }),
                outlets.welcome = makeOutlet({
                    tagName: 'section',
                    classNames: ['welcome'],
                }),
            ]
        });

        return outlets;
    }
    mount() {
        return {
            '':
                RootRoute
                    .addresses('root')
                    .outlets('root')
                    .setup(() => ({
                        username: 'Interior',
                        tweetId:  '463440424141459456',
                    })),
            '{twitter_username=\\w+}/{tweet_id=\\d+}':
                TwitterRoute
                    .addresses('twitter')
                    .outlets('tweet'),
        };
    }
    mountConditionals() {
        return {
            '*':
                WelcomeRoute
                    .addresses('welcome')
                    .outlets('welcome'),
        };
    }
}

export default MyRootApp;
