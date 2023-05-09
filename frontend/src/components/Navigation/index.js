import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import BlueAirbnbLogo from './blue-airbnb-logo.svg'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/" className='home-link'>
                        <img src={BlueAirbnbLogo} title="Home" className='logo' />
                        noairbnb
                    </NavLink>
                </li>
                {isLoaded && (
                    <div className='nav-right'>
                        {sessionUser && (
                            <li>
                                <NavLink to="/spots/new" className='create-spot-link'>Create new spot</NavLink>
                            </li>
                        )}
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    </div>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
