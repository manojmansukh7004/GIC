import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Title, } from 'react-native-paper';
import ProfileAvtar from '../Pages/ProfileAvtar'
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
        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', width: '15%' }}>
          <TouchableOpacity onPress={() => this.toggleDrawer()}>
            <Image
              source={require('../Assets/drawer.png')}
              style={{ width: 33, height: 35, top: 2, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%' }}>
          <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: "flex-start", height: '100%' }}>
            <Title style={styles.Title}>
              {this.props.title}
            </Title>
          </View>
          <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: "flex-end",  }}>
         
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
            <View style={{ height: 50, width: 50, justifyContent: "center", alignItems: 'center' }}>
              <ProfileAvtar {...this.props} />
            </View>
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
  },
  Title: {
    fontSize: 18,
    justifyContent: 'center',
    color: 'white'
  },
  subContiner1: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
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