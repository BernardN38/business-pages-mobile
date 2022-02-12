from flask_sqlalchemy import SQLAlchemy

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


class Business(db.Model):
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(11))
    profile_image_url = db.Column(db.String(2048))
    rating = db.Column(db.Integer)
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
            'name': self.name,
            'description': self.description,
            'phone_number': self.phone_number,
            'profile_image_url': self.profile_image_url,
            'rating': self.rating,
            'business_offerings': [offering.serialize for offering in self.business_offerings if offering],
            'business_reviews': [review.serialize for review in self.business_reviews if review]
        }


class Offering(db.Model):
    __tablename__ = 'offering'
    id = db.Column(db.Integer, primary_key=True)
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

    def __repr__(self):
        return f'<Name {self.username}>'

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
            'profile_image_url': self.profile_image_url
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

    def __repr__(self):
        return f'<Name {self.review_id}>'

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'user_id': self.user_id,
            'busines_id':self.business_id,
            'review_id':self.review_id
        }   
