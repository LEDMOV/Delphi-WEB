// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Auth from './components/Auth';
import Flashcards from './components/pages/Flashcards';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/podcasts" element={<Podcasts />} /> {/* Add Podcasts component if needed */}
        <Route path="/chatbot" element={<Chatbot />} /> {/* Add Chatbot component if needed */}
        <Route path="/notes" element={<Notes />} /> {/* Add Notes component if needed */}
        <Route path="/" element={<Home />} /> {/* Add Home component if needed */}
      </Routes>
    </Router>
  );
}

export default App;
