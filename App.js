import React from 'react';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import { StyleSheet, Text, View } from 'react-native';
import AddEntry from './components/AddEntry'
import reducer from './reducers'

export default function App() {
  store = createStore(reducer)

  return (
    <Provider store={store}>
      <View>
        <AddEntry />
      </View>
    </Provider>
  );
}


