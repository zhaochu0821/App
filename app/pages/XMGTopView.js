/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


   



import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity, // 不透明触摸
    Alert,
 InteractionManager
} from 'react-native';

// 获取屏幕宽度
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
import First from '../component/First'
// 导入json数据
var shareData = require('./shareData.json');

// 一些常亮设置
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 25;

// ES5
export default class TopView extends Component {
  constructor(props) {
      var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    super(props);
     this.state = {     
        sellerId:"欢迎来到第一个页面",
         dataSource:ds.cloneWithRows(shareData.data)
        };
  
  }
 passMenthod  () {
        this.props.pushDetails()
    }


    // 初始化状态值(可以变化)
   
    _renderRow(rowData){
        return(
            <TouchableOpacity  
           //onPress={()=>{alert('点击了')}}
         onPress={()=>this.passMenthod()}
         //onPress = {this.jump.bind(this)}
             >
                <View style={styles.innerViewStyle}>
                    <Image source={{uri:rowData.icon}} style={styles.iconStyle} />
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render(){
        return(
               <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                //renderRow={this.renderRow}
                contentContainerStyle={styles.listViewStyle}
                renderRow={this._renderRow.bind(this)}
            />
            </View>
        );
    }

    // 返回cell
    
   

        

}

const styles = StyleSheet.create({
     container: {
       backgroundColor:'#fff',
    },
    listViewStyle:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
    },

    innerViewStyle:{
        width:cellWH,
        height:cellWH,
        marginLeft:vMargin,
        marginTop:hMargin,
        // 文字内容居中对齐
        alignItems:'center'
    },

    iconStyle:{
        width:80,
        height:80,
    },

});
