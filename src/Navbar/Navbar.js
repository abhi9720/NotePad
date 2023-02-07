import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <div className="navbar">


                <NavLink to="/">
                    <img className='logoapp' src="../../logos/navbarlogo.png" alt="logoapp" />
                </NavLink>


            </div>
        </>
    )
}

export default Navbar