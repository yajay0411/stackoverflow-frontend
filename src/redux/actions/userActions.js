import { getUserData, updateUserProfile } from "../../API/api.js";
import { getCurrentUser } from "./currentUserActions.js";



export const GetUserData = () => async (dispatch) => {
    try {
        const { data } = await getUserData()
        dispatch({ type: "GET_USER_DATA", payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const UpdateUserData = (userId, updateData) => async (dispatch) => {
    try {
        const { data } = await updateUserProfile(userId, updateData)
        dispatch({ type: "UPDATE_USER_DATA", payload: data })
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(GetUserData());

    } catch (error) {
        console.log(error)
    }
};