import {
    FLUSH_DB_DATA,
    FLUSH_DB_SUCCESS,
    FLUSH_DB_FAILURE,
    CONTAINER_RESTART_DATA,
    CONTAINER_RESTART_SUCCESS,
    CONTAINER_RESTART_FAILURE,
    NEO4J_STATUS_DATA,
    NEO4J_STATUS_SUCCESS,
    NEO4J_STATUS_FAILURE
  } from "../actionTypes/adminActionTypes.js";
  import { Api } from "../Interceptor/interceptor.js";
  import { apis } from "../utils/config.js";
  
  export const flushDBRequest = () => ({
    type: FLUSH_DB_DATA,
  });
  
  export const flushDBSuccess = (message) => ({
    type: FLUSH_DB_SUCCESS,
    payload: message,
  });
  
  export const flushDBFailure = (error) => ({
    type: FLUSH_DB_FAILURE,
    payload: error,
  });
  
  export const flushDB = () => {
    return (dispatch) => {
      dispatch(flushDBRequest()); 
      return Api
        .get(apis.FLUSH_DB) 
        .then((response) => {
            console.log("res>>>>kk", response);
          const successMessage = response;
          dispatch(flushDBSuccess(successMessage)); 
          return response;
        })
        .catch((error) => {
          dispatch(flushDBFailure(error.message));
        });
    };
  };

  export const containerRestartRequest = () => ({
    type: CONTAINER_RESTART_DATA,
  });
  
  export const containerRestartSuccess = (message) => ({
    type: CONTAINER_RESTART_SUCCESS,
    payload: message,
  });
  
  export const containerRestartFailure = (error) => ({
    type: CONTAINER_RESTART_FAILURE,
    payload: error,
  });
  
  export const containerRestart = () => {
    console.log("checking container>>;");
    
    return (dispatch) => {
      dispatch(containerRestartRequest());
      return Api
        .get(apis.CONTAINER_RESTART)  
        .then((response) => {
          dispatch(containerRestartSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(containerRestartFailure(error.message));
        });
    };
  };

  export const neo4jStatusRequest = () => ({
    type: NEO4J_STATUS_DATA,
});

export const neo4jStatusSuccess = (status) => ({
    type: NEO4J_STATUS_SUCCESS,
    payload: status,
});

export const neo4jStatusFailure = (error) => ({
    type: NEO4J_STATUS_FAILURE,
    payload: error,
});
  
export const neo4jStatus = (payload) => {
  console.log("pay", payload);
  
  return (dispatch) => {
      dispatch(neo4jStatusRequest()); 
      return Api
          .post(apis.NEO4J_STATUS, payload) 
          .then((response) => {
              dispatch(neo4jStatusSuccess(response.data)); 
              return response.data; 
          })
          .catch((error) => {
              dispatch(neo4jStatusFailure(error.message)); 
          });
  };
};
  