import json
import re

from flask import Blueprint, jsonify, request

from service.grid_operations import get_grid

grid_blueprint = Blueprint('grid', __name__, url_prefix='/grid')

grid = json.loads(get_grid())


@grid_blueprint.route('/', methods=['POST'])
def reset_grid():
    return jsonify(json.loads(get_grid()))


@grid_blueprint.route('/change', methods=['POST'])
def change():
    x = request.json.get('x', None)
    y = request.json.get('y', None)
    color = request.json.get('color', None)

    if not x or not y or not color:
        return jsonify({'message': 'Invalid body'}), 400

    hex_regex = re.compile(
        r'^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')  # https://www.geeksforgeeks.org/check-if-a-given-string-is-a-valid-hexadecimal-color-code-or-not/

    if not bool(re.match(hex_regex, color)):
        return jsonify({'message': 'Invalid hex code (color)'})

    print('Before', grid[0][0])

    # Write to DB

    # Emit to users (websocket)

    print('After', grid[0][0])


@grid_blueprint.route('/test')
def test():
    return 'hello nested grid'
