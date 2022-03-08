import pytest
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from keys import secret_key
from app import create_app, db
from auth_routes import auth
from models import User, Business


@pytest.fixture()
def app():
    app = create_app()
    app.register_blueprint(auth)
    app.config.update({
        "TESTING": True,
    })
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages_test'
    with app.app_context():
        db.init_app(app)
    # other setup can go here

    with app.app_context():
        db.drop_all()
        db.create_all()
        test_user = User(username="test_user",
                         password=generate_password_hash('test_password'))
        test_business = Business(email="testbusiness@gmail.com", name='test_business', description="test business description",
                                 business_type="food", password=generate_password_hash('test_password'))
        db.session.add(test_business)
        db.session.add(test_user)
        db.session.commit()

    yield app

    # clean up / reset resources here
    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


class TestClass:

    def test_auth_user_signup(self, client, app):
        response = client.post(
            '/signup', data={'username': 'testuser123', "password": "password123"})

        # check created status code
        assert response.status_code == 201

        # check user in database
        with app.app_context():
            assert User.query.filter_by(username='testuser123').first()

    def test_auth_user_login(self, client):
        response = client.post(
            '/login', data={"username": "test_user", "password": "test_password"})
        token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]

        # check success status code
        assert response.status_code == 200
        # check jwt token set properly
        assert 'Set-Cookie' in response.headers
        assert jwt.decode(token, secret_key, algorithms="HS256")[
            'user_id'] == 1

    def test_auth_business_signup(self, client, app):
        response = client.post(
            '/api/business/signup', data={'email': "testbusiness2@gmail.com", 'name': 'test_business2', 'description': "test business description",
                                          'business_type': "food", 'password': 'test_password'})
        print(response)
        # check success status code
        assert response.status_code == 201

        with app.app_context():
            assert Business.query.filter_by(
                email='testbusiness2@gmail.com').first()

    def test_auth_business_login(self, client):

        response = client.post(
            '/business/login', data={'email': "testbusiness@gmail.com", "password": "test_password"})
        token = response.headers['Set-Cookie'].split(';')[0].split('=')[1]

        # check success status code
        assert response.status_code == 200

        # check jwt token set properly
        assert 'Set-Cookie' in response.headers
        assert 'business_id' in jwt.decode(
            token, secret_key, algorithms="HS256")
