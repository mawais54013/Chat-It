import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/header";
import rand from "random-key";
import { database } from "firebase";
import Particles from 'react-particles-js';
import "./home.css";


export default class HomePage extends React.Component {
  // generate random key for link
  state = {
    key: rand.generate(5),
    num: null,
  };
  // link to database 
  componentDidMount = () => {
    database()
      .ref("code-sessions")
      .on("value", s => {
        this.setState({ num: s.numChildren() });
      });
  };
// database will set the current session with the content from html,css, and js
// then push as prop to use later
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
// set up particle.js for style
// set up main description and link to start function above and open code session
  render() {
    localStorage.setItem('mainKey', this.state.key);
    return (
      <div className="App">
      <div>
				<Particles className="visibleInBack"
              params={{
                "particles": {
                    "number": {
                        "value": 50
                    },
                    "size": {
                        "value": 3
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }}
		  />
			</div>
        <div className = "overlap">
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
                Live Code Editor. 
                <br/>
                Using Firebase, Code Mirror, Liowebrtc, Pubnub ChatEngine, and built in timer.<br/>
                Practice on your own or start a project with others easily
              </p>
              <div>
                <button className="btn" onClick={this.onNewGround}>
                  Share Code
                </button>
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
