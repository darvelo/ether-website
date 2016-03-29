import { View } from 'ether';
import ajax from '../utils/ajax';

class TweetView extends View {
    init() {
        this.el = document.createElement('div');
        this.el.className = 'tweet-view';
    }

    generateURL(params) {
        let { twitter_username, tweet_id } = params;
        return `/twitter_json/${twitter_username}/${tweet_id}`;
    }

    template(model) {
        return `<article class="tweet-content">${model.html}</article>`;
    }

    render(params) {
        let url = this.generateURL(params);
        return ajax(url).then(data => {
            this.el.innerHTML = this.template(JSON.parse(data));
        }, () => {
            this.el.innerHTML = 'There was an error getting the tweet.';
        });
    }
}

export default TweetView;
