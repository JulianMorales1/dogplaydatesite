

import React, { useState, useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigation = useNavigate();

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/signin", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
            body : JSON.stringify({
                email, password
            })
		})
        .then(res => res.json())
        .then(result => {
            if(result.success){
                
              dispatch(login({user:result.data[0]}))
                navigation("/profile")
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
        <h3>Sign in</h3>
<input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)} ></input>
<input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}></input>
<button type='submit'>Submit</button>
</form> 
            
        </div>
    )
}

export default SignIn