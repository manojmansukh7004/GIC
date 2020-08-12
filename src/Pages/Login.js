
import React, { Component } from 'react';
import {
  StyleSheet, Text, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView, View, ImageBackground
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button, ActivityIndicator, Colors } from 'react-native-paper';
import { storeData, getData } from '../Config/AsyncStorace'
import { attemptLogin } from "../Services/LoginService"
import { onSignIn } from "./Authentication";
import { connect } from 'react-redux'
import { setUser, } from '../Redux/Action'
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;
var url


class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    userName: '',
    password: '',
    reqesting: false,
    passwordVisibility: false,
    isModalVisible: false,
    loading: false,
    baseUrl: "",
  };

  async componentDidMount() {
    getData('baseUrl').then((value) => {
      this.setState({ baseUrl: value })
    })

  }

  loginValidation() {

    var userName = this.state.userName;
    var passwd = this.state.password;
    if (userName == "" && passwd == "") {
      alert("Enter user name and password");
      return false;
    }
    else if (userName == "") {
      alert("Enter user name");
      return false;
    } else if (passwd == "") {
      alert("Enter password");
      return false;
    } else {
      this.login(userName, passwd, "3");
    }
  }

  async login(userName, password, Action) {
    const payload = {
      "loginDetails":
      {
        Action: Action,
        LoginEmpID: userName,
        Password: password
      }
    };
    var baseUrl = `${this.state.baseUrl}`;
    const data = await attemptLogin(payload, baseUrl);
    console.log("login details", data);

    if (data != null && data != "") {

      if (data.ErrorList != null && data.ErrorList != "") {
        var error = data.ErrorList[0].split("$")[1]
        alert(error);
      }
      else if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
        alert(data.ExceptionList[0].split("$")[1]);
      }
      else if (data.EmployeeDetails[0] != "") {

        this.props.userData(data.EmployeeDetails[0][0].UserID)
        onSignIn()
        // this.props.navigation.navigate('TimeSheet')
        if (data.EmployeeDetails[0][0].RedirectPage == "") {
          alert("Unauthorised Access!!!");
          this.props.navigation.navigate('Login')

        }
        else {
          // if (data.EmployeeDetails[0][0].IsFirstLogin == "True" && data.EmployeeDetails[0][0].AllowForcePwdChange == "True") {
          //     location.href = "change-password.html";
          // } else {
          console.log("loginnnnn");
          await storeData("UserId", data.EmployeeDetails[0][0].UserID)
          await storeData("UserName", data.EmployeeDetails[0][0].LoginEmpName)
          await storeData("UserRole", data.EmployeeDetails[0][0].LoginEmpRole)
          this.props.navigation.navigate('SplashScreen')
          // }
        }
      }
    }

    else {
      var error = data.responseText;
      alert(error);
      //messageList(error);
    }
    //  
    // });
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisibility: !prevState.passwordVisibility,
    }));
  }


  render() {
    return (
      // <ImageBackground style={styles.image}source={require('../Assets/bg.jpg')}>

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        // style={{ flex: 1, }}
        contentContainerStyle={styles.container}
      >
        <StatusBar translucent barStyle="dark-content" backgroundColor="#e7ebee" />


        <Image style={styles.imgTop} source={require('../Assets/logo.jpg')} />
        {/* <Text style={styles.textWelcome}>Welcome</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 30, }}>
          <View ><Text style={{ color: '#4285F4', fontSize: 40, fontWeight: 'bold', }}>S</Text></View>
          <View><Text style={{ color: '#DB4437', fontSize: 40, fontWeight: 'bold' }}>i</Text></View>
          <View ><Text style={{ color: '#F4B400', fontSize: 40, fontWeight: 'bold' }}>g</Text></View>
          <View ><Text style={{ color: '#4285F4', fontSize: 40, fontWeight: 'bold' }}>n</Text></View>
          <View ><Text style={{ color: '#0F9D58', fontSize: 40, fontWeight: 'bold' }}>{" "}</Text></View>
          <View ><Text style={{ color: '#0F9D58', fontSize: 40, fontWeight: 'bold' }}>i</Text></View>
          <View ><Text style={{ color: '#DB4437', fontSize: 40, fontWeight: 'bold', }}>n</Text></View>
        </View>
        {/* <View ><Text style={{ color: 'black', fontSize: 40,  marginTop: 30, }}>Sign in</Text></View> */}

        {

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              ref={(input) => { this.userName = input; }}
              label="User Name"
              mode="flat"
              numberOfLines={1}
              value={this.state.userName}
              style={styles.textInput}
              selectionColor={this.props.secondaryColor}
              maxLength={10}
              onChangeText={text => this.setState({ userName: text })}
              returnKeyType="next"
              onSubmitEditing={() => { this.Password.focus(); }}
              blurOnSubmit={false}
            />

            <View style={styles.containerInputPassword}>
              <TextInput
                label="Password"
                mode="flat"
                secureTextEntry={!this.state.passwordVisibility}
                numberOfLines={1}
                selectionColor={this.props.secondaryColor}
                style={styles.textInput}
                value={this.state.password}
                ref={(input) => { this.Password = input; }}
                blurOnSubmit
                onSubmitEditing={() => this.onPressLogin()}
                onChangeText={text => this.setState({ password: text })}
              />
              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.iconEye} onPress={() => this.togglePasswordVisibility()}>
                  <Image source={(this.state.passwordVisibility) ? require('../Assets/hide.png') : require('../Assets/show.png')} style={styles.iconEye} />
                </TouchableOpacity>
              </View>
            </View>

            <Button
              uppercase={false}
              // color={'#297AF9'}
              onPress={() => this.props.navigation.navigate('ForgotPassword', { companyData: this.state.companyData })}
            >
              Forgot Password?
              </Button>

            <Button
              color={'#727376'}
              // loading={this.state.reqesting}
              // disabled={this.state.reqesting}
              contentStyle={{ height: 45 }}
              style={styles.button}
              labelStyle={{ color: 'white', fontSize: 18, textAlign: 'center' }}
              mode="contained"
              uppercase={false}
              onPress={() => this.loginValidation()}
            >
              Sign in
                </Button>
                <View style={{alignItems: 'flex-end', justifyContent: 'center', width: '100%', }}>
            <Button
              uppercase={false}
              // color={'grey'}
              color={'#297AF9'}
            >
              Powered by Circular Angle
              </Button>
              </View>

           
            {
              this.state.loading == true ? <ActivityIndicator size={40} animating={true} color={Colors.blue800} style={{ top: 25 }} /> : null
            }


          </View>

        }

        {/* <Image style={styles.imgBottom} source={require('../Assets/login_bg.png')} /> */}
      </KeyboardAwareScrollView>
      // </ImageBackground>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    userData: (data) => dispatch(setUser(data))
  }
}

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    paddingLeft: contantPadding,
    paddingRight: contantPadding,
    paddingTop: contantPadding,
    flexGrow: 1,
    marginTop: 50,
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  imgTop: {
    top: 15,
    width: displayWidth - 3.5 * contantPadding,
    height: (displayWidth - 3.4 * contantPadding) / 3,
  },
  imgBottom: {
    bottom: 0,
    position: 'absolute',
    width: displayWidth,
    height: displayWidth / 2.18,
  },
  textWelcome: {
    fontSize: 34,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
    // color: Colors.blackText,
  },
  textInput: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    height: 45,
    borderRadius: 12,
    zIndex: 5,
    marginTop: 20
  },
  iconEye: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,

  },
  containerInputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});