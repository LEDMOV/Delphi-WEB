// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/podcasts">Podcasts</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
