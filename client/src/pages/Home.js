// import React from "react";
// import { Link } from "react-router-dom";
// import Header from "../Components/header";
// import rand from "random-key";
// import { database } from "firebase";
// import "./home.css";


// export default class HomePage extends React.Component {
  
//   state = {
//     key: rand.generate(5),
//     num: null
//   };
//   componentDidMount = () => {
//     database()
//       .ref("code-sessions")
//       .on("value", s => {
//         this.setState({ num: s.numChildren() });
//       });
//   };

//   onNewGround = () => {
//     database()
//       .ref("code-sessions/" + this.state.key)
//       .set({
//         content: "Happy Coding",
//         createdon: Date()
//       });
//     this.props.history.push("/" + this.state.key);
//   };
//   render() {
    
//     return (
//       <React.Fragment>
//         <Header
//           extras={this.state.num ? `Total ${this.state.num}+ Shares` : null}
//         />
//         <div className="homepage">
//           <p className="title">
//             <br />
//             Share Code within <span className="highlight">Realtime</span>.
//             <br />
//             Anywhere, Anytime and with <span className="highlight">Anyone</span>
//             .
//           </p>

//           <p className="sub-title">
//             Simple Realtime Code Sharing Editor App. Using Firebase Realtime
//             Database and Code Mirror as Editor.
//           </p>
//           <div>
//             <button className="btn" onClick={this.onNewGround}>
//               Share Code
//             </button>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props)

    this.localVideoref = React.createRef();
    this.remoteVideoref = React.createRef();
  }

  componentDidMount() {
    const pc_config = null

    this.pc = new RTCPeerConnection(pc_config)

    this.pc.onicecandidate = (e) => {
      if(e.candidate) console.log(JSON.stringify(e.candidate))
    }

    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    this.pc.onaddstream = (e) => {
      this.remoteVideoref.current.srcObject = e.stream;
    }

    const constraints = { video: true }
    // audio: true - to add audio

    const success = (stream) => {
      window.localStream = stream;
      this.localVideoref.current.srcObject = stream;
      this.pc.addStream(stream)
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e);
    }

    // navigator.mediaDevices.getUserMedia( constraints )
    // .then( success )
    // .catch( failure )
  }

  // createOffer = () => {
  //   console.log('offer')
  //   this.pc.createOffer({offerToReceiveVideo: 1})
  //     .then(sdp => {
  //       console.log(JSON.stringify(sdp))
  //       this.pc.setLocalDescription(sdp)
  //     }, e => {})
  // }

  createOffer = () => {
    console.log('offer')
    let number = '17';
    localStorage.setItem('state', number);
  }

  setRemoteDescription = () => {
    const desc = JSON.parse(this.textref.value)

    this.pc.setRemoteDescription(new RTCSessionDescription(desc))
  }

  createAnswer = (test) => {
    console.log('Answer')
    this.pc.createAnswer({offerToReceiveVideo: 1})
      .then(sdp => {
        console.log(JSON.stringify(sdp))
        this.pc.setLocalDescription(sdp)
      }, e => {})
  }

  addCandidate = () => {
    const candiate = JSON.parse(this.textref.value)
    console.log("Adding candidate: ", candiate);

    this.pc.addIceCandidate(new RTCIceCandidate(candiate))
  }

  render() {
    
    return (
      <div>
        {/* <video style = {{width: 240, height: 240, margin: 5, backgroundColor: 'black '}} ref={this.localVideoref} autoPlay></video>
        <video style = {{width: 240, height: 240, margin: 5, backgroundColor: 'black '}} ref={this.remoteVideoref} autoPlay></video> */}
     
        <button onClick={this.createOffer}>Offer</button>
        <button onClick={this.createAnswer('17')}>Answer</button>
        <br />
        <textarea ref={ref => { this.textref = ref }}/>
        <br />
        <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
        <button onClick={this.addCandidate}>Add candiate</button>
      </div>
    );
  }
}

export default Home;