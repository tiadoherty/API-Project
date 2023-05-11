import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotForm from '../SpotForm';
import { fetchSpotByIdThunk } from '../../store/spots';

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(fetchSpotByIdThunk(spotId));
    }, [dispatch, spotId])

    if (!spot) return null;
    if (!spot.SpotImages) return null;

    return (
        <>
            <div className='form-title'>
                <h1>Update your Spot</h1>
            </div>
            <SpotForm formType='Edit' spot={spot} />
        </>
    )
}

export default EditSpotForm;
