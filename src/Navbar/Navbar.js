import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <div className="navbar">

                <div >
                    <NavLink to="/">
                        <img className='logoapp' src="../../navbarlogo.png" alt="logoapp" />
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default Navbar