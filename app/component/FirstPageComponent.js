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

import SecondPageComponent from './SecondPageComponent';

class FirstPageComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      title :"title哈哈"
    }
  }
  clickJump(){
    //因为Navigator <Component {...route.params} navigator={navigator} />传入了navigator 所以这里能取到navigator
    const{navigator} = this.props;
    let that = this;
    if(navigator){
      navigator.push({
        name : "SecondPageComponent",
        component : SecondPageComponent,
        params :{
          title:this.state.title, 
          id:123,
          getUser:function(user){
            that.setState({
              user:user
            })
          }
        }
      })
    }
  }
render(){
  return(
    <View style={styles.container}>
    <Text>我是第一个界面</Text>
    <TouchableHighlight
       underlayColor="rgb(181, 136, 254)"
       activeOpacity={0.5}  
       style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
       onPress={this.clickJump.bind(this)}
    >
    <Text>点击进入第二个界面</Text>
    </TouchableHighlight>
    <Text>第二个界面返回：{this.state.user}</Text>
    </View>
  )
}
}
