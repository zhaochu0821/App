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
		this.state = {  
           myname:this.props.myname,
      age:this.props.age,
        };  
  }
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
				<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> 用户：{this.props.id}</Text>
				<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> 密码：this.props.pow</Text>
			<TouchableOpacity
				//onPress = {this.toFirst.bind(this)}
				>
					<Text style={{ marginLeft: 40, color: "black", fontSize: 26 }}> {this.props.myname}</Text>
				</TouchableOpacity>

			</View>


		);

	}

}
