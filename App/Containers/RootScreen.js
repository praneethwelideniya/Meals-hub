import React, { Component } from 'react'
import NavigationService from '../Services/NavigationService'
import AppNavigator from '../Navigators/AppNavigator'
import { View,StyleSheet } from 'react-native'

export default class RootScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
})
