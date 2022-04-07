import {createStore, combineReducers} from "redux";
import restaurantsReducer from "./restaurantsReducer";
import useReducer from "./userReducer";

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    user: useReducer
});

const store = createStore(rootReducer);
export default store;