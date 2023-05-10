from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
import solution

app = Flask(__name__)

CORS(app)

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