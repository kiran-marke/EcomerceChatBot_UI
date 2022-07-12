import React, { useState, useEffect } from 'react';
import './App.css';
import './static/css/chat_interface.css';
import './static/css/temporary.css';
import MessagesContainer from './components/MessageContainer';
import NewMessage from './components/NewMessage';
import Login from './components/Login';
import { useSessionStorage } from './components/useSessionStorage';

const initial_messages = []

function setToken(userToken) {
  sessionStorage.setItem('access_token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('access_token');

  console.log("access_token username" + tokenString)
  const userToken = JSON.parse(tokenString);
  if (userToken == undefined)
    return ''
  return userToken.access_token
}

const ChatApp = () => {

  const [messages, setMessages] = useState(initial_messages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useSessionStorage('access_token', '');

  const submitCallHandler = (newMessageData) => {
  
    setMessages(prevMessages => {
      console.log(newMessageData);
      return [...prevMessages, newMessageData]
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/greeting', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': getToken(),
          }
        })
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();

        setMessages(prevMessages => {
          return [...prevMessages, 
            { "message": actualData.greetingmessage, "isbotmessage": true }]
        });

        setError(null);
      } catch (err) {
        setError(err.message);
        setMessages(null);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [])

  if (!token) {
    console.log("Still in login")
    return <Login setToken={setToken} />
  }

  return (
    <div className="chat_window">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {messages && (
        <div>
          <MessagesContainer messages={messages}></MessagesContainer>
          <div className="bottom_wrapper clearfix">
            <NewMessage onSubmitCalled={submitCallHandler}></NewMessage>
          </div>
        </div>
      )};
    </div>
  )
};

export default ChatApp;
