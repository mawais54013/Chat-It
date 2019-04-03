// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { withStyles } from '@material-ui/core/styles';
// import Header from './Components/header';

// const pStyle = {
//   textAlign: 'center',
// }


// class App extends Component {
  
//   render() {
    
//     return (
//       <div className='App'>
//       <Header />
//       <Grid container spacing={24}>
//         <Grid item xs={12}>
//           <Paper style={pStyle}>xs=12</Paper>
//         </Grid>
//         <Grid item xs={6}>
//           <Paper style={pStyle}>xs=6</Paper>
//         </Grid>
//         <Grid item xs={6}>
//           <Paper style={pStyle}>xs=6</Paper>
//         </Grid>
//         <Grid item xs={3}>
//           <Paper style={pStyle}>xs=3</Paper>
//         </Grid>
//         <Grid item xs={3}>
//           <Paper style={pStyle}>xs=3</Paper>
//         </Grid>
//         <Grid item xs={3}>
//           <Paper style={pStyle}>xs=3</Paper>
//         </Grid>
//         <Grid item xs={3}>
//           <Paper style={pStyle}>xs=3</Paper>
//         </Grid>
//       </Grid>
//       </div>
//     );
    
//   }
// }


// export default App;

import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";

import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material/css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: ""
    };

    this.pusher = new Pusher("0309639b3bc0d2427a18", {
      cluster: "eu",
      forceTLS: true
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });

    this.channel.bind("text-update", data => {
      const { id } = this.state;
      if(data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios 
        .post("http://localhost:3000/update-editor", data)
        .catch(console.error);
  };

  
}