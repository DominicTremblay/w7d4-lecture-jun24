const express = require('express');
const SocketServer = require('ws');

const PORT = process.env.port || 8000;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT: ${PORT}`)
);

const wss = new SocketServer.Server({ server });
