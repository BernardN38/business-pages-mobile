from flask import jsonify, request, Blueprint, make_response, Response
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from models import User, db
from auth_middleware import require_admin, token_required
from keys import secret_key
from flask_cors import CORS
import uuid
import jwt

auth = Blueprint('auth', __name__)
CORS(auth, supports_credentials=True)

@auth.post('/login')
def login():
    # creates dictionary of form data
    auth = request.form
    print(request.cookies)
    if not auth or not auth.get('username') or not auth.get('password'):
        # returns 401 if any usernameor / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    user = User.query.filter_by(username=auth.get('username')).first()
    
    if not user:
        # returns 401 if user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )
    print(user.is_admin)
    # verify user password
    if check_password_hash(user.password, auth.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'user_id': user.id,
            'is_admin':user.is_admin,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, secret_key, algorithm="HS256")
        
        resp =  make_response(jsonify({'token': jwt.decode(token, secret_key, algorithms="HS256")}), 200)
        resp.set_cookie('Bearer', value =  token, httponly = True)
        return resp
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )


@auth.post('/signup')
def signup():
    data = request.form
    username, password = data.get('username'), data.get('password')
    user = User.query.filter_by(username=username).first()

    if not user:
        new_user = User()
        for k, v in request.form.items():
            setattr(new_user, k, v)
        new_user.public_id = uuid.uuid4()
        new_user.is_admin = False
        new_user.password = generate_password_hash(password)
        db.session.add(new_user)
        db.session.commit()

        return make_response('Successfully registered.', 201)
    else:
        return make_response('User already exists. Please Log in.', 202)

@auth.get('/auth/test1')
@token_required
def test_auth(current_user):

    resp = make_response(jsonify(current_user.serialize))
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    
    return resp
