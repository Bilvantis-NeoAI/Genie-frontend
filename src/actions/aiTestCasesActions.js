import {
    ADD_AI_DOCUMENT_DATA,
    ADD_AI_DOCUMENT_SUCCESS,
    ADD_AI_DOCUMENT_FAILURE,
    ADD_AI_CSV_DATA,
    ADD_AI_CSV_SUCCESS,
    ADD_AI_CSV_FAILURE,
  } from "../actionTypes/aiTestCasesActionTypes.js";
  import { ApiNewService } from "../Interceptor/interceptor.js";
  import { apis } from "../utils/config.js";

export const addAiDocumentRequest = () => ({
    type: ADD_AI_DOCUMENT_DATA,
  });
  
  export const addAiDocumentSuccess = (data) => ({
    type: ADD_AI_DOCUMENT_SUCCESS,
    payload: data,
  });
  
  export const addAiDocumentFailure = (error) => ({
    type: ADD_AI_DOCUMENT_FAILURE,
    payload: error,
  });
  
  export const addAiDocument = (payload) => {
    return (dispatch) => {
      dispatch(addAiDocumentRequest())
      
      return ApiNewService
        .post(apis.TEST_AI, payload)
        .then((response) => {
          const addedAiDocument = response.data;          
          dispatch(addAiDocumentSuccess(addedAiDocument));
          return response;
        })
        .catch((error) => {
          dispatch(addAiDocumentFailure(error.message));
        });
    };
  };
  


export const addAiCsvRequest = () => ({
  type: ADD_AI_CSV_DATA,
});

export const addAiCsvSuccess = (data) => ({
  type: ADD_AI_CSV_SUCCESS,
  payload: data,
});

export const addAiCsvFailure = (error) => ({
  type: ADD_AI_CSV_FAILURE,
  payload: error,
});

export const addAiCsvData = (payload) => {
  return (dispatch) => {
    dispatch(addAiCsvRequest());
    return ApiNewService
      .post(apis.TEST_AI2, payload)
      .then((response) => {
        const addedAiCsvData = response.data;
        dispatch(addAiCsvSuccess(addedAiCsvData));
        return response;
      })
      .catch((error) => {
        dispatch(addAiCsvFailure(error.message));
      });
  };
};
  