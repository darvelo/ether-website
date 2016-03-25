import { RootApp, makeOutlet } from 'ether';
import RootRoute from './root-route';
import TwitterRoute from './twitter-route';
import URLRoute from './url-route';
import tweets from './data/tweets';

let twitterAddress = 'twitter';

/* Root Route Setup */

function addTweets() {
    return {tweets};
}

function addTwitterAddress(setup) {
    setup.address = twitterAddress;
    return setup;
}

function addTweetTransformer(setup) {
    // map the twitter route's param names
    // to the tweet models' properties
    setup.transformer = function(paramName) {
        switch(paramName) {
        case 'twitter_username':
            return 'username';
        case 'tweet_id':
            return 'tweetId';
        }
    };
    return setup;
}

/* Twitter Route Setup */

function addButtonData() {
    return {
        linkTo: {address: 'root', text: 'Back'},
    };
}

class TwitterRootApp extends RootApp {
    expectedOutlets() {
        return ['twitter'];
    }
    createOutlets(outlets) {
        outlets.twitter = makeOutlet({
            el: outlets.twitter.get(),
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
            '{twitter_username=\\w+}/{tweet_id=\\d+}':
                TwitterRoute
                    .addresses(twitterAddress)
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

export default TwitterRootApp;
