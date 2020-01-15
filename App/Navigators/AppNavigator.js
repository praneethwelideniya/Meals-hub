import React from 'react'
import { Text, View,TextInput,Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator,createSwitchNavigator} from 'react-navigation'
import Home from '../Containers/Home'
import Ingredients from '../Containers/Ingredients'
import Search from '../Containers/Search'
import MealScreen from '../Containers/MealScreen'
import SplashScreen from '../Containers/SplashScreen'
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */


 const FirstScreen = createStackNavigator(
   {Home},
   {
     navigationOptions:{
       tabBarLabel: "Home",
       tabBarIcon: ({ tintColor,focused }) => (
         <Icon name="home" size={height/(focused?20:23)} color={tintColor} />
       ),
     }
   }
 )

  const IngredientScreen = createStackNavigator(
    {Ingredients},
    {
      navigationOptions:{
        tabBarLabel: "Ingredients",
        tabBarIcon: ({ tintColor,focused }) => (
          <Icon name="envira" size={height/(focused?20:23)} color={tintColor} />
        )
      }
    }
  )

  const SearchScreen = createStackNavigator(
    {Search},
    {
      navigationOptions:{
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor,focused }) => (
          <Icon name="search" size={height/(focused?20:23)} color={tintColor} />
        )
      }
    }
  )

const StartUpStackNavigator = createStackNavigator(
  {
    MealScreen:{
      screen:MealScreen
    },
    FirstScreen:{
      screen:createBottomTabNavigator({
        Home:FirstScreen,
        Ingredients:IngredientScreen,
        Categories:SearchScreen
      },{
        tabBarOptions: {
        showIcon: true,
        activeTintColor: '#8bdc0b'
      }
      }),
      navigationOptions:({navigation})=>({
          header:null
      }
    )
    }
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'FirstScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerLayoutPreset: 'center'
  }
)

const InitialNavigator = createSwitchNavigator({
  Splash:{
    screen:SplashScreen,
    navigationOptions:({navigation})=>({
        header:null
    })
  },
  App: StartUpStackNavigator
});

export default createAppContainer(InitialNavigator);
