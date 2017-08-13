import React, { Component } from 'react';
import {
   View,
    Navigator,
    TouchableOpacity,
     ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,

  Image,
  TextInput,
TouchableHighlight,
  InteractionManager
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';

class SecondPageComponent extends Component{
  constructor(props){
    super(props);
    this.state={
    id:null
  }
}
 clickJump(){
   if(this.props.getUser){
     this.props.getUser("大海")
   }
    const{navigator} = this.props;
    if(navigator){
      //把当前页面pop掉 回到上一个页面
      navigator.pop();
    }
  }

componentDidMount(){
 this.setState({
   title:this.props.title,
   id:this.props.id
 })
}
  render(){
    return(
       <View style={styles.container}>
    <Text>我是第二个界面</Text>

    <TouchableHighlight
       underlayColor="rgb(181, 136, 254)"
       activeOpacity={0.5}  
       style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
       onPress={this.clickJump.bind(this)}
    >
    <Text>点击返回第一个界面</Text>
    </TouchableHighlight>

    <Text>第一个界面传入：{this.state.title}</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

});