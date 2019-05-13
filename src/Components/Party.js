import React, { Component } from 'react';
import { LioWebRTC, LocalVideo, RemoteVideo } from 'react-liowebrtc'
// liowebrtc setup
class Party extends Component {
// set up rooms and assign the room
  constructor(props) {
    super(props);
    this.state = {
      peers: [],
      roomID: `liowebrtc-vdemo-party-${this.props.roomName}`,
      inRoom: false,
    };
  }
// if someone joins this functions sets that someone is in room
  // join = (webrtc) => webrtc.joinRoom('video-chat-room-arbitrary-name');
  join = (webrtc) => webrtc.joinRoom(this.state.roomID, (err, desc) => {
    this.setState({ inRoom: true });
  });

  handleCreatedPeer = (webrtc, peer) => {
    this.setState({ peers: [...this.state.peers, peer] });
  }

  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
  }
// generate remote videos once someone else joins
  generateRemotes = () => this.state.peers.map((peer) => (
      <RemoteVideo key={`remote-video-${peer.id}`} peer={peer} id=""/>
    )
  );
// user video appears first and below are the remote users
  render () {
    return (
      <LioWebRTC
        options={{ debug: true }}
        onReady={this.join}
        onCreatedPeer={this.handleCreatedPeer}
        onRemovedPeer={this.handleRemovedPeer}
      >
        <LocalVideo />
        <br/>
        {
          this.state.peers &&
          this.generateRemotes()
        }
      </LioWebRTC>
    )
  }
}

export default Party;