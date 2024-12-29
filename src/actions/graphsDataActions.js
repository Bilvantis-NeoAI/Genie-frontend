import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes.js";
import { DeployedURL } from "../interceptor/interceptor.js";
import { apis } from "../utils/config.js";
export const fetchGraphRequest = (graphType) => ({
  type: FETCH_GRAPH_DATA,
  graphType,
});

export const fetchGraphSuccess = (graphType, data) => ({
  type: FETCH_GRAPH_SUCCESS,
  graphType,
  payload: data,
});

export const fetchGraphFailure = (graphType, error) => ({
  type: FETCH_GRAPH_FAILURE,
  graphType,
  payload: error,
});

export const fetchGraphList = (param, graphType) => {
  return (dispatch) => {
    dispatch(fetchGraphRequest(graphType));
    return DeployedURL.get(apis.GRAPHS_DATA, { params: param })
      .then((response) => {
        if (!response || !response.data) {
          throw new Error("Invalid API Response");
        }
        const graphData = response.data;
        dispatch(fetchGraphSuccess(graphType, graphData));
        return response;
      })
      .catch((error) => {
        console.error("API Error:", error);
        dispatch(fetchGraphFailure(graphType, error.message || "Unknown error"));
        return error;
      });
  };
};
