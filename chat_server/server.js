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
    // add id and type
    // stringify and broadcast
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
