import bcrypt
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required

from service.auth_operations import user_exists, add_user, get_user

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blueprint.route('/signup', methods=["POST"])
def signup():
    email = str(request.json.get("email", None))
    password = str(request.json.get("password", None))
    print(len(email))
    if user_exists(email):
        return jsonify({"message": f"User {email} already exists, please log in!"}), 409
    elif len(email) == 0 or len(password) == 0:
        return jsonify({"message": f"Invalid credentials"}), 400
    else:
        hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        add_user(email, hashed_pass)
        return "200"


@auth_blueprint.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not user_exists(email):
        return jsonify({"message": f"Invalid email or password"}), 404

    user = get_user(email)
    stored_password = user['password'].encode('utf-8')

    # pass check using hashing
    correct_password = stored_password == bcrypt.hashpw(password.encode('utf-8'), stored_password)

    if correct_password:
        access_token = create_access_token(identity=email)
        response = jsonify(access_token=access_token)
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return jsonify({"message": f"Invalid username or password"}), 404


@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200
