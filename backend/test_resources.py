import pytest
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from keys import secret_key
from app import create_app, db
from resource_routes import resources
from models import Business, Offering, User
from datetime import datetime, timedelta
import json

business_token = jwt.encode({
    'business_id': 1,
    'exp': datetime.utcnow() + timedelta(hours=24)
}, secret_key, algorithm="HS256")
user_token = jwt.encode({
    'user_id': 1,
    'exp': datetime.utcnow() + timedelta(hours=24)
}, secret_key, algorithm="HS256")

@pytest.fixture()
def app():
    app = create_app()
    app.register_blueprint(resources)
    app.config.update({
        "TESTING": True,
    })
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages_test'

    with app.app_context():
        db.init_app(app)
    # other setup can go here

    with app.app_context():
        db.create_all()
        test_user = User(username="test_user",
                         password=generate_password_hash('test_password'))

        test_offering = Offering(name='test offering',
                                 description='we offer this test', price=9.99)
        test_business = Business(email="testbusiness@gmail.com", name='test_business', description="test business description",
                                 business_type="food", password=generate_password_hash('test_password'))
        db.session.add(test_user)
        db.session.add(test_offering)
        db.session.add(test_business)
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


class TestResources:

    def test_get_business(self, client):
        response = client.get(
            "/api/business", query_string={'business_type': 'food'})

        # check success status code
        assert response.status_code == 200

        # check response is porperly filled, exluding sesitive info
        assert response.json[0].get('name') == 'test_business'
        assert response.json[0].get(
            'description') == 'test business description'
        assert response.json[0].get('email') == None
        assert response.json[0].get('password') == None

    def test_get_business_by_id(self, client):
        response = client.get("/api/business/1")

        # check success status code
        assert response.status_code == 200

        # check response is porperly filled, exluding sesitive info
        assert response.json.get('name') == 'test_business'
        assert response.json.get('description') == 'test business description'
        assert response.json.get('email') == None
        assert response.json.get('password') == None

    def test_get_business_profile(self, client):
        # create valid token for authentication and set cookie
        client.set_cookie(key='Bearer', value=business_token, httponly=True,
                          samesite='None', secure=True, server_name='http://localhost:5000')

        response = client.get("/api/business/1/profile")

        # check success status code
        assert response.status_code == 200

        # check response is porperly filled, exluding sesitive info
        assert response.json.get('name') == 'test_business'
        assert response.json.get('description') == 'test business description'
        assert response.json.get('email') == None
        assert response.json.get('password') == None

    def test_patch_business(self, client):
        # set cookie with auth token

        client.set_cookie(key='Bearer', value=business_token, httponly=True,
                          samesite='None', secure=True, server_name='http://localhost:5000')
        headers = {'Content-Type': 'application/json'}
        response = client.patch("/api/business/1", headers=headers, data=json.dumps(
            {'name': 'test_business_patched', 'description': 'patched description'}))

        # check success status code
        assert response.status_code == 200

        # check response is porperly filled, exluding sesitive info
        assert response.json.get('name') == 'test_business_patched'
        assert response.json.get('description') == 'patched description'
        assert response.json.get('email') == None
        assert response.json.get('password') == None

    def test_delete_business(self, client, app):
        with app.app_context():
            businesses_previous_count = len(Business.query.all())
        # set auth cookie
        client.set_cookie(key='Bearer', value=business_token, httponly=True,
                          samesite='None', secure=True, server_name='http://localhost:5000')
        response = client.delete("/api/business/1")

        # check success status code
        assert response.status_code == 200
        with app.app_context():
            assert len(Business.query.all()) == businesses_previous_count - 1

    def test_get_offering(self, client):
        response = client.get('/api/offering/1')

        assert response.status_code == 200
        assert response.json.get('name') == 'test offering'
        assert response.json.get('description') == 'we offer this test'
        assert response.json.get('price') == 9.99

    def test_create_offering(self, client, app):
        with app.app_context():
            offerings_previous_length = len(Offering.query.all())

        headers = {'Content-Type': 'application/json'}
        response = client.post('/api/offering', headers=headers, data=json.dumps(
            {'name': 'burger', 'description': 'good burger', 'price': 10.99}))

        assert response.status_code == 201
        assert response.json.get('name') == 'burger'
        assert response.json.get('description') == 'good burger'
        assert response.json.get('price') == 10.99

        with app.app_context():
            assert len(Offering.query.all()) == offerings_previous_length + 1

    def test_get_business_offerings(self, client):
        response = client.get('/api/business-offerings/1')

        assert response.status_code == 200
        assert response.json == {
            'business_name': 'test_business', 'offerings': []}

    def test_create_business_offerings(self, client):
        # set auth cookie
        client.set_cookie(key='Bearer', value=business_token, httponly=True,
                          samesite='None', secure=True, server_name='http://localhost:5000')
        headers = {'Content-Type': 'application/json'}
        response = client.post('/api/business-offering/1', headers=headers, data=json.dumps(
            {'name': 'pizza', 'description': 'cheesy goodness', 'price': 14.99}))

        assert response.status_code == 200
        assert response.json.get('business_offerings') == [
            {'id': 2, 'name': 'pizza', 'description': 'cheesy goodness', 'price': 14.99, 'image_url': None}]

    def test_delete_business_offering(self, client, app):
        with app.app_context():
            offerings_previous_length = len(Offering.query.all())

        response = client.delete('/api/business-offering/1')

        assert response.status_code == 200
        with app.app_context():
            assert len(Offering.query.all()) == offerings_previous_length - 1

    def test_get_users(self, client):
        response = client.get('/api/users')
        assert response.status_code == 200
        assert response.json[0].get('user_id') == 1
        assert response.json[0].get('username') == 'test_user'
        assert len(response.json) == 1

    def test_get_users(self, client, app):
        client.set_cookie(key='Bearer', value=user_token, httponly=True,
                          samesite='None', secure=True, server_name='http://localhost:5000')
      
        response = client.post('/api/user/1', data={'name':'patcheduser'})
        assert response.status_code == 200
        assert response.json[0].get('user_id') == 1
        assert response.json[0].get('username') == 'test_user'
        assert len(response.json) == 1
