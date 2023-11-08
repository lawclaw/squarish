import bcrypt
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_socketio import SocketIO, emit

from database_operations import user_exists, get_user, add_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'GNJFDGJ'
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True

jwt = JWTManager(app)

CORS(app, supports_credentials=True)

socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/api/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(email, password)

    if user_exists(email):
        return jsonify({"message": f"User {email} already exists, please log in!"}), 409
    else:
        hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        add_user(email, hashed_pass)
        return "200"


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not user_exists(email):
        return jsonify({"message": f"Invalid email or password"}), 404

    user = get_user(email)
    stored_password = user['password'].encode('utf-8')

    # pass check using hashing
    correct_password = stored_password == bcrypt.hashpw(password.encode('utf-8'), stored_password)

    if correct_password:
        access_token = create_access_token(identity=email)
        response = jsonify(access_token=access_token)
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return jsonify({"message": f"Invalid username or password"}), 404


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# End Jwt

@app.route('/api/user', methods=['POST', 'GET'])
@jwt_required()
def testCookie():
    return jsonify({'msg': "logged in"})


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@socketio.on('connect')
def connect():
    print(request.sid, 'connect')
    emit('test', {'data': f'id: {request.sid} is connected'})


if __name__ == '__main__':
    socketio.run(app, debug=True, port=3030, host='127.0.0.1')
