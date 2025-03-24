import { GIT_RELEASE_NOTE_DATA, GIT_RELEASE_NOTE_FAILURE, GIT_RELEASE_NOTE_SUCCESS,
        GIT_RELEASE_FEEDBACK_DATA,GIT_RELEASE_FEEDBACK_FAILURE,GIT_RELEASE_FEEDBACK_SUCCESS,
        GIT_COMMIT_FEEDBACK_DATA,GIT_COMMIT_FEEDBACK_FAILURE,GIT_COMMIT_FEEDBACK_SUCCESS
 } from "../actionTypes/gitReleaseNoteActionType";
const initialState = {
    loading: null,
    gitReleaseNote: null,
    gitReleaseNoteFeedback:null,
    gitCommitNoteFeedback:null,
    error: null
}
const gitNoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GIT_RELEASE_NOTE_DATA:
            return {
                ...state,
                loading: true,
                gitReleaseNote: null,
                error: null
            }
        case GIT_RELEASE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                gitReleaseNote: action,
                error: null
            }
        case GIT_RELEASE_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                gitReleaseNote: null,
                error: action
            }
        case GIT_RELEASE_FEEDBACK_DATA:
            return{
                ...state,
                loading:true,
                gitReleaseNoteFeedback:null,
                error:null
            }
        case GIT_RELEASE_FEEDBACK_SUCCESS:
            return{
                ...state,
                loading:false,
                gitReleaseNoteFeedback:action,
                error:null
            }
        case GIT_RELEASE_FEEDBACK_FAILURE:
            return{
                ...state,
                loading:false,
                gitReleaseNoteFeedback:null,
                error:action
            }
        case GIT_COMMIT_FEEDBACK_DATA:
            return{
                ...state,
                loading:true,
                gitCommitNoteFeedback:false,
                error:null
            }
        case GIT_COMMIT_FEEDBACK_SUCCESS:
            return{
                ...state,
                loading:null,
                gitCommitNoteFeedback:action,
                error:null
            }
        case GIT_COMMIT_FEEDBACK_FAILURE:
            return{
                ...state,
                loading:false,
                gitCommitNoteFeedback:null,
                error:action
            }
            default:
                return state;
    }

}
export default gitNoteReducer;