const initialstate = {
    data: [],
    QuestionData: {
        upVote: [null],
        downVote: [null],
        questionTags: [],
        noOfAnswers: 0,
        answer: [],
        userPosted: "",
    }
}

const questionReducer = (state = initialstate, action) => {

    switch (action.type) {
        case "POST_QUESTION":
            return { ...state };
        case "GET_ALL_QUESTION":
            return { ...state, data: action?.payload };
        case "GET_SELECTED_QUESTION":
            return { ...state, QuestionData: action?.payload };
        case "DELETE_SELECTED_QUESTION":
            return { ...state, QuestionData: action?.payload };
        case "POST_ANSWER":
            return { ...state };
        case "DELETE_ANSWER":
            return { ...state };
        case "VOTE_QUESTION":
            return { ...state };
        default:
            return state;
    }
}
export default questionReducer;