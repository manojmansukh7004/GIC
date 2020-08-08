import React, { Component } from 'react';
import { ToastAndroid, TextInput, Image, StatusBar, StyleSheet, SafeAreaView, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, } from 'react-native-paper';
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
var descField= '', descIndex= ''
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
            addDescVisible: false,
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
            addDesc: "",
            addDescField:'',
            addDescIndex:'',
            TotalTime: "0.00",
            statusBarColor: "#297AF9",
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

    handleAddDescription = ( ) => {
        console.log("desssss", this.state.addDescField, this.state.addDescIndex, this.state.addDesc,  );
        
        let addDescField= this.state.addDescField
        let index= this.state.addDescIndex
        let value= this.state.addDesc

        let { timesheetData } = this.state;
        let targetPost = timesheetData[index];

        console.log("GGgg", value,targetPost.addDescField);
        if( addDescField ==1){
            targetPost.Mon_TaskComments= value;
        }
        else if( addDescField ==2){
            targetPost.Tue_TaskComments= value;
        }
        else if( addDescField ==3){
            targetPost.Wed_TaskComments= value;
        }
        else if( addDescField ==4){
            targetPost.Thu_TaskComments= value;
        }
        else if( addDescField ==5){
            targetPost.Fri_TaskComments= value;
        }
        else if( addDescField ==6){
            targetPost.Sat_TaskComments= value;
        }
        else if( addDescField ==7){
            targetPost.Sun_TaskComments= value;
        }
        this.setState({ timesheetData}, () => { console.log("ddddddddddddd", timesheetData[0]) }
        );
    }

    componentDidMount() {
        this.empTimesheetList()
        // this.setState({statusBarColor: "#297AF9"})
    }

    render() {
        const startDate = this.state.selectedDate ? this.state.selectedDate.toString() : '';

        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.state.statusBarColor} />

                <View style={[styles.Container, {}]}>

                    <View style={{ height: "7%", backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"My Timesheet"}
                            calenderVisible={this.state.calenderVisible}
                            handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={{ height: "90%", backgroundColor: " this.props.secColor" }}>
                        {/* this.state.timesheetVisible== true ? "80%" */}
                        {
                            this.state.timesheetVisible == true ?
                                <>
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

                                </> : null
                        }
                        <ScrollView style={{ flex: 1 }}
                            // horizontal={true}
                            scrollEnabled={this.state.content}
                        >
                            <View style={{ width: '100%' }}>

                                <View style={{ flexDirection: 'row', marginLeft: 5,}}>
                                    <View style={{ flexDirection: 'column', }}>
                                        <View style={[styles.sheetHeader, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                                            <Text style={{ fontSize: 18, fontWeight: '900' }}>{"Project"}</Text>
                                            <Text style={{ fontSize: 16 }}>{"  (Client)"}</Text>

                                        </View>
                                        {
                                            this.state.timesheetData.length !== 0 ?
                                                <View style={{ flexDirection: 'row', }}>
                                                    <FlatList
                                                        data={Object.keys(this.state.timesheetData)}
                                                        renderItem={({ item }) => (
                                                            <View style={styles.sheetData1}>
                                                                <Text style={{ fontSize: 18, fontWeight: '900' }}>{this.state.timesheetData[item].ProjectName}</Text>
                                                                <Text>{"  (" + this.state.timesheetData[item].ClientName + ")"}</Text>
                                                            </View>
                                                        )}
                                                    />
                                                </View> : null
                                        }
                                    </View>

                                    <ScrollView style={{}}
                                        horizontal={true}
                                        scrollEnabled={this.state.content}
                                    >
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{  flexDirection: 'row', height: 60, marginBottom: 10 }}>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblMon}</Text>
                                                    <Text>{this.state.dvTotMon}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblTue}</Text>
                                                    <Text>{this.state.dvTotTue}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblWed}</Text>
                                                    <Text>{this.state.dvTotWed}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblThu}</Text>
                                                    <Text>{this.state.dvTotThu}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblFri}</Text>
                                                    <Text>{this.state.dvTotFri}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblSat}</Text>
                                                    <Text>{this.state.dvTotSat}</Text>
                                                </View>
                                                <View style={styles.sheetData}>
                                                    <Text>{this.state.lblSun}</Text>
                                                    <Text>{this.state.dvTotSun}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <FlatList
                                                    data={Object.keys(this.state.timesheetData)}
                                                    renderItem={({ item, index }) => (
                                                        <View style={{ flexDirection: 'row', marginRight: 5 }}>

                                                            <View style={styles.sheetData}>
                                                                <TouchableOpacity style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Mon}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Mon_TaskComments, addDescField: 1, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Tue}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Tue_TaskComments, addDescField: 2, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Wed}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Wed_TaskComments, addDescField: 3, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Thu}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Thu_TaskComments, addDescField: 4, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Fri}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Fri_TaskComments, addDescField: 5, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Sat}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Sat_TaskComments, addDescField: 6, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.sheetData}>
                                                                <View style={styles.hrsData}>
                                                                    <Text>{this.state.timesheetData[item].Sun}</Text>
                                                                </View>
                                                                <TouchableOpacity onPress={() =>  
                                                                this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Sun_TaskComments, addDescField: 7, addDescIndex: index},
                                                                    ()=>{ })}>
                                                                    <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )}
                                                />

                                            </View>
                                        </View>

                                    </ScrollView>
                                </View>

                                <Dialog
                                    visible={this.state.addDescVisible}
                                    style={{ backgroundColor: 'white', height: 250, width: 350 }}
                                    onTouchOutside={() => this.setState({ addDescVisible: false },()=>{this.handleAddDescription()})}
                                    // title={'Additional Description'}

                                    actionItems={[
                                        {
                                            text: 'Cancel',
                                            onPress: () => this.setState({ visible: false }),
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => this.setState({ visible: false }),
                                        },
                                    ]}
                                >
                                    <View style={{ backgroundColor: 'white', height: 300, width: 400, bottom: 25, right: 25 }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Description'}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', right: 25 }}>
                                            <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                <TextInput
                                                    multiline={true}
                                                    value={this.state.addDesc}
                                                    onChangeText={value=>this.setState({addDesc: value})}
                                                    // onChangeText={value => this.handleAddDescription({ value})}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Dialog>

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
                            color={this.props.primaryColor}
                            // distanceToEdge={20 }
                            onPressItem={position => {
                                position == 'Select Week' ?
                                    this.setState({ weekVisible: true }) :
                                    this.setState({ calenderVisible: true })
                            }}
                        />
                    </View>


                </View>
            </>







        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        baseUrl: state.baseUrl,
        fontColor: state.fontColor,
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
    sheetHeader: {
        padding: 10,
        borderWidth: .3,
        height: 70,
        width: "auto",
        marginTop: 5,
        // marginBottom: 5,
    },
    sheetData1: {
        padding: 10,
        height: 70,
        width: "auto",
        // marginTop: 4,
        marginBottom: 10,
        borderWidth: .3,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    sheetData: {
        padding: 10,
        height: 70,
        width: 75,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hrsData: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
});