import { escapeHTML } from 'utils';

export function paramsExample1() {
    return escapeHTML`
// params
{
    twitter_username: "neiltyson",
    tweet_id: "12345"
}
// queryParams
{
    color: "red",
    bold: true,
    font_size: "16"
}
// diff
{
    params: {
        twitter_username: [undefined, "neiltyson"],
        tweet_id: [undefined, "12345"]
    },
    queryParams: {
        color: [undefined, "red"],
        bold: [undefined, true],
        font_size: [undefined, "16"]
    }
}
    `;
}

export function paramsExample2() {
    return escapeHTML`
// params - tweet_id has changed
{
    twitter_username: "neiltyson",
    tweet_id: "6789"
}
// queryParams - same as before
{
    color: "red",
    bold: true,
    font_size: "16"
}
// diff
// - contains the differences vs. the last call
// - a param is null if no difference
// - a base property is null is none of its params differed
// - the entire diff argument is null if neither base property had any differences
{
    params: {
        twitter_username: null,
        tweet_id: ["12345", "6789"]
    },
    queryParams: null
}
    `;
}
