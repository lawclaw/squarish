import requests

dbUrl = 'http://127.0.0.1:8090'


def generate_db_token():
    url = dbUrl + '/api/admins/auth-with-password'
    response = requests.post(url, data={"identity": "40507973@live.napier.ac.uk", "password": "1234567890"})
    return response.json()['token']


def user_exists(email):
    if get_user(email):
        return True
    else:
        return False


def get_user(email):
    url = dbUrl + f"/api/collections/users/records?filter=(email='{email}')"
    db_token = generate_db_token()
    # check if username exists
    response = requests.get(url, headers={'Authorization': 'Bearer {}'.format(db_token)})
    if len(response.json()['items']) > 0:
        return response.json()['items'][0]
    else:
        return None


def add_user(email, password):
    url = dbUrl + '/api/collections/users/records'
    db_token = generate_db_token()
    print(db_token)
    response = requests.post(url, headers={'Authorization': 'Bearer {}'.format(db_token)},
                             json={'email': email, 'password': str(password)})

    print(response.json())
