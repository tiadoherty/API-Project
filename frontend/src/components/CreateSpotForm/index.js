import React from 'react';
import SpotForm from '../SpotForm';

const CreateSpotForm = ({ spot, formType }) => {
    return (
        <>
            <div className='form-title'>
                <h1>Create a new Spot</h1>
            </div>
            <SpotForm spot={null} formType={'Create'} />
        </>)
}

export default CreateSpotForm;
