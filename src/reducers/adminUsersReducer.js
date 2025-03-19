import {
    USER_LIST_DATA, USER_LIST_FAILURE, USER_LIST_SUCCESS,
    USER_PENDING_DATA, USER_PENDING_FAILURE, USER_PENDING_SUCCESS,
    USER_APPROVE_DATA, USER_APPROVE_FAILURE, USER_APPROVE_SUCCESS,
    USER_DELETE_DATA, USER_DELETE_FAILURE, USER_DELETE_SUCCESS,
    USER_ROLE_EDIT_DATA, USER_ROLE_EDIT_FAILURE, USER_ROLE_EDIT_SUCCESS,
    USER_RESET_PASSWORD_DATA,USER_RESET_PASSWORD_FAILURE,USER_RESET_PASSWORD_SUCCESS
} from "../actionTypes/adminActionTypes";
const initialState = {
    loading: false,
    userListData: null,
    pendingUsers: null,
    approveUser: null,
    deleteUser: null,
    editUserRole: null,
    resetPassword:null,
    error: null,
}
const UserlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST_DATA:
            return {
                ...state,
                loading: true,
                userListData: null,
                error: null,
            };
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                userListData: action,
                error: null,
            };
        case USER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                userListData: null,
                error: action
            }
        case USER_PENDING_DATA:
            return {
                ...state,
                loading: true,
                pendingUsers: null,
                error: null
            }
        case USER_PENDING_SUCCESS:
            return {
                ...state,
                loading: false,
                pendingUsers: action,
                error: null
            }
        case USER_PENDING_FAILURE:
            return {
                ...state,
                loading: false,
                pendingUsers: null,
                error: action
            }
        case USER_APPROVE_DATA:
            return {
                ...state,
                loading: true,
                approveUser: null,
                error: null

            }
        case USER_APPROVE_SUCCESS:
            return {
                ...state,
                loading: false,
                approveUser: action,
                error: null
            }
        case USER_APPROVE_FAILURE:
            return {
                ...state,
                loading: false,
                approveUser: null,
                error: action
            }
        case USER_DELETE_DATA:
            return {
                ...state,
                loading: true,
                deleteUser: null,
                error: null
            }
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteUser: action,
                error: null
            }
        case USER_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                deleteUser: null,
                error: action
            }
        case USER_ROLE_EDIT_DATA:
            return {
                ...state,
                loading: true,
                editUserRole: null,
                error: null
            }
        case USER_ROLE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                editUserRole: action,
                error: null
            }
        case USER_ROLE_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
                editUserRole: null,
                error: action
            }
        case USER_RESET_PASSWORD_DATA:
            return{
                ...state,
                loading:true,
                resetPassword:null,
                error:null
            }
        case USER_RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                resetPassword:action,
                error:null
            }
        case USER_RESET_PASSWORD_FAILURE:
            return{
                ...state,
                loading:false,
                resetPassword:action,
                error:action
            }
        default:
            return state;
    }
}
export default UserlistReducer;