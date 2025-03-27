import { DEAD_CODE_DATA,DEAD_CODE_FAILURE,DEAD_CODE_SUCCESS } from "../actionTypes/deadCodeActionTypes";
import { DeployedURL } from "../Interceptor/interceptor";
import { apis } from "../utils/config";
export const deadCodeData =()=>({
    type:DEAD_CODE_DATA
})
export const deadCodeSuccess=(response)=>({
    type:DEAD_CODE_SUCCESS,
    payload:response
})
export const deadCodeFailure=(response)=>({
    type:DEAD_CODE_FAILURE,
    payload:response
})
export const deadCode =(payload)=>{
    return(dispatch)=>{
        dispatch(deadCodeData())
        return DeployedURL
        .post(apis.DEAD_CODE,payload)
        .then((response)=>{
            dispatch(deadCodeSuccess(response))
            return response
        })
        .catch((error)=>{
            dispatch(deadCodeFailure(error.message))
        })
    }
}