import React from 'react';
import SpotForm from '../SpotForm';

const CreateSpotForm = ({ spot, formType }) => {
    return (<><h1>Create a new Spot</h1><SpotForm spot={null} formType={'Create'} /></>)
}

export default CreateSpotForm;
