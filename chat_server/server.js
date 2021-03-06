const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = process.env.port || 8000;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT: ${PORT}`)
);

const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', data => {
    // parse data
    const message = JSON.parse(data);
    console.log(message);
    // add id and type
    message.id = uuidv4();

    switch (message.type) {
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
      default:
        throw new Error('Unknown message type');
    }

    // stringify and broadcast
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
