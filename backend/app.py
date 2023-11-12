import json
import os
import re

from dotenv import load_dotenv
from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity, \
    jwt_required
from flask_socketio import SocketIO, leave_room, emit

from blueprints.auth_blueprint import auth_blueprint
from blueprints.grid_blueprint import grid_blueprint
from service.grid_operations import get_grid, change_grid_square

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




initial_grid_data = get_grid()
grid = json.loads(initial_grid_data['grid'])
grid_id = initial_grid_data['id']

room = {
    'members': 0,
    'grid': grid,
}
@socketio.on('color_change')
def test(data):
    print(data)
    row = data['row']
    col = data['col']
    color = data['color']

    if row is None or col is None or color is None:
        return

    hex_regex = re.compile(
        r'^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')  # https://www.geeksforgeeks.org/check-if-a-given-string-is-a-valid-hexadecimal-color-code-or-not/

    if not bool(re.match(hex_regex, color)):
        return

    # Write to local grid
    print('Before', grid[0][0])

    grid[row][col] = color

    print('After', grid[0][0])

    # Write to DB
    response = change_grid_square(grid, grid_id)

    # Emit to other clients
    emit('test', data, broadcast=True, include_self=False)


# TODO: Websocket auth since cookies dont work for it
@socketio.on('connect')
def connect():
    pass


@socketio.on('disconnect')
def disconnect():
    pass



if __name__ == '__main__':
    socketio.run(app, debug=True, port=3030, host='127.0.0.1')
