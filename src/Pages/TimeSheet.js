import React, { Component } from 'react';
import { ToastAndroid, TextInput, Image, StatusBar, StyleSheet, Picker, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { FloatingAction } from "react-native-floating-action";
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { Dialog, SheetBottom } from 'material-bread';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { CreateNewTimesheet } from '../Services/CreateNewTimesheet'
import { GetEmpTimesheetList } from '../Services/GetEmpTimesheetList'
import { GetEmpWeeklyTimesheetData } from '../Services/GetEmpWeeklyTimesheetData'
import { saveTimesheetEntry } from '../Services/saveTimesheetEntry'
import { CheckPreviousEmpTSStatus } from '../Services/CheckPreviousTSStatus'
import { setTsId } from '../Redux/Action'
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var firstDate = '', lastDate = '', firstDate1 = '', lastDate1 = ''
var descField = '', descIndex = '', dayField = '', dayIndex = ''
var lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
var TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
var timesheetID = '', clientCode = '', projectCode = '', typeofWorkId = '', phaseId = '', activityId = '', workOrderId = '', taskDesc = '', status = '', duration = '', dailyTaskComments = '', date = '', autoId = '', status = ''

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
            timeVisible: false,
            weekVisible: false,
            timesheetVisible: false,
            calenderVisible: false,
            addDescVisible: false,
            isTimePickerVisible: false,
            show: false,
            selectedDate: '',
            selectedWeek: '',
            timesheetId: '',
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
            addDescField: '',
            addDescIndex: '',
            dayField: '',
            dayIndex: '',
            selectedTime: '',
            timeSheetStatus: '',
            TotalTime: "0.00",
            statusBarColor: "#297AF9",
            timesheetList: [],
            empAttendanceData: [],
            timesheetData: [],
            ratingData: [],
            headerData: [],
            headerHrsData: [],
            selectedService: '00:05'
        }
    }

    handleCalenderStatus = (status) => {
        this.setState({ calenderVisible: status })
    }

    onDateChange = (date) => {
        var properDate = new Date(date).toJSON().slice(0, 10).split('-').reverse().join('-')
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
                    showToast("Timesheet Added successfully.")
                    this.empTimesheetList();
                }
                else {
                    showToast("Timesheet already exists.")

                }
            }
        }
    }



    handleAddDescription = () => {

        let addDescField = this.state.addDescField
        let index = this.state.addDescIndex
        let value = this.state.addDesc
        let { timesheetData } = this.state;
        let targetPost = timesheetData[index];

        if (addDescField == 1) {
            targetPost.Mon_TaskComments = value;
        }
        else if (addDescField == 2) {
            targetPost.Tue_TaskComments = value;
        }
        else if (addDescField == 3) {
            targetPost.Wed_TaskComments = value;
        }
        else if (addDescField == 4) {
            targetPost.Thu_TaskComments = value;
        }
        else if (addDescField == 5) {
            targetPost.Fri_TaskComments = value;
        }
        else if (addDescField == 6) {
            targetPost.Sat_TaskComments = value;
        }
        else if (addDescField == 7) {
            targetPost.Sun_TaskComments = value;
        }
        this.setState({ timesheetData });
    }

    updateTime = () => {

        let dayField = this.state.dayField
        let index = this.state.dayIndex
        let value = this.state.selectedTime
        let { timesheetData } = this.state;
        let targetPost = timesheetData[index];

        if (dayField == 1) {
            targetPost.Mon = value;
        }
        else if (dayField == 2) {
            targetPost.Tue = value;
        }
        else if (dayField == 3) {
            targetPost.Wed = value;
        }
        else if (dayField == 4) {
            targetPost.Thu = value;
        }
        else if (dayField == 5) {
            targetPost.Fri = value;
        }
        else if (dayField == 6) {
            targetPost.Sat = value;
        }
        else if (dayField == 7) {
            targetPost.Sun = value;
        }
        this.setState({ timesheetData });
    }

    insertUpdateTimesheetEntry = async (status1) => {
        
        var timesheetData = []
        var data = this.state.timesheetData
        Object.keys(data).map((item, index) => {
            timesheetID = data[item].TimesheetId
            clientCode = data[item].ClientCode
            projectCode = data[item].ProjectCode
            typeofWorkId = data[item].TypeOfWorkId
            phaseId = data[item].PhaseId
            activityId = data[item].ActivityId
            workOrderId = data[item].WorkOrderId
            taskDesc = data[item].TaskDesc
            status = status1

            for (var dayField = 1; dayField <= 7; dayField++) {
                if (dayField == 1) {
                    duration = data[item].Mon
                    dailyTaskComments = data[item].Mon_TaskComments
                    date = (this.state.headerData[0].Mon_Date)
                    autoId = data[item].Mon_AutoId
                }
                else if (dayField == 2) {
                    duration = data[item].Tue
                    dailyTaskComments = data[item].Tue_TaskComments
                    date = this.state.headerData[0].Tue_Date
                    autoId = data[item].Tue_AutoId
                }
                else if (dayField == 3) {
                    duration = data[item].Wed
                    dailyTaskComments = data[item].Wed_TaskComments
                    date = this.state.headerData[0].Wed_Date
                    autoId = data[item].Wed_AutoId
                }
                else if (dayField == 4) {
                    duration = data[item].Thu
                    dailyTaskComments = data[item].Thu_TaskComments
                    date = this.state.headerData[0].Thu_Date
                    autoId = data[item].Thu_AutoId
                }
                else if (dayField == 5) {
                    duration = data[item].Fri
                    dailyTaskComments = data[item].Fri_TaskComments
                    date = this.state.headerData[0].Fri_Date
                    autoId = data[item].Fri_AutoId
                }
                else if (dayField == 6) {
                    duration = data[item].Sat
                    dailyTaskComments = data[item].Sat_TaskComments
                    date = this.state.headerData[0].Sat_Date
                    autoId = data[item].Sat_AutoId
                }
                else if (dayField == 7) {
                    duration = data[item].Sun
                    dailyTaskComments = data[item].Sun_TaskComments
                    date = this.state.headerData[0].Sun_Date
                    autoId = data[item].Sun_AutoId
                }
                console.log("status1",data[item].Saved);

                timesheetData.push({
                    Action: 10,
                    EmployeeNo: this.props.user,
                    TimesheetId: timesheetID,
                    Date: date,
                    ClientCode: clientCode,
                    ProjectCode: projectCode,
                    TypeOfWork: typeofWorkId == null ? '' : typeofWorkId,
                    Phase: phaseId == null ? '' : phaseId,
                    WorkOrder: workOrderId == null ? '' : workOrderId,
                    Activity: activityId == null ? '' : activityId,
                    TaskDescription: taskDesc == null ? '' : taskDesc,
                    DailyTaskComments: dailyTaskComments == null ? '' : dailyTaskComments,
                    Duration: duration == null ? '' : duration,
                    TimesheetEntryId: autoId == null ? '' : autoId,
                    Status: status1,
                    CurrRecordStatus: data[item].Saved == null ? '':data[item].Saved

                });
            }
        })
        var data = await saveTimesheetEntry(this.props.user, timesheetData, this.props.baseUrl)
        if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                // validationRemove();
                showToast('Timesheet data '+status1+' sucessfully.');
                if (data.SuccessList != undefined) {
                    this.empWeeklyTimesheetData(this.statetimesheetId);

                }
            }

            else {
                showToast("error has an occer");
            }
        }
    }

    submitTimesheetEntry = async () => {
        // console.log("submit",this.state.headerData);
        // var timesheeData =
        var timesheetData = [];
        var errMinCnt = 0;
        var errMaxCnt = 0;
        var errAtt = 0;
        var errCheckMsg = "";
        var minHrs = (this.state.headerData[0].MinHrsPerDay).toString();
        var maxHrs = (this.state.headerData[0].MaxHrsPerDay).toString();
        var minHrsTime = minHrs.search(":") == -1 ? (parseInt(minHrs * 60)) : (parseInt(minHrs.split(':')[0] * 60) + (minHrs.split(':')[1] == undefined ? 0 : parseInt(minHrs.split(':')[1])));
        var maxHrsTime = maxHrs.search(":") == -1 ? (parseInt(maxHrs * 60)) : (parseInt(maxHrs.split(':')[0] * 60) + (maxHrs.split(':')[1] == undefined ? 0 : parseInt(maxHrs.split(':')[1])));
        var Mon = [], Tue = [], Wed = [], Thu = [], Fri = [], Sat = [], Sun = [];
        var mon = 0, tue = 0, wed = 0, thu = 0, fri = 0, sat = 0, sun = 0;
        console.log("minHrsTime", minHrsTime, maxHrsTime);
        var data = this.state.timesheetData
        var empAttendanceData = this.state.empAttendanceData
        var i = 0
       
        for (i; i < data.length; i++) {
            Mon.push({
                autoId: (data[i].Mon_AutoId == null) ? "" : data[i].Mon_AutoId,
                duration: data[i].Mon == null ? "0:00" : data[i].Mon,
                dailyComments: data[i].Mon_TaskComments,
                day: "Monday",
                attendance: this.state.empAttendanceData[0].Mon
            });

            Tue.push({
                autoId: (data[i].Tue_AutoId == null) ? "" : data[i].Tue_AutoId,
                duration: data[i].Tue == null ? "0:00" : data[i].Tue,
                dailyComments: data[i].Tue_TaskComments,
                day: "TuesDay",
                attendance: empAttendanceData[0].Tue
            });

            Wed.push({
                autoId: (data[i].Wed_AutoId == null) ? "" : data[i].Wed_AutoId,
                duration: data[i].Wed == null ? "0:00" : data[i].Wed,
                dailyComments: data[i].Wed_TaskComments,
                day: "WednesDay",
                attendance: empAttendanceData[0].Wed
            });

            Thu.push({
                autoId: (data[i].Thu_AutoId == null) ? "" : data[i].Thu_AutoId,
                duration: data[i].Thu == null ? "0:00" : data[i].Thu,
                dailyComments: data[i].Thu_TaskComments,
                day: "ThursDay",
                attendance: empAttendanceData[0].Thu
            });

            Fri.push({
                autoId: (data[i].Fri_AutoId == null) ? "" : data[i].Fri_AutoId,
                duration: data[i].Fri == null ? "0:00" : data[i].Fri,
                dailyComments: data[i].Fri_TaskComments,
                day: "FriDay",
                attendance: empAttendanceData[0].Fri
            });

            Sat.push({
                autoId: (data[i].Sat_AutoId == null) ? "" : data[i].Sat_AutoId,
                duration: data[i].Sat == null ? "0:00" : data[i].Sat,
                dailyComments: data[i].Sat_TaskComments,
                day: "SaturDay",
                attendance: empAttendanceData[0].Sat
            });

            Sun.push({
                autoId: (data[i].Sun_AutoId == null) ? "" : data[i].Sun_AutoId,
                duration: data[i].Sun == null ? "0:00" : data[i].Sun,
                dailyComments: data[i].Sun_TaskComments,
                day: "SunDay",
                attendance: empAttendanceData[0].Sun
            });

        }
        var arr = [Mon, Tue, Wed, Thu, Fri, Sat, Sun];

        for (i = 0; i < arr.length; i++) {
            var day = arr[i]
            for (var j = 0; j < day.length; j++) {
                var duration = day[j].duration;
                var dayName = day[j].day

                if (dayName == "Monday") {
                    mon += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "TuesDay") {
                    tue += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "WednesDay") {
                    wed += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "ThursDay") {
                    thu += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "FriDay") {
                    fri += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "SaturDay") {
                    sat += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                } else if (dayName == "SunDay") {
                    sun += (parseInt(duration.split(':')[0] * 60) + (duration.split(':')[1] == undefined ? 0 : parseInt(duration.split(':')[1])))
                }

            }
        }
   
        if (empAttendanceData[0].Mon == 0 && empAttendanceData[0].AttendanceValidation.toLowerCase() == "true") {
            if (parseInt(mon) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (mon != 0 && (mon < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((mon > maxHrsTime))
                errMaxCnt++;
        }

        //tue vaidation
        if (empAttendanceData[0].Tue == 0 && empAttendanceData[0].AttendanceValidation == "true") {
            if (parseInt(tue) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (tue != 0 && (tue < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((tue > maxHrsTime))
                errMaxCnt++;
        }

        //wed vaidation
        if (empAttendanceData[0].Wed == 0 && empAttendanceData[0].AttendanceValidation == "true") {
            if (parseInt(wed) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (wed != 0 && (wed < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((wed > maxHrsTime))
                errMaxCnt++;
        }

        //thu vaidation
        if (empAttendanceData[0].Thu == 0 && empAttendanceData[0].AttendanceValidation.toLowerCase() == 'true') {
            if (parseInt(thu) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (thu != 0 && (thu < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((thu > maxHrsTime))
                errMaxCnt++;
        }

        //fri vaidation
        if (empAttendanceData[0].Fri == 0 && empAttendanceData[0].AttendanceValidation.toLowerCase() == "true") {
            if (parseInt(fri) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (fri != 0 && (fri < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((fri > maxHrsTime))
                errMaxCnt++;
        }

        //sat vaidation
        if (empAttendanceData[0].Sat == 0 && empAttendanceData[0].AttendanceValidation.toLowerCase() == "true") {
            if (parseInt(sat) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (sat != 0 && (sat < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((sat > maxHrsTime))
                errMaxCnt++;
        }

        //sun vaidation
        if (empAttendanceData[0].Sun == 0 && empAttendanceData[0].AttendanceValidation.toLowerCase() == "true") {
            if (parseInt(sun) > 0)
                errAtt++;
        }
        if (minHrs != "") {
            if (sun != 0 && (sun < minHrsTime))
                errMinCnt++;
        }
        if (maxHrs != "") {
            if ((sun > maxHrsTime))
                errMaxCnt++;
        }

         //check Previous status
         var data = await CheckPreviousEmpTSStatus(this.props.user, this.props.tsId, this.props.baseUrl);
         if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            else if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                if (data.ErrorList != undefined) {
                    errCheckMsg = data.ErrorList[0];
                }
            }
        }
        
        if (errMinCnt > 0 || errMaxCnt > 0 || errAtt > 0 || errCheckMsg != "") {
            if (errCheckMsg != "") {  //to show an error msg on submit  when previous timesheet is not submitted
                var errCheckMsg =errCheckMsg.split("$")[1]
                alert(errCheckMsg.replace(/<[^>]*>/g, '.\n'))
            } else {
                if (errAtt > 0) { //to show an error msg on submit when time is enetered but attendance is not marked for the day
                    alert(" The timesheet can not be submitted as your attendance record for the week has not been updated by the administrator. Please contact the administrator to update the attendance data.");
                } else {
                    if (errMinCnt > 0 && errMaxCnt > 0) { //MinMaxHrsValidity to show an error msg on submit when time enetered per day does not siffice min and max hrs
                       showToast(' Minimum time and Maximum time allowed per day is exceeding.');
                    } else if (errMinCnt > 0) { //MinimumHrsValidity to show an error msg on submit when time enetered per day does not siffice min  hrs
                        showToast(" Minimum time duration allowed per day is " +minHrs+" hours.")
                    } else if (errMaxCnt > 0) { //MaximumHrsValidity to show an error msg on submit when time enetered per day does not siffice max  hrs
                        showToast(" Maximum time duration allowed per day is " +maxHrs+" hours.")
                    }
                }
            }
        }
        else {
            this.insertUpdateTimesheetEntry("Submitted");
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
            empAttendanceData: timesheetData.EmpAttendanceData[0],
            timesheetData: timesheetData.EmpTimesheetData[0],
            ratingData: timesheetData.RatingName[0],
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
            timeSheetStatus: this.state.timesheetData[0] !== undefined ? this.state.timesheetData[0].Status : "",
            lblMon: lblMon, lblTue: lblTue,
            lblWed: lblWed, lblThu: lblThu,
            lblFri: lblFri, lblSat: lblSat, lblSun: lblSun,
            dvTotMon: dvTotMon, dvTotTue: dvTotTue,
            dvTotWed: dvTotWed, dvTotThu: dvTotThu,
            dvTotFri: dvTotFri, dvTotSat: dvTotSat,
            dvTotSun: dvTotSun, TotalTime: TotalTime
        }, () => {
            lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
            TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
        });
    }
    componentDidMount() {
        this.empTimesheetList()
    }

    render() {
        const startDate = this.state.selectedDate ? this.state.selectedDate.toString() : '';
        console.log(" this.state.timesheetData.", this.state.timesheetData);
        
        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <NavigationEvents
                    onDidFocus={() => this.empWeeklyTimesheetData()}
                // onWillBlur={() =>this.pageChange()}
                />
                <View style={[styles.Container, { backgroundColor: this.props.primaryColor }]}>

                    <View style={{ height: "7%", backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"My Timesheet"}
                            calenderVisible={this.state.calenderVisible}
                            handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={{ height: "90%", backgroundColor: this.props.secColor }}>
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
                                    {
                                        this.state.timeSheetStatus !== "Submitted" || this.state.timeSheetStatus !== "Approved" ?
                                            <View style={{ flexDirection: "row", top: 5 }}>
                                                {
                                                    this.state.timesheetVisible == true ?
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditTimeSheet', { "header": "Timesheet Entry", "timesheetId": this.state.timesheetId, "TimeArr": this.props.time, "headerData": this.state.headerData, "timesheetData": [], "headerHrsData": [] })}
                                                            style={styles.saveButton}>
                                                            <Text style={styles.text}> {"Add Row"}</Text>
                                                        </TouchableOpacity> : null
                                                }

                                                {
                                                    this.state.timesheetData.length !== 0 ?
                                                        <>
                                                            <TouchableOpacity onPress={() => this.insertUpdateTimesheetEntry("Saved")}
                                                                style={styles.saveButton}>
                                                                <Text style={styles.text}> {"Save"}</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => this.submitTimesheetEntry("Submitted")}
                                                                style={styles.saveButton}>
                                                                <Text style={styles.text}> {"Submit"}</Text>
                                                            </TouchableOpacity>
                                                        </> : null
                                                }
                                            </View> : null
                                    }

                                </> : null
                        }

                        <ScrollView style={{ flex: 1 }}
                            // horizontal={true}
                            scrollEnabled={this.state.content}
                        >
                            <View style={{ width: '100%' }}>
                                {
                                    this.state.timesheetData.length !== 0 ?
                                        <View style={{ flexDirection: 'row', marginLeft: 5, }}>
                                            <View style={{ flexDirection: 'column', }}>

                                                <View style={[styles.sheetHeader, { justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.stripHeaderColor }]}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 18, fontWeight: '900', color: this.props.fontColor }}>{"Project"}</Text>
                                                        <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"  (Client)"}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"Description"}</Text>
                                                    </View>
                                                </View>
                                                {
                                                    this.state.timesheetData.length !== 0 ?
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <FlatList
                                                                data={Object.keys(this.state.timesheetData)}
                                                                renderItem={({ item }) => (

                                                                    <TouchableOpacity
                                                                        onPress={() => this.props.navigation.navigate('ProjectDetail', { "timesheetData": this.state.timesheetData[item], "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData })}
                                                                        style={[styles.sheetData1, { backgroundColor: this.props.stripColor }]}>
                                                                        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{this.state.timesheetData[item].ProjectName}</Text>
                                                                        <Text numberOfLines={1} style={{ color: "#4D504F" }}>{"(" + this.state.timesheetData[item].ClientName + ")"}</Text>
                                                                        <Text numberOfLines={1} style={{ color: "#4D504F" }}>{this.state.timesheetData[item].TaskDesc}</Text>
                                                                    </TouchableOpacity>
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
                                                    <View style={{ flexDirection: 'row', height: 70, top: 5, backgroundColor: this.props.stripHeaderColor }}>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblMon}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotMon}</Text>
                                                        </View>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblTue}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotTue}</Text>
                                                        </View>

                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor, }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblWed}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotWed}</Text>
                                                        </View>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor, }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblThu}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotThu}</Text>
                                                        </View>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblFri}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotFri}</Text>
                                                        </View>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblSat}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotSat}</Text>
                                                        </View>
                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.lblSun}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{this.state.dvTotSun}</Text>
                                                        </View>
                                                        <View style={[styles.OTP, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{"APPROVER"}</Text>
                                                            {/* <Text style={{ color: this.props.fontColor }}>{this.state.dvTotFri}</Text> */}
                                                        </View>
                                                        <View style={[styles.OTP, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{"ON TIME"}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{"PERFORMANCE"}</Text>
                                                        </View>
                                                        <View style={[styles.approver, { backgroundColor: this.props.stripHeaderColor }]}>
                                                            <Text style={{ color: this.props.fontColor }}>{"QUALITY  OF"}</Text>
                                                            <Text style={{ color: this.props.fontColor }}>{"WORK"}</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <FlatList
                                                            data={Object.keys(this.state.timesheetData)}
                                                            renderItem={({ item, index }) => (
                                                                <View style={{ flexDirection: 'row', marginRight: 5 }}>

                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Mon', dayIndex: index, dayField: 1, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Mon}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Mon_TaskComments, addDescField: 1, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Tue', dayIndex: index, dayField: 2, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Tue}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Tue_TaskComments, addDescField: 2, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Wed', dayIndex: index, dayField: 3, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Wed}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Wed_TaskComments, addDescField: 3, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Thu', dayIndex: index, dayField: 4, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Thu}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Thu_TaskComments, addDescField: 4, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Fri', dayIndex: index, dayField: 5, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Fri}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Fri_TaskComments, addDescField: 5, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Sat', dayIndex: index, dayField: 6, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Sat}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Sat_TaskComments, addDescField: 6, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Sun', dayIndex: index, dayField: 7, }) }} style={styles.hrsData}>
                                                                            <Text>{this.state.timesheetData[item].Sun}</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() =>
                                                                            this.setState({ addDescVisible: true, addDesc: this.state.timesheetData[item].Sun_TaskComments, addDescField: 7, addDescIndex: index },
                                                                                () => { })}>
                                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={[styles.OTP, { backgroundColor: this.props.stripColor }]}>
                                                                        {/* <View style={styles.hrsData1}> */}
                                                                        <Text>{this.state.timesheetData[item].Approver}</Text>
                                                                        {/* <Text>{"mj"}</Text> */}
                                                                        {/* </View> */}
                                                                    </View>
                                                                    <View style={[styles.OTP, { backgroundColor: this.props.stripColor }]}>
                                                                        {/* <View style={styles.hrsData1}> */}
                                                                        <Text>{this.state.timesheetData[item].ApprOTPRating}</Text>
                                                                        {/* </View> */}
                                                                    </View>
                                                                    <View style={[styles.approver, { backgroundColor: this.props.stripColor }]}>
                                                                        {/* <View style={styles.hrsData1}> */}
                                                                        <Text>{this.state.timesheetData[item].ApprQOWRating}</Text>
                                                                        {/* </View> */}
                                                                    </View>

                                                                </View>
                                                            )}
                                                        />

                                                    </View>
                                                </View>

                                            </ScrollView>
                                        </View> : null
                                }

                                <Dialog
                                    visible={this.state.addDescVisible}
                                    style={{ backgroundColor: 'white', height: 250, width: 350 }}
                                    onTouchOutside={() => this.setState({ addDescVisible: false }, () => { this.handleAddDescription() })}

                                >
                                    <View style={{ backgroundColor: 'white', height: 300, width: 400, bottom: 25, right: 25 }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Description'}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', right: 25 }}>
                                            <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                {this.state.timeSheetStatus !== "Submitted" ?
                                                    <TextInput
                                                        multiline={true}
                                                        value={this.state.addDesc}
                                                        onChangeText={value => this.setState({ addDesc: value })}
                                                    // onChangeText={value => this.handleAddDescription({ value})}
                                                    /> : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </Dialog>

                                <Dialog
                                    visible={this.state.timeVisible}
                                    onTouchOutside={() =>
                                        this.setState({ timeVisible: false }, () => { this.updateTime() })}
                                    style={
                                        {
                                            width: 100,
                                            height: 350,
                                        }
                                    }
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', right: 20 }}>

                                        <FlatList
                                            data={Object.keys(this.props.time)}
                                            renderItem={({ item, index }) => (

                                                <TouchableOpacity onPress={() => {
                                                    this.setState({ selectedTime: this.props.time[item], timeVisible: false },
                                                        () => {
                                                            this.updateTime()

                                                        })
                                                }}
                                                    style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                                    <View>
                                                        <Text style={styles.textPopup}>
                                                            {this.props.time[item]}
                                                        </Text>
                                                        <Divider />
                                                    </View>
                                                </TouchableOpacity>)}
                                        />

                                    </View>
                                </Dialog>

                                <Dialog
                                    visible={this.state.weekVisible}
                                    style={{ backgroundColor: 'white', width: 250 }}
                                    onTouchOutside={() => this.setState({ weekVisible: false }, () => { })}

                                >
                                    <View style={{ backgroundColor: 'white', width: 250, height: 300, bottom: 25, right: 25 }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Select Week'}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', top: 15 }}>
                                            <View style={{ borderRadius: 5, width: 250, }}>
                                                {
                                                    this.state.timesheetList.length == 0 ?
                                                        <View style={{ width: '100%', }}>
                                                            <Text style={styles.textPopup}>
                                                                {"No Data Available"}
                                                            </Text>
                                                            <Divider />
                                                        </View>
                                                        :
                                                        <FlatList
                                                            data={Object.keys(this.state.timesheetList)}
                                                            renderItem={({ item, index }) => (

                                                                <TouchableOpacity onPress={() => {
                                                                    this.setState({ selectedWeek: this.state.timesheetList[item], timesheetId: this.state.timesheetList[item].Value, weekVisible: false, timesheetVisible: true },
                                                                        () => {
                                                                            this.props.ts_Id(this.state.timesheetList[item].Value)
                                                                            firstDate1 = moment(new Date(this.state.selectedWeek.Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                                                lastDate1 = moment(new Date(this.state.selectedWeek.Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                                                this.empWeeklyTimesheetData()
                                                                        })
                                                                }}
                                                                    style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                                                    <View style={{ width: '100%', }}>

                                                                        {
                                                                            firstDate = moment(new Date(this.state.timesheetList[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM"),
                                                                            lastDate = moment(new Date(this.state.timesheetList[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY"),
                                                                            console.log(" ")
                                                                        }
                                                                        <Text style={styles.textPopup}>

                                                                            {firstDate.toUpperCase() + " - " + lastDate.toUpperCase()}
                                                                        </Text>
                                                                        <Divider />
                                                                    </View>
                                                                </TouchableOpacity>)}
                                                        />
                                                }
                                            </View>
                                        </View>
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
        stripColor: state.stripColor,
        stripHeaderColor: state.stripHeaderColor,
        bgColor: state.bgColor,
        primaryColor: state.primaryColor,
        secColor: state.secColor,
        time: state.time,
        tsId: state.tsId

    }
}
const mapDispatchToProps = dispatch => {
    return {
        ts_Id: (data) => dispatch(setTsId(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet)

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
        backgroundColor: '#747474'
        // backgroundColor: '#424543'
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
        // borderWidth: .3,
        height: 70,
        width: "auto",
        marginTop: 5,
        // left: 2,
        marginBottom: 5,
    },
    sheetData1: {
        padding: 10,
        height: 80,
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        bottom: 10
        // borderWidth: .3,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    sheetData: {
        padding: 10,
        height: 80,
        width: 75,
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
        // right: 4,
        // backgroundColor:'red'
    },
    approver: {
        padding: 10,
        height: 70,
        width: 110,
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
        // right: 4,
        // backgroundColor:'#FFFF'
    },
    OTP: {
        padding: 10,
        height: 70,
        width: 125,
        marginTop: 5,
        marginBottom: 5,
        // borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
        // right: 4,
        // backgroundColor:'#FFFF'
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
    hrsData1: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        // width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#FFFF'

    },
    picker: {
        height: 200,
        width: 50
    }
});