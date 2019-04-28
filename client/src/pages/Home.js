// particle js for the background
import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/header";
import rand from "random-key";
import { database } from "firebase";
import ChatArea from '../Components/Chat';
import "./home.css";


export default class HomePage extends React.Component {
  
  state = {
    key: rand.generate(5),
    num: null,
    // roomName: ''
  };
  componentDidMount = () => {
    // this.setup();
    database()
      .ref("code-sessions")
      .on("value", s => {
        this.setState({ num: s.numChildren() });
      });
  };

  onNewGround = () => {
    database()
      .ref("code-sessions/" + this.state.key)
      .set({
        content: `// Happy coding
document.getElementById("demo").innerHTML = 5 + 6;
        `,
        content2: "<h1 id='demo'></h1>",
        css: "css area",
        createdon: Date()
      });
    this.props.history.push("/" + this.state.key);

  };

  render() {
    
    return (
      <React.Fragment>
        <Header/>
        <div className="homepage">
          <p className="title">
            <br />
            Share Code in <span className="highlight">Realtime</span>.
            <br />
            With Anyone at Anytime.
          </p>
          <br/>
          <p className="sub-title">
            Code Share Editor. 
            <br/>
            Using Firebase Realtime
            Database, Code Mirror as Editor, Liowebrtc for video chatting, and. 
          </p>
          <div>
            <button className="btn" onClick={this.onNewGround}>
              Share Code
            </button>
          </div>
        </div>
        <ChatArea />
      </React.Fragment>
    );
  }
}
