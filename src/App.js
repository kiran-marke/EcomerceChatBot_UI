import React, { useState, useEffect } from 'react';
import './static/css/App.css'
import MessagesContainer from './components/MessageContainer';
import NewMessage from './components/NewMessage';
import Login from './components/Login';

const initial_messages = []

function getSessionToken() {
  const tokenString = sessionStorage.getItem('access_token');
  const userToken = JSON.parse(tokenString);
  if (userToken == undefined)
    return null
  return userToken
}

const ChatApp = () => {

  const [messages, setMessages] = useState(initial_messages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(()=> getSessionToken());

  function setSessionToken(userToken) {
    sessionStorage.setItem('access_token', JSON.stringify(userToken.access_token));
    setToken(userToken.access_token)
  }

  const submitCallHandler = (newMessageData) => {
  
    setMessages(prevMessages => {
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
            'authorization': token,
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
    if (token) {
      console.log("getdata() is called!", token)
      getData()
    }
  }, [token])

  if (!token) {
    return <Login setSessionToken={setSessionToken} />
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
