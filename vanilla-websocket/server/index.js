const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer((req, res) => {
	console.log(req);
});

const ws = new WebSocketServer({
	httpServer: server,
});

let conn = null; // this is the connection to the websocket server

function sendEveryThreeSeconds() {
	conn.send('Hello!');
	setTimeout(sendEveryThreeSeconds, 3000);
}

// the client requests for ws connection
ws.on('request', (req) => {
	conn = req.accept(null, req.origin); // accept the client's request
	conn.on('open', (e) => console.log('Connection opened !')); // when we open a connection to a client
	conn.on('close', (e) => console.log('Connection closed !')); // when we close a connection to a client
	conn.on('message', (message) => {
		console.log(`client: ${message.utf8Data}`);
	}); // when we receive a message from a client
	sendEveryThreeSeconds();
});

const PORT = 5001 || process.env.PORT;
server.listen(PORT, () => {
	console.log('Info:', `Server listening on PORT: ${PORT}`);
});

server.on('error', (err) => {
	console.error(err);
});
