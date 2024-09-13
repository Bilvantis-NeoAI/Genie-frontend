import {
    FETCH_ANSWERS_DATA,
    FETCH_ANSWERS_SUCCESS,
    FETCH_ANSWERS_FAILURE,
    INCREMENT_COUNTER,
  } from "../actionTypes/questionActionTypes.js"
  
  const initialState = {
    loading: false,
    answers: [],
    successMessage: null, // to store success message
    error: null, // to store error messag
    counter: 0,
  };
  
  const answersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ANSWERS_DATA:
        return {
          ...state,
          loading: true,
          successMessage: null, // reset success message on new request
          error: null, // reset error message on new request
        };
      case FETCH_ANSWERS_SUCCESS:
        return {
          ...state,
          loading: false,
          // Append new data to the existing data
          answers: [...state.answers, ...action.payload],
          successMessage: "Answers fetched successfully!", // set success message
          error: null, // reset error message on success
        };
      case FETCH_ANSWERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // set error message
          successMessage: null, // reset success message on failure
        };
        case INCREMENT_COUNTER: // Handle increment action
        return {
            ...state,
            counter: state.counter + 1,
          };
      default:
        return state;
    }
  };
  
  export default answersReducer;
  