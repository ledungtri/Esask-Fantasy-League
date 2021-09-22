import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../Resources/images/logo-transparent.png'

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage_logo_div">
                <img data-testid="large_logo" className="homepage_logo" src={logo} alt="esask logo-large" />
            </div>
            <div className="options_div">
                
                    <div className="players_div">
                        <Link to="/players">
                            <h1>Players</h1>
                            <p data-testid="player_text">Top players from the Grand Master League</p>
                        </Link>
                    </div>
                
                <div className="contests_div">
                    <Link to="/contests">
                        <h1>Contests</h1>
                        <p>Create a team and compete against other participants</p>
                    </Link>
                </div>
            </div>
            <div className="homepage_login_div">
                <button className="homepage_login_btn">Login | Register</button>
            </div>
        </div>
    )
}

export default HomePage
