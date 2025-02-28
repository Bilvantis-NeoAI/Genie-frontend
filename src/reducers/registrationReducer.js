import { REGISTRATION_DATA, REGISTRATION_FAILURE, REGISTRATION_SUCCESS } from "../actionTypes/loginActionTypes";
let initialState = {
    loading: false,
    registrationDetail: null,
    successMessage: null,
    error: null
}
const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_DATA:
            return {
                loading: true,
                registrationDetail: null,
                successMessage: null,
                error: null
            }
        case REGISTRATION_SUCCESS:
            return {
                loading: false,
                registrationDetail: "User Register Successfully",
                error: null
            }
        case REGISTRATION_FAILURE:
            return {
                loading: false,
                registrationDetail: null,
                error: 'Something went wrong'
            }
        default:
            return state;

    }
}
export default registrationReducer;