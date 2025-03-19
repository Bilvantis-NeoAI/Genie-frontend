import {
    USER_LIST_DATA, USER_LIST_FAILURE, USER_LIST_SUCCESS,
    USER_PENDING_DATA, USER_PENDING_FAILURE, USER_PENDING_SUCCESS,
    USER_APPROVE_DATA, USER_APPROVE_FAILURE, USER_APPROVE_SUCCESS,
    USER_DELETE_DATA, USER_DELETE_FAILURE, USER_DELETE_SUCCESS,
    USER_REJECT_DATA,USER_REJECT_FAILURE,USER_REJECT_SUCCESS,
    USER_ROLE_EDIT_DATA,USER_ROLE_EDIT_FAILURE,USER_ROLE_EDIT_SUCCESS,
    USER_RESET_PASSWORD_DATA,USER_RESET_PASSWORD_FAILURE,USER_RESET_PASSWORD_SUCCESS
} from "../actionTypes/adminActionTypes.js";
import { AdminUsers } from "../Interceptor/interceptor.js";
import { apis } from "../utils/config.js";

export const userListRequest = () => ({
    type: USER_LIST_DATA,
});

export const userListSuccess = (message) => ({
    type: USER_LIST_SUCCESS,
    payload: message,
});
export const userListFailure = (error) => ({
    type: USER_LIST_FAILURE,
    payload: error
})

export const pendingUserListData = () => ({
    type: USER_PENDING_DATA
})
export const pendingUserListSuccess = (data) => ({
    type: USER_PENDING_SUCCESS,
    payload: data
})
export const pendingUserListFailure = (error) => ({
    type: USER_PENDING_FAILURE,
    payload: error
})

export const approveUserData = () => ({
    type: USER_APPROVE_DATA
})
export const approveUserSuccess = (response) => ({
    type: USER_APPROVE_SUCCESS,
    payload: response
})
export const approveUserFailure = (error) => ({
    type: USER_APPROVE_FAILURE,
    payload: error
})

export const userDeleteData = () => ({
    type: USER_DELETE_DATA
})
export const userDeleteSuccess = (response) => ({
    type: USER_DELETE_SUCCESS,
    payload: response
})
export const userDeleteFailure = (error) => ({
    type: USER_DELETE_FAILURE,
    payload: error
})

export const userRejectData=()=>({
    type:USER_REJECT_DATA
})
export const userRejectSuccess=(response)=>({
    type:USER_REJECT_SUCCESS,
    payload:response
})
export const userRejectFailure=(error)=>({
    type:USER_REJECT_FAILURE,
    payload:error
})

export const userRoleEditData=()=>({
    type:USER_ROLE_EDIT_DATA
})
export const userRoleEditSuccess=(response)=>({
    type:USER_ROLE_EDIT_SUCCESS,
    payload:response
})
export const userRoleEditFailure=(error)=>({
    type:USER_ROLE_EDIT_FAILURE,
    payload:error
})

export const userResetPasswordData =()=>({
    type:USER_RESET_PASSWORD_DATA
})
export const userResetPasswordSeccess=(response)=>({
    type:USER_RESET_PASSWORD_SUCCESS,
    payload:response
})
export const userResetPasswordFailure=(error)=>({
    type:USER_RESET_PASSWORD_FAILURE,
    payload:error
})
// export const userList = (payload) => {
//     console.log("===payloadpayload",payload);
    
//     return (dispatch) => {
//         dispatch(userListRequest());
//         const params = payload ? { params: payload } : {};

//         return AdminUsers
//             .get(apis.USERS_LIST, params) // Pass params only if payload exists
//             .then((response) => {
//                 dispatch(userListSuccess(response));
//                 return response;
//             })
//             .catch((error) => {
//                 dispatch(userListFailure(error.message));
//             });
//     };
// };
export const userList = (payload) => {
    console.log("===payloadpayload", payload);

    return (dispatch) => {
        dispatch(userListRequest());

        // Filter out empty values from payload
        const filteredPayload = payload
            ? Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== "" && v !== null && v !== undefined))
            : {};

        const params = Object.keys(filteredPayload).length ? { params: filteredPayload } : {};

        return AdminUsers
            .get(apis.USERS_LIST, params) // Pass filtered params
            .then((response) => {
                dispatch(userListSuccess(response));
                return response;
            })
            .catch((error) => {
                dispatch(userListFailure(error.message));
            });
    };
};


export const pendingUserList = () => {
    return (dispatch) => {
        dispatch(pendingUserListData());
        return AdminUsers
            .get(apis.PENDING_LIST)
            .then((response) => {
                dispatch(pendingUserListSuccess(response))
                return response
            })
            .catch((error) => {
                dispatch(pendingUserListFailure(error.message))
            })
    }
}

export const userApprove = (userid) => {
    return (dispatch) => {
        dispatch(approveUserData());
        return AdminUsers
            .post(`${apis.APPROVE_USER}/${userid}`)
            .then((response) => {
                dispatch(approveUserSuccess(response))
                return response
            })
            .catch((error) => {
                dispatch(approveUserFailure(error.message))
            })
    }
}

export const userDelete = (userid) => {
    return (dispatch) => {
        dispatch(userDeleteData());
        return AdminUsers
            .delete(`${apis.DELETE_USER}/${userid}`)
            .then((response) => {
                dispatch(userDeleteSuccess(response))
                return response
            })
            .catch((error) => {
                dispatch(userDeleteFailure(error.message))
            })
    }
}

export const userReject=(userid)=>{
    return (dispatch)=>{
        dispatch(userRejectData())
        return AdminUsers
        .post(`${apis.REJECT_USER}/${userid}`)
            .then((response) => {
                dispatch(userRejectSuccess(response))
                return response
            })
            .catch((error) => {
                dispatch(userRejectFailure(error.message))
            })
    }
}

export const userRoleEdit=(payload)=>{    
    return(dispatch)=>{
        dispatch(userRoleEditData())
        return AdminUsers
        .put(`${apis.EDIT_USER_ROLE}/${payload.userid}/role`,{ role: payload.role })
        .then((response) => {
            dispatch(userRoleEditSuccess(response))
            return response
        })
        .catch((error) => {
            dispatch(userRoleEditFailure(error.message))
        })
    }
}

export const userResetPassword=(password,payload)=>{    
    return(dispatch)=>{
        dispatch(userResetPasswordData())
        return AdminUsers
        .post(`${apis.RESET_PASSWORD}/${payload.id}/`,{ new_password: password.new_password })
        .then((response)=>{
            dispatch(userResetPasswordSeccess(response))
            return response
        })
        .catch((error)=>{
            dispatch(userResetPasswordFailure(error.message))
        })
    }
}