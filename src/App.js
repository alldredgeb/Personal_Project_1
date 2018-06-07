import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import Overall from './components/Overall';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Overall />
      </Router>
      </div>
    );
  }
}

export default App;
