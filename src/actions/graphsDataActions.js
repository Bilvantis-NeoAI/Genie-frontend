import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes.js";
import { DeployedURL } from "../Interceptor/interceptor.js";
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


// export const fetchGraphList = (param, graphType) => {
//   console.log("==param param",param);
  
//   return (dispatch) => {
//     dispatch(fetchGraphRequest(graphType));
//     return DeployedURL.get(apis.GRAPHS_DATA, { params: param })
//       .then((response) => {
//         console.log("====responseresponse",response);
        
//         if (param.filter==true) {
//           console.log("======0000");
//           dispatch(fetchGraphSuccess(graphType, response.data));
//         } else {
          
//           dispatch(fetchGraphSuccess(graphType, response.data));
//         }
//         return response.data;
//       })
//       .catch((error) => {
//         console.log("====error errorerrorerrorerror",error);
        
//         dispatch(fetchGraphFailure(graphType, error.message || "Unknown error"));
//         return error;
//       });
//   };
// };

export const fetchGraphList = (param, graphType) => {
  console.log("==param param", param);

  return (dispatch) => {
    dispatch(fetchGraphRequest(graphType));
    return DeployedURL.get(apis.GRAPHS_DATA, { params: param })
      .then((response) => {
        console.log("====response response", response);

        const payload = {
          ...response.data,
          filter: param.filter || false, // Pass the filter flag along with the response
        };

        dispatch(fetchGraphSuccess(graphType, payload));
        return response.data;
      })
      .catch((error) => {
        console.log("====error error", error);

        dispatch(fetchGraphFailure(graphType, error.message || "Unknown error"));
        return error;
      });
  };
};
