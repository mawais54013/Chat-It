import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css";
import { HomePage, CodingPage } from "./pages/";

class App extends Component {
  render() {
    var http = require("http");
    setInterval(function() {
        http.get("http://codechat-v1.herokuapp.com");
        console.log('it works')
    }, 600000);
    return ( 
      <Router>
        <div className="App">
            <Route exact path="/" component={HomePage} />
            <Route path="/:sessionid" component={CodingPage} />
        </div>
      </Router>
    );
  }
}

export default App;

