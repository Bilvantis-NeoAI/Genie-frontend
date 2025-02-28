import {
    FETCH_GIT_GRAPH_DATA,
    FETCH_GIT_GRAPH_FAILURE,
    FETCH_GIT_GRAPH_SUCCESS
  } from "../actionTypes/graphsDataActionTypes";
  
  const initialState = {
    loading: false,
    graphData: null,
    successMessage: null,
    error: null,
  };
  
  const graphReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GIT_GRAPH_DATA:
        return {
          ...state,
          loading: true,
          successMessage: null,
          error: null,
        };
      case FETCH_GIT_GRAPH_SUCCESS:
        return {
          ...state,
          loading: false,
          graphData: action.payload,
          successMessage: "Graph data fetched successfully!",
          error: null,
        };
      case FETCH_GIT_GRAPH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          successMessage: null,
        };
      default:
        return state;
    }
  };
  
  export default graphReducer;
  