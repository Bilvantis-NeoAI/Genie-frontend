import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
import urlReducer from './urlReducers';
import graphReducer from './graphsDataReducers';
import flushDBReducer from './adminReducers';
import ingestionReducer from './IngestionReducer';
import retriveRepoDataReducer from './retriveRepoDataReducer';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer,
    urlData : urlReducer,
    graphsData : graphReducer,
    adminData : flushDBReducer,
    ingestion : ingestionReducer,
    repoData : retriveRepoDataReducer,
    loginData : loginReducer,
    registrationData :registrationReducer
});

export default rootReducer;