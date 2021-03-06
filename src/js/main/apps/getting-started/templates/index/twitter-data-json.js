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
        tweetId:  '715711549139263489',
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
    setup.transformer = function(paramName, model) {
        switch(paramName) {
        case 'twitter_username':
            return model.username;
        case 'tweet_id':
            return model.tweetId;
        }
    };
    return setup;
}
    `;
}
