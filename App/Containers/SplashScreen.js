import React from 'react'
import {View,Image,Dimensions,Text,Button } from 'react-native'
import Constants from "../Constants";

const {width,height} =Dimensions.get('window')

export default class SplashScreen extends React.Component {

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }
  state ={
    adShow:true
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    setTimeout(()=>{
      this.props.navigation.navigate('App')
    },500);
  }

  render() {
    return (
      <View style={{flex:1,alignItems: "center", justifyContent: "center",backgroundColor:'white'}}>
          <View style={{flex:4,justifyContent: "center"}}>
          <Image
            style={{
              height: 3*width/4,
              width: 3*width/4
            }}
            source={Constants.Images.Common.logo}
          />
          </View>
      </View>
    )
  }
}
