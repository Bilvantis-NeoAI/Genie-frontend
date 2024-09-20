import {
    ADD_DOCUMENT_DATA,
    ADD_DOCUMENT_SUCCESS,
    ADD_DOCUMENT_FAILURE,
  } from "../actionTypes/documentActionTypes";
  
  const initialState = {
    loading: false,
    document: null,  
    message: null,   
    error: null,     
  };
  
  const documentReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DOCUMENT_DATA:
        return {
          ...state,
          loading: true,
          message: null,  
          error: null,   
        };
  
      case ADD_DOCUMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          document: action.payload,         
          message: "Document added successfully!",  
          error: null,
        };
  
      case ADD_DOCUMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,  
        };
  
      default:
        return state;
    }
  };
  
  export default documentReducer;
  