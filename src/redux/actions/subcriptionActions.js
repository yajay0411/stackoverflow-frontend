import { getSubscriptionPlan, planPayment } from "../../API/api.js"


export const GetSubscriptionPlan = () => async (dispatch) => {
    try {
        const { data } = await getSubscriptionPlan();
        await dispatch({ type: "GET_SUBCRIPTION_PLAN", payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const PlanPayment = ({ id, email }) => async () => {
    try {
        const { data } = await planPayment({ id, email });
        window.location.href = data.url
    } catch (error) {
        console.log(error);
    }
}