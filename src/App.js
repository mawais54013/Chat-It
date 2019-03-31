// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Header from './Components/header';
// import MonacoEditor from 'react-monaco-editor';
// import { Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       code: null
//     }
//   }

//   editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }

//   onChange(newValue, e) {
//     console.log('onChange', newValue, e);
//   }

//   render() {
//     const code = this.state.code;
//     const options = {
//       selectOnLineNumbers: true
//     };
//     return (
//       <div className="App">
//       <Header/>

//       <Container>
//         <Row>
//           <Col>
//           <MonacoEditor
//         width="800"
//         height="600"
//         language="mysql"
//         value={code}
//         options={options}
//         onChange={this.onChange}
//         editorDidMount={this.editorDidMount}
//       />
//           </Col>
//           <Col>2 of 2</Col>
//         </Row>
//         <Row>
//           <Col>1 of 3</Col>
//           <Col>2 of 3</Col>
//           <Col>3 of 3</Col>
//         </Row>
//       </Container>
//       </div>
//     );
//   }
// }

// export default App;

import React from 'react';
import MonacoEditor from 'react-monaco-editor';

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
    //console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    //console.log('onChange', newValue, e);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount() {
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
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
      <MonacoEditor
        height={this.state.height + 'px'}
        language="javascript"
        value={code}
        theme="vs-dark"
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default App;