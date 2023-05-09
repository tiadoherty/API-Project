import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/loadSpots';
const SPOT_DETAILS = 'spots/spotDetails'
const SPOT_REVIEWS = 'spots/spotReviews'

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
    dispatch(spotReviews(spotId, reviewsForSpot.Reviews))
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
            return{...state, [action.spotId]: { ...state[action.spotId], reviews: action.reviews }}
        default:
            return state;
    }
}

export default spotsReducer;
