const initialstate = {
    data: [],
    postData: {
        upVote: [null],
        downVote: [null],
        questionTags: [],
        noOfAnswers: 0,
        answer: [],
        userPosted: "",
    }
}


const communityReducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'SHARE_A_POST':
            return { ...state, data: action.payload };
        case 'FETCH_ALL_POSTS':
            return { ...state, data: action.payload };
        case 'FETCH_A_POST':
            return { ...state, postData: action.payload };
        case 'DELETE_A_POST':
            return { ...state, postData: action.payload };
        case 'LIKE_POST':
            return { ...state };
        default:
            return state;
    }
};

export default communityReducer;