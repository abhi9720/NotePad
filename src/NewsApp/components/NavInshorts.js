import React from 'react';
import "./NavInshorts.css";
import HamburgerDrawer from "./HamburgerDrawer";
import { NavLink } from 'react-router-dom';

const NavInshorts = ({ setCategory }) => {
  return (<>
    <div className="navbarInsort">
      <div className="navbarwrapper">
        <div className="icon">
          <HamburgerDrawer setCategory={setCategory} />
        </div>

        <div className="navrbarlogowarpper">
          <NavLink to="/">
            <img className='logoapp' src="../../logos/navbarlogo.png" alt="logoapp" />
          </NavLink>
        </div>
      </div>


    </div>



  </>

  )
}

export default NavInshorts;