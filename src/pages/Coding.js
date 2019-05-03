// 
import React from "react";
import Header from "../Components/header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import Timer from "react-compound-timer";
import Party from '../Components/Party'
import { getRandomRGB } from '../Components/util';
import { Container, Row , Col} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChatArea from '../Components/Chat';
import "./coding.css";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css")
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/dracula.css");

export default class CodingPage extends React.Component {
  state = {
    html: '',
    code: "Loading...",
    code1: `Loading...`,
    code2: 'Loading...',
    cursorPosition: {
      line: 0,
      ch: 0
    }, 
    cursorPosition1: {
      line: 0,
      ch: 0
    }, 
    cursorPosition3: {
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
        self.setState({ code: snapshot.val().content + "", code2: snapshot.val().css + "", code1: snapshot.val().content2 + "" }, () => {
          let content = snapshot.val().content;
          let css = snapshot.val().css;
          let content2 = snapshot.val().content2;

          self.codemirror.getCodeMirror().setValue(content);
          self.codemirror4.getCodeMirror().setValue(css);
          self.codemirror1.getCodeMirror().setValue(content2);
        });
        this.codeRef = database().ref("code-sessions/" + params.sessionid);
        this.codeRef.on("value", function(snapshot) {
          self.setState({
            code: snapshot.val().content,
            code2 : snapshot.val().css,
            code1: snapshot.val().content2,
          });
          var currentCursorPos = self.state.cursorPosition;
          var currentCursorPos1 = self.state.cursorPosition1;
          var currentCursorPos3 = self.state.cursorPosition3;

          self.codemirror.getCodeMirror().setValue(snapshot.val().content);
          self.codemirror4.getCodeMirror().setValue(snapshot.val().css);
          self.codemirror1.getCodeMirror().setValue(snapshot.val().content2);

          self.setState({ cursorPosition: currentCursorPos });
          self.setState({ cursorPosition1: currentCursorPos1 });
          self.setState({ cursorPosition3: currentCursorPos3 });

          self.changeCursorPos();
          self.changeCursorPos1();
          self.changeCursorPos3();
        });
      })
      .catch(e => {
        self.codemirror.getCodeMirror().setValue("No Sessions Found!");
      });
  };
  // javascript
  changeCursorPos = () => {
    const { line, ch } = this.state.cursorPosition;
    this.codemirror.getCodeMirror().doc.setCursor(line, ch);
  };
// html
  changeCursorPos1 = () => {
    const { line, ch } = this.state.cursorPosition1;
    this.codemirror4.getCodeMirror().doc.setCursor(line, ch);
  };
  // css
  changeCursorPos3 = () => {
    const { line, ch } = this.state.cursorPosition3;
    this.codemirror1.getCodeMirror().doc.setCursor(line, ch);
  };
// javascript
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

  onChange2 = (newVal1, change) => {
    // console.log(newVal, change);
    this.setState(
      {
        cursorPosition1: {
          line: this.codemirror4.getCodeMirror().doc.getCursor().line,
          ch: this.codemirror4.getCodeMirror().doc.getCursor().ch
        }
      },
      () => {}
    );
    this.codeRef.child("css").set(newVal1);
  };
// // css
  onChange3 = (newVal2, change) => {
    // console.log(newVal, change);
    this.setState(
      {
        cursorPosition3: {
          line: this.codemirror1.getCodeMirror().doc.getCursor().line,
          ch: this.codemirror1.getCodeMirror().doc.getCursor().ch
        }
      },
      () => {}
    );
    this.codeRef.child("content2").set(newVal2);
  };

componentDidUpdate() {
  this.runCode();
}

runCode = () => {
  const { code, code1, code2 } = this.state;

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

      <style>
    ${code2}
    </style>
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
    // console.log(`${window.location.origin}/#${this.state.roomName}`,"test here");
    const url = window.location.href;
    return (
      <div id="testArea" style={{backgroundColor: 'black', color: 'white'}}>
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
        <br />
        <Container>
        <Row>
        <Col xs={6} md={5} id="codeAreaV1">
        <div className="coding-page">
        <div className="codeArea">
        <h4>Javascript</h4>
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
          <h4>CSS</h4>
          <CodeMirror
          ref={t => (this.codemirror4 = t)}
            value={this.state.code2}
            onChange={this.onChange2}
            // onChange={this.onChange2}
            options={{
              mode: 'css',
              theme: 'dracula',
              lineNumbers: true,
              readOnly: false,
            }}
          />
          </div>
          <div>
          <h4>HTML</h4>
          <CodeMirror
          ref={r => (this.codemirror1 = r)}
            value={this.state.code1}
            onChange={this.onChange3}
            // onChange={value => { this.onChange1(value) }}
            // value={html}
            options={{
              mode: 'htmlmixed',
              theme: 'dracula',
              lineNumbers: true,
              readOnly: false,
            }}
          />
          </div>
        {/* <section className="result" id="iframe">
          <iframe title="result" className="iframe" ref="iframe" />
        </section> */}
        </div>
        <br/>
        </Col>
        <Col xs={6} md={5} id="outputArea">
        <h3>Output</h3>
        <section className="result" id="iframe">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        </Col>
          
        <Col xs={6} md={2}>
        <div id="timeArea">
          <h3>Timer</h3>
        <Timer
            initialTime={0}
        >
            {({ start, resume, pause, stop, reset, timerState }) => (
                <React.Fragment>
                    <div>
                      Minutes: <Timer.Minutes />  &nbsp;
                      Seconds: <Timer.Seconds />
                    </div>
                    <div>{timerState}</div>
                    <br />
                    <div>
                        <button onClick={start}>Start</button>
                        <button onClick={stop}>Stop</button>
                        <button onClick={reset}>Reset</button>
                    </div>
                </React.Fragment>
            )}
        </Timer>
        </div>
        <br />
        <div className="AppArea">
          <div className="header">
            <h4>Video Chat</h4>
            <p>Type in the room name and your name to join or start a video chat room</p>
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
              <br />
              <br />
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
                  <CopyToClipboard text={url}>
                  <button onClick={this.handleInvite}>
                    Click to Copy and Share Link Address
                  </button>
                  </CopyToClipboard>
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
        <br />
        <div id="chatArea">
          <h4>Chat Area</h4>
          <ChatArea />
        </div>
        <br />
        {/* <div id="timeArea">
          <h2>Timer</h2>
        <Timer
            initialTime={0}
        >
            {({ start, resume, pause, stop, reset, timerState }) => (
                <React.Fragment>
                    <div>
                      Minutes: <Timer.Minutes />  &nbsp;
                      Seconds: <Timer.Seconds />
                    </div>
                    <div>{timerState}</div>
                    <br />
                    <div>
                        <button onClick={start}>Start</button>
                        <button onClick={stop}>Stop</button>
                        <button onClick={reset}>Reset</button>
                    </div>
                </React.Fragment>
            )}
        </Timer>
        </div> */}
        </Col>
        </Row>
        </Container>
      </React.Fragment>
      </div>
    );
  }
}

