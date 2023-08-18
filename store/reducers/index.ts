import { combineReducers } from "redux";

// Import all reducers
import accessToken from "./accessToken";

const reducers = combineReducers({
    accessToken
})

export default reducers;