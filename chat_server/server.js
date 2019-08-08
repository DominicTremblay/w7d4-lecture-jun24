const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = process.env.port || 8000;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT: ${PORT}`)
);

const wss = new SocketServer.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', data => {
    // parse data
    const message = JSON.parse(data);
    // add id and type
    message.id = uuidv4();
    message.type = 'incomingMessage';
    // stringify and broadcast
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
