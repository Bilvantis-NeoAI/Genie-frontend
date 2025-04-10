import { ADD_INGESTION_FAILURE,ADD_INGESTION_DATA,ADD_INGESTION_SUCCESS,
   INGESTED_REPO_FAILURE,INGESTED_REPO_SUCCESS,INGETSED_REPO_DATA
} from "../actionTypes/ingestionActionTypes"
import { GitIngestion } from "../Interceptor/interceptor"
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
export const ingestedRepoData =()=>({
   type:INGETSED_REPO_DATA
})
export const ingestedRepoSuccess=(response)=>({
   type : INGESTED_REPO_SUCCESS,
   action : response
})
export const ingestedRepoFailure=(error)=>({
   type : INGESTED_REPO_FAILURE,
   action : error
})
export const repoIngestion =(payload)=>{
   return (dispatch)=>{       
       dispatch (addIngestionRequest())
       return GitIngestion
       .post(apis.ingetion,payload)
       .then((response) => {
           const ingestionResponse = response;
           dispatch(addIngestionSuccess(ingestionResponse));
           return response;
         })
         .catch((error) => {                     
           dispatch(addIngestionFailure(error));
         });
   }
}
export const ingestedRepoList=()=>{
   return (dispatch)=>{
      dispatch(ingestedRepoData())
      return GitIngestion
      .get(apis.INGESTED_LIST)
      .then((response) => {
         dispatch(ingestedRepoSuccess(response));
         return response;
       })
       .catch((error) => {                     
         dispatch(ingestedRepoFailure(error));
       });
   }
}