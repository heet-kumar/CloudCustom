from flask import Flask, jsonify, request, abort
from flask_cors import CORS,cross_origin
import solution
import psycopg2
from psycopg2 import IntegrityError

app = Flask(__name__)

CORS(app)

class CustomException(Exception):
    def __init__(self, message):
        self.message = message

conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

@app.route('/')
def index():
    return 'Hello, world!'

'''
    Signup API
'''

@app.route('/signup', methods=['POST'], strict_slashes=False)
@cross_origin()
def create_user():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "INSERT into cloudusers(name,email,password) VALUES('" + data['name'] + "','" + data['email'] + "','" + data['password'] + "');"
        cur.execute(str_service)
        conn.commit()
        cur.close()
        return jsonify({"msg": "Success"}), 202

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        t = error_message.find("DETAIL")
        print("Check position : ",t)
        return jsonify({"msg": error_message[t:]}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

'''
    Login API
'''

@app.route('/login', methods=['GET','POST'], strict_slashes=False)
@cross_origin()
def login_user():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "SELECT * FROM cloudusers WHERE email='"+data['email']+"' AND password='"+data['password']+"';"
        cur.execute(str_service)
        rows = cur.fetchall()
        cur.close()
        if(len(rows)):
            return jsonify({"msg": "Success"}), 202
        else:
            raise IntegrityError("User Dosn't Exist")

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


'''
    Services API
'''

# Create Service API
@app.route('/services/create', methods=['POST'],strict_slashes=False)
@cross_origin()
def create_service():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "INSERT INTO services(name,dsc) VALUES('" + data['name'] + "','" + data['desc'] + "');"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        cur.close()
        return jsonify({"msg": "Success"}), 201

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


@app.route('/services/edit', methods=['PUT','POST'],strict_slashes=False)
@cross_origin()
def edit_service():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "UPDATE services SET name='"+data['name']+"', dsc='"+data['desc']+"' WHERE sid="+str(data['id'])+";"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        cur.close()
        return jsonify({"msg": "Success"}), 201

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


# Delete Service API
@app.route('/services/delete', methods=['DELETE','POST'])
def delete_service():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "DELETE from services where sid=" + str(data['id']) + ";"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        str_service = "DELETE from subservices where sid=" + str(data['id']) + ";"
        cur.execute(str_service)
        conn.commit()
        str_service = "DELETE from resources where sid=" + str(data['id']) + ";"
        cur.execute(str_service)
        conn.commit()
        return jsonify({"msg": "User Deleted Successfully"}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

# All Service API
@app.route('/services/all', methods=['GET'])
def all_service():
    try:
        cur = conn.cursor()
        str_services = "SELECT * FROM services;"
        cur.execute(str_services)
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "sid": row[0],
                "name": row[1],
                "desc": row[2]
            })
        print(result)
        return jsonify({"msg": result}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

# Get Service By Name
@app.route('/services/name', methods=['POST'])
def get_by_name_service():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "SELECT * FROM services WHERE name='" + data['name'] + "';"
        cur.execute(str_service)
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "sid": row[0],
                "name": row[1],
                "desc": row[2]
            })
        print(result)
        return jsonify(result), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

'''
    Sub-Services API
'''

# Get All Sub Service
@app.route('/subservices/all', methods=['GET','POST'])
def all_subservice():
    try:
        cur = conn.cursor()
        str_services = "SELECT * FROM subservices;"
        cur.execute(str_services)
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "ssid": row[0],
                "sid": row[1],
                "name": row[2],
                "desc": row[3],
                "columns": row[4]
            })
        print(result)
        return jsonify({"msg": result}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

# Create Sub service
@app.route('/subservices/create', methods=['POST'],strict_slashes=False)
@cross_origin()
def create_subservice():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "INSERT INTO subservices(sid,name,dsc,columns) VALUES(" + str(data['sid']) + ",'" + data['name'] + "','" + data['desc'] + "','" + data['columns'] + "');"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        cur.close()
        return jsonify({"msg": "Success"}), 201

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        t = error_message.find("DETAIL")
        return jsonify({"msg": error_message[t:]}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


# Delete Sub Service
@app.route('/subservices/delete', methods=['DELETE','POST'])
def delete_subservice():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "DELETE from subservices where ssid=" + str(data['id']) + ";"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        str_service = "DELETE from resources where ssid=" + str(data['id']) + ";"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        return jsonify({"msg": "User Deleted Successfully"}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

# Serach Sub Service By Name
@app.route('/subservices/name', methods=['POST'])
def get_by_name_subservice():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "SELECT * FROM subservices WHERE name='" + data['name'] + "';"
        cur.execute(str_service)
        rows = cur.fetchall()
        result = []
        for row in rows:
            print("Display : ",row)
            result.append({
                "ssid": row[0],
                "sid": row[1],
                "name": row[2],
                "desc": row[3],
                "columns": row[4]
            })
        print(result)
        return jsonify(result), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

'''
    Resource
'''

# Get All Resources
@app.route('/resources/all', methods=['GET','POST'])
def all_resources():
    try:
        cur = conn.cursor()
        str_services = "SELECT * FROM resources;"
        cur.execute(str_services)
        rows = cur.fetchall()
        result = []
        for row in rows:
            print("Testing : ",row)
            result.append({
                "id": row[0],
                "sid": row[1],
                "ssid": row[2],
                "name": row[3],
                "params": row[4]
            })
        # print(result)
        return jsonify({"msg": result}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


# Create Resources
@app.route('/resources/create', methods=['POST'],strict_slashes=False)
@cross_origin()
def create_resources():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "INSERT INTO resources(sid,ssid,name,params) VALUES(" + str(data['sid']) + "," + str(data['ssid']) + ",'" + data['name'] + "','" + data['params'] + "');"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        cur.close()
        return jsonify({"msg": "Success"}), 201

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        t = error_message.find("DETAIL")
        return jsonify({"msg": error_message[t:]}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500


@app.route('/resources/delete', methods=['DELETE','POST'])
def delete_resources():
    try:
        data = request.json
        print(data)
        cur = conn.cursor()
        str_service = "DELETE from resources where id=" + str(data['id']) + ";"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        return jsonify({"msg": "User Deleted Successfully"}), 200

    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        print("Check position : ",error_message)
        return jsonify({"msg": error_message}), 406

    except Exception as e:
        error_message = f"Error: {e}"
        conn.rollback()
        return jsonify({"msg": error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)