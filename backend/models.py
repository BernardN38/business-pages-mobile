from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


business_offerings = db.Table('business_offerings',
                              db.Column('business_id', db.Integer, db.ForeignKey(
                                  'business.id'), primary_key=True),
                              db.Column('offering_id', db.Integer, db.ForeignKey(
                                  'offering.id'), primary_key=True),
                              db.Column('category', db.String),
                              )


class Business(db.Model):
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    business_offerings = db.relationship('Offering', secondary=business_offerings, lazy="joined",
                                         backref=db.backref('Business', lazy=True))

    def __repr__(self):
        return '<Name %r>' % self.name

    @property
    def serialize(self):
        """Return object data in serial format"""
        return {
            'business_id': self.id,
            'name': self.name,
            'business_offerings': [offering.serialize for offering in self.business_offerings]
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
