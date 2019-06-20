import React from 'react';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import { View } from 'react-native';

import reducer from './reducers'
import AddEntry from './components/AddEntry'
import History from './components/History'


export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <View style ={{flex: 1}}>
        <History /> 

      </View>
    </Provider>
  );
}

