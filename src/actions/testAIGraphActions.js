import {
    TEST_GRAPH_DATA,TEST_GRAPH_FAILRE,TEST_GRAPH_SUCCESS
} from "../actionTypes/graphsDataActionTypes.js";
import { TestAIMetrics } from "../Interceptor/interceptor.js";
import { apis } from "../utils/config.js";
export const testAiData = () => ({
    type: TEST_GRAPH_DATA
})
export const testAiSuccess = (response) => ({
    type: TEST_GRAPH_SUCCESS,
    payload: response
})
export const testAiFailure = (response) => ({
    type: TEST_GRAPH_FAILRE,
    payload: response
})
export const testAIGraph = () => {
    return (dispatch) => {
        dispatch(testAiData())
        return TestAIMetrics
            .get(apis.TEST_AI_METRICS)
            .then((response) => {
                dispatch(testAiSuccess(response))
            })
            .catch((error) => {
                dispatch(testAiFailure(error))
            })
    }
}