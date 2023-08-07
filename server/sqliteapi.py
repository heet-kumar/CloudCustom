from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlitesolution as solution

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return "Hello World!!!"

'''SIGN-IN API'''

@app.route('/signup', methods=['POST'])
def create_user():
    try:
        data = request.json
        # print(data)
        msg = solution.create_user(data['name'],data['email'],data['password'])
        return jsonify({"msg":msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error ": str(e)}), 400
    except Exception as e:
        return jsonify({"Error ": str(e)}), 406

'''LOGIN API'''

@app.route('/login', methods=["POST"])
def login_user():
    try:
        data = request.json
        # print(data)
        msg = solution.login_user(data['email'],data['password'])
        return jsonify({"User": msg,"msg": "User Found Successfully"}), 200
    except solution.handle_exception as e:
        return jsonify({"Error ": str(e)}), 400
    except Exception as e:
        return jsonify({"Error ": str(e)}), 406

'''Services API'''

# all services
@app.route('/services/all', methods=["GET"])
def services_all():
    try:
        msg = solution.all_services()
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error ": str(e)}), 400
    except Exception as e:
        return jsonify({"Error ": str(e)}), 406

# create service
@app.route('/services/create', methods=["POST"])
def create_services():
    try:
        data = request.json
        # print(data)
        msg = solution.create_services(data['name'],data['dsc'])
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error ": str(e)}), 400
    except Exception as e:
        return jsonify({"Error ": str(e)}), 406

# delete services
@app.route('/services/delete/<int:id>', methods=["DELETE"])
def delete_sevices(id):
    try:
        print("ID to Delete : ",id)
        msg = solution.delete_services(id)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error ": str(e)}), 400
    except Exception as e:
        return jsonify({"Error ": str(e)}), 406

# edit services
@app.route('/services/edit', methods=['PUT'])
def edit_services():
    try:
        data = request.json
        print(data)
        msg = solution.edit_services(data['id'],data['name'],data['dsc'])
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406

# Service by name
@app.route('/services/name/<string:name>',methods=['GET'])
def service_by_name(name):
    try:
        print("Testing Name : ",name)
        msg = solution.service_by_name(name)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406



''' SubService API '''

# all subservices
@app.route('/subservices/all', methods=['GET'])
def all_subservices():
    try:
        msg = solution.all_subservices();
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406

# create subservices
@app.route('/subservices/create', methods=['POST'])
def create_subservices():
    try:
        data = request.json
        print(data)
        msg = solution.create_subservices(data["sid"],data["name"],data["dsc"],data["columns"])
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406

# edit subservice
@app.route('/subservices/edit', methods=['PUT'])
def edit_subservices():
    try:
        data = request.json
        print(data)
        msg = solution.edit_subservices(data["name"],data["dsc"],data["columns"],data["id"])
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406

# delete subservice
@app.route('/subservices/delete/<int:id>', methods=['DELETE'])
def delete_subservices(id):
    try:
        msg = solution.delete_subservices(id)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406

# subservice by name
@app.route("/subservices/name/<string:name>", methods=["GET"])
def subservices_by_name(name):
    try:
        msg = solution.subservices_by_name(name)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406


''' Resources API '''

@app.route('/resources/create', methods=['POST'])
def create_resources():
    try:
        data = request.json
        print("API Create :", data)
        msg = solution.create_resources(data['id'],data['sid'],data['ssid'],data['data'])
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406


@app.route('/resources/all/<int:id>', methods=['GET'])
def all_resources(id):
    try:
        msg = solution.all_resources(id)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406


@app.route('/resources/delete/<int:id>', methods=['DELETE'])
def delete_resources(id):
    try:
        msg = solution.delete_resources(id)
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406


@app.route('/resources/last',methods=['GET'])
def last_resources():
    try:
        msg = solution.last_resources()
        return jsonify({"msg": msg}), 200
    except solution.handle_exception as e:
        return jsonify({"Error": str(e)}), 400
    except Exception as e:
        return jsonify({"Error": str(e)}), 406
        

if __name__ == '__main__':
    app.run(debug=True)