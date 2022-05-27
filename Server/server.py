import socket
import os
import time
import dotenv
from flask import Flask, render_template
from queue import Queue
from threading import Thread

dotenv.load_dotenv()

httpServer = Flask(os.getenv('PROJECT_NAME'))
dataQueue = Queue()
lastPush = 0


def socketServer(dataQueue: Queue):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((os.getenv('HOST'), int(os.getenv('SOCKET_PORT'))))
    sock.listen(0)
    while True:
        client, addr = sock.accept()
        print("[Socket] Client Connect")
        try:
            while True:
                if not dataQueue.empty():
                    client.send(dataQueue.get())
        except:
            client.close()


@httpServer.route("/")
def index():
    return render_template('index.html')


@httpServer.route("/move/<direction>")
def move(direction):
    direction = str(direction)
    global dataQueue
    global lastPush
    if (direction in ['w', 's', 'a', 'd'] and time.time()-lastPush > 0.01):
        lastPush = time.time()
        dataQueue.put(bytes(direction, 'ascii'))
    return ""


Thread(target=socketServer, args=(dataQueue,)).start()
httpServer.run(
    host=os.getenv('HOST'), port=int(os.getenv('HTTP_PORT')))
