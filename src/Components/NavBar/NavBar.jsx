import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/jovial_thrift_full.png'

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <nav>
             <div className='navbar'>
                <div className='logo-container'>
                     <div>
                        <img src={logo} alt="jovial-thrift" className='logo'/>
                     </div>
            

                    <div className='brand'>
                        <h2>Jovial Thrift Hub</h2>
                        <p>Modern Thrift. Timeless Style.</p>
                    </div>
             </div>
            
                <ul className='navbar-links'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                    <li><NavLink to="/NewArrivals">New Arrivals</NavLink></li>
                    <li><NavLink to="/Categories">Categories</NavLink></li>
                    <li><NavLink to="/About">About</NavLink></li>
                    <li><NavLink to="/Contact">Contact</NavLink></li>
                </ul>

                <div className='navbar-icons'>
                <li><NavLink to="/Cart">Cart</NavLink></li>
                <li><NavLink to="/Profile">Profile</NavLink></li>
                </div>
                
             </div>
             
        </nav>
    </div>
  )
}

export default NavBar
