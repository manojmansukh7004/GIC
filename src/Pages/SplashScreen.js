/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Dimensions, Text, Linking, Platform
} from 'react-native';
import { storeData, getData } from '../Config/AsyncStorace'
import { isSignedIn } from "./Authentication";
// import DeviceInfo from 'react-native-device-info';
import { ActivityIndicator, Colors, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux'
import { setUser, setBaseUrl } from '../Redux/Action'
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;
// import { FetchMobileVersion } from "../Services/Version/FetchMobileVersion"


class SplashScreen extends Component {
  state = {
    loading: true,
    updateAvailable: false,
    TemplateData: '',
    type: 'RB',
    division: "",
    type1: 'VB',
    division1: "01",
    baseUrl: '',
    UserId: '',
    filterData: '',
    customerData: '',
    RedirectPage: '',
    VersionCode: ''
  };

  FetchFiltetData = async () => {

    await getData('baseUrl').then((value) => {
      this.setState({ baseUrl: value })
    })
    await getData('UserId').then((value) => {
      this.setState({ UserId: value })
    })
    await getData('RedirectPage').then((value) => {
      this.setState({ RedirectPage: value })
    })

    var userId = this.state.UserId
    var baseUrl = this.state.baseUrl
    this.props.setUser(userId)
    this.props.setBaseUrl(baseUrl)

    this.props.navigation.navigate("TimeSheet")
  }

  onPressUpdate = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.ipmf');
  }

  async componentDidMount() {
    let oldVersionCode =1
    //  DeviceInfo.getBuildNumber();
    console.log("oldVersionCode", oldVersionCode);



    await storeData("baseUrl", "http://gictimesheettest.orgtix.com/webApi");
    setTimeout(async () => {
      const payload = {
        "inputData":
        {
          "ActionId": "2",
          "androidVersionCode": "1",
          "iosVersionCode": "1"
        }
      }
      var baseUrl = "http://gictimesheettest.orgtix.com/webApi"
      const response = 1
      // await FetchMobileVersion(payload, baseUrl)
      console.log("mjjj",response);
      
      var UpdatedVersionCode = response
      // response.MobileVerion[0].Table[0].androidVersionCode
      if (oldVersionCode < UpdatedVersionCode) {
        this.setState({
          updateAvailable: true,
          loading: false
        })
      }
      else {
        isSignedIn()
          .then(res => {
            console.log("rrrr",res);
            // res =false
            if (res == true) {
              this.setState({ loading: false });  
              // this.props.navigation.navigate('TimeSheet')
              this.FetchFiltetData()
            }
            else {
              this.props.navigation.navigate('Login')
            }
          })
          .catch(err => alert("An error occurred"));
      }

    }, 2000)
  }


  render() {
    if (this.state.updateAvailable) {
      return (
        <View style={styles.container}>
          <Card style={styles.card}>
            <Image style={styles.img} source={require('../Assets/logo.jpg')} />

            <Text style={styles.textCard}>An important update is available.</Text>
            <Text style={styles.textCard}>Please update your app to</Text>
            <Text style={styles.textCard}>continue using it.</Text>
            <Button
              contentStyle={styles.buttonContent}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              mode="contained"
              uppercase
              disabled={this.state.reqesting}
              color={'#0F9D58'}
              onPress={() => this.onPressUpdate()}
            >
              Update
            </Button>
          </Card>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* <Image style={{ height: 180, width: 180 }} source={require('../Assets/logo11.png')} /> */}
        <Image style={styles.img} source={require('../Assets/logo.jpg')} />
        {
          this.state.loading == true ? <ActivityIndicator size={40} animating={true} color={Colors.blue800} style={{ top: 25 }} /> : null
        }

      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (userId) => dispatch(setUser(userId)),
    setBaseUrl: (baseUrl) => dispatch(setBaseUrl(baseUrl)),

  }
}

export default connect(
  null,
  mapDispatchToProps,
)(SplashScreen);


const styles = StyleSheet.create({
  img: {
    width: displayWidth - 3.4 * contantPadding,
    height: (displayWidth - 3.5 * contantPadding) / 3,
    margin: 10
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    bottom: 20
  },
  card: {
    height: 320,
    elevation: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  textCard: {
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    height: 45,
    borderRadius: 12,
    marginTop: 20
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonContent: { height: 45 },
});