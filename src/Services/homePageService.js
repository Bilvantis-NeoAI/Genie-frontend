import { Api } from "../Interceptor/interceptor";
import { ENDPOINT_FULL_QA } from "../Utils";

export const fetchData =  (payload) => {
    
      const response =  Api.post(ENDPOINT_FULL_QA, payload);
      return Promise.resolve(response);
  
  };
  


