/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Dimensions, Text, Linking, StatusBar
} from 'react-native';
import { storeData, getData } from '../Config/AsyncStorace'
import { isSignedIn } from "./Authentication";
import DeviceInfo from 'react-native-device-info';
import { ActivityIndicator, Colors, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux'
import { setUser, setBaseUrl } from '../Redux/Action'
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;
import {  ProgressBar } from 'material-bread';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

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

    await getData('baseUrl').then((value) => {
      this.setState({ baseUrl: value })
    })
    await getData('UserId').then((value) => {
      this.setState({ UserId: value })
    })
    // await getData('RedirectPage').then((value) => {
    //   this.setState({ RedirectPage: value })
    // })

    var userId = this.state.UserId
    var baseUrl = this.state.baseUrl
    this.props.setUser(userId)
    this.props.setBaseUrl(baseUrl)

    this.props.navigation.navigate("TimeSheet",{"Loading": false})
    this.setState({ loading: false });  

  }

  onPressUpdate = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.ipmf');
  }

  async componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
        this.getOrientation();
    });
    let oldVersionCode =1
    //  DeviceInfo.getBuildNumber();
    console.log("oldVersionCode", oldVersionCode);
    const version = DeviceInfo.getVersion();

    console.log("version", version);
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
              // this.setState({ loading: false });  
              // this.props.navigation.navigate('TimeSheet')
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
      <View ref="rootView" style={[styles.Container]}>
      <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
       <View style={{marginTop:80}}>
       <Image style={{ height: 100, width: 280 ,}} source={require('../Assets/logo.jpg')} />
      {
        this.state.loading == true ? 
        <UIActivityIndicator style={{bottom:120}} color= "gray" size= {50}/>
        
        :null
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
    justifyContent: 'flex-start',
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