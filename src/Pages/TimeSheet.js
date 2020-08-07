import React, { Component } from 'react';
import { ToastAndroid, Image, StatusBar, StyleSheet, SafeAreaView, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { FloatingAction } from "react-native-floating-action";
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { Dialog, SheetBottom, Avatar, Button, ListItem, Icon } from 'material-bread';
import moment from 'moment';
import { CreateNewTimesheet } from '../Services/CreateNewTimesheet'
import { GetEmpTimesheetList } from '../Services/GetEmpTimesheetList'
import { GetEmpWeeklyTimesheetData } from '../Services/GetEmpWeeklyTimesheetData'
import { color } from 'react-native-reanimated';

const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var firstDate = '', lastDate = '', firstDate1 = '', lastDate1 = ''
var lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
var TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
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
            timesheetVisible: false,
            calenderVisible: false,
            selectedDate: '',
            selectedWeek: '',
            lblMon: "",
            lblTue: "",
            lblWed: "",
            lblThu: "",
            lblFri: "",
            lblSat: "",
            lblSun: "",
            dvTotMon: "",
            dvTotTue: "",
            dvTotWed: "",
            dvTotThu: "",
            dvTotFri: "",
            dvTotSat: "",
            dvTotSun: "",
            TotalTime: "0.00",
            timesheetList: [],
            attendanceData: [],
            timesheetData: [],
            ratingName: [],
            headerData: [],
            headerHrsData: [],
        }
    }

    handleCalenderStatus = (status) => {
        // console.log("staffffffffffffffffffffff",status);

        this.setState({ calenderVisible: status })
    }

    onDateChange = (date) => {
        var properDate = new Date(date).toJSON().slice(0, 10).split('-').reverse().join('-')
        console.log("selectedDate", properDate);

        this.setState({
            selectedDate: properDate,
            dateVisible: false,
        }, () => {
            this.createTimesheet()
        });
    }

    createTimesheet = async () => {
        var data = await CreateNewTimesheet(this.props.user, this.state.selectedDate, this.props.baseUrl)
        if (data != null && data != "") {
            // if (data.ErrMsg != null && data.ErrMsg != "") {
            //     alert(data.ErrMsg);
            // }
            // else 
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {

                if (data.SuccessList != undefined) {
                    showToast("Timesheet for the selected date Added successfully.")
                    this.empTimesheetList();
                }
                else {
                    showToast("Timesheet for the selected date already exists.")

                }
            }
        }
    }

    empTimesheetList = async () => {
        var timesheetList = await GetEmpTimesheetList(this.props.user, this.props.baseUrl)
        this.setState({
            timesheetList: timesheetList.EmpTimesheetList[0],
        });
    }

    empWeeklyTimesheetData = async () => {
        var timesheetData = await GetEmpWeeklyTimesheetData(this.props.user, this.state.selectedWeek.Value, this.props.baseUrl)
        this.setState({
            attendanceData: timesheetData.EmpAttendanceData[0],
            timesheetData: timesheetData.EmpTimesheetData[0],
            ratingName: timesheetData.RatingName[0],
            headerData: timesheetData.TimesheetHeaderData[0],
            headerHrsData: timesheetData.TimesheetTotalHrs[0],
        }, () => {
            this.setTimesheetData();
        });
    }

    setTimesheetData = () => {
        lblMon = "Mon, " + moment(new Date(this.state.headerData[0].Mon_Date)).format("DD"),
            lblTue = "Tue, " + moment(new Date(this.state.headerData[0].Tue_Date)).format("DD"),
            lblWed = "Wed, " + moment(new Date(this.state.headerData[0].Wed_Date)).format("DD"),
            lblThu = "Thu, " + moment(new Date(this.state.headerData[0].Thu_Date)).format("DD"),
            lblFri = "Fri, " + moment(new Date(this.state.headerData[0].Fri_Date)).format("DD"),
            lblSat = "Sat, " + moment(new Date(this.state.headerData[0].Sat_Date)).format("DD"),
            lblSun = "Sun, " + moment(new Date(this.state.headerData[0].Sun_Date)).format("DD"),
            dvTotMon = this.state.headerHrsData[0].Mon_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Mon_TotalTime),
            dvTotTue = this.state.headerHrsData[0].Tue_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Tue_TotalTime),
            dvTotWed = this.state.headerHrsData[0].Wed_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Wed_TotalTime),
            dvTotThu = this.state.headerHrsData[0].Thu_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Thu_TotalTime),
            dvTotFri = this.state.headerHrsData[0].Fri_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Fri_TotalTime),
            dvTotSat = this.state.headerHrsData[0].Sat_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Sat_TotalTime),
            dvTotSun = this.state.headerHrsData[0].Sun_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Sun_TotalTime),
            TotalTime = this.state.headerHrsData[0].TotalTime == null ? "0:00" : (this.state.headerHrsData[0].TotalTime);
        console.log(lblMon, dvTotMon, TotalTime);
        this.setState({
            lblMon: lblMon, lblTue: lblTue,
            lblWed: lblWed, lblThu: lblThu,
            lblFri: lblFri, lblSat: lblSat, lblSun: lblSun,
            dvTotMon: dvTotMon, dvTotTue: dvTotTue,
            dvTotWed: dvTotWed, dvTotThu: dvTotThu,
            dvTotFri: dvTotFri, dvTotSat: dvTotSat,
            dvTotSun: dvTotSun, TotalTime: TotalTime
        });

    }

    componentDidMount() {
        this.empTimesheetList()
    }

    render() {
        const startDate = this.state.selectedDate ? this.state.selectedDate.toString() : '';

        return (
            <View style={[styles.Container, {}]}>
                <StatusBar translucent barStyle="light-content" backgroundColor="#297AF9" />

                <View style={{ height: "7%", backgroundColor: this.props.primaryColor }}>
                    <Appbar1 navigation={this.props.navigation}
                        title={"My Timesheet"}
                        calenderVisible={this.state.calenderVisible}
                        handleCalenderStatus={this.handleCalenderStatus}
                    />
                </View>

                <View style={{ height: "90%", backgroundColor: this.props.secColor }}>
                    {/* this.state.timesheetVisible== true ? "80%" */}
                    <ScrollView style={{ flex: 1 }}
                        scrollEnabled={this.state.content}
                    >
                        <View style={{ width: '100%' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                                <View style={{ bottom: 3, margin: 5, }}>
                                    {
                                        this.state.timesheetVisible == true ?
                                            <Text style={styles.totalHrs}> {"Total Hours - " + this.state.TotalTime}</Text>
                                            : null
                                    }
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ weekVisible: true })}
                                    style={{ flexDirection: 'row', width: 200, justifyContent: 'center', alignItems: 'center', bottom: 3, borderWidth: 1, margin: 5, borderRadius: 3, borderColor: 'white' }}>
                                    <Image style={{ height: 20, width: 20, marginLeft: 5, tintColor: 'white' }} source={require("../Assets/calendar.png")} />
                                    <Text style={styles.text}> {firstDate1 == '' ? "Select Week" : firstDate1 + " - " + lastDate1}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                {
                                    this.state.timesheetVisible == true ?
                                        <TouchableOpacity onPress={() => console.log("Add row")}
                                            style={styles.saveButton}>
                                            <Text style={styles.text}> {"Add Row"}</Text>
                                        </TouchableOpacity> : null
                                }

                                {
                                    this.state.timesheetData.length !== 0 ?
                                        <>
                                            <TouchableOpacity onPress={() => alert("Save")}
                                                style={styles.saveButton}>
                                                <Text style={styles.text}> {"Save"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => alert("Submit")}
                                                style={styles.saveButton}>
                                                <Text style={styles.text}> {"Submit"}</Text>
                                            </TouchableOpacity>
                                        </> : null
                                }
                            </View>




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
                                <View style={{ borderWidth: .3, marginRight: 20, padding: 10, borderRadius: 3, height: 280, bottom: 20 }}>
                                    <Text style={{ fontSize: cardTitle, }}>Select Week</Text>
                                    <Divider style={{ marginLeft: 5, marginRight: 5, marginBottom: 10 }} />

                                    <FlatList
                                        data={Object.keys(this.state.timesheetList)}
                                        renderItem={({ item, index }) => (

                                            <TouchableOpacity onPress={() => {
                                                this.setState({ selectedWeek: this.state.timesheetList[item], weekVisible: false, timesheetVisible: true },
                                                    () => {
                                                        console.log("selectedWeek", this.state.selectedWeek),
                                                            firstDate1 = moment(new Date(this.state.selectedWeek.Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                            lastDate1 = moment(new Date(this.state.selectedWeek.Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                            this.empWeeklyTimesheetData()
                                                    })
                                            }}
                                                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                                <View>
                                                    <Text style={styles.textPopup}>
                                                        {
                                                            firstDate = moment(new Date(this.state.timesheetList[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                            lastDate = moment(new Date(this.state.timesheetList[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                            console.log(firstDate, lastDate)
                                                        }
                                                        {firstDate.toUpperCase() + " - " + lastDate.toUpperCase()}
                                                    </Text>
                                                    <Divider />
                                                </View>
                                            </TouchableOpacity>)}
                                    />
                                </View>
                            </Dialog>

                            <View style={{ flex: 1 }}>
                                <SheetBottom
                                    visible={this.state.calenderVisible}
                                    style={{ backgroundColor: this.props.primaryColor }}
                                    onBackdropPress={() => this.setState({ calenderVisible: false })}
                                    onSwipeDown={() => this.setState({ calenderVisible: false })}>
                                    {/* <View style={{backgroundColor: this.props.backgroundColor}}> */}
                                    <CalendarPicker
                                        onDateChange={this.onDateChange}
                                        startFromMonday={true}
                                        maxDate={new Date()}
                                        width={350}
                                        height={400}
                                        textStyle={{ fontSize: 16, color: 'white' }}
                                        todayBackgroundColor={'tomato'}
                                    />
                                    {/* </View> */}
                                </SheetBottom>
                            </View>



                        </View>
                    </ScrollView>
                    <FloatingAction
                        actions={actions}
                        animated={true}
                        position={"right"}
                        // distanceToEdge={20 }
                        onPressItem={position => {
                            position == 'Select Week' ?
                                this.setState({ weekVisible: true }) :
                                this.setState({ dateVisible: true })

                        }}
                    />
                </View>
                {/* {
                    this.state.timesheetVisible == true ?
                        <View style={{ height: "10%", }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => console.log("Add Row")}>
                                    <Text style={styles.buttonText}>Add Row</Text>
                                </TouchableOpacity>
                                {
                                    this.state.timesheetData.length !==0 ?
                                <>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => console.log("Save")}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}
                                    onPress={() => console.log("Submit")
                                    }>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                </>:null
                            }
                            </View>
                        </View> : null
                } */}

            </View>
            // <View style={[styles.Container, { backgroundColor: this.props.backgroundColor }]}>
            //     {/* <StatusBar translucent barStyle="dark-content" backgroundColor="white" /> */}
            //     <View style={{height: "8%"}}>
            //         <Appbar1 navigation={this.props.navigation} title={" TIMESHEET "} />
            //     </View>
            //     <View style={{height: "80%", backgroundColor:'pink'}}>

            //     </View>

            /* <SafeAreaView style={[styles.Container, { backgroundColor: this.props.backgroundColor }]}>
                <Appbar1 navigation={this.props.navigation} title={" TIMESHEET "} />

                <ScrollView style={{ flex: 1 }}
                    scrollEnabled={this.state.content}
                >
                    <View style={{width: '90%',backgroundColor:'red'}}>
                    {

                        this.state.timesheetVisible == true ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.totalHrs}> {"Total Hours - " + this.state.TotalTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: .3, margin: 5, borderRadius: 3, backgroundColor: 'white' }}>
                                    <Image style={{ height: 20, width: 20, marginLeft: 5, tintColor: 'black' }} source={require("../Assets/calendar.png")} />
                                    <Text style={styles.text}> {firstDate1.toUpperCase() + " - " + lastDate1.toUpperCase()}</Text>
                                </View>
                            </View> : null
                    }
                   

                
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
                        <View style={{ borderWidth: .3, marginRight: 20, padding: 10, borderRadius: 3, height: 280, bottom: 20 }}>
                            <Text style={{ fontSize: cardTitle, }}>Select Week</Text>
                            <Divider style={{ marginLeft: 5, marginRight: 5, marginBottom: 10 }} />

                            <FlatList
                                data={Object.keys(this.state.timesheetList)}
                                renderItem={({ item, index }) => (

                                    <TouchableOpacity onPress={() => {
                                        this.setState({ selectedWeek: this.state.timesheetList[item], weekVisible: false, timesheetVisible: true },
                                            () => {
                                                console.log("selectedWeek", this.state.selectedWeek),
                                                    firstDate1 = moment(new Date(this.state.selectedWeek.Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                    lastDate1 = moment(new Date(this.state.selectedWeek.Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                    this.empWeeklyTimesheetData()
                                            })
                                    }}
                                        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                        <View>
                                            <Text style={styles.textPopup}>
                                                {
                                                    firstDate = moment(new Date(this.state.timesheetList[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                    lastDate = moment(new Date(this.state.timesheetList[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                    console.log(firstDate, lastDate)
                                                }
                                                {firstDate.toUpperCase() + " - " + lastDate.toUpperCase()}
                                            </Text>
                                            <Divider />
                                        </View>
                                    </TouchableOpacity>)}
                            />
                        </View>
                    </Dialog>
                  

                    </View>
                </ScrollView>

                <FloatingAction
                    actions={actions}
                    onPressItem={position => {
                        position == 'Select Week' ?
                            this.setState({ weekVisible: true }) :
                            this.setState({ dateVisible: true })

                    }}
                />
                
            // </SafeAreaView > */

            // {/* </View > */}
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        baseUrl: state.baseUrl,
        primaryColor: state.primaryColor,
        secColor: state.secColor,

    }
}
export default connect(mapStateToProps)(TimeSheet)

const styles = StyleSheet.create({
    Container: {

        flex: 1,
        display: 'flex',
        top: "3%",
        width: '100%',
        height: '100%',

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
        fontSize: 16,
        padding: 5,
        color: 'white'

    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "31%",
        bottom: 3,
        borderWidth: .3,
        margin: 5,
        borderRadius: 3,
        backgroundColor: '#424543'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 17,
        top: 3,

        // color: 'white'
        // color: 'blue',
        // backgroundColor:'red'
    },
    totalHrs: {
        textAlign: 'left',
        fontWeight: '500',
        fontSize: title,
        margin: 5,
        color: "white"
    },
    textPopup: {
        padding: 3,
        fontSize: cardDate,
        // margin: 5,
        marginLeft: 15,
    },
    button: {
        width: '32%',
        borderWidth: 1,
        padding: 3,
        borderColor: '#C1C0B9',
        borderRadius: 5,
        height: 40,
        margin: 6,
        backgroundColor: "white"
    },
});