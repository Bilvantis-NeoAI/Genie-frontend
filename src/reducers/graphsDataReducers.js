import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
  FETCH_FILTER_GRAPH_DATA,
  FETCH_FILTER_GRAPH_SUCCESS,
  FETCH_FILTER_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes";

const initialState = {
  severity: { loading: false, data: null, error: null },
  usage: { loading: false, data: null, error: null },
  quality: { loading: false, data: null, error: null }
};

export const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GRAPH_DATA:
      return {
        ...state,
        [action.graphType]: { ...state[action.graphType], loading: true },
      };

    case FETCH_GRAPH_SUCCESS:
      return {
        ...state,
        [action.graphType]: { loading: false, data: action.payload, error: null },
      };

    case FETCH_GRAPH_FAILURE:
      return {
        ...state,
        [action.graphType]: { loading: false, data: null, error: action.payload },
      };

    case FETCH_FILTER_GRAPH_DATA:
      return {
        ...state,
        [action.graphType]: { ...state[action.graphType], loading: true },
      };

    case FETCH_FILTER_GRAPH_SUCCESS:
      return {
        ...state,
        [action.graphType]: { loading: false, data: action.payload, error: null },
      };

    case FETCH_FILTER_GRAPH_FAILURE:
      return {
        ...state,
        [action.graphType]: { loading: false, data: null, error: action.payload },
      };

    default:
      return state;
  }
};
