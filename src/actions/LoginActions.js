import { LOGIN_DATA,LOGIN_SUCCESS,LOGIN_FAILURE ,REGISTRATION_DATA,REGISTRATION_FAILURE,REGISTRATION_SUCCESS } from "../actionTypes/loginActionTypes";
import { DeployedURL } from "../interceptors/interceptors";
import { apis } from "../utils/config";
console.log("===========adfsdsfd");

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
export const registrationFailure =(error)=>({
    type :REGISTRATION_FAILURE,
    action : error
})
export const registrationSuccess=(data)=>({
    type : REGISTRATION_SUCCESS,
    action : data
})
export const userLogin = (payload) => {
    return (dispatch) => {
      dispatch(fetchLoginData());
      return DeployedURL
        .post(apis.LOGIN, payload)
        .then((response) => {
          const loginResponse = response;
          dispatch(fetchLoginDataSuccess(loginResponse));
          return loginResponse; // Return the response here
        })
        .catch((error) => {
          dispatch(fetchLoginDataFailure(error?.response?.data?.detail));
          return Promise.reject(error?.response?.data?.detail); // Reject with the error here
        });
    };
  };
  
  
export const userRegistration =(payload)=>{
    return(dispatch)=>{
        dispatch(registrationData())
        return DeployedURL
        .post(apis.REGISTER,payload)
        .then((response)=>{     
          console.log("====responseresponse from actions",response);
                 
            const registartionResponse = response;
           dispatch(fetchLoginDataSuccess(registartionResponse));
           return response;
        }).catch((error)=>{
          console.log("===error form actions",error);
          
            dispatch(fetchLoginDataFailure(error?.response?.data?.detail));
           return error?.response?.data?.detail;
        })
    }
}