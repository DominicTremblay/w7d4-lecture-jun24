import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import messages from './lib/messages';

const useSocket = url => {
  const [state, setState] = useState(messages);
  const [socketServer, setSocketServer] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setSocketServer(new WebSocket(url));
    setConnected(true);
  }, [url]);

  useEffect(() => {
    if (connected) {
      socketServer.onopen = event => {
        console.log('Client connected to socket server');
      };
    }
    // return () => (socketServer.onopen = null);
  }, [connected, socketServer]);

  useEffect(() => {
    if (connected) {
      socketServer.onmessage = event => {
        const incomingMessage = JSON.parse(event.data);
        // this.updateMessages(incomingMessage);
      };
    }
  }, [connected, socketServer]);

  return {
    state,
    socketServer,
  };
};

const App = () => {
  const { state, socketServer } = useSocket('ws://localhost:8000');

  const sendMessage = () => {};

  const updateUser = () => {};

  return (
    <div>
      <NavBar />
      <MessageList messages={state.messages} />
      <ChatBar
        username={state.currentUser.name}
        sendMessage={sendMessage}
        updateUser={updateUser}
      />
    </div>
  );
};

export default App;
