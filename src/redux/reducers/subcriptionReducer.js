const initialstate = [];

const subscriptionReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "GET_SUBCRIPTION_PLAN":
            return state = action?.payload;
        default:
            return state;
    }
}
export default subscriptionReducer;