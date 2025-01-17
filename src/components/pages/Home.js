// src/components/pages/Home.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Delphi!</h1>
        <p>Your go-to platform for flashcards, podcasts, and more.</p>
        <nav className="home-nav">
          <NavLink to="/flashcards" className="home-link">Flashcards</NavLink>
          <NavLink to="/podcasts" className="home-link">Podcasts</NavLink>
          <NavLink to="/chatbot" className="home-link">Chatbot</NavLink>
          <NavLink to="/notes" className="home-link">Notes</NavLink>
        </nav>
      </header>
      <main className="home-main">
        <section className="feature">
          <h2>Explore Flashcards</h2>
          <p>Create, save, and study your flashcards with ease.</p>
        </section>
        <section className="feature">
          <h2>Listen to Podcasts</h2>
          <p>Discover insightful podcasts on various topics.</p>
        </section>
        <section className="feature">
          <h2>Chat with Delphi</h2>
          <p>Get assistance and answers from our AI-powered chatbot.</p>
        </section>
        <section className="feature">
          <h2>Manage Your Notes</h2>
          <p>Keep all your notes organized in one place.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
