// src/components/layouts/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 shadow">
    <nav className="flex justify-center items-center space-x-4">
      <Link
        to="/flashcards"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Flashcards
      </Link>
      <Link
        to="/podcasts"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Podcasts
      </Link>
      <Link
        to="/"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105"
      >
        Home
      </Link>
      <Link
        to="/chatbot"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Chatbot
      </Link>
      <Link
        to="/notes"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Notes
      </Link>
    </nav>
  </header>
);

export default Header;
