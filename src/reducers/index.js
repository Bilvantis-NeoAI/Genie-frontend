import { combineReducers } from 'redux';
import { graphReducer } from './graphsDataReducers';
import flushDBReducer from './adminReducers';
import ingestionReducer from './IngestionReducer';
import retriveRepoDataReducer from './retriveRepoDataReducer';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
import getCodeReducer from './getCodeReducer';
import aiTestCaseData from './testCaseReducers'
import userListData from './adminUsersReducer';
import gitNoteReducer from './gitReleaseNoteReducer';
import testAiReducer from './testAiReducer';
import deadCodeReducer from './deadCodeReducer';
import repoListReducer from './repoListReducer';
const rootReducer = combineReducers({
    graphs: graphReducer,
    adminData: flushDBReducer,
    ingestion: ingestionReducer,
    repoData: retriveRepoDataReducer,
    loginData: loginReducer,
    registrationData: registrationReducer,
    getCode: getCodeReducer,
    aiTestCaseData: aiTestCaseData,
    usersList: userListData,
    gitNoteResponse:gitNoteReducer,
    testAiData:testAiReducer,
    deadCode:deadCodeReducer,
    ingestedRepo:repoListReducer,
});

export default rootReducer;