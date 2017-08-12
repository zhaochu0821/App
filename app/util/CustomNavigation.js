/**
 * 页面的导航头部
 */


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Linking,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    PixelRatio,
    Navigator
} from 'react-native'


import { toDips, toDipsWidth, toDipsHeight } from './PixelRatioUtils'

export default class CustomNavigation extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
     shows:false,

      show:'', 
      disenter:false,
           inputModalVisible: false,

           
        }
             // this.gbstate1 = this._gbstate1.bind(this); 
      }
setModalVisible() {  
    this.setState({  
      show:!this.state.show,  
    });  
  } 
  setModalVisibles() {  
    this.setState({  
      shows:!this.state.shows,  
    });  
  }
//   _ 
//   gbstate3() {//打电话的方法
//       Linking.canOpenURL(`tel:` + this.props.sellerPhone + ``).then(supported => {
//           if (!supported) {
//               console.log('Can\'t handle url: ' + '13456789098');
//           } else {
//            return Linking.openURL(`tel:` + this.props.sellerPhone + ``);
//           }
//       }).catch((err) => { console.log() });
//   }
    render() {
        return(
            <View style={styles.backGroundView}>
                {
                 this.isHiddenBackImage()
                }
                <View style={styles.backNavigateText}>
                    <Text style={{fontSize:toDipsWidth(32)}}>{this.props.navigateText}</Text>
                </View>
                {
                    this.isHiddenRightBtn()
                }
            </View>
        )
    }

    isHiddenBackImage(){//返回的图标的方法
        if (this.props.hiddenBackImage){
            return (
                <View style={styles.backImageTouch}/>
            )
        }else {
            return(
                <TouchableOpacity onPress={this.props.getBack}
                               getBack={()=>{
                this.setState({inputModalVisible: true,})
               } }
                                  style={styles.backImageTouch}
                                  disabled={this.props.backDisabled}>
                    <Image source={require('../images/fan.png')}
                           style={styles.backImage}/>
         
                </TouchableOpacity>
            )
        }
    }

    isHiddenRightBtn(){//电话图标的方法
        if (this.props.hiddenRightBtn){
            return (
                <View style={styles.backRightBtn}/>
            )
        }else {
            return(
                Platform.OS == 'android'?
                <TouchableOpacity onPress={this.props.rightBtnClick}
                                  style={styles.backRightBtn}
                                  onPress={this.setModalVisibles.bind(this)}
                                  disabled={this.props.rightDisabed}>
                    <Image source={require('../images/dianpu.png')}  style={styles.backImage}/>

       
                </TouchableOpacity>:
                <TouchableOpacity onPress={this.props.rightBtnClick}
                                  style={styles.backRightBtn}
                                  onPress={this.gbstate3.bind(this)}
                                  disabled={this.props.rightDisabed}>
                    <Image source={require('../images/dianpu.png')}  style={styles.backImage}/>

       
       
                </TouchableOpacity>
            )
        }
    }

}


var screenWidth = Dimensions.get('window').width;
var deviceType = Platform.OS == 'ios'?20:0;
const styles = StyleSheet.create({
    backGroundView:{
        height:Platform.OS == 'ios'?toDipsHeight(120):toDipsHeight(88),
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomWidth:1/PixelRatio.get(),
        borderColor:'#e1e1e1',

    },

    backImageTouch:{
        height:toDipsHeight(88),
        width:toDipsWidth(88),
        marginTop: deviceType,
        justifyContent:'center',
        alignItems: 'center',
        marginLeft:toDipsWidth(8),
      
    },

    backRightBtn: {
        height:toDipsHeight(88),
        width:toDipsWidth(88),
        marginTop: deviceType,
        justifyContent:'center',
        alignItems: 'center',
      
    },

    backImage:{
        height:toDipsHeight(45),
        width:toDipsWidth(45),
       
  
    },
  
  
    backNavigateText:{
        justifyContent:'center',
        marginLeft:0,
        marginTop: deviceType,
        alignItems: 'center',
        marginRight: 0,
        width: screenWidth - toDipsWidth(172) - toDipsWidth(10),
       
    }
});

