import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // Get the data from the form
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);

        let response = await fetch("https://car-model-ihwy.onrender.com/api/token", {
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json();
            // Get the token and token expiration from the response
            let token = data.token;
            let expiration = data.token_expiration;

            // Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);

            // flash a success message and redirect back home
            props.flashMessage('You have successfully logged in', 'success');
            props.logUserIn();
            navigate('/');
        } else {
            // flash a fail message
            props.flashMessage('Your username and/or password are incorrect', 'danger');
        }

    }

    return (
        <>
            <h3 className="text-center">Login</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                    <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                    <input type="submit" value="Log In" className="btn btn-success" />
                </div>
            </form>
            <button className='btn btn-primary mt-3' onClick={props.handleClick}>Sign In with Google</button>
        </>
    )
}