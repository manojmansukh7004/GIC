import React, { Component } from 'react';
import {
    ToastAndroid,Text, View, StyleSheet, Picker, TouchableOpacity, Image, FlatList, ScrollView, StatusBar,TextInput
} from 'react-native';
import {  Divider, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';

import Appbar from '../Component/AppBar'
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
class ProjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
   
    async componentDidMount() {
        this.setState({
            // timesheetId: this.props.navigation.state.params.timesheetId,
            headerData: this.props.navigation.state.params.headerData
        });
    }

    render() {
        console.log("date",this.state.client);
        
        return (
            <View>
                
                <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
                <View style={{ height: "100%", width: '100%', top: '3%' }}>
                    <View style={{ height: '7%', backgroundColor: this.props.primaryColor, }}>
                        <Appbar navigation={this.props.navigation}
                            title={"Project Detail"}
                        />
                    </View>
                    <View style={{ height: '90%', backgroundColor: this.props.secColor }}>
                        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                            <Text>Mj</Text>

                        </KeyboardAwareScrollView>
                    </View>

                </View>


            </View>
        )
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
export default connect(mapStateToProps)(ProjectDetail)
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F9F9F9',
        paddingBottom: 10,
        flexGrow: 1
    },
    cards: {
        elevation: 3,
        borderRadius: 5,
        marginTop: 15,
        width: "48%"
    },
    cardContainer: { backgroundColor: 'white', height: 20, fontSize: 16 },
    singleCardLabel: {
        fontSize: 14,
        // color: '#F2721C',
        paddingStart: 8
    },
    twoCardLabel: {
        fontSize: 14,
        // color: '#F2721C',
        paddingStart: 12
    },
    pickers: { height: 20 },
    horizontalContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    cardMenuSpasing: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 5
    },
    twoCardsMenuSpacing: {
        flexDirection: 'column',
        paddingStart: 2,
        paddingTop: 10,
        paddingBottom: 10
    },
    descCard: {
        width: '100%',
        elevation: 3,
        borderRadius: 5,
        marginTop: 15
    },
    longText: { backgroundColor: 'white', fontSize: 16, marginEnd: 10, padding: 10 },
    reasonView: { paddingStart: 3, padding: 10, },
    timeView: { padding: 10, flexDirection: 'row' },
    sheetData: {
        padding: 10,
        // height: 70,
        width: 75,
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
        // right: 4,
        // backgroundColor:'red'
    },
    hrsData: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#FFFF'
    },
    textPopup: {
        padding: 3,
        fontSize: cardDate,
        // margin: 5,
        marginLeft: 15,
    },
})