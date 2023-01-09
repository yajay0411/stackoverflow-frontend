const initialState = null;

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_USER":
            return state = action?.payload;
        default:
            return state;
    }
}

export default currentUserReducer;