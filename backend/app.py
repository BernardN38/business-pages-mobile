from flask import Flask, jsonify, request
from models import Business, Offering, db
from operator import itemgetter

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///business_pages'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['JSON_SORT_KEYS'] = False

db.init_app(app)

# business CRUD

# create new business


@app.post("/api/business")
def create_business():
    data = request.json
    new_business = Business(name=data["name"])
    db.session.add(new_business)
    db.session.commit()

    return jsonify(new_business.serialize)

# get list of all businesses


@app.get("/api/business")
def get_businesses():
    businesses = [business.serialize for business in Business.query.all()]
    return jsonify(businesses)

# get single business


@app.get("/api/business/<id>")
def get_business(id):
    business = Business.query.get(id)
    return jsonify(business.serialize)

# update existing business


@app.patch("/api/business/<id>")
def update_business(id):
    existingBusiness = Business.query.get(id)
    for k, v in request.json.items():
        setattr(existingBusiness, k, v)
    db.session.commit()
    return jsonify(existingBusiness.serialize)

# delete business


@app.delete("/api/business/<id>")
def delete_business(id):
    Business.query.filter_by(id=id).delete()
    db.session.commit()
    success_resp = {"message": f"delete of business successful with id: {id}"}
    return jsonify(success_resp)


# offering CRUD

# get single offering by id
@app.get('/api/offering/<id>')
def get_offering(id):
    offering = Offering.query.get(id)
    return jsonify(offering.serialize)

# create offering


@app.post('/api/offering')
def create_offering():
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    db.session.add(new_offering)
    db.session.commit()
    return jsonify(new_offering.serialize)

# update existing offering


@app.patch('/api/offering/<id>')
def update_offering(id):
    existing_offering = Offering.query.get(id)
    for k, v in request.json.items():
        setattr(existing_offering, k, v)
    db.session.commit()
    db.session.commit()
    return jsonify(existing_offering.serialize)

# delete offering


@app.delete('/api/offering/<id>')
def delete_offering(id):
    Offering.query.get(id).delete
    db.session.commit()
    success_resp = {"message": f"delete of business successful with id: {id}"}
    return jsonify(success_resp)



# business offering realationship CRUD

@app.get('/api/business-offerings')
def get_all_business_offerings():
    business_offerings = [{'business':business.name,'offerings':business.serialize['business_offerings']} for business in Business.query.all()]
    return jsonify(business_offerings)

@app.get('/api/business-offerings/<id>')
def get_single_business_offerings(id):
    business = Business.query.get(id).serialize
    return jsonify({'business_name':business['name'],'offerings':business['business_offerings']})

@app.post('/api/business-offerings/<id>')
def add_offering_business(id):
    new_offering = Offering()
    for k, v in request.json.items():
        setattr(new_offering, k, v)
    business = Business.query.get(id)
    business.business_offerings.append(new_offering)
    db.session.commit()
    return jsonify(business.serialize)
