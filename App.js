import React from 'react';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import { View, Platform } from 'react-native';

import reducer from './reducers'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { TabNavigator } from 'react-navigation'
import {purple, white } from './utils/colors'
import {fontAwesome, Ionicons, FontAwesome } from '@expo/vector-icons'

const Tabs = TabNavigator({

  History:{
    screen: () => <History/>,
    navigationOptions:{
      tabBarLabel: 'AddEntry',
      tabBarIcon: ({ tintColor}) => 
            <Ionicons 
              name='ios-bookmards' 
              size={30}
              color={tintColor}/>
    } , 
  } ,
  AddEntry:{
    screen: () => <AddEntry/> ,
    navigationOptions: {
      tabBarLabel: 'Add Entry' ,
      tabBarIcon: ({ tintColor}) =>
        <FontAwesome 
          name='plus-square'
          size={30} 
          color={tintColor} /> 
    },
  },
},{
  navigationOptions:{
    header:null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple :white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ?white :purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width:0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <View style ={{flex: 1}}>
        <View style ={{height: 20}} />
        <Tabs /> 

      </View>
    </Provider>
  );
}

