import { getUserData, updateUserProfile, followUser } from "../../API/api.js";
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
        await dispatch({ type: "UPDATE_USER_DATA", payload: data })
        await dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        await dispatch(GetUserData());

    } catch (error) {
        console.log(error)
    }
};
export const FollowUser = ({ _id, value, userId }) => async (dispatch) => {
    try {
        const { data } = await followUser({ _id, value, userId });
        await dispatch({ type: "FOLLOW_USER", payload: data });
        await dispatch(GetUserData());

    } catch (error) {
        console.log(error)
    }
};