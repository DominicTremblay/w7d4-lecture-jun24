import React from 'react';
import './ChatBar.scss';

const ChatBar = ({ username, sendMessage, updateUser }) => {
  const handleKeyDown = () => {};

  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        name="username"
        placeholder="Your Name (Optional)"
        defaultValue={username}
        onKeyDown={handleKeyDown}
      />
      <input
        className="chatbar-message"
        name="message"
        placeholder="Type a message and hit ENTER"
        onKeyDown={handleKeyDown}
      />
    </footer>
  );
};

export default ChatBar;
