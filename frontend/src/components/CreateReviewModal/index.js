import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk, fetchReviewsofSpotThunk } from '../../store/spots';
import Stars from './Stars';
import './CreateReviewModal.css'

const CreateReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        let errorObj = {};
        let shouldBeDisabled = false;
        if (review.length < 10) {
            errorObj.errors = { review: 'Review must be longer than 10 characters' }
            shouldBeDisabled = true;
        }
        if (stars <= 0 || stars > 5) {
            errorObj.errors = { stars: 'Stars must be a number between 1 and 5' }
            shouldBeDisabled = true;
        }

        setIsDisabled(shouldBeDisabled)
        setErrors(errorObj)
    }, [review, stars])

    const onSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length > 0) return;

        let reviewObj = {
            review,
            stars
        }

        const errorsFromServer = await dispatch(createReviewThunk(reviewObj, spotId))
        if (errorsFromServer) {
            setErrors(errorsFromServer)
        } else {
            await dispatch(fetchReviewsofSpotThunk(spotId));
            closeModal()
        }
    }

    const handleClick = (stars) => {
        setStars(stars)
    }

    return (
        <div className='create-review-modal'>
            <h2>How was your stay?</h2>
            <form onSubmit={onSubmit}>
                <textarea placeholder='Leave your review here...' value={review} onChange={e => { setReview(e.target.value) }} />
                <Stars stars={stars} handleClick={handleClick} />
                <button type="submit" disabled={isDisabled}>Submit Your Review</button>
            </form>
        </div>

    )
}

export default CreateReviewModal;
