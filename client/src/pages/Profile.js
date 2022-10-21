import React from 'react'
import { useSelector } from 'react-redux'
import Dogs from '../components/Dogs'
import '../styles/Profile.css'
const Profile = () => {

    const user = useSelector(state=>state.user.user)
    return (
        <div className='profile'>
            <h2>User Profile</h2>
            <h3>{user.email}</h3>
            <h4 style={{marginTop:'50px'}}>User Dogs</h4>
            <Dogs />
        </div>

    )
}

export default Profile