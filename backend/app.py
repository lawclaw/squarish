import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity, \
    jwt_required
from flask_socketio import SocketIO, emit

from blueprints.auth_blueprint import auth_blueprint
from blueprints.grid_blueprint import grid_blueprint

load_dotenv()

app = Flask(__name__)

# Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')  # Change this!
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True

jwt = JWTManager(app)
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins='*')

# Blueprints
api_blueprint = Blueprint('api', __name__, url_prefix='/api')
api_blueprint.register_blueprint(auth_blueprint)
api_blueprint.register_blueprint(grid_blueprint)

app.register_blueprint(api_blueprint)


@app.route("/test/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@socketio.on('connect')
def connect():
    print(request.sid, 'connect')

    print('lol')
    emit('test', {'data': f'id: {request.sid} is connected'})


if __name__ == '__main__':
    socketio.run(app, debug=True, port=3030, host='127.0.0.1')
