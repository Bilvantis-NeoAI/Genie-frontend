import {
  ADD_AI_DOCUMENT_DATA,
  ADD_AI_DOCUMENT_SUCCESS,
  ADD_AI_DOCUMENT_FAILURE,
  ADD_AI_CSV_DATA,
  ADD_AI_CSV_SUCCESS,
  ADD_AI_CSV_FAILURE,
} from "../actionTypes/aiTestCasesActionTypes.js";

const initialState = {
  aiDocument: {
    data: null,
    error: null,
  },
  aiCsv: {
    data: null,
    error: null,
  },
};

const aiTestCasesReducer = (state = initialState, action) => {
  switch (action.type) {
    // AI Document Cases
    case ADD_AI_DOCUMENT_DATA:
      return {
        ...state,
        aiDocument: {
          ...state.aiDocument,
          error: null,
        },
      };
    case ADD_AI_DOCUMENT_SUCCESS:
      return {
        ...state,
        aiDocument: {
          data: action.payload,
          error: null,
        },
      };
    case ADD_AI_DOCUMENT_FAILURE:
      return {
        ...state,
        aiDocument: {
          ...state.aiDocument,
          error: action.payload,
        },
      };
      
    // AI CSV Cases
    case ADD_AI_CSV_DATA:
      return {
        ...state,
        aiCsv: {
          ...state.aiCsv,
          error: null,
        },
      };
    case ADD_AI_CSV_SUCCESS:
      return {
        ...state,
        aiCsv: {
          data: action.payload,
          error: null,
        },
      };
    case ADD_AI_CSV_FAILURE:
      return {
        ...state,
        aiCsv: {
          ...state.aiCsv,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default aiTestCasesReducer;
