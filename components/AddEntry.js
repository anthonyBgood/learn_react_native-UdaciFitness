import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers"
import UdaciStepper from './UdaciStepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { addEntry } from '../actions'



function SubmitBtn ({onPress}){
  return (
    <TouchableOpacity 
      onPress={onPress}>
      <Text>
        SUBMIT
      </Text>
    </TouchableOpacity>
  )
}




class AddEntry extends Component {

  state ={
    run: 0 , 
    bike: 0 ,
    swim: 0 ,
    eat: 0 ,
    sleep: 0 , 
  }

  increment = (metric) =>{

    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) =>{
      
      const count = state[metric] + step
      return {
        [metric]: count > max ? max : count ,
      }

    })
    
  }

  decrement = (metric) =>{

    const { step } = getMetricMetaInfo(metric)
    this.setState((state) =>{
      
      const count = state[metric] - step
      return {
        [metric]: count < 0 ? 0 : count ,
      }
    })
    
  }

  slide = (metric, value) => {

    this.setState(() =>{

      return {
        [metric]:value ,
      }
    })
  }

  submit =() => {
    const key = timeToString()
    const entry = this.state

    this.setState(()=>({
      run: 0 , 
      bike: 0 ,
      swim: 0 ,
      eat: 0 ,
      sleep: 0 , 
    }))



    //TODOS:
    //Update Redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))

    // Navigate home

    // Save to DB
    submitEntry({key,entry})

    //Clear local notifications
  }

  reset = () =>{

    const key = timeToString()

    //TODOS:
      //Update Redux
      this.props.dispatch(addEntry({
        [key]: getDailyReminderValue()
      }))

      // Navigate home

      // Save to DB
      removeEntry(key)

  
  }

  render(){


    const metaInfo = getMetricMetaInfo();

     if(this.props.alreadyLogged){
      return(

        <View>

          <Ionicons name={'ios-happy'} size={100} /> 
          <Text>
            You have already completed this day
          </Text>
          <TextButton onPress={this.reset}>Reset</TextButton>

        </View>

      )
    } 


    return(
      <View>


        <DateHeader date = {(new Date()).toLocaleDateString()} />

        <Text>{JSON.stringify(this.state)}</Text>

        <SubmitBtn onPress={this.submit} />

        {
          Object.keys(metaInfo).map((key) =>{
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return(
              
              <View key={key}>
                {getIcon()}

                {
                  type === 'slider'
                  ? <UdaciSlider 
                      value={value}
                      onChange={(value)=>this.slide(key,value)}
                      {...rest}
                    />
                  : <UdaciStepper 
                      value={value}
                      onIncrement={()=>(this.increment(key))}
                      onDecrement={()=>(this.decrement(key))}
                      {...rest}
                    />
                }

              </View>
            )

          })
        }
        

      </View>
    )
  }
}


function mapStateToProps(state){

  const key =timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }

}


export default connect(mapStateToProps)(AddEntry)