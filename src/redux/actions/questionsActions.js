import { postQuestion, getAllQuestions, getSelectedQuestion, deleteSelectedQuestion, postAnswer, deleteAnswer, voteQuestion } from "../../API/api.js";
import { getCurrentUser } from "./currentUserActions.js";


export const AskQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await postQuestion(questionData);
        await dispatch({ type: "POST_QUESTION", payload: data });
        await dispatch(GetAllQuestions());
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const GetAllQuestions = () => async (dispatch) => {
    try {
        const { data } = await getAllQuestions();
        await dispatch({ type: "GET_ALL_QUESTION", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const GetSelectedQuestion = (questionID) => async (dispatch) => {
    try {
        const { data } = await getSelectedQuestion(questionID);
        await dispatch({ type: "GET_SELECTED_QUESTION", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const DeleteSelectedQuestion = (questionID, navigate) => async (dispatch) => {
    try {
        const { data } = await deleteSelectedQuestion(questionID);
        await dispatch({ type: "DELETE_SELECTED_QUESTION", payload: data });
        await dispatch(GetAllQuestions())
        navigate("/")
    } catch (error) {
        console.log(error.message);
    }
}

export const PostAnswer = ({ questionID, noOfAnswers, answerBody, userAnswered, userID }) => async (dispatch) => {
    try {
        const { data } = await postAnswer(questionID, noOfAnswers, answerBody, userAnswered, userID);
        await dispatch({ type: "POST_ANSWER", payload: data });
        dispatch(GetSelectedQuestion(questionID));
    } catch (error) {
        console.log(error);
    }
}

export const DeleteAnswer = ({ questionID, answerID, noOfAnswers }, navigate) => async (dispatch) => {
    try {
        const { data } = await deleteAnswer(questionID, noOfAnswers, answerID);
        await dispatch({ type: "DELETE_ANSWER", payload: data });
        dispatch(GetSelectedQuestion(questionID));
    } catch (error) {
        console.log(error.message);
    }

}
export const VoteQuestion = (questionID, value, userID) => async (dispatch) => {
    try {
        const { data } = await voteQuestion(questionID, value, userID);
        await dispatch({ type: "VOTE_QUESTION", payload: data });
        await dispatch(GetSelectedQuestion(questionID));
    } catch (error) {
        console.log(error.message);
    }
}


