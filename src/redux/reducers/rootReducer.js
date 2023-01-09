import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import currentUserReducer from "./currentUserReducer.js"
import questionReducer from "./questionsReducer.js"
import userReducer from "./userReducer"

const rootReducers = combineReducers({
    authReducer,
    currentUserReducer,
    questionReducer,
    userReducer
})


export default rootReducers;
