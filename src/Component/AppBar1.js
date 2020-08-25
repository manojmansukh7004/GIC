import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Title, } from 'react-native-paper';
import ProfileAvtar from '../Pages/ProfileAvtar'
import { Dialog, Avatar, Button } from 'material-bread';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'

class AppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: '',
      visible: false,
      dialogVisible: false,
      calenderVisible: false,
      sideDrawerVisible: true,
    }
  }

  toggleDrawer() {
    this.props.navigation.toggleDrawer()
  };
  componentDidMount() {

    this.setState({
      calenderVisible: this.props.calenderVisible
    })
  }

  render() {

    return (
      <View style={styles.subContiner1}>

        <View style={{ flexDirection: 'row', width: "75%", height:'100%',backgroundColor:'transparent' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "10%", marginLeft: 5 }}>
            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image
                source={require('../Assets/drawer.png')}
                style={{ width: 33, height: 33, tintColor: 'white' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', }}>
            <Title style={styles.Title}>
              {this.props.title}
            </Title>
          </View>
        </View>
        <View style={{backgroundColor:'transparent', width: "25%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ margin: 5, }}>
            {
              this.props.calender == true ?
                <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: 'center' }}
                  onPress={() =>
                    this.setState({ calenderVisible: true },
                      () => { this.props.handleCalenderStatus(this.state.calenderVisible) })}>
                  <Image style={styles.img} source={require('../Assets/darkCalendar.png')} />
                </TouchableOpacity> : null
            }
            {
              this.props.filter == true ?
                <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: 'center' }}
                  onPress={() =>
                    this.setState({ sideDrawerVisible: true },
                      () => { this.props.sideDrawerVisible(this.state.sideDrawerVisible) })}>
                  <Image style={styles.img1} source={require('../Assets/filter.png')} />
                </TouchableOpacity> : null
            }
          </View>
          <View style={{ margin: 3, marginRight: 15 }}>
            <ProfileAvtar {...this.props} />
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
    baseUrl: state.baseUrl

  }
}
export default connect(mapStateToProps)(AppBar)

const styles = StyleSheet.create({
  Container: {

    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: "white"

  },
  Title: {
    fontSize: 18,
    // margin: 5,
    // top: 3,
    // marginLeft: 10,
    justifyContent: 'center',
    color: 'white'
    // fontWeight:'bold'
  },
  subContiner1: {
    flexDirection: 'row',
    // height: '100%',
    // borderWidth: 0.2,
    // borderColor: '#C1C0B9',
    // borderRadius: 5,
    // marginLeft: 5,
    // marginRight: 5,
    // marginBottom: 5,
    // top: 3,
    // justifyContent: 'space-between',
    // backgroundColor: "pink"
  },
  img: {
    width: 25,
    height: 25,
    margin: 3,
    tintColor: '#FFFF'
  },
  img1: {
    width: 30,
    height: 30,
    margin: 3,
    tintColor: '#FFFF'
  },

});