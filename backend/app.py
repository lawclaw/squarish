from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'GNJFDGJ'
CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@socketio.on('connect')
def connect():
    print(request.sid, 'connect')
    emit('test', {'data': f'id: {request.sid} is connected'})


if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080, host='0.0.0.0')
