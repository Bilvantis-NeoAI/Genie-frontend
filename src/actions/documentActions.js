import {
    ADD_DOCUMENT_DATA,
    ADD_DOCUMENT_SUCCESS,
    ADD_DOCUMENT_FAILURE,
  } from "../actionTypes/documentActionTypes.js";
  import { ApiInject } from "../Interceptor/interceptor.js";
  import { apis } from "../utils/config.js";
  
 
  export const addDocumentRequest = () => ({
    type: ADD_DOCUMENT_DATA,
  });
  
  export const addDocumentSuccess = (data) => ({
    type: ADD_DOCUMENT_SUCCESS,
    payload: data,
  });
  
  export const addDocumentFailure = (error) => ({
    type: ADD_DOCUMENT_FAILURE,
    payload: error,
  });
  
  export const addDocument = (payload) => {
    console.log("calling");
    
    return (dispatch) => {
      dispatch(addDocumentRequest());
      return ApiInject
        .post(apis.DOCUMENT_UPLOAD, payload)  
        .then((response) => {
          const addedDocument = response.data;
          dispatch(addDocumentSuccess(addedDocument));
          return response;
        })
        .catch((error) => {
          dispatch(addDocumentFailure(error.message));
        });
    };
  };
  