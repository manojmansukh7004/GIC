/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  StyleSheet, Text, StatusBar, Image, Dimensions, Alert, Keyboard, ToastAndroid,View
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button, Divider } from 'react-native-paper';
import { UIActivityIndicator } from 'react-native-indicators';
import { forgotPassword } from '../Services/ForgotPasswordService';
const showToast = (Msg) => {
  ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft: contantPadding,
    paddingRight: contantPadding,
    paddingTop: contantPadding,
    flexGrow: 1,
    backgroundColor: '#FFFF'
  },
  imgTop: {
    marginTop: 50,
    width: displayWidth - 4.5 * contantPadding,
    height: (displayWidth - 4 * contantPadding) / 3,
  },
  imgBottom: {
    bottom: 0,
    position: 'absolute',
    width: displayWidth,
    height: displayWidth / 2.18,
  },
  textWelcome: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    // marginBottom: 20,
    // color: Colors.blackText,
  },
  textInput: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: 45,
    borderRadius: 12,
    zIndex: 5,
    marginTop: 20,
  },
  iconEye: {
    position: 'absolute',
    right: 0
  },
  containerInputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});

class ForgotPasswordScreen extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      loading: false,
      UserID: '',
    };
  }

  onPressSubmit = async () => {
    Keyboard.dismiss();
    const { UserID } = this.state;
    if (UserID) {
      var baseUrl = "http://gictimesheettest.orgtix.com/webApi"
      const response =  await forgotPassword(this.state.UserID, baseUrl);
      if (response) {
        if (response.SuccessList) {
          const msg = 'Password sent successfully to your Email.';
          showToast(msg)
          this.setState({ loading: false });
          this.props.navigation.navigate('Login')
        } else {
          const msg = 'Invalid user name';
          showToast(msg)
          this.setState({ loading: false });
        }
      } else {
        Alert.alert('Error', 'Something went wrong. Please try agian...');
      }
    } else {
      const msg = 'Please enter username or email.';
      showToast(msg)
      this.setState({ loading: false });
    }
  }


  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, }}
        contentContainerStyle={styles.container}
      >
        <StatusBar translucent barStyle="light-content" backgroundColor="#297AF9" />
        <Image style={styles.imgTop} source={require('../Assets/logo.jpg')} />
        <Text style={[styles.textWelcome,{marginBottom:  this.state.loading ==false ?40: 20}]}>Forgot Password</Text>
        {
        this.state.loading == true ? 
        <View style={{height:50}}>
        <UIActivityIndicator style={{}} color= "#297AF9" size= {50}/>
        </View>:null
      }
      
        <TextInput
          label="Username or email"
          mode="outlined"
          numberOfLines={1}
          value={this.state.UserID}
          style={styles.textInput}
          maxLength={6}
          onChangeText={text => this.setState({ UserID: text })}
          returnKeyType="next"
        />

        <Button
          color={'#727376'}
          contentStyle={{ height: 45 }}
          style={styles.button}
          labelStyle={{ color: 'white', fontSize: 16, textAlign: 'center' }}
          mode="contained"
          uppercase={false}
          onPress={() => this.setState({ loading: true },()=>{ this.onPressSubmit()})}
        >
          Send Mail
        </Button>
        <Divider style={{ margin: 30, width: '100%', borderWidth: .5, backgroundColor: '#297AF9', borderColor: "#297AF9" }} />
        <Text style={{ fontSize: 14 }}>Take a diffrent action.</Text>
        <Button
          contentStyle={{ height: 45 }}
          style={[styles.button]}
          labelStyle={{ color: 'white', fontSize: 16, textAlign: 'center' }}
          mode="contained"
          color={'#727376'}
          uppercase={false}
          disabled={this.state.loading}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          Log In
        </Button>

      </KeyboardAwareScrollView>
    );
  }
}


export default (ForgotPasswordScreen);
