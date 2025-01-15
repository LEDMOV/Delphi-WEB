// src/components/layouts/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 shadow">
    <nav className="flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/flashcards" className="hover:underline transition duration-300 transform hover:scale-105">Flashcards</Link>
        <Link to="/podcasts" className="hover:underline transition duration-300 transform hover:scale-105">Podcasts</Link>
      </div>
      <div className="flex-1 text-center">
        <Link to="/" className="hover:underline transition duration-300 transform hover:scale-105">Home</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/chatbot" className="hover:underline transition duration-300 transform hover:scale-105">Chatbot</Link>
        <Link to="/notes" className="hover:underline transition duration-300 transform hover:scale-105">Notes</Link>
      </div>
    </nav>
  </header>
);

export default Header;
