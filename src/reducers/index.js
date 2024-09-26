import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
import urlReducer from './urlReducers';
import graphReducer from './graphsDataReducers';
import flushDBReducer from './adminReducers';
const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer,
    urlData : urlReducer,
    graphsData : graphReducer,
    adminData : flushDBReducer
    
});

export default rootReducer;