from flask import Flask, send_from_directory
from models import  db, User,Review
from flask_cors import CORS, cross_origin
from keys import secret_key
from resource_routes import resources
from auth_routes import auth


import logging
app = Flask(__name__,static_url_path='', static_folder='build')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://trkxphvauovftw:01cf83a066ab424853b9a45ab3984e085629551994459d7e55a52c6976cb847b@ec2-18-215-8-186.compute-1.amazonaws.com:5432/d12sn9dq303e70'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = secret_key

CORS(app, resources=r'/api/*', supports_credentials=True)
db.init_app(app)

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.get('/')
def home():
    return send_from_directory(app.static_folder,'index.html')
# reviews, offerings, business CRUD routes
app.register_blueprint(resources)

# signup login routes
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run()
