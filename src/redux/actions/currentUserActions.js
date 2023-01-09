export const getCurrentUser = (data) => {
    return ({
        type: "FETCH_CURRENT_USER",
        payload: data
    })
}