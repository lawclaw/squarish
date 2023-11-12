import json
import re

from flask import Blueprint, jsonify, request

from flask_socketio import SocketIO, emit, join_room
from service.grid_operations import get_grid, change_grid_square

grid_blueprint = Blueprint('grid', __name__, url_prefix='/grid')


@grid_blueprint.route('/', methods=['POST'])
def reset_grid():
    return jsonify(json.loads(get_grid()))


@grid_blueprint.route('/change', methods=['POST'])
def change():
    row = request.json.get('row', None)
    col = request.json.get('col', None)
    color = request.json.get('color', None)
    if row is None or col is None or color is None:
        return jsonify({'message': 'Invalid body'}), 400

    hex_regex = re.compile(
        r'^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')  # https://www.geeksforgeeks.org/check-if-a-given-string-is-a-valid-hexadecimal-color-code-or-not/

    if not bool(re.match(hex_regex, color)):
        return jsonify({'message': 'Invalid hex code (color)'})

    # Write to local grid
    print('Before', grid[0][0])

    grid[row][col] = color

    print('After', grid[0][0])

    # Write to DB

    print(grid_id)

    response = change_grid_square(grid, grid_id)

    if response.ok:
        return jsonify({'message': f'Successfully changed color of square {row}, {col} to {color}'}), 200
    else:
        return jsonify({'message': response.json()['message']}), response.status_code

    # Emit to users (websocket)

    return 'dev'


@grid_blueprint.route('/test')
def test():
    return 'hello nested grid'
