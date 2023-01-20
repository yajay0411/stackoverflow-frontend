import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import currentUserReducer from "./currentUserReducer.js";
import questionReducer from "./questionsReducer.js";
import userReducer from "./userReducer.js";
import communityReducer from "./communityReducer.js";
import followersReducer from "./followersReducer.js";

const rootReducers = combineReducers({
    authReducer,
    currentUserReducer,
    questionReducer,
    userReducer,
    communityReducer,
    followersReducer,
})

export default rootReducers;
