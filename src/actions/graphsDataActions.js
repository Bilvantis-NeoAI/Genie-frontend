import {
    FETCH_GRAPH_DATA,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE,
  } from "../actionTypes/graphsDataActionTypes.js";
  import { Api } from "../Interceptor/interceptor.js";
  import { apis } from "../utils/config.js";
  
  export const fetchGraphRequest = () => ({
    type: FETCH_GRAPH_DATA,
  });
  
  export const fetchGraphSuccess = (data) => ({
    type: FETCH_GRAPH_SUCCESS,
    payload: data,
  });
  
  export const fetchGraphFailure = (error) => ({
    type: FETCH_GRAPH_FAILURE,
    payload: error,
  });
  
  export const fetchGraphList = () => {
    return (dispatch) => {
      dispatch(fetchGraphRequest());
      return Api
        .get(apis.GRAPHS_DATA)
        .then((response) => {
          console.log("response>>", response);
          
          const graphData = response.data;
          dispatch(fetchGraphSuccess(graphData));
          return response;
        })
        .catch((error) => {
          dispatch(fetchGraphFailure(error.message));
        });
    };
  };
  