import { LOGIN_DATA, LOGIN_FAILURE, LOGIN_SUCCESS } from "../actionTypes/loginActionTypes";
const initialState = {
    loading: false,
    loginData: null,
    successMessage: null,
    error: null
}
const loginReducer = async (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                loading: true,
                successMessage: null,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: 'Loged in Successfull',
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: null,
                error: 'Something went wrong'
            }
        default:
            return state;
    }
}
export default loginReducer;