import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux'
import { Title, } from 'react-native-paper';

class AppBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backNavigation:'',
    }
  }

  async componentDidMount() {
    console.log("navvvvv",this.props.navigation.state.params.backNavigation);
    
    this.setState({

      backNavigation: this.props.navigation.state.params.backNavigation,
    })
  }


  render() {

    return (
 
      <View style={styles.subContiner1}>

        <View style={{ flexDirection: 'row', width: "75%",height:'100%',}}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "10%", marginLeft: 5 }}>
            <TouchableOpacity onPress={() =>
            this.props.title == "Timesheet Entry"? this.props.navigation.navigate('TimeSheet',{"Loading": false}):
            this.props.title == "Edit Timesheet Entry"? this.props.navigation.navigate('TimeSheet',{"Loading": false}):
            this.props.title == "Project Details"? this.state.backNavigation=="TsApproval"? this.props.navigation.navigate('TsApproval',{"Loading": false}): this.props.navigation.navigate('TimeSheet',{"Loading": false}): 
            null
          }>
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
        <View style={{ width: "25%",flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',  }}>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            {
              this.props.timeSheetEntry == true ?
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', borderWidth: .8, borderRadius:3, borderColor: '#FFFF'}}
                  onPress={() => { this.props.handleSave() }}>
                  <Text style={{ color: this.props.fontColor, padding:5, marginLeft:5, marginRight:5 }}>{"SAVE"}</Text>
                </TouchableOpacity> : null
            }
            {
              this.props.details == true ?
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center',padding:15,width: 40, height: 30,top:3,marginRight:15 }}
                  onPress={() => { this.props.handleEditRecord() }}>
                  <Image
                    source={require('../Assets/edit.png')}
                    style={{ width: 22, height: 22, top:5, tintColor: 'white', padding:10, position:'absolute' }}
                  />
                </TouchableOpacity> : null
            }
            {
              this.props.details == true ?
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center' , }}
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
    flex:1,
    flexDirection: 'row',
    height: "100%",
  },
  img: {
    width: 25,
    height: 25,
    margin: 3,
    tintColor: '#FFFF'
  },

});