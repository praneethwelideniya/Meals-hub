import React, {Component} from 'react'
import {View,Text,Dimensions,FlatList,TouchableOpacity,ScrollView,TextInput,BackHandler,Alert} from 'react-native'
import NavigationService from '../Services/NavigationService'
import ItemList from '../Components/ItemList'
import { meals } from "../meals.json"
import {AndroidBackHandler} from '../Helpers/BackHandlerAndroid'
import { AdMobBanner,AdMobInterstitial } from 'react-native-admob'
import { drinksService } from '../Services/DrinksService'

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
          Search Meals
        </Text>
        </View>
    )
        };
    };

  state = {
    data:[],
    searchText:"",
    meals:[]
  };


  handleBackButton(){
  return true;
  }

  render() {
    var myText = this.state.searchText
    return (
      <AndroidBackHandler onBackButtonPressAndroid={this.handleBackButton} >
      <View style={{flex:1, backgroundColor:'#fffffe'}}>
        <View>
          <TextInput
           style={{height: width/10,borderColor:"#333333", borderWidth:3,borderRadius:3,color:'black',marginHorizontal:8}}
           placeholder="Search"
           onChangeText={async (text) => {
             await this.setState({searchText:text})
          }}
           placeholderTextColor = "#333333"
           value={this.state.searchText}
         />
       </View>
        <View>
            <ItemList
              onPressItem={(name,pic) => {NavigationService.push('MealScreen',{name:name,pic:pic,type:'Meal'}) }}
              data={meals.filter(function(item){
              let itemData = item.name.toUpperCase()
                return itemData.indexOf(myText.toUpperCase()) > -1
              })}
              onPressChangeEnable={false}
              numOfColumn = {2}
              horizontal = {false}
              width = {width/2}
            />
        </View>
        </View>
      </AndroidBackHandler>
    )
  }
}
