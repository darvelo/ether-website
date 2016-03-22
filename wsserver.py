from websocketserver import WebsocketServer
from threading import Thread

# Called for every client connecting (after handshake)
# def new_client(client, server):
# 	print("New client connected and was given id %d" % client['id'])
# 	server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
# def client_left(client, server):
# 	print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
# def message_received(client, server, message):
# 	if len(message) > 200:
# 		message = message[:200]+'..'
# 	print("Client(%d) said: %s" % (client['id'], message))

def start_websocket_server(server):
	# ws_server.set_fn_new_client(new_client)
	# server.set_fn_client_left(client_left)
	# server.set_fn_message_received(message_received)
	try:
		server.run_forever()
	except KeyboardInterrupt:
		server.close()

PORT=9001
ws_server = WebsocketServer(PORT)
thread = Thread(target=start_websocket_server, args=(ws_server,), daemon=True)
thread.start()