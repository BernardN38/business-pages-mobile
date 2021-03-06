from flask import request, jsonify
from keys import secret_key
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models import User,Business
from flask_cors import cross_origin


# decorator for verifying the JWT

def token_required(f, *args, **kwargs):
    @wraps(f, *args, **kwargs)
    def decorated(*args, **kwargs):
        print(request.cookies)
        token = request.cookies.get('Bearer')

        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, secret_key, algorithms="HS256")
            print(data)
            if data.get('user_id'):
                print('user')
                current_user = User.query.get(data['user_id'])
            elif data.get('business_id'):
                print('business')
                current_user = Business.query.get(data.get('business_id'))
                print(current_user,'test')
        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated


def require_admin(f, *args, **kwargs):

    @wraps(f, *args, **kwargs)
    def decorated(*args, **kwargs):
        user = args[0]
        if not user.is_admin:
            return jsonify({
                'message': 'unathorized'
            }), 401
        return f(user, args)

    return decorated
