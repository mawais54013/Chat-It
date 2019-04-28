import React, { Component } from 'react';
// import './App.css';
import PubNub from 'pubnub';
var msgs = [];
var letters = ['a',',b','c']
var name;

var pubnub = new PubNub({
    subscribeKey: "sub-c-834542aa-99cd-11e6-82f8-02ee2ddab7fe",
    publishKey: "pub-c-430229ac-cac4-4408-a447-569b97be7f36",
})

class Login extends Component {

  constructor() {
    super();
    this.state = {
      loggined: false,
      isEmpty: false
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      if (e.target.value === "") {
        this.setState({loggined: false, isEmpty: true})
      } else {
        name = e.target.value;
        this.setState({loggined: true});
        pubnub.subscribe({
            channels: ['my_channel'],
            withPresence: true,
        });
        pubnub.addListener({
            message: function(msg) {
              msgs.push(msg.message);
            //   self.setState({newMessage: true});
              console.log('===========\n', msg, '\n===============');
            }
        });

      }
    }
  }

  render () {
    let inputType;
    if (!this.state.loggined && this.state.isEmpty) {
      inputType = (
        <div className="login-block">
          <input type="text" style={{borderBottom: '1px solid red'}} onKeyDown={this.handleKeyDown} id="input" placeholder="Type your login and press Enter"></input>
        </div>
      )
    } else if (!this.state.loggined) {
      inputType = (
        <div className="login-block">
          <input type="text" onKeyDown={this.handleKeyDown} id="input" placeholder="Type your login and press Enter"></input>
        </div>
      )
    } else {
      inputType = null;
    }
    return (
      <div>
        { inputType }
      </div>
    )
  }
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      newMessage: false
    }
    // eslint-disable-next-line
    self = this;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      pubnub.publish(
          {
              message: {
                text: e.target.value,
                uuid: name
              },
              channel: 'my_channel',
          }
      );
      e.target.value = "";
    }
  }

  render () {


      return (
        <div className="chat-block">
          <ul>
            { Object.keys(msgs).map(function(key) {
                return (
                  <li>
                    <div className="avatar">{msgs[key].uuid[0].toUpperCase()}</div>
                    <div className="message">{msgs[key].text}</div>
                  </li>
                )
            })}
          </ul>
          <input type="text" onKeyDown={this.handleKeyDown} placeholder="Type your message and press Enter"></input>
        </div>
      )
  }

}

class ChatArea extends Component {
  render() {
      return (
        <div>
          <Login></Login>
          <Chat></Chat>
        </div>
      );
  }
}

export default ChatArea;
