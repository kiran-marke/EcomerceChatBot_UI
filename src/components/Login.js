import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../static/css/Login.css';

async function loginUser(credentials) {

    console.log("credentials" + credentials.username)
    console.log("credentials" + credentials.password)
    return fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': credentials.username,
        'password': credentials.password,
      }
    })
      .then(data => data.json())
   }

export default function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        
        console.log("response token" + token)
        setToken(token);
      }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}