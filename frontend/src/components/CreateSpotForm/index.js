import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSpotThunk } from '../../store/spots';
import SpotForm from '../SpotForm';

const CreateSpotForm = ({ spot, formType }) => {
    return (<><h1>Create a new Spot</h1><SpotForm spot={null} formType={'Create'} /></>)
}

export default CreateSpotForm;
