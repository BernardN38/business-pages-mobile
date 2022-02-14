from pickle import FALSE
from flask import request, jsonify
from keys import secret_key
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models import User
from flask_cors import cross_origin


# decorator for verifying the JWT

def token_required(f, *args, **kwargs):
    @wraps(f, *args, **kwargs)
    def decorated(*args, **kwargs):
        token = request.cookies.get('Bearer')
        print("token middleware",token)

        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, secret_key, algorithms="HS256")
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        # returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated

def require_admin(f, *args,**kwargs):
    
    @wraps(f,*args, **kwargs)
    def decorated(*args, **kwargs):
        user = args[0]
        if not user.is_admin:
            return jsonify({
                'message': 'unathorized'
            }), 401
        return f(user,args)
       

    return decorated
