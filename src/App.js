// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Auth from './components/Auth';
import Flashcards from './components/pages/Flashcards';
import Podcasts from './components/pages/Podcasts';
import Chatbot from './components/pages/Chatbot';
import Notes from './components/pages/Notes';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile'; // Import the Profile component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} /> {/* Add profile route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;