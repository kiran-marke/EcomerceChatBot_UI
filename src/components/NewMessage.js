import React, { useState } from 'react';
import { useSessionStorage } from './useSessionStorage';

async function performtask(taskname) {

    return fetch('http://localhost:8000/performtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken(),
        'taskname': taskname,
      }
    })
      .then(data => data.json())
   }


function getToken() {
    const tokenString = sessionStorage.getItem('access_token');
  
    console.log("access_token username" + tokenString)
    const userToken = JSON.parse(tokenString);
    if (userToken == undefined)
      return ''
    return userToken.access_token
  }
  
const NewMessage = (props) => {
    const [userMessage, setUserMessage] = useState('')
    const [token, setToken] = useSessionStorage('access_token', getToken());

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