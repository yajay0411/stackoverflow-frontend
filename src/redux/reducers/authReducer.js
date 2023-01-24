const authReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            return { ...state, data: action?.payload };
        case "VERIFY_USER":
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            return { ...state, data: action?.payload };
        default:
            return state;
    }
}

export default authReducer;




