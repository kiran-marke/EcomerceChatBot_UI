import React, { useState } from 'react';

async function performtask(taskname) {

    console.log("getToken()", getSessionToken())
    return fetch('http://localhost:8000/performtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getSessionToken(),
        'taskname': taskname,
      }
    })
      .then(data => data.json())
   }


function getSessionToken() {
    const tokenString = sessionStorage.getItem('access_token');
    const userToken = JSON.parse(tokenString);
    if (userToken == undefined)
      return null
    return userToken
  }
  
const NewMessage = (props) => {
    const [userMessage, setUserMessage] = useState('')

    const messageChangeHanlder = (event) => {
        setUserMessage(event.target.value);
    };

    const submitHandler = async (event) => {
        
        event.preventDefault();

        if (userMessage == "")
        return
    
        const newmessage = {
            message: userMessage,
            isbotmessage: false
        }
        document.getElementById('msg_input').value = ''
        
        //console.log(newmessage);
        props.onSubmitCalled(newmessage);

        //Perform API call
        const response = await performtask(userMessage);
        setUserMessage('')

        const responsemessage = {
            message: JSON.stringify(response),
            isbotmessage: true
        }
        props.onSubmitCalled(responsemessage);
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <div className="message_input_wrapper">
                    <input id="msg_input" 
                    className="message_input" 
                    placeholder="Type your messages here..." 
                    onChange={messageChangeHanlder} />
                </div>
                <div >
                    <button type="submit">send</button>
                </div>
            </div>
        </form>);
};

export default NewMessage;