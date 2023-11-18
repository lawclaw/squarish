from service.utils import db_request


def user_exists(email):
    if get_user(email):
        return True
    else:
        return False


def get_user(email):
    response = db_request(f"/users/records?filter=(email='{email}')")
    if len(response.json()['items']) > 0:
        return response.json()['items'][0]
    else:
        return None


def add_user(email, password):
    endpoint = '/users/records'
    response = db_request(endpoint, method='POST', json={'email': email, 'password': str(password)})
    print(response.json())


def change_user(user):
    response = db_request(f"/users/records/{user['id']}", 'PATCH', json=user)
