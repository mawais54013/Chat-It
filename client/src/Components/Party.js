import React, { Component } from 'react';
import { LioWebRTC, LocalVideo, RemoteVideo } from 'react-liowebrtc'
// import MyComponent from './MyComponent';

class Party extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peers: [],
      roomID: `liowebrtc-vdemo-party-${this.props.roomName}`,
      inRoom: false,
    };
  }

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

  generateRemotes = () => this.state.peers.map((peer) => (
      <RemoteVideo key={`remote-video-${peer.id}`} peer={peer} />
    )
  );

  render () {
    return (
      <LioWebRTC
        options={{ debug: true }}
        onReady={this.join}
        onCreatedPeer={this.handleCreatedPeer}
        onRemovedPeer={this.handleRemovedPeer}
      >
        <LocalVideo />
        {
          this.state.peers &&
          this.generateRemotes()
        }
      </LioWebRTC>
    )
  }
}

export default Party;