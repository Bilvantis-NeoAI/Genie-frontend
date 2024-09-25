import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
import urlReducer from './urlReducers';
import graphReducer from './graphsDataReducers';
const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer,
    urlData : urlReducer,
    graphsData : graphReducer,
    
});

export default rootReducer;