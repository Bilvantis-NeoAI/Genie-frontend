import { LOGIN_DATA,LOGIN_SUCCESS,LOGIN_FAILURE ,REGISTRATION_DATA,REGISTRATION_FAILURE,REGISTRATION_SUCCESS,USER_DETAILS,USER_DETAILS_SUCCESS,USER_DETAILS_FAILURE} from "../actionTypes/loginActionTypes";
import { DeployedURL } from "../Interceptor/interceptor";
import { apis } from "../utils/config";
export const fetchLoginData=()=>({
type:LOGIN_DATA
})
export const fetchLoginDataSuccess=(data)=>({
type : LOGIN_SUCCESS,
action : data
})
export const fetchLoginDataFailure=(error)=>({    
    type : LOGIN_FAILURE,
    action : error
})
export const registrationData =()=>({
    type : REGISTRATION_DATA
})
export const fetchUserDetails =()=>({
    type : USER_DETAILS
})

export const fetchUserDetailsSuccess =(data)=>({
    type : USER_DETAILS_SUCCESS,
    action : data
})

export const fetchUserDetailsFailure =(error)=>({
    type : USER_DETAILS_FAILURE,
    action : error
})


export const registrationFailure =(error)=>({
    type :REGISTRATION_FAILURE,
    action : error
})
export const registrationSuccess=(data)=>({
    type : REGISTRATION_SUCCESS,
    action : data
})
export const userLogin=(payload)=>{
    return(dispatch)=>{
        dispatch(fetchLoginData())
        return DeployedURL
       .post(apis.LOGIN,payload)
       .then((response) => {
           const loginResponse = response;
           dispatch(fetchLoginDataSuccess(loginResponse));
           return response;
         })
         .catch((error) => {                                
           dispatch(fetchLoginDataFailure(error?.response?.data?.detail));
           return error?.response?.data?.detail;
         });
    }
}

export const userDetails = (token) => {
    return async (dispatch) => {
      try {
        dispatch(fetchUserDetails());
  
        const response = await DeployedURL.get(
          `${apis.USER_DETAILS}?access_token=${token}`
        );
  
        dispatch(fetchUserDetailsSuccess(response.data));
        return response;
      } catch (error) {
        const errorMsg = error?.response?.data?.detail || "Something went wrong";
        dispatch(fetchUserDetailsFailure(errorMsg));
        return errorMsg;
      }
    };
  };
export const userRegistration =(payload)=>{
    return(dispatch)=>{
        dispatch(registrationData())
        return DeployedURL
        .post(apis.REGISTER,payload)
        .then((response)=>{            
            const registartionResponse = response;
           dispatch(fetchLoginDataSuccess(registartionResponse));
           return response;
        }).catch((error)=>{
            dispatch(fetchLoginDataFailure(error?.response?.data?.detail));
           return error?.response?.data?.detail;
        })
    }
}