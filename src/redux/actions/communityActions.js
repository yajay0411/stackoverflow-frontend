import { createPost, getAllPosts, getSelectedPost, getPostPhoto, likePost, deleteSelectedPost } from "../../API/api.js";

export const SharePost = (postData, navigate) => async (dispatch) => {
    try {
        const { data } = await createPost(postData);
        await dispatch({ type: "POST_ANSWER", payload: data });
        dispatch(FetchAllPosts());
        navigate("/community")
    } catch (error) {
        console.log(error);
    }
};

export const FetchAllPosts = () => async (dispatch) => {
    try {
        const { data } = await getAllPosts();
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const FetchSelectedPost = (postID) => async (dispatch) => {
    try {
        const { data } = await getSelectedPost(postID);
        dispatch({ type: 'FETCH_A_POST', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const DeletePost = (PostID, navigate) => async (dispatch) => {
    try {
        const { data } = await deleteSelectedPost(PostID);
        dispatch({ type: 'DELETE_A_POST', payload: data });
        dispatch(FetchAllPosts());
        navigate("/community")
    } catch (error) {
        console.log(error);
    }
};

export const GetPhoto = (id) => async () => {
    try {
        await getPostPhoto(id);
    } catch (error) {
        console.log(error);
    }
};

export const LikePost = (postID, value, userId) => async (dispatch) => {
    try {
        const { data } = await likePost(postID, value, userId);
        dispatch({ type: 'LIKE_POST', payload: data });
        dispatch(FetchSelectedPost(postID));
        dispatch(FetchAllPosts());
    } catch (error) {
        console.log(error);
    }
};
