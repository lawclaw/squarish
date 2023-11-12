import json

from service.utils import db_request

def add_grid(grid, name='home'):
    endpoint = '/grids/records'
    response = db_request(endpoint, {'name': name, 'grid': json.dumps(grid)})


def get_grid(name='home'):
    # check if username exists
    endpoint = f"/grids/records?filter=(name='{name}')"

    response = db_request(endpoint)
    if len(response.json()['items']) > 0:
        return response.json()['items'][0]['grid']
    else:
        return None
