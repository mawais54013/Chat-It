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
