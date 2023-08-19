import { combineReducers } from "redux";

// Import all reducers
import accessToken from "./accessToken";
import mobileReducer from "./mobile";

const reducers = combineReducers({
    accessToken,
    mobileReducer
})

export default reducers;