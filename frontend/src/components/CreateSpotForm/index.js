import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const [imageUrl2, setImageUrl2] = useState('')
    const [imageUrl3, setImageUrl3] = useState('')
    const [imageUrl4, setImageUrl4] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        console.log("Errors", errors)
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

        // TODO don't submit if validation errors
        const newSpotId = await dispatch(createSpotThunk(newSpot, images))
        console.log("New spot ID", newSpotId)
        history.push(`/spots/${newSpotId}`)
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
        if (imageUrl3.length > 4 && !(imageUrl4.endsWith('.png') || imageUrl4.endsWith('.jpg') || imageUrl4.endsWith('.jpeg'))) errors.imageUrl4 = 'Image URL must end in .png, .jpg, or .jpeg'


        setErrors(errors)
    }, [country, address, city, state, description, name, price, previewImageUrl, imageUrl1, imageUrl2, imageUrl3, imageUrl4])

    return (
        <form>
            <h1>Create a new Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they've booked a reservation.</p>
            <label>
                Country
                {hasSubmitted && errors.country && <span className='validation-error'>{errors.country}</span>}
                <input type='text' placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} />
            </label>
            <label>
                Street Address
                {hasSubmitted && errors.address && <span className='validation-error'>{errors.address}</span>}
                <input type='text' placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </label>
            <div>
                <label>
                    City
                    {hasSubmitted && errors.city && <span className='validation-error'>{errors.city}</span>}
                    <input type='text' placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                    ,
                </label>
                <label>
                    State
                    {hasSubmitted && errors.state && <span className='validation-error'>{errors.state}</span>}
                    <input type='text' placeholder='STATE' value={state} onChange={(e) => { setState(e.target.value) }} />
                </label>
            </div>
            <hr />
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
            <textarea placeholder='Please write at least 30 characters' value={description} onChange={(e) => { setDescription(e.target.value) }} />
            {hasSubmitted && errors.description && <p className='validation-error'>{errors.description}</p>}
            <hr />
            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
            <input type='text' placeholder='Name of your spot' value={name} onChange={(e) => { setName(e.target.value) }} />
            {hasSubmitted && errors.name && <p className='validation-error'>{errors.name}</p>}
            <hr />
            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            $ <input type='number' placeholder='Price per night (USD)' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {hasSubmitted && errors.price && <p className='validation-error'>{errors.price}</p>}
            <hr />
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <input type='text' placeholder='Preview Image URL' value={previewImageUrl} onChange={(e) => { setPreviewImageUrl(e.target.value) }} />
            {hasSubmitted && errors.previewImageUrl && <p className='validation-error'>{errors.previewImageUrl}</p>}
            <input type='text' placeholder='Image URL' value={imageUrl1} onChange={(e) => { setImageUrl1(e.target.value) }} />
            {hasSubmitted && errors.imageUrl1 && <p className='validation-error'>{errors.imageUrl1}</p>}
            <input type='text' placeholder='Image URL' value={imageUrl2} onChange={(e) => { setImageUrl2(e.target.value) }} />
            {hasSubmitted && errors.imageUrl2 && <p className='validation-error'>{errors.imageUrl2}</p>}
            <input type='text' placeholder='Image URL' value={imageUrl3} onChange={(e) => { setImageUrl3(e.target.value) }} />
            {hasSubmitted && errors.imageUrl3 && <p className='validation-error'>{errors.imageUrl3}</p>}
            <input type='text' placeholder='Image URL' value={imageUrl4} onChange={(e) => { setImageUrl4(e.target.value) }} />
            {hasSubmitted && errors.imageUrl4 && <p className='validation-error'>{errors.imageUrl4}</p>}
            <hr />
            <button type='submit' onClick={onSubmit}>Create a spot</button>
        </form>
    )
}

export default CreateSpotForm;
