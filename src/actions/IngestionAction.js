import { ADD_INGESTION_FAILURE,ADD_INGESTION_DATA,ADD_INGESTION_SUCCESS
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