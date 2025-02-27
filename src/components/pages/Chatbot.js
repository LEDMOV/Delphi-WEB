import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(''); // Stores user input

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Ignore empty input

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Unfortunately, the Chatbot feature is currently under maintenance. Contact the developer if this issue persists.',
          sender: 'bot',
        },
      ]);
    }, 500); // Simulate a slight delay

    setInput(''); // Clear input field
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Conversations</h2>
        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form className="input-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;