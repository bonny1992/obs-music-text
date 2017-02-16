import os
import datetime
import spotilib

from os.path import join as djoin
from json import dumps as jdumps
from flask import Flask
from flask import render_template
from flask import request
from flask import url_for
from urllib.parse import unquote_plus

app = Flask(__name__)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')

#Edit this as you require
filepath = 'title.txt'
folderpath = os.path.dirname(os.path.realpath(__file__)) or '/foo/bar/path/to/file/'
fullpath = djoin(folderpath, filepath)
_PLAYER = 'spotify'


@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

@app.route('/')
def index():
    return render_template('index.pug',
                           cssfile= url_for('static', filename=unquote_plus('style.css?q={}'.format(
                               str(datetime.datetime.now()).split('.')[-1]))))

@app.route('/_get_title')
def get_title():
    title = {}
    if _PLAYER == 'spotify':
        title['artist'] = spotilib.artist()
        title['songname'] = spotilib.song()
    else:
        try:
            with open(fullpath, 'r') as file:
                fulltitle = file.read()
        except:
            fulltitle = 'Not Found - Not Found'
        title['artist'] = fulltitle.split('-')[0].lstrip()
        title['songname'] = fulltitle.split('-')[1].lstrip()
    return jdumps(title)


if __name__ == '__main__':
    app.run(port=12500)
