import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/loadSpots';
const SPOT_DETAILS = 'spots/spotDetails'

/**  Action Creators: */
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

const spotDetails = (spot) => ({
    type: SPOT_DETAILS,
    spot
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
    console.log("Spot from API", spot)
    dispatch(spotDetails(spot))
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
            }
        default:
            return state;
    }
}

export default spotsReducer;
