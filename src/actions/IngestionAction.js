import { ADD_INGESTION_FAILURE,ADD_INGESTION_DATA,ADD_INGESTION_SUCCESS,
    INGESTION_STAUS,INGESTION_SUCCESS,INGESTION_FAILURE
 } from "../actionTypes/ingestionActionTypes"
import { mockAPI } from "../Interceptor/interceptor"
import { apis } from "../utils/config"
export const addIngestionRequest=()=>({
    type : ADD_INGESTION_DATA
})
export const addIngestionSuccess=(ingestionResponse)=>({
    type : ADD_INGESTION_SUCCESS,
    action : ingestionResponse
})
export const addIngestionFailure=(error)=>({
    type : ADD_INGESTION_FAILURE,
    action : error
})
export const ingestionStatus =()=>({
    type : INGESTION_STAUS
})
export const ingestionFailure=(error)=>({
    type : INGESTION_FAILURE,
    action : error
})
export const ingestionSuccess =(data)=>({
    type : INGESTION_SUCCESS,
    action : data
})
export const repoIngestion =(payload)=>{
    return (dispatch)=>{
        dispatch (addIngestionRequest())
        return mockAPI
        .post(apis.ingetion,payload)
        .then((response) => {
            console.log("response>>", response); 
            const ingestionResponse = response;
            dispatch(addIngestionSuccess(ingestionResponse));
            return response;
          })
          .catch((error) => {
            dispatch(addIngestionFailure(error.message));
          });
    }
}
export const repoIngestionStatus =(payload)=>{
    return (dispatch)=>{
        dispatch(ingestionStatus())
        return mockAPI
        .post(apis.ingetionStauts)
        .then((response) => {
            console.log("response>>ingetionsd s f", response); 
            const ingestionResponse = response;
            dispatch(addIngestionSuccess(ingestionResponse));
            return response;
          })
          .catch((error) => {
            dispatch(addIngestionFailure(error.message));
          });
    }

}