import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCurrentSpotItem from './UserCurrentSpotItem'
import { spotsOfUserThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';

const CurrentSpots = () => {
    const history = useHistory()
    const userSpotsObj = useSelector(state => state.spots)

    const userSpotsArr = Object.values(userSpotsObj)
    console.log("user spots grabbed from state in currentspot", userSpotsObj, userSpotsArr)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotsOfUserThunk())
    }, [dispatch])

    const handleCreateNewSpotClick = () => {
        history.push('/spots/new')
    }

    if (!userSpotsArr.length) return <h1>User spots not loaded</h1>

    return (
        <>
            <h1>Manage Your Spots</h1>
            <button onClick={handleCreateNewSpotClick}>Create a New Spot</button>
            <section>
                <ul className='spots-grid'>
                    {userSpotsArr.map((spot) => (
                        <UserCurrentSpotItem userSpot={spot} key={spot.id} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export default CurrentSpots
