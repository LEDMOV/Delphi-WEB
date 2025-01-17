// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layouts/Header';
import Auth from './components/Auth';
import Flashcards from './components/pages/Flashcards';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/flashcards" component={Flashcards} />
        <Route path="/podcasts" component={Podcasts} /> {/* Add Podcasts component if needed */}
        <Route path="/chatbot" component={Chatbot} /> {/* Add Chatbot component if needed */}
        <Route path="/notes" component={Notes} /> {/* Add Notes component if needed */}
        <Route exact path="/" component={Home} /> {/* Add Home component if needed */}
      </Switch>
    </Router>
  );
}

export default App;
