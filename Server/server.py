import socket
import os
import dotenv
from flask import Flask, render_template
from queue import Queue
from threading import Thread

dotenv.load_dotenv()

httpServer = Flask(os.getenv('PROJECT_NAME'))
dataQueue = Queue()


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
    global dataQueue
    dataQueue.put(b'X')
    return render_template('index.html')


Thread(target=socketServer, args=(dataQueue,)).start()
httpServer.run(
    host=os.getenv('HOST'), port=int(os.getenv('HTTP_PORT')))
