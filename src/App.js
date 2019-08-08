import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import messages from './lib/messages';

const App = () => {
  // socket url is ws://localhost:8000

  const [state, setState] = useState(messages);

  const sendMessage = msg => {
    console.log(`new message: ${msg}`);
  };

  const updateUser = username => {
    console.log(`new username: ${username}`);
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
