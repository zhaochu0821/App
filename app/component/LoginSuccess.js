import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ToolbarAndroid,
    Text
} from 'react-native';

export default class LoginSuccess extends React.Component {
	constructor(props){
		super(props);
		
  
  }
//  toFirst() {
//         const { navigator } = this.props;

//         this.props.navigator.push({
//             name: 'First',
//             component: First,

//             passProps: {
//                 ...this.props,
              

//             }

//         })
//     }

	//回到第一个页面去
	onJump(){
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		}
	}

	render(){
		return (
			<View  style={{ height:300, backgroundColor: '#FFFFFF',}}>
				<View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', }}>
					<TouchableOpacity onPress={this.onJump.bind(this)}>
						<Image style={{ width: 40, height: 40, marginLeft: 20, resizeMode: 'stretch' }} source={require('../images/fan.png')} />
					</TouchableOpacity>
					<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }} > 欢迎来到主界面 </Text>
				</View>


				<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> 用户：{this.props.logName}</Text>
				<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> 密码：{this.props.powd} </Text>


				<TouchableOpacity
				//onPress = {this.toFirst.bind(this)}
				>
					<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> 相机功能(待开发)</Text>
				</TouchableOpacity>

			</View>


		);

	}

}
