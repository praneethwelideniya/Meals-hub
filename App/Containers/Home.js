import React, {Component} from 'react'
import {View,Text,Dimensions,FlatList,TouchableOpacity,ScrollView,TextInput,BackHandler,Alert} from 'react-native'
import NavigationService from '../Services/NavigationService'
import ItemList from '../Components/ItemList'
import { categories,areas } from "../categories.json"
import {AndroidBackHandler} from '../Helpers/BackHandlerAndroid'
import { AdMobBanner,AdMobInterstitial } from 'react-native-admob'
import { drinksService } from '../Services/DrinksService'
import Icon from 'react-native-vector-icons/FontAwesome';

const {height,width} =Dimensions.get('window')

export default class Home extends Component {

  static navigationOptions = ({ navigation }) => {
          return {
         headerStyle :{
           backgroundColor: '#ffffff'
         },
         headerTitleStyle: {
           textAlign: 'center',
           alignSelf:'center'
         },
         headerTitle : (
           <View style={{flex:1}}>
           <Text
             style={{
               color: '#8bdc0b',
               textAlign :'center',
               fontWeight: 'bold',
               fontSize: 18,
             }}>
          Home
        </Text>
        </View>
    )
        };
    };


  componentDidMount = () =>{
       drinksService.getRandom()
       .then(data => {
         if(data.results==='error'){
           //this.makeServiceError()
         }
         else{
           this.setState({random_meals:data.results})
         }
       }).catch((error)=>{
          //this.makeServiceError()
       })
  }

  state = {
    data:[],
    selectedIndex: 0,
    random_meals : []
  };



  handleBackButton(){
  return true;
  }

  render() {
    return (
      <AndroidBackHandler onBackButtonPressAndroid={this.handleBackButton} >
      <View style={{flex:1, backgroundColor:'#fffffe'}}>
        <ScrollView keyboardShouldPersistTaps='always'>
        <View>
        <Text style={{color:"#fd5a1e",fontWeight:"900",fontSize:20,marginVertical:10,marginLeft:10}}>Country Foods</Text>
            <ItemList
              onPressItem={(name,pic)=> {
                  NavigationService.push('MealScreen',{name:name,pic:pic,type:'Area'})
              }}
              data={areas}
              onPressChangeEnable={false}
              numOfColumn = {1}
              horizontal = {true}
              width = {width/4}
            />
        </View>
        <View>
        <Text style={{color:"#fd5a1e",fontWeight:"900",fontSize:20,marginVertical:10,marginLeft:10}}>Other Categories</Text>
            <ItemList
              onPressItem={(name,pic)=> {
                  NavigationService.push('MealScreen',{name:name,pic:pic,type:'Category'})
              }}
              data={categories}
              onPressChangeEnable={false}
              numOfColumn = {2}
              horizontal = {false}
              width = {(width/2)-2}
            />
        </View>
        {this.state.random_meals.length >0?(<View>
        <Text style={{color:"#fd5a1e",fontWeight:"900",fontSize:20,marginVertical:10,marginLeft:10}}>You may like</Text>
            <ItemList
              onPressItem={(name,pic)=> {
                  NavigationService.push('MealScreen',{name:name,pic:pic,type:'Meal'})
              }}
              data={this.state.random_meals}
              onPressChangeEnable={false}
              numOfColumn = {1}
              horizontal = {true}
              width = {2*width/5}
            />
        </View>):null}
        </ScrollView>
        </View>
      </AndroidBackHandler>
    )
  }
}
