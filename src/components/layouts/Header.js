// src/components/layouts/Header.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 shadow flex justify-between items-center">
      <nav className="flex justify-center items-center space-x-4">
        <NavLink
          to="/flashcards"
          className={({ isActive }) =>
            `py-2 px-4 rounded transition duration-300 transform hover:scale-105 ${
              isActive ? 'shadow-lg' : ''
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(75 85 99)' : 'rgb(31 41 55)', // Match banner color with slight variation for active
          })}
        >
          Flashcards
        </NavLink>
        <NavLink
          to="/podcasts"
          className={({ isActive }) =>
            `py-2 px-4 rounded transition duration-300 transform hover:scale-105 ${
              isActive ? 'shadow-lg' : ''
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(75 85 99)' : 'rgb(31 41 55)', // Match banner color with slight variation for active
          })}
        >
          Podcasts
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 px-4 rounded transition duration-300 transform hover:scale-105 ${
              isActive ? 'shadow-lg' : ''
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(75 85 99)' : 'rgb(31 41 55)', // Match banner color with slight variation for active
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `py-2 px-4 rounded transition duration-300 transform hover:scale-105 ${
              isActive ? 'shadow-lg' : ''
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(75 85 99)' : 'rgb(31 41 55)', // Match banner color with slight variation for active
          })}
        >
          Chatbot
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `py-2 px-4 rounded transition duration-300 transform hover:scale-105 ${
              isActive ? 'shadow-lg' : ''
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(75 85 99)' : 'rgb(31 41 55)', // Match banner color with slight variation for active
          })}
        >
          Notes
        </NavLink>
      </nav>
      {user ? (
        <NavLink to="/profile" className="profile-link">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-pic" />
          ) : (
            <span className="profile-name">{user.displayName}</span>
          )}
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 transition duration-300 transform hover:scale-105 text-white"
        >
          Login
        </NavLink>
      )}
    </header>
  );
};

export default Header;
