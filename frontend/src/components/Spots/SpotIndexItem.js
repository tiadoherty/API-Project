import React from 'react';
import { NavLink } from 'react-router-dom';

import './SpotIndexItem.css'

const SpotIndexItem = ({ spot }) => {
    const avgRating = spot.avgRating || spot.avgStarRating

    return (
        <NavLink to={`/spots/${spot.id}`} className='spot-link'>
            <li className='spot-index-item' title={spot.name}>
                <img src={spot.previewImage} className='spot-preview' />
                <div className='spot-details'>
                    <span>{spot.city}, {spot.state}</span>
                    <span><i className="fa-solid fa-star"></i>{avgRating.toFixed(2)}</span>
                </div>
                <div className='price-container'>
                    <span className='price'>${spot.price} </span>
                    night
                </div>
            </li>
        </NavLink>
    )
}

export default SpotIndexItem;
