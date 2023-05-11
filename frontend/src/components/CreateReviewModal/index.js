import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk, fetchReviewsofSpotThunk } from '../../store/spots';
import Stars from './Stars';
import './CreateReviewModal.css'

//todo:
//look in backend maybe to put reviews in order? want the newly posted review to go to the top not the bottom
const CreateReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false)

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

        setHasSubmitted(true)
        console.log("Errors", errors)
        if (Object.values(errors).length > 0) return;

        let reviewObj = {
            review,
            stars
        }

        const errorsFromServer = await dispatch(createReviewThunk(reviewObj, spotId))
        //create review thunk will only have a return value if there are errors from the backend
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
            {hasSubmitted && Object.values(errors).length && <p className='validation-error'>{errors.message}</p>}
            <form onSubmit={onSubmit}>
                <textarea placeholder='Leave your review here...' value={review} onChange={e => { setReview(e.target.value) }} />
                {hasSubmitted && errors.review && <p className='validation-error'>{errors.review}</p>}
                <Stars stars={stars} handleClick={handleClick} />
                {hasSubmitted && errors.stars && <p className='validation-error'>{errors.stars}</p>}
                <button type="submit" disabled={isDisabled}>Submit Your Review</button>
            </form>
        </div>

    )
}

export default CreateReviewModal;
