import os
from time import sleep
from threading import Thread
import requests
from flask import Flask, json, jsonify, send_from_directory, send_file
from wsserver import ws_server

app = Flask(__name__, static_folder='public', static_url_path='/public')
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
@app.route('/app1/', defaults={'path': ''})
@app.route('/app1/<path:path>')
def app1(path):
    return app.send_static_file('pages/app1.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('pages/main.html')

def css_watch():
    filename = './public/styles/main.css'
    file_size_stored = os.stat(filename).st_mtime
    while True:
        file_size_current = os.stat(filename).st_mtime
        if file_size_stored != file_size_current:
            ws_server.send_message_to_all('reloadCSS')
            file_size_stored = file_size_current
        sleep(1)

if __name__ == '__main__':
    css_watch_thread = Thread(target=css_watch, daemon=True)
    css_watch_thread.start()
    app.run(debug=False)
