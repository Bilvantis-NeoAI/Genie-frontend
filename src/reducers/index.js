import { combineReducers } from 'redux';
import answersReducer from './questionAnswerReducer';
const rootReducer = combineReducers({
    answersData : answersReducer,
    
});

export default rootReducer;