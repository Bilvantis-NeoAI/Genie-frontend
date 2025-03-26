import {
    TEST_GRAPH_DATA,TEST_GRAPH_FAILRE,TEST_GRAPH_SUCCESS
} from "../actionTypes/graphsDataActionTypes.js";const initialState = {
  loading: false,
  TestAiMetrics: null,
  error: null,
};
const testAiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_GRAPH_DATA:
      return {
        ...state,
        loading: true,
        successMessage: null,
        TestAiMetrics: null,
        error: null,
      };
    case TEST_GRAPH_SUCCESS:
      return {
        ...state,
        loading: false,
        TestAiMetrics: action,
        error: null,
      };
    case TEST_GRAPH_FAILRE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
export default testAiReducer;