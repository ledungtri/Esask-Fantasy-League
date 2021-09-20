import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../Resources/images/logo-transparent.png'

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">
                <img className="logo" src={logo} alt="esask logo" />
            </Link>
            
            
            <div className="links">
                <div>
                    <Link to="">Contests</Link>
                </div>
                <div>
                    <Link to="/players">Players</Link>
                </div>
            </div>

            <div className="user_links">
                <a href="#">Hello User</a>
            </div>
        </div>
    )
}

export default Navbar
