import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image,StatusBar } from 'react-native';
import { Title, } from 'react-native-paper';
import ProfileAvtar from '../Pages/ProfileAvtar'
// import Fillter from '../Pages/Fillter'
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
      type: 'RB',
      division: "'02','03'",
      filterData: '',
      vegFilterData: '',
      filterVisible: false
    }
  }

  toggleDrawer() {
    this.props.navigation.toggleDrawer()
  };

  render() {
    
    return (
      <View style={styles.subContiner1}>

        <View style={{ flexDirection: 'row', width: '100%',justifyContent: 'space-between' }}>
          <View>
            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image
                source={require('../Assets/drawer.png')}
                style={{ width: 33, height: 33, margin: 5, }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center',  bottom: 3 }}>
            <Title style={styles.Title}>
              {this.props.title}
            </Title>
          </View>
        {/* </View>
        <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'flex-end', }}> */}
          <View style={{ margin: 3,  marginRight: 7 }}>
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
    backgroundColor: "white"

  },
  Title: {
    fontSize: 18,
    margin: 5,
    top: 3,
    marginLeft: 10,
    justifyContent: 'center'
    // fontWeight:'bold'
  },
  subContiner1: {
    flexDirection: 'row',
    height: 48,
    borderWidth: 0.2,
    borderColor: '#C1C0B9',
    // borderRadius: 5,
    // marginLeft: 5,
    // marginRight: 5,
    marginBottom: 5,
    top: 3,
    // justifyContent: 'space-between',
    backgroundColor: "#e7ebee"
  },


});