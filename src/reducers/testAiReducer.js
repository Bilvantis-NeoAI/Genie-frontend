import {
    TEST_GRAPH_DATA,
    TEST_GRAPH_SUCCESS,
    TEST_GRAPH_FAILRE,
    TEST_GRAPH_FILTER_DATA,
    TEST_GRAPH_FILTER_SUCCESS,
    TEST_GRAPH_FILTER_FAILURE
  } from "../actionTypes/graphsDataActionTypes.js";
  
  const initialState = {
    test: {
      loading: false,
      data: {
        test_cases_metrics: null,
        http_methods_metrics: null,
        project_user_mapping:null
      },
      error: null,
    }
  };
  
  const testAiReducer = (state = initialState, action) => {
  console.log("===actionaction12",action.graphType);
  
    switch (action.type) {
      case TEST_GRAPH_DATA:
      case TEST_GRAPH_FILTER_DATA:
        return {
          ...state,
          [action.graphType]: {
            ...state[action.graphType],
            loading: true,
          },
        };
  
      case TEST_GRAPH_SUCCESS:
      case TEST_GRAPH_FILTER_SUCCESS: {
        const { metrics } = action.payload;
  
        return {
          ...state,
          [action.graphType]: {
            ...state[action.graphType],
            loading: false,
            data: {
              test_cases_metrics: metrics.test_cases_metrics ?? state[action.graphType].data.test_cases_metrics,
              http_methods_metrics: metrics.http_methods_metrics ?? state[action.graphType].data.http_methods_metrics,
              project_user_mapping:metrics.project_user_mapping ?? state[action.graphType].data.project_user_mapping,
            },
            error: null,
          },
        };
      }
  
      case TEST_GRAPH_FAILRE:
      case TEST_GRAPH_FILTER_FAILURE:
        return {
          ...state,
          [action.graphType]: {
            ...state[action.graphType],
            loading: false,
            error: action.payload,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default testAiReducer;
  