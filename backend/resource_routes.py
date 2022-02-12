from flask import jsonify,request, Blueprint
from models import Business, Offering, Review, User, BusinessReview,db
from auth_middleware import token_required
resources = Blueprint('resources', __name__)

#  create business
@resources.post("/api/business")
def create_business():
    new_business = Business()
    for k, v in request.json.items():
        setattr(new_business, k, v)
    db.session.commit()

    return jsonify(new_business.serialize)

# get list of all businesses


@resources.get("/api/business")
def get_businesses():
    businesses = [business.serialize for business in Business.query.all()]
    return jsonify(businesses)

# get single business


@resources.get("/api/business/<id>")
def get_business(id):
    business = Business.query.get(id)
    if not business:
        return jsonify({'message': f'no business found with id {id}'})
    return jsonify(business.serialize)

# update existing business


@resources.patch("/api/business/<id>")
def update_business(id):
    existingBusiness = Business.query.get(id)
    for k, v in request.json.items():
        setattr(existingBusiness, k, v)
    db.session.commit()
    return jsonify(existingBusiness.serialize)

# delete business


@resources.delete("/api/business/<id>")
def delete_business(id):
    Business.query.filter_by(id=id).delete()
    db.session.commit()
    success_resp = {"message": f"delete of business successful with id: {id}"}
    return jsonify(success_resp)


# offering CRUD

# get single offering by id
@resources.get('/api/offering/<id>')
def get_offering(id):
    offering = Offering.query.get(id)
    if not offering:
        return jsonify({'message': f'no offering found with id {id}'})
    return jsonify(offering.serialize)

# create offering


@resources.post('/api/offering')
def create_offering():
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    db.session.add(new_offering)
    db.session.commit()
    return jsonify(new_offering.serialize)

# update existing offering


@resources.patch('/api/offering/<id>')
def update_offering(id):
    existing_offering = Offering.query.get(id)
    for k, v in request.json.items():
        setattr(existing_offering, k, v)
    db.session.commit()
    db.session.commit()
    return jsonify(existing_offering.serialize)

# delete offering


@resources.delete('/api/offering/<id>')
def delete_offering(id):
    Offering.query.get(id).delete
    db.session.commit()
    success_resp = {"message": f"delete of business successful with id: {id}"}
    return jsonify(success_resp)


# business offering realationship CRUD

# get all oggerings of all businesses
@resources.get('/api/business-offerings')
def get_all_business_offerings():
    business_offerings = [{'business': business.name, 'offerings': business.serialize['business_offerings']}
                          for business in Business.query.all()]
    return jsonify(business_offerings)


# get all oferings for single business
@resources.get('/api/business-offerings/<id>')
def get_single_business_offerings(id):
    business = Business.query.get(id).serialize
    return jsonify({'business_name': business['name'], 'offerings': business['business_offerings']})


# all single ofering to a business by id
@resources.post('/api/business-offering/<id>')
def add_offering_business(id):
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    business = Business.query.get(id)
    business.business_offerings.append(new_offering)
    db.session.commit()
    return jsonify(business.serialize)

# delete an offering from business by offering id


@resources.delete('/api/business-offering/<id>')
def delete_business_offering(id):
    Offering.query.get(id).delete
    db.session.commit()
    success_resp = {
        "message": f"delete of business offering successful with id: {id}"}
    return jsonify(success_resp)

# may use later
# @app.delete("/api/business-offering")
# def get_business_offering_test(id):
#     business = Business.query.get(id)
#     serached_offering_idx = None
#     for idx, offering in enumerate(business.business_offerings):
#         if offering.id == 1:
#             serached_offering_idx = idx

#     if serached_offering_idx != None:
#         print("attempting delete")
#         business.business_offerings.pop(serached_offering_idx)
#         db.session.commit()

#     return jsonify(business.serialize)

# user CRUD
# create user


@resources.post('/api/user')
def create_user():
    new_user = User()
    for k, v in request.json.items():
        setattr(new_user, k, v)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize)

# get all users


@resources.get('/api/users')
def get_all_users():
    users = [user.serialize for user in User.query.all()]
    return jsonify(users)

# get single user


@resources.get('/api/user/<id>')
def get_single_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize)

# update single user


@resources.patch('/api/user/<id>')
def update_user(id):
    existing_user = User.query.get(id)
    for k, v in request.json.items():
        setattr(existing_user, k, v)
    db.session.commit()
    return jsonify(existing_user.serialize)

# delete single user


@resources.delete('/api/user/<id>')
def delete_user(id):
    existing_user = User.query.get(id)
    db.session.delete(existing_user)
    db.session.commit()
    success_resp = {'message': f'user deleted with id: {id}'}
    return jsonify(success_resp)


@resources.post('/api/business-review/<id>')
@token_required
def create_review(currentuser,*args):
    id = args[1]['id']

    new_review = Review()
    for k, v in request.json.items():
        setattr(new_review, k, v)
    new_review.user_id = currentuser.id
    db.session.add(new_review)
    db.session.commit()
    review = BusinessReview(user_id=currentuser.id,business_id=id,review_id=new_review.review_id)
    print(review)
    
    db.session.add(review)
    db.session.commit()
    return jsonify(review.serialize)
