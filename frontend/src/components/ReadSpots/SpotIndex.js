import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SpotIndexItem from './SpotIndexItem'
import { fetchSpotsThunk } from '../../store/spots';
import './SpotIndex.css'

const SpotIndex = () => {
    const spotsObj = useSelector(state => state.spots);
    const spotsArr = Object.values(spotsObj);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])

    if (!spotsArr.length) return <h1>Spots loading...</h1>;

    return (
        <section>
            <ul className='spots-grid'>
                {spotsArr.map((spot) => (
                    <SpotIndexItem spot={spot} key={spot.id} canDeleteAndEdit={false} />
                ))}
            </ul>
        </section>
    )
}

export default SpotIndex;
