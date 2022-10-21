import React, { useState, useEffect } from 'react'
import { json, useLocation, useNavigate,Link } from 'react-router-dom';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigation = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/SignUp", {
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
        .then(data => {
            if(data.success){
                navigation("/signin")
            }
        })
    }

    return (
        <div>
            {location.pathname === "/" && <form onSubmit={submitHandler}>

        <h3>Sign U</h3>

        <Link style={{display:'block'}} to="/signin">Existing User?</Link>
<input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)} ></input>
<input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}></input>
<button type='submit'>Submit</button>
</form> }
            
        </div>
    )
}

export default SignUp