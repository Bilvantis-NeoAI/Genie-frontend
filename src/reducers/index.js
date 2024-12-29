import { combineReducers } from 'redux';
import {graphReducer} from './graphsDataReducers';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
const rootReducer = combineReducers({
    graphs: graphReducer,
    loginData : loginReducer,
    registrationData :registrationReducer,
  });
export default rootReducer;