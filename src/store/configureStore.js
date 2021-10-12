import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import {eventsReducer} from './events';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    events: eventsReducer,
  }),
);

export const configureStore = preloadedState => {
  const store = createStore(
    persistedReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware),
  );

  const persistor = persistStore(store);

  return {store, persistor};
};
