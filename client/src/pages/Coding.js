// import React, { Component } from "react";
// // import { Controlled as CodeMirror } from "react-codemirror2";
// import CodeMirror from "react-codemirror";
// import Pusher from "pusher-js";
// import pushid from "pushid";
// import axios from "axios";
// // import io from 'socket.io-client'

// // import "./App.css";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";

// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/css/css";
// import "codemirror/mode/javascript/javascript";


// class CodingPage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       html: "",
//       js: "",
//     };
//   }

//   componentDidUpdate() {
//     this.runCode();
//   }

//   syncUpdates = () => {
//     const data = { ...this.state };    
//   };

//   runCode = () => {
//     const { html, js } = this.state;

//     const iframe = this.refs.iframe;
//     const document = iframe.contentDocument;
//     const documentContents = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>Document</title>
//       </head>
//       <body>
//         ${html}

//         <script type="text/javascript">
//           ${js}
//         </script>
//       </body>
//       </html>
//     `;

//     document.open();
//     document.write(documentContents);
//     document.close();
//   };

//   render() {

//     const { html, js } = this.state;
//     const codeMirrorOptions = {
//       theme: "material",
//       lineNumbers: true,
//       scrollbarStyle: null,
//       lineWrapping: true
//     };

//     return (
//       <div className="App">
//         <section className="playground">
//           <div className="code-editor html-code">
//             <div className="editor-header">HTML</div>
//             <CodeMirror
//               value={html}
//               options={{
//                 mode: "htmlmixed",
//                 ...codeMirrorOptions
//               }}
//               onBeforeChange={(editor, data, html) => {
//                 this.setState({ html }, () => this.syncUpdates());
//               }}
//             />
//           </div>
//           <div className="code-editor js-code">
//             <div className="editor-header">JavaScript</div>
//             <CodeMirror
//               value={js}
//               options={{
//                 mode: "javascript",
//                 ...codeMirrorOptions
//               }}
//               onBeforeChange={(editor, data, js) => {
//                 this.setState({ js }, () => this.syncUpdates());
//               }}
//             />
//           </div>
//         </section>
//         <section className="result">
//           <iframe title="result" className="iframe" ref="iframe" />
//         </section>
//       </div>
//     );
//   }
// }

// export default CodingPage;

// next is to work on chat and webrtc features
    
import React from "react";
import Header from "../Components/header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
// import Webcam from "react-webcam";
import "./coding.css";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/dracula.css");

export default class CodingPage extends React.Component {
  state = {
    html: '',
    code: "Loading...",
    code1: `<h1 id='demo'></h1>`,
    cursorPosition: {
      line: 0,
      ch: 0
    }
  };

  componentDidMount = () => {

    const { params } = this.props.match;
    let self = this;
    database()
      .ref("/code-sessions/" + params.sessionid)
      .once("value")
      .then(snapshot => {
        self.setState({ code: snapshot.val().content + "", createdon: snapshot.val().createdon }, () => {
          let content = snapshot.val().content;

          self.codemirror.getCodeMirror().setValue(content);
        });
        this.codeRef = database().ref("code-sessions/" + params.sessionid);
        this.codeRef.on("value", function(snapshot) {
          self.setState({
            code: snapshot.val().content
          });
          var currentCursorPos = self.state.cursorPosition;
          self.codemirror.getCodeMirror().setValue(snapshot.val().content);
          self.setState({ cursorPosition: currentCursorPos });
          self.changeCursorPos();
        });
      })
      .catch(e => {
        self.codemirror.getCodeMirror().setValue("No Sessions Found!");
      });
  };
  changeCursorPos = () => {
    const { line, ch } = this.state.cursorPosition;
    this.codemirror.getCodeMirror().doc.setCursor(line, ch);
  };
  onChange = (newVal, change) => {
    // console.log(newVal, change);
    this.setState(
      {
        cursorPosition: {
          line: this.codemirror.getCodeMirror().doc.getCursor().line,
          ch: this.codemirror.getCodeMirror().doc.getCursor().ch
        }
      },
      () => {}
    );
    this.codeRef.child("content").set(newVal);
  };

onChange1(data) {
  this.setState({
    code1: data,
  })
  this.runCode();
}

componentDidUpdate() {
  this.runCode();
}

runCode = () => {
  const { code, code1 } = this.state;

  const iframe = this.refs.iframe;
  const document = iframe.contentDocument;
  const documentContents = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      ${code1}

      <script type="text/javascript">
        ${code}
      </script>
    </body>
    </html>
  `;

  document.open();
  document.write(documentContents);
  document.close();
};

  render() {
    const { html } = this.state;

    return (
      <React.Fragment>
        <Header
          style={{ background: "#1d1f27" }}
          extras={
            <div>
              {this.state.createdon
                ? `Created On: ${this.state.createdon}`
                : ""}
            </div>
          }
        />
        <div className="coding-page">
        <div className="codeArea">
          <CodeMirror
            ref={r => (this.codemirror = r)}
            className="code-mirror-container"
            value={this.state.code}
            // value={js}
            onChange={this.onChange}
            options={{
              theme: "dracula",
              lineNumbers: true,
              readOnly: false,
              mode: "javascript"
            }}

          />
          </div>
          <div>
          <CodeMirror
            value={this.state.code1}
            onChange={value => { this.onChange1(value) }}
            // value={html}
            options={{
              mode: 'htmlmixed',
              theme: 'dracula',
              lineNumbers: true,
              readOnly: false,
            }}
          />
          </div>
        <section className="result" id="iframe">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        </div>
        <div>
        {/* <Webcam /> */}
        </div>
      </React.Fragment>
    );
  }

}