import {
    GIT_RELEASE_NOTE_DATA, GIT_RELEASE_NOTE_FAILURE, GIT_RELEASE_NOTE_SUCCESS,
    GIT_RELEASE_FEEDBACK_DATA, GIT_RELEASE_FEEDBACK_FAILURE, GIT_RELEASE_FEEDBACK_SUCCESS,
    GIT_COMMIT_FEEDBACK_DATA, GIT_COMMIT_FEEDBACK_FAILURE, GIT_COMMIT_FEEDBACK_SUCCESS
} from "../actionTypes/gitReleaseNoteActionType";
import { DeployedURL } from "../Interceptor/interceptor.js";
import { apis } from "../utils/config.js";

export const gitReleaseNoteRequest = () => ({
    type: GIT_RELEASE_NOTE_DATA
})
export const gitRealseNoteSuccess = (response) => ({
    type: GIT_RELEASE_NOTE_SUCCESS,
    payload: response
})
export const gitRealseNoteFailure = (error) => ({
    type: GIT_RELEASE_NOTE_FAILURE,
    payload: error
})



export const gitReleaseFeedbackData = () => ({
    type: GIT_RELEASE_FEEDBACK_DATA
})
export const gitRealseFeedbackFailure = (error) => ({
    type: GIT_RELEASE_FEEDBACK_FAILURE,
    payload: error
})
export const gitRealseFeedbackSuccess = (response) => ({
    type: GIT_RELEASE_FEEDBACK_SUCCESS,
    payload: response
})


export const gitCommiFeedbackData = () => ({
    type: GIT_COMMIT_FEEDBACK_DATA
})
export const gitCommitFeedbackSuccess = (response) => ({
    type: GIT_COMMIT_FEEDBACK_SUCCESS,
    payload: response
})
export const gitCommitFeedbackFailure = (error) => ({
    type: GIT_COMMIT_FEEDBACK_FAILURE,
    payload: error
})


export const gitReleaseNote = (payload) => {
    return (dispatch) => {
        dispatch(gitReleaseNoteRequest(payload))
        return DeployedURL
            .post(apis.GIT_RELEASE_NOTE, payload)
            .then((response) => {
                dispatch(gitRealseNoteSuccess(response.data));
                return response;
            })
            .catch((error) => {
                dispatch(gitRealseNoteFailure(error.message));
            });
    };
}

export const gitRealseFeedback = (payload) => {
    return (dispatch) => {
        dispatch(gitReleaseFeedbackData(payload))
        return DeployedURL
            .post(apis.GIT_RELEASE_FEEDBACK, payload)
            .then((response) => {
                dispatch(gitRealseFeedbackSuccess(response.data));
                return response
            })
            .catch((error) => {
                dispatch(gitRealseFeedbackFailure(error))
            })
    }
}
export const gitCommitFeedback = (payload) => {
    return (dispatch) => {
        dispatch(gitCommiFeedbackData(payload))
        return DeployedURL
            .post(apis.GIT_COMMIT_FEEDBACK, payload)
            .then((respose) => {
                dispatch(gitCommitFeedbackSuccess(respose.data))
                return respose
            })
            .catch((error) => {
                dispatch(gitCommitFeedbackFailure(error))
            })
    }
}