import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/spots';

const DeleteReviewModal = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(spotId, reviewId))
        closeModal()
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div className='button-container'>
                <button style={{ background: '#f44336' }} onClick={handleDelete}>Yes {'(Delete Review)'}</button>
                <button onClick={() => closeModal()}>No {'(Keep Review)'}</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
