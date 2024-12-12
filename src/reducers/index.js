import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
import urlReducer from './urlReducers';
import graphReducer from './graphsDataReducers';
import flushDBReducer from './adminReducers';
import ingestionReducer from './IngestionReducer';
import retriveRepoDataReducer from './retriveRepoDataReducer';

const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer,
    urlData : urlReducer,
    graphsData : graphReducer,
    adminData : flushDBReducer,
    ingestion : ingestionReducer,
    repoData : retriveRepoDataReducer

});

export default rootReducer;