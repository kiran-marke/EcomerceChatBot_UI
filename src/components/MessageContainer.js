import React, { useState } from 'react';
import UserMessageBox from './UserMessageBox';
import '../static/css/MessageContainer.css';

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

export default MessagesContainer;
