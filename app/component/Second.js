
/**
 * 收货成功的页面
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
 InteractionManager,
   TouchableOpacity,
    View
} from 'react-native';

import Home from '../pages/Home'

import TabView from './TabView'
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class Second extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态     
        this.state = {
            gobackClick: false,
            rightDisable: false,
            userId: ''
        };
    }
     toHome() {     
      InteractionManager.runAfterInteractions(() =>{
            const {navigator} = this.props;
            navigator.push({
                component: TabView,
                name: 'TabView',
                passProps: {...this.props,}
          })    
        });
    }
  toFirst() {
      InteractionManager.runAfterInteractions(() =>{
            const {navigator} = this.props;
            navigator.push({
                component: First,
                name: 'First',
                passProps: {...this.props,}
            })
          
        });
    
    }
  onJump(){
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		}
	}

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 10 }}>欢迎来到子页面</Text>
                <TouchableOpacity onPress={this.onJump.bind(this)}>
                    <Text style={{ fontSize: 26, }}>返回上一页</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={this.toHome.bind(this)}>
                    <Text style={{ fontSize: 26, }}>返回首页</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

