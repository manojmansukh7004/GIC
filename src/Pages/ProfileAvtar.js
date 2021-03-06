import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Image, StyleSheet, Dimensions } from 'react-native';
import { Dialog, Avatar, Button } from 'material-bread';
import { Title, Paragraph, Text, Headline, Caption } from 'react-native-paper';
import { onSignOut } from "./Authentication";
import Modal from 'react-native-modal';
// import { storeProfileImage, removeUserId } from '../Services/FireBaseDb'
import { storeData, getData } from '../Config/AsyncStorace'
const displayWidth = Dimensions.get('window').width;
const contantPadding = 30;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    noData: true,

  },
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empName: '',
      ProfileImage: null,
      visible: false,
    };
  }

  randomColor = () => {
    let colorArray = [
      '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
      '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
      '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
    ];
    let random = Math.floor(Math.random() * colorArray.length);
    return colorArray[random];
  }

  async componentDidMount() {

    var EmpName = await getData("UserName")
    this.setState({
      empName: EmpName,
    });

  }

  render() {

    return (
      <>
        <Avatar
          type={"text"}
          size={30}
          content={this.state.empName == '' ? null : (this.state.empName).charAt(0)}
          color={this.randomColor()}
          onPress={() => this.setState({ visible: !this.state.visible })}
        />
        {/* <Dialog
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          style={
            {
              width: 400,
              // height:200
            }
          }
        >

          <Text style={{ fontSize: 20, marginBottom:5 }}>
            {"Sign Out"}
          </Text>
          <Paragraph style={{  fontSize: 16 }}>
            {"  \t\tAre you sure you want to SignOut ?"}
          </Paragraph>

          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: 'row',
              paddingVertical: 20,
              
            }}
          >
            <Button
              text={'cancel'}
              style={{borderWidth: .3,margin:5, marginRight:5}}
              onPress={() => this.setState({ visible: false })}
            />
            <Button
              text={'Sign out'}
              style={{borderWidth: 1,margin:5, borderColor: 'red'}}
              onPress={() => onSignOut().then(() =>
                this.setState({ visible: false }),
                this.props.navigation.navigate('SplashScreen')
              )}
            />
          </View>
        </Dialog> */}
        <Modal isVisible={this.state.visible}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, width: 280, height: 150 }}>
              <View style={{  height: 100, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{fontSize: 18, fontWeight: '900', color: "#4D504F" }}> Are you sure you want to</Text>
              <Text style={{fontSize: 18, fontWeight: '900', color:  "#4D504F"}}> logout?</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: 'row',
                  height: 50
                }}
              >
                <TouchableOpacity onPress={() => this.setState({ visible: false })}
                  style={{ width: '50%', borderRightWidth:.5,borderTopWidth: .5, heigt: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text style={{fontSize: 16, fontWeight: '900', color:  "#297AF9"}}> Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onSignOut().then(() =>
                    this.setState({ visible: false }),
                    this.props.navigation.navigate('SplashScreen')
                  )}
                  style={{ width: '50%',borderTopWidth: .5, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{fontSize: 16, fontWeight: '900', color:  "#297AF9"}}> Logout</Text>
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({

  imgTop: {
    marginBottom: 15,
    width: 200,
    height: 80,
  }
})