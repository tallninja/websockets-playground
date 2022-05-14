let ws = new WebSocket('ws://localhost:5001');

ws.onmessage = (message) => console.log(`server: ${message.data}`);

if (ws.readyState) {
	ws.send('Hello server');
}
