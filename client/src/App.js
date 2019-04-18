import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css";
import { HomePage, CodingPage } from "./pages/";

class App extends Component {
  render() {
    return ( 
      <Router>
        <div className="App">
            <Route exact path="/" component={HomePage} />
            <Route path="/:sessionid" component={CodingPage} />
        </div>
      </Router>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// // import './App.css';
// import Party from './Components/Party';
// import { getRandomRGB } from './Components/util';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startChat: false,
//       nick: '',
//       roomName: '',
//       sharing: false,
//       windowColor: getRandomRGB(),
//       iOS: false,
//       startVideo: false,
//       choosingColor: false
//     }
//   }

//   componentDidMount() {
//     this.setup();
//   }

//   setup = () => {
//     this.checkiOS();
//     if (window.innerWidth > 800) this.roomNameInput.focus();
//     if (window.location.hash && window.location.hash.length > 1) {
//       this.setState({ roomName: window.location.hash.slice(1) });
//       if (window.innerWidth > 800) this.nickInput.focus();
//     }
//   }

//   checkiOS = () => {
//     const ua = window.navigator.userAgent;
//     const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
//     const webkit = !!ua.match(/WebKit/i);
//     const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
//     if (iOSSafari) this.setState({ iOS: true });
//   }

  // handleStart = () => {
  //   if (!this.state.nick || !this.state.roomName) {
  //     alert('Please enter all fields.');
  //     return;
  //   }
  //   this.setState({ startChat: true });
  //   window.location.hash = `#${this.state.roomName}`;
  // }

  // handleShareDialogClose = () => this.setState({ sharing: false });

  // handleInvite = () => this.setState({ sharing: true });

  // handleQuit = () => this.setState({ startChat: false });

  // handleChangeColor = () => this.setState({ choosingColor: !this.state.choosingColor });

  // handleStartVideo = () => this.setState({ iOS: false });

  // handleColorSlide = (color) => this.setState({ windowColor: color.rgb });

//   render() {
//     return (
//       <React.Fragment>
        // <div className="App">
        //   <div className="header">
        //     <h1>P2P Video Chat Demo</h1>
        //     <p>To try this out, open this page in another tab, or send this page to some friends. Open dev tools to see the logging.
        //       To view the source code for this app, <a href="https://github.com/lazorfuzz/liowebrtc-video-demo" target="_blank" rel="noopener noreferrer">click here</a>. This app is powered by <a href="https://github.com/lazorfuzz/liowebrtc" target="_blank" rel="noopener noreferrer">LioWebRTC</a>.
        //       <br /><br />
        //       <a className="github-button" href="https://github.com/lazorfuzz/liowebrtc" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star lazorfuzz/liowebrtc on GitHub">Star LioWebRTC on GitHub</a></p>
        //   </div>
        //   {
        //     !this.state.startChat &&
        //     <div className="setup">
        //       <input
        //         className="textBox"
        //         type="text"
        //         placeholder="Room Name"
        //         value={this.state.roomName}
        //         ref={(el) => this.roomNameInput = el}
        //         onChange={(e) => { this.setState({ roomName: e.target.value }) }}
        //       />
        //       <input
        //         className="textBox"
        //         type="text"
        //         placeholder="Nickname"
        //         value={this.state.nick}
        //         ref={(el) => this.nickInput = el}
        //         onChange={(e) => { this.setState({ nick: e.target.value }) }}
        //         onKeyUp={(e) => {
        //           if (e.key === 'Enter') {
        //             this.handleStart();
        //           }
        //         }}
        //       />
        //       <button
        //         className="btn"
        //         onClick={this.handleStart}
        //         >Enter</button>
        //     </div>
        //   }
        //   {
        //     this.state.startChat &&
        //     <div className="partyWrapper">
        //       <div className="controls">
        //         <p className="roomName">Room Name: <span className="roomLabel">{`${this.state.roomName}`}</span></p>
        //         <div className="menu">
        //           {
        //             this.state.choosingColor &&
        //             <div className="colorPopOver">
        //               <div className="colorCover" onClick={() => this.setState({ choosingColor: false })} />
        //             </div>
        //           }
        //           <button
        //             iconStyle={{ color: 'white' }}
        //             tooltip="Add Friends"
        //             onClick={this.handleInvite}
        //             >
        //               <i className="material-icons">group_add</i>
        //           </button>
        //           <button
        //             iconStyle={{ color: 'white' }}
        //             tooltip="Quit"
        //             onClick={this.handleQuit}
        //             >
        //               <i className="material-icons">power_settings_new</i>
        //           </button>
        //         </div>
        //       </div>
        //       <Party
        //         roomName={`liowebrtc-vchat-demo-${this.state.roomName}`}
        //         nick={this.state.nick}
        //         windowColor={this.state.windowColor}
        //         iOS={this.state.iOS}
        //         handleStartVideo={this.handleStartVideo}
        //       />
        //     </div>
        //   }
        // </div>
//       </React.Fragment>
//     );
//   }
// }

// export default App;
