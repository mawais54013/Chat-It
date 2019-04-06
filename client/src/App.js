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

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css";
import { HomePage, CodingPage } from "./pages/";

class App extends Component {
  render() {
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