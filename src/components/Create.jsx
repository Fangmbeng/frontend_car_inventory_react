import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!(props.loggedIn || props.value)){
            props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/login');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let brand = event.target.brand.value;
        let model = event.target.model.value;

        // Get the token from localStorage
        //let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        //myHeaders.append('Authorization', `Bearer ${token}`)
        myHeaders.append('Access-Control-Allow-Origin', "*");

        // Set up the request body
        let requestBody = JSON.stringify({brand, model})

        // Make the fetch request
        let response = await fetch("https://car-model-ihwy.onrender.com/api/posts", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })


        if (response.ok){
            let data = await response.json();
            props.flashMessage(`${data.brand} has been created`, 'primary');
            navigate('/')
        } else {
            props.flashMessage("There was an issue, please try again", 'warning');
        }
    }

    return (
        <>
            <h3 className="text-center">Car Inventory</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Add car brand' name='brand'/>
                    <input type="text" className="form-control my-3" placeholder='Add car model' name='model'/>

                    <input type="submit" value="Add car brand and model" className="btn btn-success w-100" />
                </div>
            </form>
        </>
    )
}