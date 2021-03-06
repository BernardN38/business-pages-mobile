from urllib import response
from flask import jsonify, make_response, request, Blueprint
from models import Business, Offering, Review, User, BusinessReview, Message, DirectMessages, ReviewReply, Reply, MessagingIds, BusinessOffering, CarouselImage, db
from auth_middleware import token_required, require_admin
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


resources = Blueprint('resources', __name__)

CORS(resources,  supports_credentials=True)


@resources.get("/api/business")
def get_businesses():
    business_type = request.args['business_type']
    businesses = [business.serialize for business in Business.query.filter_by(
        business_type=business_type) if business]
    return jsonify(businesses)

# get single business


@resources.get("/api/business/<id>")
def get_business(id):
    business = Business.query.get(id)
    if not business:
        return jsonify({'message': f'no business found with id {id}'})
    print(business)
    return jsonify(business.serialize)
# get business profile


@resources.get("/api/business/<business_id>/profile")
@token_required
def get_business_profile(user, business_id):
    messages = DirectMessages.query.filter_by(
        reciever_id=user.messaging_id).all()
    business = user.serialize
    business['messages'] = [
        message.serialize for message in messages if message]
    return jsonify(business)

# update existing business


@resources.patch("/api/business/<id>")
@token_required
def update_business(user, id):
    print(request.json,'json')
    existingBusiness = Business.query.get(user.id)
    for k, v in request.json.items():
        setattr(existingBusiness, k, v)
    db.session.commit()
    return jsonify(existingBusiness.serialize)

# delete business


@resources.delete("/api/business/<id>")
@token_required
def delete_business(user,id):
    Business.query.filter_by(id=user.id).delete()
    db.session.commit()
    success_resp = {"message": f"delete of business successful with id: {id}"}
    return jsonify(success_resp)


# offering CRUD

# get single offering by id
@resources.get('/api/offering/<id>')
def get_offering(id):
    offering = Offering.query.get(id)
    if not offering:
        return jsonify({'message': f'no offering found with id {id}'}), 404
    return jsonify(offering.serialize)

# create offering


@resources.post('/api/offering')
def create_offering():
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    db.session.add(new_offering)
    db.session.commit()
    return jsonify(new_offering.serialize), 201

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
    BusinessOffering.query.filter_by(offering_id=id).delete()
    Offering.query.filter_by(id=id).delete()
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
@token_required
def add_offering_business(current_user, id):
    if str(current_user.id) != id:
        return jsonify({'message': 'unauthorized'}), 401
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    business = Business.query.get(current_user.id)
    business.business_offerings.append(new_offering)
    db.session.commit()
    return jsonify(business.serialize)

# delete an offering from business by offering id


@resources.delete('/api/business-offering/<id>')
def delete_business_offering(id):
    Offering.query.filter_by(id=id).delete()
    db.session.commit()
    success_resp = {
        "message": f"delete of business offering successful with id: {id}"}
    return jsonify(success_resp)


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
@token_required
def get_single_user(current_user, id):
    if not id:
        id = current_user.id
    if current_user.id != int(id) and current_user.is_admin == False:
        return jsonify('unathorized')
    user = User.query.get(id)
    resp = make_response(user.serialize)
    return resp

# update single user


@resources.post('/api/user/<id>')
@token_required
def update_user(current_user, id):
    excluded = ['password', 'username', 'is_admin']
    existing_user = User.query.get(current_user.id)
    password = request.form.get('password')
    if not password:
        return jsonify('unathorized'),401
    for k, v in request.form.items():
        if k in excluded:
            continue
        else:
            setattr(existing_user, k, v)
    if existing_user.verify_password(password):
        print('password verified')
        db.session.commit()
    else:
        print('inccorect password')
        db.session.rollback()

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
def create_review(currentuser, id):
    new_review = Review()

    for k, v in request.json.items():
        setattr(new_review, k, v)
    new_review.user_id = currentuser.id

    db.session.add(new_review)
    db.session.commit()

    review = BusinessReview(user_id=currentuser.id,
                            business_id=id, review_id=new_review.review_id)
    db.session.add(review)
    db.session.commit()
    return jsonify(review.serialize)


@resources.get('/api/ranks')
def get_ranks():
    from collections import defaultdict
    users = User.query.order_by(User.score.desc()).all()
    ranks = defaultdict(int)
    rank = 1
    for user in users:
        ranks[user.id] = rank
        rank += 1
    return jsonify(ranks)


@resources.get('/api/messages')
def get_messages():
    all_messages = [message.serialize for message in Message.query.all()]
    return jsonify(all_messages)


@resources.get('/api/user/<user_id>/messages')
def get_user_messages(user_id):
    user_messages_w_names = [message.serialize for message in DirectMessages.query.filter_by(
        reciever_id=user_id).all()]

    return jsonify(user_messages_w_names)


@resources.get('/api/review/<review_id>/replies')
def get_review_replies(review_id):
    business_review = BusinessReview.query.filter_by(
        review_id=review_id).first()
    replies = [reply.serialize for reply in business_review.replies]
    return jsonify(replies)


@resources.post('/api/message')
@token_required
def new_message(current_user):
    json = request.json
    print(current_user.messaging_id, json)
    new_message = Message(subject=json.get('subject'), body=json['body'])
    db.session.add(new_message)
    db.session.commit()
    new_direct_message = DirectMessages(
        message_id=new_message.id, sender_id=current_user.messaging_id, reciever_id=json['reciever_id'])
    if json.get('previous_message_id'):
        new_direct_message.previous_message_id = json['previous_message_id']
    db.session.add(new_direct_message)
    db.session.commit()
    return jsonify(json)


@resources.post('/api/review/<review_id>/reply')
@token_required
def review_reply(current_user, review_id):
    json = request.json
    print(json)
    new_reply = Reply(user_id=current_user.id, body=json['body'])
    business_review = BusinessReview.query.filter_by(
        review_id=review_id).first()
    business_review.replies.append(new_reply)
    db.session.commit()
    return jsonify(new_reply.serialize)


@resources.post('/api/business/carousel')
@token_required
def add_carousel_image(current_user):
    print(current_user.id)
    form = request.form
    form_urls = [form.get(item) for item in form]
    images = CarouselImage.query.filter_by(business_id=current_user.id).all()
    image_urls = [image.image_url for image in images]
    print(len(form_urls),len(image_urls))
    if len(form_urls) <= len(images):
        for idx,image in enumerate(images):
            image.image_url = form_urls[idx]

        db.session.commit()
    else:
        print('second case')
        for url in form_urls:
            if url not in image_urls:
               
                new_image = CarouselImage(
                        business_id=current_user.id, image_url=url)
                db.session.add(new_image)
                db.session.commit()
    return jsonify([image.serialize for image in images])


@resources.get('/api/business/<id>/carousel')
def get_carousel_images(id):
    images = [image.serialize for image in CarouselImage.query.filter_by(business_id=id)]
    return jsonify(images)