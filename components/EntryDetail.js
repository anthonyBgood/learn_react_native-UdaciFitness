
import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'


class EntryDetail extends Component {

  static navigationOptions = ({navigation}) => {
    const {entryId} = navigation.state.params

    const year = entryId.slice(0,4)
    const month =entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${day}/${month}/${year}`
    }

  }


  render(){
    return(
      <View>
        <Text> 
          entry Detail 
          - {JSON.stringify(this.props.navigation.state.params.entryId)}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(state, {navigation}){
  
  const { entryId } = navigation.state.params

  return {
    entryId, 
    metrics: state[entryId],
  }


}


export default EntryDetail

