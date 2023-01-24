import { signUp, logIn, verifyUser, logoutUser, resetPassword, sendOtpEmail } from "../../API/api.js";
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

export const SendOtpEmail = ({ email, value }) => async () => {
    try {
        await sendOtpEmail({ email, value });
    } catch (error) {
        console.log(error)
    }
};

export const VerifyUser = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await verifyUser(authData);
        dispatch({ type: "VERIFY_USER", payload: data })
        await dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        await navigate("/askquestion");
    } catch (error) {
        console.log(error)
    }
};


export const ResetPass = (authData, navigate) => async () => {
    try {
        await resetPassword(authData);
        await navigate("/auth");
    } catch (error) {
        console.log(error)
    }
};
export const LogoutUser = (userId) => async () => {
    try {
        await logoutUser(userId);
    } catch (error) {
        console.log(error)
    }
};
