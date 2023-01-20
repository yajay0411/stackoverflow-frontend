import { addFollower, fetchFollowers } from '../../API/api.js';

export const AddFollower = (value, userId) => async (dispatch) => {
    try {
        const { data } = await addFollower(value, userId);
        dispatch({ type: 'ADD_FOLLOWER', payload: data });
        dispatch(FetchAllFollowers());
    } catch (error) {
        console.log(error);
    }
};

export const FetchAllFollowers = () => async (dispatch) => {
    try {
        const { data } = await fetchFollowers();
        dispatch({ type: 'FETCH_FOLLOWERS', payload: data });
    } catch (error) {
        console.log(error);
    }
};