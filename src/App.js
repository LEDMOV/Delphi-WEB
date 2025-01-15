// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './components/pages/Home';
import Flashcards from './components/pages/Flashcards';
import Podcasts from './components/pages/Podcasts';
import Chatbot from './components/pages/Chatbot';
import Notes from './components/pages/Notes';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
