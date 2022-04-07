const ADD_RESTAURANTS_LIST = "ADD_RESTAURANTS_LIST";

const defaultState = {
    list: []
}

const restaurantsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case "ADD_RESTAURANTS_LIST":
            return {...state, list: [...action.payload]}
        default:
            return state;
    }
}

export default restaurantsReducer;
export const addRestaurantsList = (payload) => ({ type: ADD_RESTAURANTS_LIST, payload });