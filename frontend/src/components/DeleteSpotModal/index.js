import React from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spots';

const DeleteSpotModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId))
        closeModal()
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={handleDelete}>Yes {'(Delete Spot)'}</button>
            <button onClick={() => closeModal()}>No {'(Keep Spot)'}</button>
        </div>
    )
}

export default DeleteSpotModal
