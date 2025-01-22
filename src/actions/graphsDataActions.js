import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes.js";
import { DeployedURL } from "../interceptors/interceptors.js";
import { apis } from "../utils/config.js";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

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
        const payload = {
          ...response.data,
          filter: param.filter || false,
        };
        dispatch(fetchGraphSuccess(graphType, payload));
        return response.data;
      })
      .catch((error) => {
        Swal.fire({
          title: "error",
          text: error.message,
          icon: 'error',
          confirmButtonText:'OK'
        });
        dispatch(fetchGraphFailure(graphType, error.message));
        return error;
      });
  };
};
