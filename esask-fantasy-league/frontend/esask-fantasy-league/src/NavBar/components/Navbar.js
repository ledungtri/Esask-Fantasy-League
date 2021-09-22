import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../Resources/images/logo-transparent.png'

function Navbar() {
    return (
        <div className="navbar">
            <Link  to="/">
                <img data-testid="nav_logo" className="logo" src={logo} alt="esask logo" />
            </Link>
            
            
            <div className="links">
                <div>
                    <Link data-testid="nav_contest" to="">Contests</Link>
                </div>
                <div>
                    <Link data-testid="nav_player" to="/players">Players</Link>
                </div>
            </div>

            <div className="user_links">
                <a href="#">Hello User</a>
            </div>
        </div>
    )
}

export default Navbar
