/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import CustomNavigation from '../util/CustomNavigation'
import LoginSuccess from './LoginSuccess';
export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
     this.state = {     
    userName : '',
    password : '',     
        };
  
  }

  render() {
      return (
 <View style={{flex: 1, height:height}}>
          <CustomNavigation navigateText="登录页面"
                                  // hiddenBackImage={false}
                                  hiddenRightBtn={false}
                                 
                                  backDisabled={this.state.gobackClick}
                                  getBack={this._goBack.bind(this)}
                                 />
    <View style={LoginStyles.loginview}>
    
     <View   style={{flexDirection: 'row',height:100,marginTop:1,
        justifyContent: 'center',
        alignItems: 'flex-start',}}>
       <Image source={require('../images/logo.png')}/>
     </View>


     <View style={{marginTop:80}}>
     <View style={LoginStyles.TextInputView}>
       <TextInput   style={LoginStyles.TextInput}    underlineColorAndroid='transparent' placeholder='输入用户名/注册手机号' onChangeText={(text) => {
                    this.setState({ userName:text })
        }}/>
         </View>
          <View style={LoginStyles.TextInputView}>
       <TextInput    placeholder='输入密码'   style={LoginStyles.TextInput}  secureTextEntry={true}  underlineColorAndroid='transparent'  onChangeText={(text) => {
          
             this.setState({ password:text })
        }}/>
         </View>
	<TouchableOpacity onPress={this.onLoginSuccess.bind(this)}>
          <View style={LoginStyles.loginTextView}  >
        <Text style={LoginStyles.loginText} >登录</Text>
        </View>
          </TouchableOpacity>
        <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
      </View>
     </View>
      </View>
   )
  }
  _goBack(){  //返回上一页  
        const{navigator} = this.props;
        this.setState({
            gobackClick: true
        })
        InteractionManager.runAfterInteractions(()=>{
            navigator.pop();
            this.setState({
                gobackClick: false
            })
        })
    }

  //跳转到第二个页面去
   onLoginSuccess(){  

      InteractionManager.runAfterInteractions(() =>{
            const {navigator} = this.props;
            navigator.push({
                component: LoginSuccess,
                name: 'LoginSuccess',
                passProps: {...this.props,
                  'logName': this.state.userName,
                  'powd':this.state.password, 
                }
          })    
        });
   
   }
}


const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
   TextInputView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius:5,
    borderWidth:0.3,
    borderColor:'#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height:45,
    margin:18,
  },

  loginText: {
    color: '#ffffff',
     fontWeight: 'bold',
     width:30,
  },
  loginTextView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#3281DD',
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
});
