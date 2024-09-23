import {
    ADD_URL_DATA,
    ADD_URL_SUCCESS,
    ADD_URL_FAILURE,
  } from "../actionTypes/urlActionTypes.js";
  
  const initialState = {
    urlData: null,
    loading: false,
    message : null,
    error: null,
  };
  
  const urlReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_URL_DATA:
        return {
          ...state,
          loading: true,
        };
      case ADD_URL_SUCCESS:
        return {
          ...state,
          loading: false,
          urlData: action.payload,
          message:"Url Submitted SucceessFully",
          error: null,
        };
      case ADD_URL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default urlReducer;
  