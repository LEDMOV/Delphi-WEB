// src/components/layouts/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <nav className="flex justify-center space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/flashcards" className="hover:underline">Flashcards</Link>
      <Link to="/podcasts" className="hover:underline">Podcasts</Link>
      <Link to="/chatbot" className="hover:underline">Chatbot</Link>
      <Link to="/notes" className="hover:underline">Notes</Link>
    </nav>
  </header>
);

export default Header;
