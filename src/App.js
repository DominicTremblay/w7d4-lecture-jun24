import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import messages from './lib/messages';

const messageReducer = (state, action) => {
  const messageTypes = {
    incomingMessage: {
      ...state,
      messages: [...state.messages, action.message],
    },
    incomingNotification: {
      ...state,
      messages: [...state.messages, action.message],
    },
  };

  if (!messageTypes[action.type]) {
    throw new Error('Unknown message type');
  }

  return messageTypes[action.type];
};

const useSocket = url => {
  const [state, dispatch] = useReducer(messageReducer, messages);
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
    console.log('SocketServer', socketServer);

    if (connected) {
      socketServer.onmessage = event => {
        const incomingMessage = JSON.parse(event.data);
        console.log('Client reveived: ', incomingMessage);
        dispatch({ type: incomingMessage.type, message: incomingMessage });
      };
    }
    if (connected) {
      return () => (socketServer.onmessage = null);
    }
  }, [connected, socketServer]);

  return {
    state,
    socketServer,
  };
};

const App = () => {
  const { state, socketServer } = useSocket('ws://localhost:8000');

  const sendMessage = msg => {
    console.log(msg);
    const newMessage = {
      type: 'postMessage',
      content: msg,
      username: state.currentUser.name,
    };
    socketServer.send(JSON.stringify(newMessage));
  };

  const updateUser = username => {
    console.log(username);
    const newNotification = {
      type: 'postNotification',
      content: `${state.currentUser.name} has hanged their name to ${username}`,
    };
    socketServer.send(JSON.stringify(newNotification));
  };

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
