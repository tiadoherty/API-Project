import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import './SpotForm.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [description, setDescription] = useState(spot?.description || '')
    const [name, setName] = useState(spot?.name || '')
    const [price, setPrice] = useState(spot?.price || 0)
    const [previewImageUrl, setPreviewImageUrl] = useState(spot?.SpotImages?.[0]?.url || '')
    const [imageUrl1, setImageUrl1] = useState(spot?.SpotImages?.[1]?.url || '')
    const [imageUrl2, setImageUrl2] = useState(spot?.SpotImages?.[2]?.url || '')
    const [imageUrl3, setImageUrl3] = useState(spot?.SpotImages?.[3]?.url || '')
    const [imageUrl4, setImageUrl4] = useState(spot?.SpotImages?.[4]?.url || '')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        // console.log("Errors", errors)
        //don't submit if validation errors
        if (Object.values(errors).length > 0) return;

        let images = [];
        images.push({ url: previewImageUrl, preview: true })
        if (imageUrl1) images.push({ url: imageUrl1, preview: false })
        if (imageUrl2) images.push({ url: imageUrl2, preview: false })
        if (imageUrl3) images.push({ url: imageUrl3, preview: false })
        if (imageUrl4) images.push({ url: imageUrl4, preview: false })


        let newSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat: 10,
            lng: 10,
        }

        if (formType === 'Edit') {
            newSpot.id = spot.id
            const editedSpotId = await dispatch(updateSpotThunk(newSpot))
            if (typeof editedSpotId === 'object') {
                setErrors(editedSpotId)
            } else {
                history.push(`/spots/${editedSpotId}`)
            }
        } else {
            //this could be a new spot id OR it could be errors from the front/backend due to my thunk setup
            const newSpotId = await dispatch(createSpotThunk(newSpot, images))
            // console.log("New spot ID", newSpotId)
            if (typeof newSpotId === 'object') {
                setErrors(newSpotId)
            } else {
                history.push(`/spots/${newSpotId}`)
            }
        }
    }

    useEffect(() => {
        const errors = {}
        // Country validator
        if (!country.length) errors.country = 'Country is required'
        // Address validator
        if (!address.length) errors.address = 'Address is required'
        // City validator
        if (!city.length) errors.city = 'City is required'
        // State validator
        if (!state.length) errors.state = 'State is required'
        // Description validator
        if (description.length <= 30) errors.description = 'Description needs a minimum of 30 characters'
        // Name validator
        if (!name.length) errors.name = 'Name is required'
        // Preview image validators
        if (!(previewImageUrl.endsWith('.png') || previewImageUrl.endsWith('.jpg') || previewImageUrl.endsWith('.jpeg'))) errors.previewImageUrl = 'Preview image URL must end in .png, .jpg, or .jpeg'
        if (!previewImageUrl.length) errors.previewImageUrl = 'Preview image is required'
        // Image URL 1 validators
        if (imageUrl1.length > 4 && !(imageUrl1.endsWith('.png') || imageUrl1.endsWith('.jpg') || imageUrl1.endsWith('.jpeg'))) errors.imageUrl1 = 'Image URL must end in .png, .jpg, or .jpeg'
        // Image URL 2 validators
        if (imageUrl2.length > 4 && !(imageUrl2.endsWith('.png') || imageUrl2.endsWith('.jpg') || imageUrl2.endsWith('.jpeg'))) errors.imageUrl2 = 'Image URL must end in .png, .jpg, or .jpeg'
        // Image URL 3 validators
        if (imageUrl3.length > 4 && !(imageUrl3.endsWith('.png') || imageUrl3.endsWith('.jpg') || imageUrl3.endsWith('.jpeg'))) errors.imageUrl3 = 'Image URL must end in .png, .jpg, or .jpeg'
        // Image URL 4 validators
        if (imageUrl4.length > 4 && !(imageUrl4.endsWith('.png') || imageUrl4.endsWith('.jpg') || imageUrl4.endsWith('.jpeg'))) errors.imageUrl4 = 'Image URL must end in .png, .jpg, or .jpeg'


        setErrors(errors)
    }, [country, address, city, state, description, name, price, previewImageUrl, imageUrl1, imageUrl2, imageUrl3, imageUrl4])

    return (
        <div className='main-page-container'>
            <form className='form-container'>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they've booked a reservation.</p>
                <label className='wide-input'>
                    Country
                    {hasSubmitted && errors.country && <span className='validation-error'>{errors.country}</span>}
                    <input
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => { setCountry(e.target.value) }} />
                </label>
                <label className='wide-input'>
                    Street Address
                    {hasSubmitted && errors.address && <span className='validation-error'>{errors.address}</span>}
                    <input
                        type='text' placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </label>
                <div className='city-state'>
                    <div className='city'>
                        <label className='city-label'>
                            City
                            {hasSubmitted && errors.city && <span className='validation-error'>{errors.city}</span>}
                            <div>
                                <input type='text' placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                                <span>,</span>
                            </div>
                        </label>

                    </div>
                    <label className='state'>
                        State
                        {hasSubmitted && errors.state && <span className='validation-error'>{errors.state}</span>}
                        <input type='text' placeholder='STATE' value={state} onChange={(e) => { setState(e.target.value) }} />
                    </label>
                </div>
                <hr />
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    className='description wide-input'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} />
                {hasSubmitted && errors.description && <p className='validation-error'>{errors.description}</p>}
                <hr />
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    className='name wide-input'
                    type='text'
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }} />
                {hasSubmitted && errors.name && <p className='validation-error'>{errors.name}</p>}
                <hr />
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="price">
                    <span class='dollah-sign'>$</span>
                    <input
                        type='number'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        className='price-input' />
                    {hasSubmitted && errors.price && <p className='validation-error'>{errors.price}</p>}
                </div>

                <hr />
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    className='wide-input'
                    type='text'
                    placeholder='Preview Image URL'
                    value={previewImageUrl}
                    onChange={(e) => { setPreviewImageUrl(e.target.value) }} />
                {hasSubmitted && errors.previewImageUrl && <p className='validation-error'>{errors.previewImageUrl}</p>}
                <input
                    className='wide-input'
                    type='text'
                    placeholder='Image URL'
                    value={imageUrl1}
                    onChange={(e) => { setImageUrl1(e.target.value) }} />
                {hasSubmitted && errors.imageUrl1 && <p className='validation-error'>{errors.imageUrl1}</p>}
                <input
                    className='wide-input'
                    type='text'
                    placeholder='Image URL'
                    value={imageUrl2}
                    onChange={(e) => { setImageUrl2(e.target.value) }} />
                {hasSubmitted && errors.imageUrl2 && <p className='validation-error'>{errors.imageUrl2}</p>}
                <input
                    className='wide-input'
                    type='text'
                    placeholder='Image URL'
                    value={imageUrl3}
                    onChange={(e) => { setImageUrl3(e.target.value) }} />
                {hasSubmitted && errors.imageUrl3 && <p className='validation-error'>{errors.imageUrl3}</p>}
                <input
                    className='wide-input'
                    type='text'
                    placeholder='Image URL'
                    value={imageUrl4}
                    onChange={(e) => { setImageUrl4(e.target.value) }} />
                {hasSubmitted && errors.imageUrl4 && <p className='validation-error'>{errors.imageUrl4}</p>}
                <hr />
                <div className='submit-button-container'>
                    <button type='submit' onClick={onSubmit}>{formType === 'Edit' ? 'Update spot' : 'Create a spot'}</button>
                </div>
            </form>
        </div>
    )
}

export default SpotForm;
