from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()


business_offerings = db.Table('business_offerings',
                              db.Column('business_id', db.Integer, db.ForeignKey(
                                  'business.id'), primary_key=True),
                              db.Column('offering_id', db.Integer, db.ForeignKey(
                                  'offering.id'), primary_key=True),
                              db.Column('category', db.String),
                              )
business_reviews = db.Table('business_reviews',
                            db.Column('business_id', db.Integer, db.ForeignKey(
                                'business.id')),
                            db.Column('user_id', db.Integer, db.ForeignKey(
                                'users.id')),
                            db.Column('review_id', db.Integer, db.ForeignKey(
                                'review.review_id')),
                            )

review_replies = db.Table('review_reply',
                          db.Column('business_review_id', db.Integer, db.ForeignKey(
                              'business_reviews.id')),
                          db.Column('reply_id', db.Integer, db.ForeignKey(
                              'reply.id')))

# carousel_image = db.Table('carousel_image',
#                           db.Column('business_id', db.Integer, db.ForeignKey('business.id')),
#                           db.Column('image_url', db.String)
# )
# user_direct_messages = db.Table('direct_messags',
#                             db.Column('business_id', db.Integer, db.ForeignKey(
#                                 'business.id')),
#                             db.Column('user_id', db.Integer, db.ForeignKey(
#                                 'users.id')),
#                             db.Column('message_id', db.Integer, db.ForeignKey(
#                                 'message.id')),
#                             )


class CarouselImage(db.Model):
    __tablename__ = 'carousel_image'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column('business_id', db.Integer,
                            db.ForeignKey('business.id'))
    image_url = db.Column(db.String(2048))

    @property
    def serialize(self):
        return {
            'id':self.id,
            'business_id': self.business_id,
            'image_url':self.image_url
        }


class Business(db.Model):
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(11))
    profile_image_url = db.Column(db.String(2048))
    rating = db.Column(db.Integer)
    address = db.Column(db.String(100))
    business_type = db.Column(db.String, nullable=False)
    messaging_id = db.Column(db.Integer, db.ForeignKey(
        'messaging_ids.id'))
    business_offerings = db.relationship('Offering', secondary=business_offerings, lazy="joined",
                                         backref=db.backref('Business', lazy=True))
    business_reviews = db.relationship('Review', secondary=business_reviews, lazy='joined',
                                       backref=db.backref('Business', lazy=True))
    

    def __repr__(self):
        return '<Name %r>' % self.name

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'business_id': self.id,
            'messaging_id': self.messaging_id,
            'name': self.name,
            'description': self.description,
            'business_type': self.business_type,
            'phone_number': self.phone_number,
            'profile_image_url': self.profile_image_url,
            'rating': self.rating,
            'address': self.address,
            'business_offerings': [offering.serialize for offering in self.business_offerings if offering],
            'business_reviews': [review.serialize for review in self.business_reviews if review],
            'carousel_images': [image.image_url for image in CarouselImage.query.filter_by(business_id=self.id)]
        }

    @property
    def full_serialize(self):
        ''' for later optimization'''
        return {
            'business_id': self.id,
            'messaging_id': self.messaging_id,
            'name': self.name,
            'description': self.description,
            'business_type': self.business_type,
            'phone_number': self.phone_number,
            'profile_image_url': self.profile_image_url,
            'rating': self.rating,
            'address': self.address,
            'business_offerings': [offering.serialize for offering in self.business_offerings if offering],
            'business_reviews': [review.serialize for review in self.business_reviews if review]
        }


class Offering(db.Model):
    __tablename__ = 'offering'
    id = db.Column(db.Integer, primary_key=True,)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=True)
    image_url = db.Column(db.String(2048), nullable=True)

    def __repr__(self):
        return f'<Name {self.name}>'

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url
        }


class BusinessOffering(db.Model):
    __tablename__ = 'business_offerings'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    business_id = db.Column('business_id', db.Integer, db.ForeignKey(
        'business.id'), primary_key=True)
    offering_id = db.Column('offering_id', db.Integer, db.ForeignKey(
        'offering.id'), primary_key=True)


class Review(db.Model):
    __tablename__ = 'review'
    review_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'))
    title = db.Column(db.String(30), nullable=True)
    body = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<Name {self.title}>'

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'review_id': self.review_id,
            'user_id': self.user_id,
            'user_profile_image': User.query.get(self.user_id).serialize['profile_image_url'],
            'title': self.title,
            'body': self.body,
            'rating': self.rating
        }


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    password = db.Column(db.String())
    email = db.Column(db.String())
    first_name = db.Column(db.String(25), nullable=True)
    last_name = db.Column(db.String(25), nullable=True)
    score = db.Column(db.Integer, nullable=True)
    profile_image_url = db.Column(db.String(2048), nullable=True)
    public_id = db.Column(db.String(50), unique=True)
    is_admin = db.Column(db.Boolean)
    messaging_id = db.Column('messaging_id', db.Integer, db.ForeignKey(
        'messaging_ids.id'))

    def __repr__(self):
        return f'<Name {self.username}>'

    def verify_password(self, test_password):
        return check_password_hash(self.password, test_password)

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'user_id': self.id,
            'is_admin': self.is_admin,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'score': self.score,
            'profile_image_url': self.profile_image_url,
            'reviews': [review.serialize for review in BusinessReview.query.join(User, BusinessReview.user_id == self.id).all() if review]
        }


class BusinessReview(db.Model):
    __tablename__ = 'business_reviews'
    __table_args__ = {'extend_existing': True}
    id = db.Column('id', db.Integer, primary_key=True)
    business_id = db.Column('business_id', db.Integer, db.ForeignKey(
        'business.id'))
    user_id = db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'))
    review_id = db.Column('review_id', db.Integer, db.ForeignKey(
        'review.review_id'))
    replies = db.relationship('Reply', secondary=review_replies, lazy='joined',
                              backref=db.backref('BusinessReview', lazy=True))

    def __repr__(self):
        return f'<Name {self.review_id}>'

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'user_id': self.user_id,
            'busines_id': self.business_id,
            'review_id': self.review_id,
        }


class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(30))
    body = db.Column(db.String(255))

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body
        }


class DirectMessages(db.Model):
    __tablename__ = 'direct_messages'
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column('message_id', db.Integer, db.ForeignKey(
        'message.id'))
    sender_id = db.Column('sender_id', db.Integer, db.ForeignKey(
        'messaging_ids.id'))
    reciever_id = db.Column('reciever_id', db.Integer, db.ForeignKey(
        'messaging_ids.id'))
    previous_message_id = db.Column(
        'previous_message_id', db.Integer, nullable=True)
    message_data = db.relationship(
        'Message', backref='DirectMessages', lazy='joined')
    # business_data = db.relationship('Business', lazy='joined')
    # user_data = db.relationship('User', lazy='joined')

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'id': self.id,
            'message_id': self.message_id,
            'sender_id': self.sender_id,
            'receiver_id': self.reciever_id,
            'sender_name': MessagingIds.query.get(self.sender_id).name,
            'reciever_name': MessagingIds.query.get(self.reciever_id).name,
            'body': self.message_data.body,
            'subject': self.message_data.subject,
        }

    @property
    def get_previous_message(self):
        previous_message = DirectMessages.query.filter_by(
            id=self.previous_message_id).first()
        if previous_message:
            return previous_message.serialize
        else:
            return None

    @property
    def get_names(self):
        """Return object data in serial format"""
        return {
            'id': self.id,
            'sender_name': MessagingIds.query.get(self.sender_id).name,
            'reciever_name': MessagingIds.query.get(self.reciever_id).name,
            'subject': self.message_data.subject,
            'body': self.message_data.body,
            'previous_message': self.get_previous_message
        }


class MessagingIds(db.Model):
    __tablename__ = 'messaging_ids'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class ReviewReply (db.Model):
    __tablename__ = 'review_reply'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    business_review_id = db.Column('business_review_id', db.Integer, db.ForeignKey(
        'business_reviews.id'))
    reply_id = db.Column('reply_id', db.Integer, db.ForeignKey('reply.id'))
    # reply = db.relationship('Reply', backref='ReviewReply', lazy='joined', overlaps="BusinessReview,replies")

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'id': self.id,
            'business_review_id': self.business_review_id,
            'reply_id': self.reply_id,
            # 'reply': self.reply.serialize
        }


class Reply (db.Model):
    __tablename__ = 'reply'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'))
    body = db.Column(db.String(100))
    user = db.relationship('User', backref='Reply', lazy='joined')

    @property
    def serialize(self):
        """Return object data in serial format"""
        user = self.user.serialize
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'username': user['username'],
            'profile_image_url': user['profile_image_url']
        }
