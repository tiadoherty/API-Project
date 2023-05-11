import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/loadSpots';
const SPOT_DETAILS = 'spots/spotDetails'
const SPOT_REVIEWS = 'spots/getSpotReviews'
const CREATE_SPOT = 'spots/createSpot'
const GET_USER_SPOTS = 'spots/getUserSpots'
const DELETE_SPOT = 'spots/deleteSpot'

const CREATE_REVIEW = 'spots/createReviewBySpotId'
const DELETE_REVIEW = 'spots/deleteReview'

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

const getUserSpots = (userSpots) => ({
    type: GET_USER_SPOTS,
    userSpots
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

const createReview = (spotId, review) => ({
    type: CREATE_REVIEW,
    review,
    spotId
})

const deleteReview = (spotId, reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
    spotId
})


/** Thunk Action Creators: */

//fetch all spots for landing page, no user login required
export const fetchSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json();
    console.log("Spots from API", spots)
    dispatch(loadSpots(spots.Spots))
}

//thunk for getting details of one spot: called in spotshow
export const fetchSpotByIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await response.json();
    // console.log("Spot from API", spot)
    dispatch(spotDetails(spot))
}

//get reviews by spot id thunk: called in spotshow
export const fetchReviewsofSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviewsForSpot = await response.json();
    console.log("reviews by spot id:", reviewsForSpot)
    // if(reviewsForSpot.length > 0) dispatch(spotReviews(spotId, reviewsForSpot.Reviews))
    dispatch(spotReviews(spotId, reviewsForSpot.Reviews))
}

//create a spot thunk: called in form creation
export const createSpotThunk = (newSpot, images) => async dispatch => {
    try {
        // Create new spot
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSpot)
        });
        if (response.ok) {
            const newSpotFromDb = await response.json();
            console.log("Created spot", newSpotFromDb);
            // Add spot to state
            dispatch(createSpot(newSpotFromDb));

            // Upload images for spot
            const newSpotId = newSpotFromDb.id;
            const imageFetches = images.map((image) =>
                csrfFetch(`/api/spots/${newSpotId}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(image),
                })
            );
            await Promise.all(imageFetches)
            return newSpotId
        }
    } catch (backendvalidatorerrors) {
        const errorResponse = await backendvalidatorerrors.json()
        // console.log("errors from backend in try/catch in create thunk", (errorResponse.errors))
        return (errorResponse.errors)
    }
}

//get spots of current user only so they can update or delete their spots: called in UserCurrentSpots
export const spotsOfUserThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    const userSpots = await response.json();
    console.log("Spots of ONLY THE USER from API", userSpots)
    dispatch(getUserSpots(userSpots.Spots))
}

//edit a spot
export const updateSpotThunk = (spot) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        if (response.ok) {
            const spot = await response.json();
            console.log("spot from the edit a spot thunk", spot)
            dispatch(spotDetails(spot));
            return spot.id
        }
    } catch (backendvalidatorerrors) {
        const errorResponse = await backendvalidatorerrors.json()
        // console.log("errors from backend in try/catch in create thunk", (errorResponse.errors))
        return (errorResponse.errors)
    }
}

//delete a spot thunk
export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    console.log('delete response obj from thunk:', response)
    if (response.ok) {
        dispatch(deleteSpot(spotId))
    }
}

//create a review thunk
export const createReviewThunk = (review, spotId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        if (response.ok) {
            const newReviewFromDb = await response.json();
            console.log("Created review", newReviewFromDb);
            // Add spot to state
            dispatch(createReview(spotId, newReviewFromDb));
        }
    } catch (backendvalidatorerrors) {
        const errorResponse = await backendvalidatorerrors.json()
        return (errorResponse.errors)
    }
}

//delete a review thunk
export const deleteReviewThunk = (spotId, reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReview(spotId, reviewId))
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
        case GET_USER_SPOTS:
            const userSpotsState = {};
            action.userSpots.forEach((userSpot) => {
                userSpotsState[userSpot.id] = userSpot;
            });
            return userSpotsState;
        case DELETE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        case CREATE_REVIEW:
            return { ...state, [action.spotId]: { ...state[action.spotId], reviews: [...state[action.spotId].reviews, action.review], numReviews: state[action.spotId].reviews.length + 1 } }
        case DELETE_REVIEW:
            const reviews = state[action.spotId].reviews.filter(review => review.id !== action.reviewId);
            return { ...state, [action.spotId]: { ...state[action.spotId], reviews, numReviews: reviews.length } }
        default:
            return state;
    }
}

export default spotsReducer;
