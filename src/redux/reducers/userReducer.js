const initialState = [];

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return state = action?.payload;
        case "UPDATE_USER_DATA":
            return state = state.map((state) => state.id === action.payload._id ? action.payload : state);
        case "FOLLOW_USER_":
            return state = action?.payload;
        default:
            return state;
    }
}

export default userReducer;