import axios from "axios";

//base URL for our Server 
const API = axios.create({
    baseURL: "https://calm-rose-beetle-toga.cyclic.app"
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
export const verifyUser = (authData) => API.post("/users/authenticateuser", authData);
export const resetPassword = (authData) => API.post("/users/changepassword", authData);

//api call for getting all user data and selected user data
export const getUserData = () => API.get("/users/usersdata");
export const updateUserProfile = (userId, updateData) => API.patch(`/users/updateuserdata/${userId}`, updateData);

//api call related posting, deleting, fetching all questions or selected question,voting question
export const postQuestion = (questionData) => API.post("/questions/askquestion", questionData);
export const getAllQuestions = () => API.get("/questions/getallquestions");
export const getSelectedQuestion = (questionID) => API.get(`/questions/getselectedquestion/${questionID}`);
export const deleteSelectedQuestion = (questionID) => API.delete(`/questions/deleteselectedquestion/${questionID}`);
export const voteQuestion = (questionID, value, userID) => API.patch(`/questions/votequestion/${questionID}`, { value, userID });

//api call for posting answer and deleting answer
export const postAnswer = (questionID, noOfAnswers, answerBody, userAnswered, userID) => API.patch(`/answers/postanswer/${questionID}`, { noOfAnswers, answerBody, userAnswered, userID });
export const deleteAnswer = (questionID, noOfAnswers, answerID) => API.patch(`/answers/deleteanswer/${questionID}`, { noOfAnswers, answerID });


//api call for posting a Post, fetching all post, fetching selected post,fetching photos 
export const createPost = (postData) => API.post(`/community/createPost`, postData);
export const getAllPosts = () => API.get('/community/getAllPosts');
export const getSelectedPost = (postID) => API.get(`/community/getSelectedPost/${postID}`);
export const deleteSelectedPost = (postID) => API.delete(`/community/deleteSelectedPost/${postID}`);

//api call for liking a post
export const likePost = (id, value, userId) => API.patch(`/community/likePost/${id}`, { value, userId });

//api call for adding a follower
export const followUser = ({ _id, value, userId }) => API.put(`/users/follow/${_id}`, { value, userId });


//api call for fetching subscription plan.
export const getSubscriptionPlan = () => API.get('/subs/prices');

//api call for buying a plan
export const planPayment = ({id, email}) => API.post('/subs/session',{ id, email});