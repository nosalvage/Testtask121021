import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {RootNavigator} from './navigation';
import {configureStore} from './store';

const {store, persistor} = configureStore();

export const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);
