import {
    FETCH_ANSWERS_DATA,
    FETCH_ANSWERS_SUCCESS,
    FETCH_ANSWERS_FAILURE,
    INCREMENT_COUNTER,
  } from "../actionTypes/questionActionTypes.js"
  
  const initialState = {
    loading: false,
    answers: [],
    successMessage: null, 
    error: null, 
    counter: 0,
  };
  
  const answersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ANSWERS_DATA:
        return {
          ...state,
          loading: true,
          successMessage: null, 
          error: null, 
        };
      case FETCH_ANSWERS_SUCCESS:
        const updatedAnswers = [...state.answers];
      
      if (action.index < updatedAnswers.length) {
       
        updatedAnswers[action.index] = action.payload;
      } else {
       
        updatedAnswers[action.index] = action.payload;
      }
        return {
          ...state,
          loading: false,
          answers: updatedAnswers,
          successMessage: "Answers fetched successfully!", 
          error: null, 
        };
      case FETCH_ANSWERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, 
          successMessage: null, 
        };
        case INCREMENT_COUNTER: 
        return {
            ...state,
            counter: state.counter + 1,
          };
      default:
        return state;
    }
  };
  
  export default answersReducer;
  