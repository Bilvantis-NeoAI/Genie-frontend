import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
import urlReducer from './urlReducers';
const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer,
    urlData : urlReducer
    
});

export default rootReducer;