import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux'
import { Title, } from 'react-native-paper';

class AppBar extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  async componentDidMount() {

  }


  render() {

    return (
      // <View style={{ height: "100%",top:"3%", backgroundColor: this.props.primaryColor, borderWidth: 1, borderColor: 'red' }}>
      //   <Text>{this.props.title}</Text>
      //   <Text>mj</Text>

      // </View>
      <View style={styles.subContiner1}>

        <View style={{ flexDirection: 'row', width: "85%" }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "10%", marginLeft: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TimeSheet')}>
              <Image
                source={require('../Assets/backArrow.png')}
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
        <View style={{ width: "15%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ margin: 5, }}>
            {
              this.props.timeSheetEntry == true ?
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center' }}
                  onPress={() => { this.props.handleSave() }}>
                  <Text style={{ color: this.props.fontColor }}>{"SAVE"}</Text>
                </TouchableOpacity> : null
            }
            {
              this.props.details == true ?
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center' }}
                  onPress={() => { this.props.handleDeleteRecord() }}>
                  <Image
                    source={require('../Assets/bin.png')}
                    style={{ width: 20, height: 23, top:3, tintColor: 'white' }}
                  />
                </TouchableOpacity> : null
            }
          </View>
          <View style={{ margin: 5, marginRight: 15 }}>

          </View>
        </View>
      </View>

    );
  }
}



const mapStateToProps = state => {
  return {
    user: state.user,
    baseUrl: state.baseUrl,
    fontColor: state.fontColor,
    stripColor: state.stripColor,
    stripHeaderColor: state.stripHeaderColor,
    bgColor: state.bgColor,
    primaryColor: state.primaryColor,
    secColor: state.secColor,

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
    justifyContent: 'center',
    color: 'white'
  },
  subTitle: {
    fontSize: 20,
    justifyContent: 'center',
    color: 'white'
  },
  subContiner1: {
    flexDirection: 'row',
    height: "100%"
    // borderWidth: 0.2,
    // borderColor: '#C1C0B9',
    // borderRadius: 5,
    // marginLeft: 5,
    // marginRight: 5,
    // marginBottom: 5,
    // top: 3,
    // justifyContent: 'space-between',
    // backgroundColor: "white"
  },
  img: {
    width: 25,
    height: 25,
    margin: 3,
    tintColor: '#FFFF'
  },

});