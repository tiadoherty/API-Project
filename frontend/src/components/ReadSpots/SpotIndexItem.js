import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './SpotIndexItem.css'

const SpotIndexItem = ({ spot, canDeleteAndEdit }) => {
    const avgRating = spot.avgRating || spot.avgStarRating
    const history = useHistory()

    const handleUpdate = () => {
        history.push(`/spots/${spot.id}/edit`)
    }

    return (
        <div>
            <NavLink to={`/spots/${spot.id}`} className='spot-link'>
                <li className='spot-index-item' title={spot.name}>
                    <img src={spot.previewImage} className='spot-preview' />
                    <div className='spot-details'>
                        <span>{spot.city}, {spot.state}</span>
                        <span><i className="fa-solid fa-star"></i>{avgRating?.toFixed(2)}</span>
                    </div>
                    <div className='price-container'>
                        <span className='price'>${spot.price} </span>
                        night
                    </div>
                </li>
            </NavLink>
            {canDeleteAndEdit && (
                <div>
                    <button onClick={handleUpdate}>Update</button>
                    <OpenModalButton modalComponent={<DeleteSpotModal spotId={spot.id} />} buttonText='Delete' />
                </div>
            )}
        </div>
    )
}

export default SpotIndexItem;
