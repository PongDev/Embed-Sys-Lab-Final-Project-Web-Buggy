import socket
import os
import time
from flask import Flask, render_template

httpServer = Flask(os.getenv('PROJECT_NAME'))
lastPush = 0
clientState = {"isOnline": False, "distance": 0}
clientStateRem = clientState.copy()
clientMode = None
clientModeChange = 0
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((os.getenv('SOCKET_HOST'), int(os.getenv('SOCKET_BROADCAST_PORT'))))


@httpServer.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@httpServer.route("/move/<direction>", methods=['POST'])
def move(direction):
    direction = str(direction)
    global lastPush
    global sock
    if (direction in ['w', 's', 'a', 'd'] and time.time() - lastPush > 0.001):
        lastPush = time.time()
        sock.sendall(bytes(direction, 'ascii'))
    elif (direction == "stop" and time.time() - lastPush > 0.001):
        lastPush = time.time()
        sock.sendall(bytes('x', 'ascii'))
    return ""


@httpServer.route("/state", methods=['GET'])
def state():
    global clientMode
    global clientModeChange
    global clientState
    global clientStateRem
    global sock

    while True:
        data = sock.recv(1)
        if data == None:
            break
        data = data.decode('ascii')
        with open("WebLog.txt", "a") as fp:
            fp.write(f"Receive Data From Client Data Queue: {data}\n")
        if data == 'c':
            clientState['isOnline'] = True
            clientModeChange = 0
        elif data == 'd':
            clientState['isOnline'] = False
            clientModeChange = 0
        if clientModeChange == 0:
            if data == 'u':
                clientMode = 'u'
                clientModeChange = 3
                clientState['distance'] = 0
        elif clientModeChange > 0 and clientMode == 'u':
            clientState['distance'] *= 10
            clientState['distance'] += int(data)
            clientModeChange -= 1
        if clientModeChange == 0:
            clientMode = None
            clientStateRem = clientState.copy()
    return clientStateRem


with open("WebLog.txt", "w") as fp:
    fp.write(f"Start Web Log\n")
httpServer.run(
    host=os.getenv('HOST'), port=int(os.getenv('HTTP_PORT')))
