// import { createStore, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk';
// import rootReducer from '../reducers';

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );
// export default store;

import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session'; 
import rootReducer from '../reducers'; 

const persistConfig = {
  key: 'root',
  storage: sessionStorage, 
  whitelist: ['answersData'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };
