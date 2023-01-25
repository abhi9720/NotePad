import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <div className="navbar">

                <div className="css-1w47qe3 css-1h3rtzg css-f7ay7b css-1dmmgga css-zjik7">
                    <NavLink to="/">
                        <img className='logoapp' src="../../logomain.svg" alt="logoapp" />
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default Navbar