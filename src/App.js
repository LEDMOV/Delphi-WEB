// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Flashcards from './components/pages/Flashcards';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/flashcards" component={Flashcards} />
      </Switch>
    </Router>
  );
}

export default App;
