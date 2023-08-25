import { combineReducers } from "redux";

// Import all reducers
import ACCESS_TOKEN from "./access_token";
import SET_MAIN from "./set_main";

const reducers = combineReducers({
    ACCESS_TOKEN,
    SET_MAIN
})

export default reducers;