import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/loadSpots';

/**  Action Creators: */
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})


/** Thunk Action Creators: */
export const fetchSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json();
    console.log("Spots", spots)
    dispatch(loadSpots(spots.Spots))
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
        default:
            return state;
    }
}

export default spotsReducer;
