import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
});

export const logIn = (authData) => API.post("/users/login", authData);
export const signUp = (authData) => API.post("/users/signup", authData);

export const getUserData = () => API.get("/users/usersdata");
export const updateUserProfile = (userId, updateData) => API.patch(`/users/updateuserdata/${userId}`, updateData);

export const postQuestion = (questionData) => API.post("/questions/askquestion", questionData);
export const getAllQuestions = () => API.get("/questions/getallquestions");
export const getSelectedQuestion = (questionID) => API.get(`/questions/getselectedquestion/${questionID}`);
export const deleteSelectedQuestion = (questionID) => API.delete(`/questions/deleteselectedquestion/${questionID}`);
export const voteQuestion = (questionID, value, userID) => API.patch(`/questions/votequestion/${questionID}`, { value, userID });


export const postAnswer = (questionID, noOfAnswers, answerBody, userAnswered, userID) => API.patch(`/answers/postanswer/${questionID}`, { noOfAnswers, answerBody, userAnswered, userID });
export const deleteAnswer = (questionID, noOfAnswers, answerID) => API.patch(`/answers/deleteanswer/${questionID}`, { noOfAnswers, answerID });


