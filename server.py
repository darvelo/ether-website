#!/usr/bin/env python3

import os
from time import sleep
from threading import Thread
import requests
from flask import Flask, jsonify, render_template

env = os.environ.get('ENV', 'production')
if env == 'development':
    from wsserver import ws_server

app = Flask(__name__)
tweets = {}

@app.route("/twitter_json/<twitter_username>/<tweet_id>")
def twitter_json(twitter_username, tweet_id):
    if twitter_username in tweets and tweet_id in tweets[twitter_username]:
        data = tweets[twitter_username][tweet_id]
    else:
        print('searching for: ', twitter_username, tweet_id)
        url = 'https://api.twitter.com/1/statuses/oembed.json?url=https://twitter.com/{}/status/{}&omit_script=true'.format(twitter_username, tweet_id)
        response = requests.get(url)
        if 200 <= response.status_code < 400:
            tweets.setdefault(twitter_username, {})
            tweets[twitter_username][tweet_id] = response.json()
            data = tweets[twitter_username][tweet_id]
        else:
            data = {'html': 'There was an error getting the tweet.'}
    return jsonify(**data)

# Catch-All URL
# see: http://flask.pocoo.org/snippets/57/
@app.route('/app/', defaults={'path': ''})
@app.route('/app/<path:path>')
def twitter_app(path):
    return render_template('app.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html', env=env)

def css_watch():
    filename = './static/styles/main.css'
    file_size_stored = os.stat(filename).st_mtime
    while True:
        file_size_current = os.stat(filename).st_mtime
        if file_size_stored != file_size_current:
            ws_server.send_message_to_all('reloadCSS')
            file_size_stored = file_size_current
        sleep(1)

if __name__ == '__main__':
    if env == 'development':
        css_watch_thread = Thread(target=css_watch, daemon=True)
        css_watch_thread.start()
    app.run(debug=False)
