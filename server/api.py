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
        # Return a success message
        return jsonify({"msg": "Success"}), 201

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
            # Return a success message
            return jsonify({"msg": "Success"}), 201
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
        t = error_message.find("DETAIL")
        return jsonify({"msg": error_message[t:]}), 406

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

@app.route('/subservices/all', methods=['GET'])
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



if __name__ == '__main__':
    app.run(debug=True)