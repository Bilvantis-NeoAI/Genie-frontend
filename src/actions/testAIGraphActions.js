import {
    TEST_GRAPH_DATA,TEST_GRAPH_FAILRE,TEST_GRAPH_SUCCESS
} from "../actionTypes/graphsDataActionTypes.js";
import { TestAIMetrics } from "../Interceptor/interceptor.js";
import { apis } from "../utils/config.js";
export const testAiData = () => ({
    type: TEST_GRAPH_DATA
})
export const testAiSuccess = (response ,graphType) => ({
    type: TEST_GRAPH_SUCCESS,
    payload: response,
    graphType
})
export const testAiFailure = (response) => ({
    type: TEST_GRAPH_FAILRE,
    payload: response
})
export const testAIGraph = (payload , graphType) => {
    return (dispatch) => {
        dispatch({
            type: TEST_GRAPH_DATA,
            graphType,
        });

        const config = payload ? { params: payload } : {};

        return TestAIMetrics
            .get(apis.TEST_AI_METRICS, config)
            .then((response) => {
                dispatch(testAiSuccess(response.data, 'test'));
            })
            .catch((error) => {
                dispatch(testAiFailure(error, graphType));
            });
    };
};
