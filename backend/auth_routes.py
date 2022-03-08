from flask import jsonify, request, Blueprint, make_response, Response
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from models import User, MessagingIds, Business, db
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
    print(request.cookies,'cookies')
    if not auth or not auth.get('username') or not auth.get('password'):
        print('no username or password')
        # returns 401 if any usernameor / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    user = User.query.filter_by(username=auth.get('username')).first()
    
    if not user:
        print('no username or password')
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
        resp.set_cookie('Bearer', value =  token, httponly = True, samesite='None', secure=True)
        print(resp.json)
        return resp
    else:
        print('inccorect password token not set')
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )

@auth.post('/business/login')
def business_login():
    # creates dictionary of form data
    auth = request.form
    print(request.cookies,'cookies')
    if not auth or not auth.get('email') or not auth.get('password'):
        print('no email or password')
        # returns 401 if any usernameor / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    business = Business.query.filter_by(email=auth.get('email')).first()
    
    if not business:
        print('no business email or password')
        # returns 401 if user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )
    # verify user password
    if check_password_hash(business.password, auth.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'business_id': business.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, secret_key, algorithm="HS256")
        resp =  make_response(jsonify({'token': jwt.decode(token, secret_key, algorithms="HS256")}), 200)
        resp.set_cookie('Bearer', value =  token, httponly = True, samesite='None', secure=True)
        print(resp.json)
        return resp
    else:
        print('inccorect password token not set')
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )

@auth.post('/signup')
def signup():
    data = request.form
    print(data)
    username, password = data.get('username'), data.get('password')
    print(username,password)
    if not username and password:
        return make_response('no username or password provided'),400
    user = User.query.filter_by(username=username).first()

    if not user:
        new_user = User()
        for k, v in request.form.items():
            setattr(new_user, k, v)
        new_user.public_id = uuid.uuid4()
        new_user.is_admin = False
        new_user.password = generate_password_hash(password)
        new_messaging_id = MessagingIds()
        db.session.add(new_messaging_id)
        db.session.commit()

        new_user.messaging_id = new_messaging_id.id
        db.session.add(new_user)
        db.session.commit()
        token = jwt.encode({
            'user_id': new_user.id,
            'is_admin':new_user.is_admin,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, secret_key, algorithm="HS256")
        resp =  make_response(jsonify({'token': jwt.decode(token, secret_key, algorithms="HS256")}), 201)
        resp.set_cookie('Bearer', value =  token, httponly = True, samesite='None', secure=True)

        return resp
    else:
        return make_response('User already exists. Please Log in.', 202)

@auth.post("/api/business/signup")
def create_business():
    new_business = Business()
    for k, v in request.form.items():
        setattr(new_business, k, v)
    if request.form.get('password'):
        new_business.password = generate_password_hash(
            request.form['password'])
    new_messaging_id = MessagingIds(name=request.form['name'])
    db.session.add(new_messaging_id)
    db.session.commit()
    new_business.messaging_id = new_messaging_id.id
    db.session.add(new_business)
    db.session.commit()

    return jsonify(new_business.serialize), 201

@auth.get('/api/checkin')
@token_required
def test_auth(token_user):
    token = request.cookies.get('Bearer')
        # return 401 if token is not passed
    if not token:
        return jsonify({'message': 'Token is missing !!'}), 401

    try:
            # decoding the payload to fetch the stored details
        data = jwt.decode(token, secret_key, algorithms="HS256")
    except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401
            
    return jsonify(data)
