// import React, { Component } from "react";
// import logo from "./logo.svg";
// // import { Row, Col, Container } from 'react-bootstrap';
// // import Header from './Components/header';
// import { SplitButton, MenuItem } from 'react-bootstrap';
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Header/>
//       <Container>
//         <Row>
//           <Col sm={10}>
//           </Col>
//           <Col sm={2}>Facetime here</Col>
//         </Row>
//         <br/>
//         <Row>
//           <Col>chat area here</Col>
//           <Col>2 of 3</Col>
//           <Col>3 of 3</Col>
//         </Row>
//         <br/>
//         <br/>
//       </Container>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/header';

const pStyle = {
  textAlign: 'center',
}


class App extends Component {
  
  render() {
    
    return (
      <div className='App'>
      <Header />
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper style={pStyle}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>xs=3</Paper>
        </Grid>
      </Grid>
      </div>
    );
    
  }
}


export default App;