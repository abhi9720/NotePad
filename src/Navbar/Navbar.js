import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <nav className="sticky top-0 w-full bg-white border-b border-gray-300 z-50 p-2 flex justify-center">




                <NavLink to="/">
                    <img className='h-12 w-auto' src="../../logos/navbarlogo.png" alt="logoapp" />
                </NavLink>


            </nav>
        </>
    )
}

export default Navbar