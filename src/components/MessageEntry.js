import React from 'react';

const MessageEntry = (props) => {
    return (
        <li className={`message ${props.appearance} appeared`}>
            <div className="text_wrapper">
                <div className="text">{props.message}</div>
            </div>
        </li>
    );
}

export default MessageEntry;
