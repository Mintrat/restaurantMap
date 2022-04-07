const SET_COORDINATES = "SET_COORDINATES";

const defaultState = {
    coordinates: []
}

const useReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_COORDINATES":
            return {state, coordinates: [...action.payload]}
        default:
            return state
    }
}

export default useReducer;
export const setCoordinates = (payload) => ({ type: SET_COORDINATES, payload })