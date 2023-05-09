import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/loadSpots';
const SPOT_DETAILS = 'spots/spotDetails'
const SPOT_REVIEWS = 'spots/spotReviews'
const CREATE_SPOT = 'spots/createSpot'

/**  Action Creators: */
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const spotDetails = (spot) => ({
    type: SPOT_DETAILS,
    spot
})

const spotReviews = (spotId, reviews) => ({
    type: SPOT_REVIEWS,
    spotId,
    reviews
})

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot,
})


/** Thunk Action Creators: */
export const fetchSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json();
    console.log("Spots from API", spots)
    dispatch(loadSpots(spots.Spots))
}

export const fetchSpotByIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await response.json();
    // console.log("Spot from API", spot)
    dispatch(spotDetails(spot))
}

export const fetchReviewsofSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviewsForSpot = await response.json();
    console.log("reviews by spot id:", reviewsForSpot)
    // if(reviewsForSpot.length > 0) dispatch(spotReviews(spotId, reviewsForSpot.Reviews))
    dispatch(spotReviews(spotId, reviewsForSpot.Reviews))
}

export const createSpotThunk = (newSpot, images) => async dispatch => {
    debugger
    // Create new spot
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpot)
    })
    if (response.ok) {
        const newSpotFromDb = await response.json();
        console.log("Created spot", newSpotFromDb);
        // Add spot to state
        dispatch(createSpot(newSpotFromDb));

        // Upload images for spot
        const newSpotId = newSpotFromDb.id
        await images.forEach(async (image) => {
            // Call create image for spot api for each image bc this route only takes one pic at a time in api docs
            await csrfFetch(`/api/spots/${newSpotId}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(image)
            })
        })

        return newSpotId
    }
}

/** Spots reducer: */
const spotsReducer = (state = {}, action) => {
    console.log("Action", action, state)
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.forEach((spot) => {
                spotsState[spot.id] = spot;
            });
            return spotsState;
        case SPOT_DETAILS:
            return {
                ...state, [action.spot.id]: { ...state[action.spot.id], ...action.spot }
            };
        case SPOT_REVIEWS:
            return { ...state, [action.spotId]: { ...state[action.spotId], reviews: action.reviews } }
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        default:
            return state;
    }
}

export default spotsReducer;
