import React from "react";
import Header from "../Components/header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import axios from "axios";
import "./coding.css";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/dracula.css");

export default class CodingPage extends React.Component {

  state = {
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

componentDidUpdate() {
  this.runCode();
}

syncUpdates = () => {
  const data = { ...this.state };    
};

runCode = () => {
  const { code1, code } = this.state;

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
    const { code1, code } = this.state;
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
              mode: "javascript"
            }}
            onBeforeChange={(editor, data, code) => {
              this.setState({ code }, () => this.syncUpdates());
            }}
          />
          </div>
          <div>
          <CodeMirror
            value={this.state.code1}
            options={{
              mode: 'htmlmixed',
              theme: 'dracula',
              lineNumbers: true,
              readOnly: false,
            }}
              onBeforeChange={(editor, data, code1) => {
                this.setState({ code1 }, () => this.syncUpdates());
              }}
          />
          </div>
        <section className="result" id="iframe">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        </div>
      </React.Fragment>
    );
  }

}