import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import SignUp from '../pages/SignUp'

const Layout = () => {
    return (
        <>

            <NavBar />
            <SignUp></SignUp>

            <Outlet />

        </>
    )
}

export default Layout