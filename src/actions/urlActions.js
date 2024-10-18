import {
    ADD_URL_DATA,
    ADD_URL_SUCCESS,
    ADD_URL_FAILURE,
  } from "../actionTypes/urlActionTypes.js";
  import { ApiInject } from "../Interceptor/interceptor.js";
  import { apis } from "../utils/config.js";
  
  export const addUrlRequest = () => ({
    type: ADD_URL_DATA,
  });
  
  export const addUrlSuccess = (data) => ({
    type: ADD_URL_SUCCESS,
    payload: data,
  });
  
  export const addUrlFailure = (error) => ({
    type: ADD_URL_FAILURE,
    payload: error,
  });
  
  export const addUrl = (payload) => {
    return (dispatch) => {
      dispatch(addUrlRequest());
      return ApiInject
        .post(apis.URL_UPLOAD, payload)  
        .then((response) => {
          const addedUrl = response.data;
          dispatch(addUrlSuccess(addedUrl));
          return response;
        })
        .catch((error) => {
          dispatch(addUrlFailure(error.message));
        });
    };
  };
  