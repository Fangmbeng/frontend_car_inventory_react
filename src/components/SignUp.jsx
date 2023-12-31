import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';


export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleRegister = event => {
        event.preventDefault();
        // console.log(event);
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            //this.props.flashMessage('Passwords do not match', 'danger');
        } else {

            // Set up the request
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password
            })

            fetch("https://car-model-ihwy.onrender.com/api/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        //this.props.flashMessage(data.error, "danger")
                    } else {
                        console.log(data)
                        //this.props.flashMessage(`${data.username} has been created`, 'success')
                        this.setState({
                            redirect: true
                        })
                    }
                })
        }

    }


    render() {
        return (
            <>
                {this.state.redirect ? <Navigate to='/' /> :
                <>
                    <h3 className="text-center">Sign Up</h3>
                    <form action="" onSubmit={this.handleRegister}>
                        <div className="form-group">
                            <input type="text" className="form-control my-3" placeholder='Enter Email' name='email' />
                            <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                            <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                            <input type="password" className="form-control my-3" placeholder='Confirm Password' name='confirmPass' />

                            <input type="submit" value="Register" className="btn btn-success w-100" />
                        </div>
                    </form>
                </>
                }
            </>
        )
    }
}