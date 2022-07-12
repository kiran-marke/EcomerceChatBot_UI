import React, { useState } from 'react';
import UserMessageBox from './UserMessageBox';
import '../App.css';
import '../static/css/chat_interface.css';
import '../static/css/temporary.css';

const MessagesContainer = (props) => {
    return (
        <ul className="messages">
        {props.messages.map((message, index) =>          
                <UserMessageBox key={index} 
                message={message["isbotmessage"] ? 
                "Agent:" + message["message"]: "You:" + message["message"]} 
                appearance={message["isbotmessage"] ? "left" : "right"} />
            )}
        </ul>
    );
}

// function createBotMessages(messages) {
//     console.log(messages);
//     return messages.map((message, index) =>
//         <UserMessageBox key={index} message={message["message"]} appearance={message["isbotmessage"] ? "left" : "right"} />
//     );
// }

// class MessagesContainer extends Component{
//     constructor(props) {
//       super(props);
//       this.createBotMessages = this.createBotMessages.bind(this);
//     }

//     scrollToBottom = () => {
//       var el = this.refs.scroll;
//       el.scrollTop = el.scrollHeight;
//     }

//     componentDidMount() {
//       this.scrollToBottom();      
//     }  

//     componentDidUpdate() {
//       this.scrollToBottom();
//     }



//     render(){

//       return(
//         <ul className="messages" ref="scroll">
//           {this.createBotMessages()}
//         </ul>
//       );
//     }
//   }


export default MessagesContainer;
