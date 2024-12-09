import {
    FETCH_GRAPH_DATA,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE,
  } from "../actionTypes/graphsDataActionTypes.js";
  import { DeployedURL } from "../Interceptor/interceptor.js";
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
    return DeployedURL.get(apis.GRAPHS_DATA)
      .then((response) => {
        if (!response || !response.data) {
          throw new Error("Invalid API Response");
        }
        const graphData = response.data;
        dispatch(fetchGraphSuccess(graphData));
        return response;
      })
      .catch((error) => {
        console.error("API Error:", error);
        dispatch(fetchGraphFailure(error.message || "Unknown error"));
      });
  };
};

  