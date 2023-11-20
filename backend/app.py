import json
import os
import re
from datetime import timedelta, datetime

from dotenv import load_dotenv
from flask import Flask, jsonify, Blueprint, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity, \
    jwt_required
from flask_socketio import SocketIO, emit

from blueprints.auth_blueprint import auth_blueprint
from service.auth_operations import get_user, change_user
from service.grid_operations import get_grid, change_grid_square, get_last_changed

load_dotenv()

app = Flask(__name__)

# Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)

jwt = JWTManager(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')

# Blueprints
api_blueprint = Blueprint('api', __name__, url_prefix='/api')
api_blueprint.register_blueprint(auth_blueprint)

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


initial_grid_data = get_grid()
grid = json.loads(initial_grid_data['grid'])
grid_id = initial_grid_data['id']


@socketio.on('change_color')
@jwt_required(optional=True)
def change_color(data):
    # JWT verification
    email = get_jwt_identity()
    if email is None:
        emit('change_color', {'message': 'User not authenticated', 'code': 401})
        return make_response('N/A'), 401

    # Timeout
    user = get_user(email)

    if user is None:
        emit('change_color', {'message': 'Invalid user'})
        return make_response('N/A'), 401

    last_changed = get_last_changed(user)

    if last_changed != 0:
        emit('change_color',
             {'message': f'You can change a square in {round(300 - last_changed)} seconds', 'last_changed': last_changed})
        return make_response('N/A'), 401

    row = data['row']
    col = data['col']
    color = data['color']

    print(row, col, color)

    if row is None or col is None or color is None:
        return

    hex_regex = re.compile(
        r'^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')  # https://www.geeksforgeeks.org/check-if-a-given-string-is-a-valid-hexadecimal-color-code-or-not/

    if not bool(re.match(hex_regex, color)):
        return

    # Update timeout
    user['lastChanged'] = datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S.%f')[:-3] + 'Z'
    change_user(user)


    # Emit to other clients
    emit('change_color', data, broadcast=True, include_self=False)

    # Write to local grid
    grid[row][col] = color

    # Write to DB
    change_grid_square(grid, grid_id)


@socketio.on('connect')
def connect():
    emit('connected', json.dumps(grid))
    pass


@socketio.on('disconnect')
def disconnect():
    pass


if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080, host='0.0.0.0')
