import { escapeHTML } from 'utils';

export function twitterDataJSON() {
    return escapeHTML`
export default [
    {
        username: 'neiltyson',
        tweetId:  '709051416564912128',
    },
    {
        username: 'CuteEmergency',
        tweetId:  '710332899736702976',
    },
    {
        username: 'IronMaiden',
        tweetId:  '710136681685385216',
    },
];
    `;
}

export function twitterDataTransformer() {
    return escapeHTML`
function addTweetTransformer(setup) {
    // map the twitter route's param names
    // to the tweet model's properties
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
    `;
}
