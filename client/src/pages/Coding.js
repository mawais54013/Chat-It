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


// ==================================================================================
    
import React from "react";
import Header from "../Components/header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import Party from '../Components/Party'
import { getRandomRGB } from '../Components/util';
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
    }, 
    startChat: false,
    nick: '',
    roomName: '',
    sharing: false,
    windowColor: getRandomRGB(),
    iOS: false,
    startVideo: false,
    chooseColor: false,
  };

  componentDidMount = () => {
    this.setUp();

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

setUp = () => {
  this.checkiOS();
  if(window.innerWidth > 800) this.roomNameInput.focus();
  if(window.location.hash && window.location.hash.length > 1) {
    this.setState({ roomName: window.location.hash.slice(1) });
    if(window.innerWidth > 800) this.nickInput.focus();
  }
}

checkiOS = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/Webkit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  if(iOSSafari) this.setState({ iOS: true });
}

handleStart = () => {
  if (!this.state.nick || !this.state.roomName) {
    alert('Please enter all fields.');
    return;
  }
  this.setState({ startChat: true });
  window.location.hash = `#${this.state.roomName}`;
}

handleShareDialogClose = () => this.setState({ sharing: false });

handleInvite = () => this.setState({ sharing: true });

handleQuit = () => this.setState({ startChat: false });

handleChangeColor = () => this.setState({ choosingColor: !this.state.choosingColor });

handleStartVideo = () => this.setState({ iOS: false });

handleColorSlide = (color) => this.setState({ windowColor: color.rgb });

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
          
        <div className="App">
          <div className="header">
            <h1>P2P Video Chat Demo</h1>
            <p>To try this out, open this page in another tab, or send this page to some friends. Open dev tools to see the logging.
              To view the source code for this app, <a href="https://github.com/lazorfuzz/liowebrtc-video-demo" target="_blank" rel="noopener noreferrer">click here</a>. This app is powered by <a href="https://github.com/lazorfuzz/liowebrtc" target="_blank" rel="noopener noreferrer">LioWebRTC</a>.
              <br /><br />
              <a className="github-button" href="https://github.com/lazorfuzz/liowebrtc" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star lazorfuzz/liowebrtc on GitHub">Star LioWebRTC on GitHub</a></p>
          </div>
          {
            !this.state.startChat &&
            <div className="setup">
              <input
                className="textBox"
                type="text"
                placeholder="Room Name"
                value={this.state.roomName}
                ref={(el) => this.roomNameInput = el}
                onChange={(e) => { this.setState({ roomName: e.target.value }) }}
              />
              <input
                className="textBox"
                type="text"
                placeholder="Nickname"
                value={this.state.nick}
                ref={(el) => this.nickInput = el}
                onChange={(e) => { this.setState({ nick: e.target.value }) }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    this.handleStart();
                  }
                }}
              />
              <button
                className="btn"
                onClick={this.handleStart}
                >Enter</button>
            </div>
          }
          {
            this.state.startChat &&
            <div className="partyWrapper">
              <div className="controls">
                <p className="roomName">Room Name: <span className="roomLabel">{`${this.state.roomName}`}</span></p>
                <div className="menu">
                  {
                    this.state.choosingColor &&
                    <div className="colorPopOver">
                      <div className="colorCover" onClick={() => this.setState({ choosingColor: false })} />
                    </div>
                  }
                  <button
                    iconStyle={{ color: 'white' }}
                    tooltip="Add Friends"
                    onClick={this.handleInvite}
                    >
                      <i className="material-icons">group_add</i>
                  </button>
                  <button
                    iconStyle={{ color: 'white' }}
                    tooltip="Quit"
                    onClick={this.handleQuit}
                    >
                      <i className="material-icons">power_settings_new</i>
                  </button>
                </div>
              </div>
              <Party
                roomName={`liowebrtc-vchat-demo-${this.state.roomName}`}
                nick={this.state.nick}
                windowColor={this.state.windowColor}
                iOS={this.state.iOS}
                handleStartVideo={this.handleStartVideo}
              />
            </div>
          }
        </div>
      </React.Fragment>
    );
  }

}

// =================================================================================
