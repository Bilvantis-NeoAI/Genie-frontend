import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ named import
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user', 'answersData'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };
