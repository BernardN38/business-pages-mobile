# try:
#     from flask import Flask
#
#     import unittest
#     import jwt
#     from keys import secret_key
#     from models import User, Business
#     from flask_sqlalchemy import SQLAlchemy
# except Exception as e:
#     print(f'some modules missing {e}')

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy()
# db.init_app(app)
# app.register_blueprint(auth)
# class FlaskTest(unittest.TestCase):


#     def test_auth_user_login(self):
#         tester = app.test_client(self)
#         response = tester.post(
#             '/login', data={"username": "eris", "password": "password"})
#         token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]
#         self.assertEqual(response.status_code, 200)
#         self.assertTrue('Set-Cookie' in response.headers)
#         self.assertTrue(jwt.decode(token, secret_key,
#                         algorithms="HS256")['user_id'] == 1)

#     def test_auth_business_login(self):
#         tester = app.test_client(self)
#         response = tester.post(
#             '/business/login', data={'email': 'test2@gmail.com', "password": "password"})
#         token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]
#         self.assertEqual(response.status_code, 200)
#         self.assertTrue('Set-Cookie' in response.headers)
#         self.assertTrue('business_id' in jwt.decode(token, secret_key, algorithms="HS256"))

#     def test_auth_signup(self):
#         tester = app.test_client(self)
#         response = tester.post(
#             '/signup', data={'username': 'testuser123', "password": "password123"})
#         print(response.headers)
#         self.assertEqual(response.status_code, 201)
#         # self.assertTrue('Set-Cookie' in response.headers)
#         # self.assertTrue('user_id' in jwt.decode(token, secret_key, algorithms="HS256"))

#     def tearDown(self):

#         with app.app_context():
#             user = User.query.filter_by(username='testuser123').delete()
#             print(user)
#             db.session.commit()


# if __name__ == "__main__":
#     unittest.main()


import pytest
import jwt
from keys import secret_key
from app import create_app
from auth_routes import auth
from flask_sqlalchemy import SQLAlchemy
from models import User

db = SQLAlchemy()
    

@pytest.fixture()
def app():
    app = create_app()
    app.register_blueprint(auth)
    app.config.update({
        "TESTING": True,
    })
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages'
    db.init_app(app)
    # other setup can go here

    yield app

    with app.app_context():
        user =  User.query.filter_by(username='testuser123').delete()
        db.session.commit()
        print(user)
    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_auth_user_login(client):
    response = client.post(
        '/login', data={"username": "eris", "password": "password"})
    token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]
    assert response.status_code == 200
    assert 'Set-Cookie' in response.headers
    assert jwt.decode(token, secret_key, algorithms="HS256")['user_id'] == 1


def test_auth_business_login(client):

    response = client.post(
        '/business/login', data={'email': 'test2@gmail.com', "password": "password"})
    token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]
    assert response.status_code == 200
    assert 'Set-Cookie' in response.headers
    assert 'business_id' in jwt.decode(
        token, secret_key, algorithms="HS256")


def test_auth_signup(client):
    response = client.post(
        '/signup', data={'username': 'testuser123', "password": "password123"})
    print(response.headers)
    assert response.status_code == 201

