import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
import documentReducer from './documentReducers';
const rootReducer = combineReducers({
    answersData : answersReducer,
    documentData : documentReducer
    
});

export default rootReducer;