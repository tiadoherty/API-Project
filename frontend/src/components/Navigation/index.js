import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CityLogo from './city_logo.jpeg'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/" className='home-link'><img className='logo' title="Home" src={CityLogo} /> noairbnb</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
