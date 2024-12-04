import {
    FETCH_GRAPH_DATA,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE,
  } from "../actionTypes/graphsDataActionTypes.js";
  import { Metric } from "../Interceptor/interceptor.js";
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
  console.log("++++++++MetricMetricMetricMetric",Metric);
  
  export const fetchGraphList = () => {
  return (dispatch) => {
    dispatch(fetchGraphRequest());
    console.log("++++++****************");
    
    return Metric.get(apis.GRAPHS_DATA)
      .then((response) => {
        console.log("API Response:", response);
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

  