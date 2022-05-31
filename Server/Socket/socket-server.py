import socket
import os
import time
from queue import Queue
from threading import Thread

printQueue = Queue()
broadcastQueue = Queue()
returnDataQueue = Queue()


def clientServer(printQueue: Queue, returnDataQueue: Queue, broadcastQueue: Queue, client: socket, addr: str):
    try:
        while True:
            if not broadcastQueue.empty():
                client.send(broadcastQueue.get())
            time.sleep(0.001)
            clientData = client.recv(1)
            if clientData != None:
                returnDataQueue.put(clientData)
                printQueue.put(
                    f"[Socket] Client Receive: \"{clientData}\" From: {addr}")
    except:
        client.close()
        returnDataQueue.put(b'd')
        printQueue.put(f"[Socket] Client Disconnect From: {addr}")


def socketServer(printQueue: Queue, returnDataQueue: Queue, broadcastQueue: Queue):
    printQueue.put("[Socket] Start Socket Server")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((os.getenv('HOST'), int(os.getenv('SOCKET_PORT'))))
    sock.listen(int(os.getenv('SOCKET_CONNECTION_LIMIT')))
    clientQueue = Queue()
    while True:
        for i in range(clientQueue.qsize()):
            clientInQueue: Thread = clientQueue.get()
            if clientInQueue.is_alive():
                clientQueue.put(clientInQueue)
        client, addr = sock.accept()
        printQueue.put(
            f"[Socket] Current Alive Thread: {clientQueue.qsize()}")
        printQueue.put(f"[Socket] Client Connect From: {addr}")
        clientThread = Thread(target=clientBroadcastServer,
                              args=(printQueue, returnDataQueue, broadcastQueue, client, addr,))
        clientThread.start()
        clientQueue.put(clientThread)


def clientBroadcastServer(printQueue: Queue, returnDataQueue: Queue, broadcastQueue: Queue, client: socket, addr: str):
    try:
        while True:
            clientData = client.recv(1)
            if clientData != None:
                broadcastQueue.put(clientData)
                printQueue.put(
                    f"[Socket Broadcast] Client Receive: \"{clientData}\" From: {addr}")
            while not returnDataQueue.empty():
                client.sendall(returnDataQueue.get())
                printQueue.put(
                    f"[Socket Broadcast] Return: \"{clientData}\" To Client: {addr}")
    except:
        client.close()
        printQueue.put(f"[Socket Broadcast] Client Disconnect From: {addr}")


def socketBroadCastServer(printQueue: Queue, returnDataQueue: Queue, broadcastQueue: Queue):
    printQueue.put("[Socket Broadcast] Start Socket Broadcast Server")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((os.getenv('HOST'), int(os.getenv('SOCKET_BROADCAST_PORT'))))
    sock.listen(int(os.getenv('SOCKET_CONNECTION_LIMIT')))
    clientQueue = Queue()
    while True:
        for i in range(clientQueue.qsize()):
            clientInQueue: Thread = clientQueue.get()
            if clientInQueue.is_alive():
                clientQueue.put(clientInQueue)
        client, addr = sock.accept()
        printQueue.put(
            f"[Socket Broadcast] Current Alive Thread: {clientQueue.qsize()}")
        printQueue.put(f"[Socket Broadcast] Client Connect From: {addr}")
        clientThread = Thread(target=clientBroadcastServer,
                              args=(printQueue, returnDataQueue, broadcastQueue, client, addr,))
        clientThread.start()
        clientQueue.put(clientThread)


socketServerThread = Thread(target=socketServer, args=(
    printQueue, returnDataQueue, broadcastQueue,))
socketServerThread.start()
socketBroadCastServerThread = Thread(target=socketBroadCastServer, args=(
    printQueue, returnDataQueue, broadcastQueue,))
socketBroadCastServerThread.start()

while socketServerThread.is_alive() or socketBroadCastServerThread.is_alive():
    while not printQueue.empty():
        with open("SocketLog.txt", "a") as fp:
            fp.write(f"{printQueue.get()}\n")
    if not socketServerThread.is_alive():
        with open("SocketLog.txt", "a") as fp:
            fp.write("[Warning] Socket Server Thread Down\n")
        print("[Warning] Socket Server Thread Down")
    if not socketBroadCastServerThread.is_alive():
        with open("SocketLog.txt", "a") as fp:
            fp.write("[Warning] Socket Broadcast Server Thread Down\n")
    time.sleep(0.01)
