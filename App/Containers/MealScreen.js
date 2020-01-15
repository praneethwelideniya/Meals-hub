import React, {Component} from 'react'
import {View,Text,Dimensions,FlatList,TouchableOpacity,ScrollView,StyleSheet,Alert,ActivityIndicator} from 'react-native'
import NavigationService from '../Services/NavigationService'
import ItemList from '../Components/ItemList'
import { HeaderBackButton } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';
import { drinksService } from '../Services/DrinksService'
import FastImage from 'react-native-fast-image'
const {height,width} =Dimensions.get('window')
import { AdMobBanner,AdMobInterstitial } from 'react-native-admob'

export default class MealScreen extends Component {

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
                 {navigation.getParam('name')}
               </Text>
             </View>
           ),
           headerLeft :<HeaderBackButton tintColor ='black' onPress={() =>navigation.goBack(null)} />,
          };

    };

    state={
      selectedIndex: 0,
      response:{},
      arr:[],
      adShow:true,
      imageLoading:true
    };

    makeServiceError(){
      Alert.alert(
        'Error',
        'Something went wrong. Check your internet connection',
      [
        {text: 'OK', onPress: () =>{this.props.navigation.goBack(null)}},
      ],
      { cancelable: true }
    )
    }

    componentDidMount(){
        switch(this.props.navigation.getParam('type')){
            case 'Meal':
            drinksService.getMealByName(this.props.navigation.getParam('name'))
            .then(data => {
              if(data.results==='error'){
                this.makeServiceError()
              }
              else{
                this.setState({response:data})
              }
            }).catch((error)=>{
               this.makeServiceError()
            })
            break;
            case 'Ingredients':
              drinksService.getMealsByIngredients(this.props.navigation.getParam('name'))
              .then(data => {
                if(data.results==='error'){
                  this.makeServiceError()
                }
                else{
                  this.setState({arr:data})
                }
              }).catch((error)=>{
                this.makeServiceError()
              })
              break;
              case 'Area':
              drinksService.getMealsByArea(this.props.navigation.getParam('name'))
              .then(data => {
                if(data.results==='error'){
                  this.makeServiceError()
                }
                else{
                  this.setState({arr:data})
                }
              }).catch((error)=>{
                 this.makeServiceError()
              })
              break;
            default:
            drinksService.getMealsByCategory(this.props.navigation.getParam('name'))
            .then(data => {
              if(data.results==='error'){
                this.makeServiceError()
              }
              else{
                this.setState({arr:data})
              }
            }).catch((error)=>{
               this.makeServiceError()
            })
          }
    }

    componentDidUpdate(){
      if(Object.keys(this.state.response).length != 0 && this.props.navigation.getParam('type')=='Meal' && this.state.arr.length==0)
      {
        var ar=[];
        for(let i=1;i<=15;i++){
          if(this.state.response['strIngredient'+i]!==null && this.state.response['strIngredient'+i]!==""){
            ar.push({name : this.state.response['strIngredient'+i],pic:'https://www.themealdb.com/images/ingredients/'+this.state.response['strIngredient'+i]+'-small.png'})
          }else{
            break;
          }
        }
        this.setState({arr:ar})
      }
    }
    constructor (props) {
      super(props);
      this.updateIndex = this.updateIndex.bind(this);
    }



    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

  render() {
    const mealsButtons = ['Ingredients', 'Instructions']
    const defaultButtons = ['Meals']

    const type = this.props.navigation.getParam('type')
    const { strArea,strCategory,strInstructions}=this.state.response
    return (
      <View style={{flex:1, backgroundColor:'#ffffff',marginTop:10}}>
        {this.state.arr.length>0?
        (
        <View style={{flex: 1,marginTop:type=='Area'?height/14:height/6,backgroundColor: "#dfdfdf",borderRadius:15}}>
          <View style={{marginTop:type=='Area'?-height/14:-height/6,alignItems:'center'}}>
            {this.state.imageLoading?(
              <ActivityIndicator style = {{position:'absolute',bottom:height/6,alignItems:'center',flex:1}} size={width/15} color="#fd5a1e" />):null
            }
            <FastImage
            style={{width: type=='Area'?height/5:height/4, height:type=='Area'?height/7:height/4}}
            source={{uri:this.props.navigation.getParam('pic')}}
            onLoadStart = {() =>{this.setState({imageLoading:true})}}
            onLoadEnd = {() => {this.setState({imageLoading:false})}}
            />


          {type=='Meal'?<Text style={{color:'#fd5a1e'}}>{strCategory} - { strArea }</Text>:null}
          </View>
          <View style={{flex:1}}>
            <View>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.selectedIndex}
                buttons={type=='Meal'?mealsButtons:defaultButtons}
                containerStyle={{height: height/20,backgroundColor:'white'}}
                selectedButtonStyle={{backgroundColor:'#8bdc0b'}}
                innerBorderStyle ={{color:'black'}}
              />
            </View>
            <View style={{flex:1,alignItems:'center',marginHorizontal:5,justifyContent:'center'}}>
              {this.state.selectedIndex==0?
                (<ItemList
                  onPressItem={(name,pic)=>
                    {
                    NavigationService.push('MealScreen',{name:name,pic:pic,type:type=='Meal'?'Ingredients':'Meal'})
                  }
                  }
                  data={this.state.arr}
                  onPressChangeEnable={false}
                  numOfColumn = {2}
                  horizontal = {false}
                  width = {(5*width/11)}
                />)
            :(<ScrollView>
              <Text style={{color:'black',fontSize:15}}>{type=='Meal'?strInstructions:''}</Text>
            </ScrollView>)}
           </View>
          </View>
        </View>):(<View>
          <ActivityIndicator style = {{alignItems:'center'}} size={width/4} color="#fd5a1e" />
      </View>)}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
