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

# @app.route('/api/query', methods=['GET','POST'])
# def data():
#     data = request.json
#     print(data)
#     final_data = solution.question_answer(data["query"], data["fname"])  # calling user-build function
#     return jsonify({"msg": [final_data]}), 200
#
# @app.route('/api/summary', methods=['GET','POST'])
# def summary():
#     data = request.json
#     print(data)
#     fdata = solution.summery(data["fname"])     # calling user-build function
#     return jsonify({"msg": fdata}), 200
#
# @app.route('/upload', methods=['POST'])
# def upload():
#     if request.method == 'POST':
#         if 'file' not in request.files:
#             return jsonify({'error': 'no file'}), 400
#         file = request.files['file']
#         print(file)
#         if file.filename == '':
#             return jsonify({'error': 'no file name'}), 400
#         if file:
#             try:
#                 filename = file.filename
#                 file.save(os.path.join('/home/heekumar/PycharmProjects/Openai', filename))
#                 solution.open_file(filename)  # calling user-build function
#                 return jsonify({'success': 'file uploaded'}), 200
#             except Exception as e:
#                 return jsonify({"msg": "Unsupported File entered"}), 401
#         else:
#             return jsonify({'error': 'file not allowed'}), 400

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
    Service API
'''

# Create Service API
@app.route('/services/create', methods=['POST'],strict_slashes=False)
@cross_origin()
def create_service():
    data = request.json
    print(data)
    response = solution.create_services(data["name"], data["desc"])
    return jsonify({"msg":response}), 200

# Delete Service API
@app.route('/services/delete', methods=['DELETE','POST'])
def delete_service():
    data = request.json
    print(data)
    response = solution.delete_services(data["id"])
    return jsonify({"msg": response}), 200

# All Service API
@app.route('/services/all', methods=['GET'])
def all_resources():
    response = solution.all_services()
    print(response)
    return jsonify({"msg": response}), 200

# Get Service By Name
@app.route('/services/name', methods=['POST'])
def get_by_name():
    data = request.json
    print(data)
    response = solution.name_service(data['name'])
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)