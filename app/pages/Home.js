/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  ScrollView,
  StyleSheet,
  AlertIOS,
  RefreshControl,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Animated,
  Modal
} from 'react-native'
import LocalImg from '../images'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'

import SearchView from '../component/SearchView'
import LbsModal from '../component/LbsModal'
import TabView from '../component/TabView'
import Bz from '../component/Bz'
import DetailPage from './DetailPage'
import data from '../data'
import TopView from './XMGTopView'
import First from '../component/First'
const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?120:100)
const InputHeight = px2dp(28)

export default class HomePage extends Component {
  constructor(props){
      super(props)
      this.state = {
        location: "选择部门",
        scrollY: new Animated.Value(0),
        searchView: new Animated.Value(0),
        modalVisible: false,
        searchBtnShow: true,
        listLoading: false,
        isRefreshing: false,
          subject:'请选择科目',   
        onRequestClose: false,
           visible: false,
        transparent: true,
        id:2
      }

      this.SEARCH_BOX_Y = px2dp(isIOS?48:43)
      this.SEARCH_FIX_Y = headH-px2dp(isIOS?64:44)
      this.SEARCH_KEY_P = px2dp(58)
      this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y
      this.SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH
  }
  componentDidMount(){
      SplashScreen.hide()
      BackAndroid.addEventListener('hardwareBackPress', function () {
          BackAndroid.exitApp(0)
          return true
      })
  }
  
  _renderHeader(){
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y]
    })
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0]
    })
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0]
    })
    return (
      <View style={styles.header}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
         <TouchableOpacity onPress={()=>{this.setState({visible:true})}}>
            <View style={styles.lbs}>
              <Icon name="ios-pin" size={px2dp(18)} color="#fff" />
              <Text style={{fontSize: px2dp(18), fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.subject}</Text>
              <Icon name="md-arrow-dropdown" size={px2dp(16)} color="#fff" />
            </View>
          </TouchableOpacity>
          
        </Animated.View>
        <Animated.View style={{
          marginTop: px2dp(15),
          transform: [{
            translateY: searchY
          }]
        }}>
          
        </Animated.View>
      </View>
    )
  }
  _renderFixHeader(){
    let showY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [-9999, -9999, 0, 0]
    })
    return (
      <Animated.View style={[styles.header, {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        height: px2dp(isIOS?64:44),
        paddingTop: px2dp(isIOS?25:10),
        transform: [
          {translateY: showY}
        ]
      }]}>
        <TouchableWithoutFeedback onPress={()=>{}}>
          <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
            <Icon name="ios-search-outline" size={20} color="#666" />
            <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
  openSearch(){
    this._scrollY = this.state.scrollY._value
    const { timing } = Animated
    Animated.parallel(['scrollY', 'searchView'].map(property => {
            return timing(this.state[property], {
            toValue: property=='scrollY'?this.SEARCH_FIX_Y:1,
            duration: 200
        });
    })).start(() => {
      //this.setState({searchBtnShow: false})
    })
    TabView.hideTabBar()
  }
  closeSearch(){
    if(this._scrollY>=this.SEARCH_FIX_Y){
      this.state.scrollY.setValue(this._scrollY)
    }else{
      Animated.timing(this.state.scrollY, {
          toValue: this._scrollY,
          duration: 200
      }).start()
    }
    //this.refs["search"].blur()
    Animated.timing(this.state.searchView, {
        toValue: 0,
        duration: 200
    }).start(() => this.setState({searchBtnShow: true}))
    TabView.showTabBar(200)
  }
  openLbs(){
    this.setState({modalVisible: true})
  }
  changeLocation(location){
    this.setState({location})
  }
 


  _renderBZ(){
    return data.list.map((item, i) => {
      item.onPress = () => {
        this.props.navigator.push({
            component: DetailPage,
            args: {}
        })
      }
      return (<Bz {...item} key={i}/>)
    })
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 2000)
  }
  pushDetails(){
        this.props.navigator.push({
             component:First,
               params: {
                    id: 2,}
         })
       
    }

  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {this._renderHeader()}
          <TopView pushDetails = {()=>this.pushDetails()}/>
         
          

          <View style={styles.business}>
            
          
            <ActivityIndicator style={{marginTop: 10}} animating={this.state.listLoading}/>
          </View>
        </ScrollView>
     
        <SearchView show={this.state.searchView} scrollY={this.state.scrollY}/>
        <LbsModal
          modalVisible={this.state.modalVisible}
          location={this.state.location}
          setLocation={this.changeLocation.bind(this)}
          closeModal={(()=>this.setState({modalVisible: false})).bind(this)}
        />
          <Modal
           visible={this.state.visible}
           transparent={this.state.transparent}

           onRequestClose={() => {
               this.setState({ visible: false })
           }}
       >
 
           <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)', }}>
               <View style={{ height: 200, width: width, backgroundColor: 'red', marginTop: Platform.OS == 'ios' ? 64 : 44 }}>
                   <ScrollView>
                       <TouchableOpacity onPress={() => { this.setState({ visible: false, subject: '骨科' }) }}>
                           <View style={{ height: 20, width: width, marginTop: 10, marginBottom: 10 }} >
                               <Text style={{ marginLeft: 40, fontSize: 20 }}>骨科</Text>
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.setState({ visible: false, subject: '耳鼻喉科' }) }}>
                           <View style={{ height: 20, width: width, marginTop: 10, marginBottom: 10 }} >
                               <Text style={{ marginLeft: 40, fontSize: 20 }}>耳鼻喉科</Text>
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.setState({ visible: false, subject: '外科' }) }}>
                           <View style={{ height: 20, width: width, marginTop: 10, marginBottom: 10 }} >
                               <Text style={{ marginLeft: 40, fontSize: 20 }}>外科</Text>
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.setState({ visible: false, subject: '儿科' }) }}>
                           <View style={{ height: 20, width: width, marginTop: 10, marginBottom: 10 }} >
                               <Text style={{ marginLeft: 40, fontSize: 20 }}>儿科</Text>
                           </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => { this.setState({ visible: false, subject: '神经科' }) }}>
                           <View style={{ height: 20, width: width, marginTop: 10, marginBottom: 10 }} >
                               <Text style={{ marginLeft: 40, fontSize: 20 }}>神经科</Text>
                           </View>
                       </TouchableOpacity>
                   </ScrollView>
               </View>

           </View>
             
       </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0398ff",
    height: headH,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    marginBottom: px2dp(46)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: width/2,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    flex: 1,
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#0398ff",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  }
})
