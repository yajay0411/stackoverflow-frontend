import axios from "axios";

//base URL for our Server 
const API = axios.create({
    baseURL: "http://localhost:5000"
});

//Token verification
API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
});

//api call for auth
export const logIn = (authData) => API.post("/users/login", authData);
export const signUp = (authData) => API.post("/users/signup", authData);
export const logoutUser = (authData) => API.post("/users/logout", authData);

//api for OTP Functionalities
export const sendOtpEmail = ({ email, value }) => API.post("/users/sendemail", { email, value });
export const verifyUser = (authData) => API.post("/users/authenticateuser", authData, { "Access-Control-Allow-Private-Network": true });
export const resetPassword = (authData) => API.post("/users/changepassword", authData, { "Access-Control-Allow-Private-Network": true });

//api call for getting all user data and selected user data
export const getUserData = () => API.get("/users/usersdata");
export const updateUserProfile = (userId, updateData) => API.patch(`/users/updateuserdata/${userId}`, updateData, { "Access-Control-Allow-Private-Network": true });

//api call related posting, deleting, fetching all questions or selected question,voting question
export const postQuestion = (questionData) => API.post("/questions/askquestion", questionData, { "Access-Control-Allow-Private-Network": true });
export const getAllQuestions = () => API.get("/questions/getallquestions");
export const getSelectedQuestion = (questionID) => API.get(`/questions/getselectedquestion/${questionID}`);
export const deleteSelectedQuestion = (questionID) => API.delete(`/questions/deleteselectedquestion/${questionID}`, { "Access-Control-Allow-Private-Network": true });
export const voteQuestion = (questionID, value, userID) => API.patch(`/questions/votequestion/${questionID}`, { value, userID }, { "Access-Control-Allow-Private-Network": true });

//api call for posting answer and deleting answer
export const postAnswer = (questionID, noOfAnswers, answerBody, userAnswered, userID) => API.patch(`/answers/postanswer/${questionID}`, { noOfAnswers, answerBody, userAnswered, userID }, { "Access-Control-Allow-Private-Network": true });
export const deleteAnswer = (questionID, noOfAnswers, answerID) => API.patch(`/answers/deleteanswer/${questionID}`, { noOfAnswers, answerID }, { "Access-Control-Allow-Private-Network": true });


//api call for posting a Post, fetching all post, fetching selected post,fetching photos 
export const createPost = (postData) => API.post(`/community/createPost`, postData, { "Access-Control-Allow-Private-Network": true, "Content-Type": "multipart/form-data" });
export const getAllPosts = () => API.get('/community/getAllPosts', { "Access-Control-Allow-Private-Network": true });
export const getSelectedPost = (postID) => API.get(`/community/getSelectedPost/${postID}`, { "Access-Control-Allow-Private-Network": true });
export const deleteSelectedPost = (postID) => API.delete(`/community/deleteSelectedPost/${postID}`, { "Access-Control-Allow-Private-Network": true });

//api call for liking a post
export const likePost = (id, value, userId) => API.patch(`/community/likePost/${id}`, { value, userId }, { "Access-Control-Allow-Private-Network": true });

//api call for adding a follower
export const followUser = ({ _id, value, userId }) => API.put(`/users/follow/${_id}`, { value, userId }, { "Access-Control-Allow-Private-Network": true });


//api call for fetching subscription plan.
export const getSubscriptionPlan = () => API.get('/subs/prices');

//api call for buying a plan
export const planPayment = ({ id, email }) => API.post('/subs/session', { id, email });