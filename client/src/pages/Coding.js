// import React, { Component } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import Pusher from "pusher-js";
// import pushid from "pushid";
// import axios from "axios";
// import io from 'socket.io-client'

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
//       id: "",
//       html: "",
//       css: "",
//       js: "",
//       key1: localStorage.getItem('mainKey'),
//       key: sessionStorage.getItem("mainKey")
//     };

//     this.pusher = new Pusher("0309639b3bc0d2427a18", {
//       cluster: "us3",
//       forceTLS: false
//     });

//     this.channel = this.pusher.subscribe(`1`);
//   }

//   componentDidUpdate() {
//     this.runCode();
//   }

//   componentDidMount() {
//     this.setState({
//       id: pushid()
//     });

//     this.channel.bind(`${this.state.key1}`, data => {
//       const { id } = this.state;
//       if (data.id === id) return;

//       this.setState({
//         html: data.html,
//         css: data.css,
//         js: data.js,
//         name: this.state.key
//       });
//     });
//   }

  // syncUpdates = () => {
  //   const data = { ...this.state };

  //   // axios
  //   //   .post("http://localhost:5000/update-editor/" + `${this.state.key1}`, data)

  //   //   .then(function (res)
  //   //   {
  //   //     console.log(res);
  //   //   })
  //   //   .catch(console.error);
      
  // };

  // runCode = () => {
  //   const { html, css, js } = this.state;

  //   const iframe = this.refs.iframe;
  //   const document = iframe.contentDocument;
  //   const documentContents = `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //       <title>Document</title>
  //       <style>
  //         ${css}
  //       </style>
  //     </head>
  //     <body>
  //       ${html}

  //       <script type="text/javascript">
  //         ${js}
  //       </script>
  //     </body>
  //     </html>
  //   `;

  //   document.open();
  //   document.write(documentContents);
  //   document.close();
  // };

  // render() {

  //   console.log(this.state.key1)
  //   const { html, js, css } = this.state;
  //   const codeMirrorOptions = {
  //     theme: "material",
  //     lineNumbers: true,
  //     scrollbarStyle: null,
  //     lineWrapping: true
  //   };

  //   return (
  //     <div className="App">
  //       <section className="playground">
          // <div className="code-editor html-code">
          //   <div className="editor-header">HTML</div>
          //   <CodeMirror
          //     value={html}
          //     options={{
          //       mode: "htmlmixed",
          //       ...codeMirrorOptions
          //     }}
          //     onBeforeChange={(editor, data, html) => {
          //       this.setState({ html }, () => this.syncUpdates());
          //     }}
          //   />
          // </div>
          // <div className="code-editor css-code">
          //   <div className="editor-header">CSS</div>
          //   <CodeMirror
          //     value={css}
          //     options={{
          //       mode: "css",
          //       ...codeMirrorOptions
          //     }}
          //     onBeforeChange={(editor, data, css) => {
          //       this.setState({ css }, () => this.syncUpdates());
          //     }}
          //   />
          // </div>
          // <div className="code-editor js-code">
          //   <div className="editor-header">JavaScript</div>
          //   <CodeMirror
          //     value={js}
          //     options={{
          //       mode: "javascript",
          //       ...codeMirrorOptions
          //     }}
          //     onBeforeChange={(editor, data, js) => {
          //       this.setState({ js }, () => this.syncUpdates());
          //     }}
          //   />
          // </div>
  //       </section>
  //       <section className="result">
  //         <iframe title="result" className="iframe" ref="iframe" />
  //       </section>
  //     </div>
  //   );
  // }
// }

// export default CodingPage;


    
import React from "react";
import Header from "../Components/header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import axios from "axios";
import "./coding.css";
// import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/dracula.css");

export default class CodingPage extends React.Component {
  state = {
    code: "Loading...",
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


  render() {
    const hCode = this.state.code;
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
            onChange={this.onChange}
            options={{
              theme: "dracula",
              lineNumbers: true,
              readOnly: false,
              mode: "html"
            }}
          />
          </div>
          <iframe id="iframe" srcDoc={hCode}>
          <p>Your browser does not support iframes.</p>
        </iframe>
        </div>
      </React.Fragment>
    );
  }

}