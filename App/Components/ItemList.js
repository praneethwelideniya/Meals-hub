import React,{ Component } from 'react'
import { Text,View,Dimensions,TouchableOpacity,StyleSheet,FlatList,TouchableHighlight,ActivityIndicator,ScrollView } from 'react-native'
const {height,width} =Dimensions.get('window')
import FastImage from 'react-native-fast-image'

export class ImageGrid extends Component {
  state = {
    imageLoading : false
  }
  render(){
    return (
      <View>
        <TouchableHighlight style={[styles.card,{width:this.props.width,height:this.props.width}]} onPress={()=>{
            this.props.onPressItem()
          }} >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
        style={{width:this.props.width-5, height:this.props.width-5,opacity: 0.8}}
        source={{uri:this.props.item.pic}}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart = {() =>{this.setState({imageLoading:true})}}
        onLoadEnd = {() => {this.setState({imageLoading:false})}}
      />
    {}
    <Text style={{position: 'absolute', fontWeight:"900",textAlign:"center"}}>
       {this.props.item.name}
      </Text>
      {this.state.imageLoading?(
        <ActivityIndicator style = {{position: 'absolute',alignItems:'center',justifyContent:'center',flex:1}} size={width/15} color="#fd5a1e" />):null
      }
      </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default class ItemList extends Component {

  _keyExtractor = (item, index) => "list_id-"+item.name;

  _renderItem = ({item}) => (
      <ImageGrid item = {item} width = {this.props.width} onPressItem ={()=>{
          this.props.onPressItem(item.name,item.pic)}} />
  );
  render(){
    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        horizontal={this.props.horizontal}
        numColumns={this.props.numOfColumn}
      />
    );
  }
}

const styles = StyleSheet.create({
card:{
  shadowColor: '#00000021',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 12,
  borderRadius:10,
  marginVertical: 1,
  backgroundColor:"white",
  flexBasis: '49%',
  marginLeft: 2,
  justifyContent:"center"
},
listContainer:{
 justifyContent:'center'
}
});
