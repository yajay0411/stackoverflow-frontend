import { signUp, logIn } from "../../API/api.js";
import { getCurrentUser } from "./currentUserActions.js";

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await signUp(authData)
        dispatch({ type: "AUTH", payload: data });
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error)
    }
};


export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await logIn(authData)
        dispatch({ type: "AUTH", payload: data });
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error)
    }
};