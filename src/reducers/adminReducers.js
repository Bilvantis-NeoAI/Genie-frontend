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
} from "../actionTypes/adminActionTypes";

const initialState = {
    flushSuccessMessage: null,
    flushError: null,
    containerRestartData: null,
    containerRestartSuccessMessage: null,
    containerRestartError: null,
    neo4jStatusData: null,
    neo4jStatusSuccessMessage: null,
    neo4jStatusError: null,
};

const flushDBReducer = (state = initialState, action) => {
    switch (action.type) {
        case FLUSH_DB_DATA:
            return {
                ...state,
                flushSuccessMessage: null,
                flushError: null,
            };
        case FLUSH_DB_SUCCESS:
            return {
                ...state,
                flushSuccessMessage: action.payload,
                flushError: null,
            };
        case FLUSH_DB_FAILURE:
            return {
                ...state,
                flushError: action.payload,
                flushSuccessMessage: null,
            };
        case CONTAINER_RESTART_DATA:
            return {
                ...state,
                containerRestartData: null,
                containerRestartSuccessMessage: null,
                containerRestartError: null,
            };
        case CONTAINER_RESTART_SUCCESS:
            return {
                ...state,
                containerRestartData: action.payload,
                containerRestartSuccessMessage: action.payload.message,
                containerRestartError: null,
            };
        case CONTAINER_RESTART_FAILURE:
            return {
                ...state,
                containerRestartError: action.payload,
                containerRestartSuccessMessage: null,
                containerRestartData: null,
            };
        case NEO4J_STATUS_DATA:
            return {
                ...state,
                neo4jStatusData: null,
                neo4jStatusSuccessMessage: null,
                neo4jStatusError: null,
            };
        case NEO4J_STATUS_SUCCESS:
            return {
                ...state,
                neo4jStatusData: action.payload,
                neo4jStatusSuccessMessage: "Neo4j status retrieved successfully.",
                neo4jStatusError: null,
            };
        case NEO4J_STATUS_FAILURE:
            return {
                ...state,
                neo4jStatusError: action.payload,
                neo4jStatusSuccessMessage: null,
                neo4jStatusData: null,
            };

        default:
            return state;
    }
};

export default flushDBReducer;
