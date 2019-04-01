// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Header from './Components/header';
// import { Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

// class App extends Component {

//   render() {
//     };
//     return (
      // <div className="App">
      // <Header/>

      // <Container>
      //   <Row>
      //     <Col>
      //         1 of 2
      //     </Col>
      //     <Col>2 of 2</Col>
      //   </Row>
      //   <Row>
      //     <Col>1 of 3</Col>
      //     <Col>2 of 3</Col>
      //     <Col>3 of 3</Col>
      //   </Row>
      // </Container>
      // </div>
//     );
//   }
// }

// export default App;
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Components/header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      width: '0',
      height: '0'
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  onChange(newValue, e) {
    //console.log('onChange', newValue, e);
  }
  updateWindowDimensions() {
    this.setState({ width: 500, height: 500 });
  }
  componentDidMount() {
    this.updateWindowDimensions();
  }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      <div className="App">
      <Header/>
      <Container>
        <Row>
          <Col sm={10}>
          <MonacoEditor
        height={this.state.height + 'px'}
        language="javascript"
        value={code}
        theme="vs-dark"
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
          </Col>
          <Col sm={2}>Facetime here</Col>
        </Row>
        <br/>
        <Row>
          <Col>chat area here</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
        <br/>
        <br/>
      </Container>
      </div>
    );
  }
}

export default App;