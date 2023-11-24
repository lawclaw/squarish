import json
from datetime import datetime

from service.utils import db_request


def add_grid(grid, name='home'):
    endpoint = '/grids/records'
    response = db_request(endpoint, json={'name': name, 'grid': json.dumps(grid)})


def change_grid_square(grid, grid_id, name='home'):
    endpoint = '/grids/records/' + grid_id
    response = db_request(endpoint, method='PATCH', json={'name': name, 'grid': json.dumps(grid)})
    return response


def get_grid(name='home'):
    # check if username exists
    endpoint = f"/grids/records?filter=(name='{name}')"

    response = db_request(endpoint)
    if len(response.json()['items']) > 0:
        return response.json()['items'][0]
    else:
        return None


def get_last_changed(user):
    if len(user['lastChanged']) == 0:
        return 0

    diff = abs(datetime.strptime(user['lastChanged'], '%Y-%m-%d %H:%M:%S.%fZ') - datetime.now())

    if diff.total_seconds() < 300:
        return diff.total_seconds()

    return 0
