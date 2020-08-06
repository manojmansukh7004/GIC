import React, { Component } from 'react';
import { ToastAndroid, StatusBar, StyleSheet, SafeAreaView, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Divider, Card } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { FloatingAction } from "react-native-floating-action";
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { Dialog, Avatar, Ripple } from 'material-bread';
import moment from 'moment';
import { CreateNewTimesheet } from '../Services/CreateNewTimesheet'
import { GetEmpTimesheetList } from '../Services/GetEmpTimesheetList'
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.SHORT);
};
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var tempDate = '', firstDate = '', lastDate = ''
const actions = [

    {
        text: "Select Week",
        icon: require("../Assets/calendar.png"),
        name: "Select Week",
        position: 1
    },
    {
        text: "Select Date",
        icon: require("../Assets/calendar.png"),
        name: "Select Date",
        position: 2
    },

];
class TimeSheet extends Component {

    constructor(props) {
        super(props)
        this.state = {

            loading: true,
            count: 0,
            content: true,
            dateVisible: false,
            weekVisible: false,
            selectedDate: '',
            selectedWeek: '',
            timesheetList: [],
        }
    }

    onDateChange = (date) => {
        // console.log(date);

        // console.log("daaaaaa", new Date(date).toJSON().slice(0, 10).split('-').reverse().join('-'));
        var properDate = new Date(date).toJSON().slice(0, 10).split('-').reverse().join('-')
       console.log("selectedDate", properDate);
       
        this.setState({
            selectedDate: properDate,
            dateVisible:false,
        },()=>{
            this.createTimesheet()
        });
    }

    createTimesheet = async()=>{
        var data = await CreateNewTimesheet(this.props.user,this.state.selectedDate,this.props.baseUrl)
        if (data != null && data != "") {
            // if (data.ErrMsg != null && data.ErrMsg != "") {
            //     alert(data.ErrMsg);
            // }
            // else 
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {

                if (data.SuccessList != undefined) {
                    showToast("Timesheet for the selected date Added successfully..")
                    this.empTimesheetList();
                }
                else{
                    showToast("Timesheet for the selected date already exists...")

                }
            }
        }
    }

    empTimesheetList = async () => {
        timesheetList = await GetEmpTimesheetList(this.props.user, this.props.baseUrl)
        this.setState({
            timesheetList: timesheetList.EmpTimesheetList[0],
        });
    }

    componentDidMount() {
        this.empTimesheetList()
    }

    render() {
        const startDate = this.state.selectedDate ? this.state.selectedDate.toString() : '';

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent barStyle="dark-content" backgroundColor="#e7ebee" />

                <SafeAreaView style={styles.Container}>
                    <Appbar1 navigation={this.props.navigation} title={" TIMESHEET "} />

                    <ScrollView style={{ flex: 1 }}
                        scrollEnabled={this.state.content}
                    >
                        <Card style={styles.card}>
                            <Text style={styles.text}> Default Dashboard not available.</Text>
                            <Text style={styles.text}> Please select other dashboard, if available in menu .</Text>
                        </Card>


                        <Dialog
                            visible={this.state.dateVisible}
                            onTouchOutside={() =>
                                this.setState({ dateVisible: false })}
                            style={
                                {
                                    width: 600,
                                    height: 350,
                                }
                            }
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', right: 10 }}>
                                <CalendarPicker
                                    onDateChange={this.onDateChange}
                                    startFromMonday={true}
                                    maxDate={new Date()}
                                    width={350}
                                    height={400}
                                />
                            </View>
                        </Dialog>

                        <Dialog
                            visible={this.state.weekVisible}
                            onTouchOutside={() => this.setState({ weekVisible: false })}
                            // title={'\tSelect Week'}
                            style={
                                {
                                    justifyContent: 'center',
                                    width: 280,
                                    height: 350,
                                }
                            }
                        >
                            {/* <Text>Select WeeK</Text> */}
                            <View style={{ borderWidth: .3, marginRight: 20, padding: 10, borderRadius: 3, height: 280, bottom: 20 }}>
                                <Text style={{ fontSize: cardTitle, }}>Select Week</Text>
                                <Divider style={{ marginLeft: 5, marginRight: 5, marginBottom: 10 }} />

                                <FlatList
                                    data={Object.keys(this.state.timesheetList)}
                                    renderItem={({ item, index }) => (

                                        <TouchableOpacity onPress={() => { this.setState({ selectedWeek: this.state.timesheetList[item].Text,  weekVisible: false },()=>{showToast("Week Selected..")}) }}
                                            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                            <View>
                                                <Text style={styles.textPopup}>
                                                    {
                                                        firstDate = moment(new Date(this.state.timesheetList[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                        lastDate = moment(new Date(this.state.timesheetList[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                        console.log(firstDate, lastDate)
                                                    }
                                                    {firstDate.toUpperCase() + " To " + lastDate.toUpperCase()}
                                                </Text>
                                                <Divider/>
                                            </View>
                                        </TouchableOpacity>)}
                                />
                            </View>
                        </Dialog>

                    </ScrollView>

                    <FloatingAction
                        actions={actions}
                        onPressItem={position => {
                            position == 'Select Week' ?
                                this.setState({ weekVisible: true }) :
                                this.setState({ dateVisible: true })

                        }}
                    />

                </SafeAreaView >

            </SafeAreaView >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        baseUrl: state.baseUrl

    }
}
export default connect(mapStateToProps)(TimeSheet)

const styles = StyleSheet.create({
    Container: {

        // flex: 1,
        display: 'flex',
        marginTop: 20,
        width: '100%',
        height: '100%',
        backgroundColor: "white"

    },
    Title: {
        fontSize: 20,
        margin: 5,
        top: 3,
        marginLeft: 10,
        justifyContent: 'center'
        // fontWeight:'bold'
    },

    card: {
        padding: 9,
        borderRadius: 5,
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#C1C0B9',
        top: 3,
        // height: 350,
        // backgroundColor:'pink'
    },

    text: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: 16
    },
    textPopup: {
        padding: 3,
        fontSize: cardDate,
        // margin: 5,
        marginLeft: 15,

    },
});