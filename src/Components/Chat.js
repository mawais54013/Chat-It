import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import PubNubReact from 'pubnub-react';

// pubnub chat engine setup
const now = new Date().getTime();
const username = ['user', now].join('-');
var chatKey = localStorage.getItem('mainKey');
// set up rendering messages here
class Message extends Component{

  render () {
      return ( 
        <div > { this.props.text } 
        </div>
      );
  }
};

class ChatArea extends Component {
// link to pubnub SDK for chatengine
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-31ebf098-a310-43a8-9329-7a0fd9963987',
        subscribeKey: 'sub-c-92dd5188-714a-11e9-bedf-bef46dd4efdc',
        uuid: username
    });
// array to store chats 
    this.state = {
      messages: [],
      chatInput: '' 
    };
    this.pubnub.init(this);
  }
// once chat typed add the message and update chatinput to publish to the current channel and store message
  sendChat = () => {
    if (this.state.chatInput) {
        this.pubnub.publish({
            message: {
              text: this.state.chatInput,
              uuid: username
            },
            channel: chatKey
        });
        this.setState({ chatInput: '' })
    }

  }
// changing input
  setChatInput = (event) => {
    this.setState({ chatInput: event.target.value })
  }
// set chat with channel
  componentDidMount() {
    this.pubnub.subscribe({
        channels: [chatKey],
        withPresence: true
    });
// display messages
    this.pubnub.getMessage(chatKey, (msg) => {
          this.pubnub.hereNow(
            {
                channels: [chatKey],
                includeUUIDs: true,
                includeState: true
            },
            (status, response) => {
                console.log(status);
                console.log(response);
            }
        );
        const {text, uuid} = msg.message
        let messages = this.state.messages;
        messages.push(
          <Message key={ this.state.messages.length } uuid={ uuid } text={ text }/>
        );
        this.setState({
            messages: messages
        });
    });
  }
// enter key function
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.sendChat();
    }
  }
  // if user leaves
  componentWillUnmount() {
    this.pubnub.unsubscribe({
        channels: [chatKey]
    });
  }
// chat render area 
  render(){
    console.log(chatKey)
    console.log(this.state.messages)
    const { classes } = this.props;
    return(
      <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Messages
            </Typography>
              <div id="flowMessages">
                <List component="nav">
                  <ListItem>
                  <Typography component="div">
                    { this.state.messages }
                  </Typography>
                  </ListItem>
                </List>
              </div>
          </CardContent>
          <CardActions>
            <Input
              placeholder="Enter a message"
              value={this.state.chatInput}
              onKeyDown={this.handleKeyPress}
              onChange={this.setChatInput}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
          </CardActions>
        </Card>
      );
    }
}
export default ChatArea;