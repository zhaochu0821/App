
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
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import Second from './Second'

import CustomNavigation from '../util/CustomNavigation'
export default class First extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态     
        this.state = {
            gobackClick: false,
            rightDisable: false,
            userId: '',
            
        };
    }
 toSecond() {     
      InteractionManager.runAfterInteractions(() =>{
            const {navigator} = this.props;
            navigator.push({
                component: Second,
                name: 'Second',
                passProps: {...this.props,}
          })    
        });
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
  onJump(){
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		}
	}

    render() {
        return (
             <View style={{flex:1,backgroundColor:'#e8e8e8'}}>
             <CustomNavigation navigateText="第一级页面"
                                  // hiddenBackImage={false}
                                  hiddenRightBtn={false}
                                 
                                  backDisabled={this.state.gobackClick}
                                  getBack={this._goBack.bind(this)}
                                 />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 10 }}>欢迎来到列表页</Text>
                <TouchableOpacity onPress={this.onJump.bind(this)}>
                    <Text style={{ fontSize: 26, }}>返回上一页</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toSecond.bind(this)}>
                    <Text style={{ fontSize: 26, }}>进入子页面</Text>
                      
                </TouchableOpacity>
                
            </View>
              </View>
        )
    }
}

