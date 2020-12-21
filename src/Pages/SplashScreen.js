
import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Dimensions, Text, Linking, StatusBar
} from 'react-native';
import firebase, { NotificationOpen } from 'react-native-firebase';
import { storeData, getData } from '../Config/AsyncStorace'
import { isSignedIn } from "./Authentication";
import DeviceInfo from 'react-native-device-info';
import { ActivityIndicator, Colors, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux'
import { setUser, setBaseUrl } from '../Redux/Action'
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;
import { FechDrawerMenu } from "../Services/FechDrawerMenu"
import { UIActivityIndicator } from 'react-native-indicators';
import { FetchMobileVersion } from '../Services/FetchMobileVersion'
var myTimesheet = false, timesheetApproval = false

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
    UserRole: '',
    filterData: '',
    customerData: '',
    RedirectPage: '',
    VersionCode: ''
  };

  getOrientation = () => {

    if (this.refs.rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({ orientation: 'portrait' });
      }
      else {
        this.setState({ orientation: 'landscape' });
      }
    }
  }

  FetchFiltetData = async () => {
    var response = await FechDrawerMenu(this.state.UserId, this.state.UserRole, this.state.baseUrl)
    var drawerMenu =response.EmployeeMenu[0]
    Object.keys(drawerMenu).map((key, index) => {

      if (drawerMenu[key].MenuName === "My Timesheet") {
        myTimesheet= true
        
        // this.props.navigation.navigate("TimeSheet", { "Loading": false })
        // this.setState({ loading: false });
      }
      else if (drawerMenu[key].MenuName === "Timesheet Approval") {
        timesheetApproval= true
        // this.props.navigation.navigate("TsApproval", { "Loading": false })
        // this.setState({ loading: false });
      }
      // else if ((response.EmployeeMenu[0][key].MenuName === "My Timesheet") && response.EmployeeMenu[0][key].MenuName === "Timesheet Approval") {
      //   this.props.navigation.navigate("Help", { "Loading": false })
      //   this.setState({ loading: false });
      // }
    })
    
    myTimesheet === true ? this.props.navigation.navigate("TimeSheet", { "Loading": false }):
    timesheetApproval === true?this.props.navigation.navigate("TsApproval", { "Loading": false }):
    this.props.navigation.navigate("Help", { "Loading": false })
    this.setState({ loading: false });
  }

  onPressUpdate = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.gic.timesheet');
  }

  async componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
    await getData('baseUrl').then((value) => {
      this.setState({ baseUrl: value })
    })
    await getData('UserId').then((value) => {
      this.setState({ UserId: value })
    })
    await getData('UserRole').then((value) => {
      this.setState({ UserRole: value })
    })
    var userId = this.state.UserId
    var baseUrl = this.state.baseUrl
    this.props.setUser(userId)
    this.props.setBaseUrl(baseUrl)

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      if (notificationOpen) {
        const { data } = notificationOpen.notification;
        console.log('notificationOpen', data);
        if(data.ProcessName == "Timesheet Rejection"){
          this.props.navigation.navigate('TimeSheet',{"notificationData": data, "notification" : true})

        }
      }
    })

    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          const { data } = notificationOpen.notification;
          console.log('notificationOpen', data);
          if(data.ProcessName == "Timesheet Rejection"){
            this.props.navigation.navigate('TimeSheet',{"notificationData": data, "notification" : true})
  
          }
        }
      });

    const version = DeviceInfo.getVersion();
    // console.log("versiooooooooooooooooooooooooooooooooooooooooooooooooon", version);
    // await storeData("baseUrl", "https://gictimesheet.orgtix.com/webAPI");
    await storeData("baseUrl", "http://gictimesheettest.orgtix.com/WebAPI");
    setTimeout(async () => {
      const payload = {
        "inputData":
        {
          "ActionId": "2",
          "androidVersionCode": "1",
          "iosVersionCode": "1"
        }
      }
            var baseUrl = "http://gictimesheettest.orgtix.com/WebAPI"
      // var baseUrl = "https://gictimesheet.orgtix.com/webAPI "
      const response = await FetchMobileVersion(payload, baseUrl)

      var UpdatedVersionCode = response.MobileVerion[0].Table[0].androidVersionCode
      if (version < UpdatedVersionCode) {
        this.setState({
          updateAvailable: true,
          loading: false
        })
      }
      else {
        isSignedIn()
          .then(res => {
            if (res == true) {
              this.FetchFiltetData()
            }
            else {
              this.props.navigation.navigate('Login')
            }
          })
          .catch(err => alert("An error occurred"));
      }

    }, 1000)
  }


  render() {
    if (this.state.updateAvailable) {
      return (
        <View style={styles.container}>
          <Card style={styles.card}>
            <Image style={{ height: 90, width: 240, margin: 20 }} source={require('../Assets/logo.jpg')} />

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
      <View ref="rootView" style={[styles.Container]}>
        <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
        <View style={{ marginTop: 80 }}>
          <Image style={{ height: 100, width: 250, }} source={require('../Assets/logo.jpg')} />
          {
            this.state.loading == true ?
              <UIActivityIndicator style={{ bottom: 120 }} color="gray" size={50} />

              : null
          }

        </View>

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
  Container: {
    flex: 1,
    display: 'flex',
    top: 22.5,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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
    // marginTop: 150
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