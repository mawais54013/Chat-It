import React, { Component } from 'react';

class Chat extends Component {

    render() {
        // var output = PUBNUB.$('output');
        // var input = PUBNUB.$('input'); 
        // var button = PUBNUB.$('button');
        // var avatar = PUBNUB.$('avatar');
        // var presence = PUBNUB.$('presence');

        // var channel = '1';
        // avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

        // var p = PUBNUB.init({
        //     subscribe_key: 'sub-c-1f66d32e-68b1-11e9-8122-22455f4026bf',
        // // 'sub-c-f762fb78-2724-11e4-a4df-02ee2ddab7fe',
        //     publish_key: 'pub-c-bf4fe468-70b4-46de-9837-0ef63cd6a138'
        // });

        // p.subscribe({
        //     channel: channel,
        //     callback: function(m) {
        //         output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' +  m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML; 
        //     },
        //     presence: function(m){
        //         if(m.occupancy > 1) {
        //             presence.textContent = m.occupancy + ' people online';
        //         }
        //     }
        // });

        // p.bind('keyup', input, function(e) {
        //     (e.keyCode || e.charCode) === 13 && publish()
        // });
    
        // p.bind('click', button, publish);
    
        // function publish() {
        //     p.publish({
        //         channel : channel, 
        //         message : {avatar: avatar.className, text: input.value}, 
        //         x : (input.value='')
        //     });
        // }

        return (
            <div>
                <h3>Chat With Others Here</h3>

                <section id="main" role="main">
                    <div id="chat">
                        <i id="avatar" class="face12"><input type="text" id="input" placeholder="Type your message..."></input></i>
                    </div>
                    <button id="button">
                        Send Message
                    </button>

                    <p id="presence"></p>
                    <div id="output"></div>
                </section>
            </div>
        )
    }
}

export default Chat;
