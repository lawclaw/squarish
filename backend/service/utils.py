import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()

baseUrl = os.getenv('DB_HOST_NAME') + '/api'
dbUrl = baseUrl + '/collections'


def db_request(endpoint, method=None, json=None):
    if method is None:
        method = 'GET'
    db_token = generate_db_token()

    if method == 'GET':
        return requests.get(dbUrl + endpoint, headers={'Authorization': 'Bearer {}'.format(db_token)})
    elif method == 'POST':
        return requests.post(dbUrl + endpoint, headers={'Authorization': 'Bearer {}'.format(db_token)}, json=json)
    elif method == 'PATCH':
        return requests.patch(dbUrl + endpoint, headers={'Authorization': 'Bearer {}'.format(db_token)}, json=json)


def generate_db_token():
    url = baseUrl + '/admins/auth-with-password'
    response = requests.post(url, data={'identity': os.getenv('DB_EMAIL'), 'password': os.getenv('DB_PASSWORD')})
    return response.json()['token']

