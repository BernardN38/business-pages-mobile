from flask import Flask
from models import  db
from flask_cors import CORS
from keys import secret_key
from resource_routes import resources
from auth_routes import auth

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = secret_key


CORS(app, support_credentials=True)
db.init_app(app)

@app.after_request
def after_request(response):
    print('after request')
    # response.headers["Access-Control-Allow-Origin"] = "localhost:5000"
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


# reviews, offerings, business CRUD routes
app.register_blueprint(resources)

# signup login routes
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run()
