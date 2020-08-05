import React, { Component } from 'react';
import { View, PermissionsAndroid, AsyncStorage, Image, StyleSheet, Dimensions } from 'react-native';
import { Dialog, Avatar, Button } from 'material-bread';
import { Title, Paragraph, Text, Headline, Caption } from 'react-native-paper';
import { onSignOut } from "./Authentication";
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
          size={40}
          content={this.state.empName == '' ? null : (this.state.empName).charAt(0)}
          color={this.randomColor()}
          onPress={() => this.setState({ visible: !this.state.visible })}
        />
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          style={
            {
              width: 400,
            }
          }
        >

          <Paragraph style={{ fontSize: 20, fontWeight: 'bold' }}>
            {"Confirm SignOut"}
          </Paragraph>
          <Paragraph style={{ marginTop: 10, fontSize: 16 }}>
            {"  Are you sure want to SignOut ?"}
          </Paragraph>

          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: 'row',
              paddingVertical: 20
            }}
          >
            <Button
              text={'cancel'}
              onPress={() => this.setState({ visible: false })}
            />
            <Button
              text={'Sign out'}
              onPress={() => onSignOut().then(() =>
                this.setState({ visible: false }),
                this.props.navigation.navigate('SplashScreen')
              )}
            />
          </View>
        </Dialog>
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