import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, TextInput, Image, StatusBar, StyleSheet, Dimensions, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, Paragraph, Card } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { FloatingAction } from "react-native-floating-action";
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { Dialog, SheetBottom, Button } from 'material-bread';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CreateNewTimesheet } from '../Services/MyTimesheet/CreateNewTimesheet'
import { GetEmpTimesheetList } from '../Services/MyTimesheet/GetEmpTimesheetList'
import { GetEmpWeeklyTimesheetData } from '../Services/MyTimesheet/GetEmpWeeklyTimesheetData'
import { saveTimesheetEntry } from '../Services/MyTimesheet/saveTimesheetEntry'
import { CheckPreviousEmpTSStatus } from '../Services/MyTimesheet/CheckPreviousTSStatus'
import { DeleteTimesheetRecord } from '../Services/MyTimesheet/DeleteTimesheetRecord';
import { setTsId } from '../Redux/Action'
import Icon1 from 'react-native-vector-icons/Ionicons';
import MovableView from 'react-native-movable-view'

const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};

const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var Status = '', selectedRow = ''
var firstDate = '', lastDate = '', firstDate1 = '', lastDate1 = ''
var lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
var TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
var timesheetID = '', clientCode = '', projectCode = '', typeofWorkId = '', phaseId = '', activityId = '', workOrderId = '', taskDesc = '', status = '', duration = '', dailyTaskComments = '', date = '', autoId = '', status = '', currRecordStatus = ''
var obj = '', objArr = [], count = 0
var format = (n) => `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2)

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
            orientation: '',
            loading: true,
            count: 0,
            content: true,
            rating: false,
            timeVisible: false,
            weekVisible: false,
            timesheetVisible: false,
            calenderVisible: false,
            addDescVisible: false,
            isTimePickerVisible: false,
            show: false,
            display: false,
            selectedRow: '',
            selectedDate: '',
            selectedWeek: '',
            timesheetId: '',
            MaxHrsPerDay: "",
            MinHrsPerDay: "",
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
            descEdit: true,
            addDesc: "",
            addDescField: '',
            addDescIndex: '',
            dayField: '',
            dayIndex: '',
            selectedTime: '',
            daysVisible: false,
            daysData: [],
            timeSheetStatus: false,
            timeSheetButton: true,
            TotalTime: "0.00",
            statusBarColor: "#297AF9",
            singleTsRecord: [],
            pickerTime: [],
            timesheetList: [],
            empAttendanceData: [],
            timesheetData: [],
            ratingData: [],
            headerData: [],
            headerHrsData: [],
            selectedService: '00:05'
        }
        this.openRowRefs = [];
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
        let index = this.state.dayIndex
        let value = this.state.addDesc
        let { daysData } = this.state;
        let { timesheetData } = this.state;
        let targetPost = timesheetData[index];
        let targetPost1 = daysData
        console.log("addDescField,", addDescField, index, value, targetPost);

        if (addDescField == 1) {
            targetPost.Mon_TaskComments = value;
            targetPost1.Mon_TaskComments = value;
        }
        else if (addDescField == 2) {
            targetPost.Tue_TaskComments = value;
            targetPost1.Tue_TaskComments = value;
        }
        else if (addDescField == 3) {
            targetPost.Wed_TaskComments = value;
            targetPost1.Wed_TaskComments = value;
        }
        else if (addDescField == 4) {
            targetPost.Thu_TaskComments = value;
            targetPost1.Thu_TaskComments = value;
        }
        else if (addDescField == 5) {
            targetPost.Fri_TaskComments = value;
            targetPost1.Fri_TaskComments = value;
        }
        else if (addDescField == 6) {
            targetPost.Sat_TaskComments = value;
            targetPost1.Sat_TaskComments = value;
        }
        else if (addDescField == 7) {
            targetPost.Sun_TaskComments = value;
            targetPost1.Sun_TaskComments = value;
        }
        this.setState({ timesheetData, daysData }, () => {
            // this.insertUpdateTimesheetEntry("Saved")
        });
    }

    updateTime = () => {

        let dayField = this.state.dayField
        let index = this.state.dayIndex
        let value = this.state.selectedTime
        let { timesheetData } = this.state;
        let { daysData } = this.state;
        let targetPost = timesheetData[index];
        let targetPost1 = daysData

        if (dayField == 1) {
            targetPost.Mon = value;
            targetPost1.Mon = value;

        }
        else if (dayField == 2) {
            targetPost.Tue = value;
            targetPost1.Tue = value;

        }
        else if (dayField == 3) {
            targetPost.Wed = value;
            targetPost1.Wed = value;

        }
        else if (dayField == 4) {
            targetPost.Thu = value;
            targetPost1.Thu = value;

        }
        else if (dayField == 5) {
            targetPost.Fri = value;
            targetPost1.Fri = value;

        }
        else if (dayField == 6) {
            targetPost.Sat = value;
            targetPost1.Sat = value;

        }
        else if (dayField == 7) {
            targetPost.Sun = value;
            targetPost1.Sun = value;

        }
        this.setState({ timesheetData, daysData }, () => {
        });
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
            currRecordStatus = data[item].Status
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
                    CurrRecordStatus: currRecordStatus == null ? '' : currRecordStatus
                });
            }
        })
        var data = await saveTimesheetEntry(this.props.user, timesheetData, this.props.baseUrl)
        if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                status1 == "Submitted" ? showToast('Timesheet data ' + status1 + '.') : showToast('Timesheet data ' + "Saved" + '.')
                if (data.SuccessList != undefined) {
                    this.empWeeklyTimesheetData(this.statetimesheetId);
                    this.empWeeklyTimesheetData()
                }
            }

            else {
                showToast("error has an occer");
            }
        }
    }

    submitTimesheetEntry = async () => {
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
                var errCheckMsg = errCheckMsg.split("$")[1]
                alert(errCheckMsg.replace(/<[^>]*>/g, '.\n'))
            } else {
                if (errAtt > 0) { //to show an error msg on submit when time is enetered but attendance is not marked for the day
                    alert(" The timesheet can not be submitted as your attendance record for the week has not been updated by the administrator. Please contact the administrator to update the attendance data.");
                } else {
                    if (errMinCnt > 0 && errMaxCnt > 0) { //MinMaxHrsValidity to show an error msg on submit when time enetered per day does not siffice min and max hrs
                        showToast(' Minimum time and Maximum time allowed per day is exceeding.');
                    } else if (errMinCnt > 0) { //MinimumHrsValidity to show an error msg on submit when time enetered per day does not siffice min  hrs
                        showToast(" Minimum time duration allowed per day is " + minHrs + " hours.")
                    } else if (errMaxCnt > 0) { //MaximumHrsValidity to show an error msg on submit when time enetered per day does not siffice max  hrs
                        showToast(" Maximum time duration allowed per day is " + maxHrs + " hours.")
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
            // daysVisible: true
        });
    }

    handleLoadingData = () => {
        this.empWeeklyTimesheetData()
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
            var saveCount = 0
            Object.keys(this.state.timesheetData).map((item, index) => {
                if (this.state.timesheetData[item].Status == "Saved") {
                    saveCount += 1
                }
            })
            if (saveCount > 0) {
                this.setState({ timeSheetButton: false })
            }
            if (saveCount == 0) {
                this.setState({ timeSheetButton: true })

            }

            this.setTimesheetData();
        });
    }

    setTimesheetData = () => {
        Object.getOwnPropertyNames(this.state.timesheetData).map((key, index) => (
            count = count + 1,
            obj = this.state.timesheetData[key],
            Object.assign(obj, { key: count }),
            console.log("ActivityId", obj.ActivityId),
            obj.ActivityId !== undefined ? objArr.push(obj) : null
        ))
        lblMon = moment(new Date(this.state.headerData[0].Mon_Date)).format("ddd D, YYYY"),
            lblTue = moment(new Date(this.state.headerData[0].Tue_Date)).format("ddd D, YYYY"),
            lblWed = moment(new Date(this.state.headerData[0].Wed_Date)).format("ddd D, YYYY"),
            lblThu = moment(new Date(this.state.headerData[0].Thu_Date)).format("ddd D, YYYY"),
            lblFri = moment(new Date(this.state.headerData[0].Fri_Date)).format("ddd D, YYYY"),
            lblSat = moment(new Date(this.state.headerData[0].Sat_Date)).format("ddd D, YYYY"),
            lblSun = moment(new Date(this.state.headerData[0].Sun_Date)).format("ddd D, YYYY"),
            dvTotMon = this.state.headerHrsData[0].Mon_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Mon_TotalTime),
            dvTotTue = this.state.headerHrsData[0].Tue_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Tue_TotalTime),
            dvTotWed = this.state.headerHrsData[0].Wed_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Wed_TotalTime),
            dvTotThu = this.state.headerHrsData[0].Thu_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Thu_TotalTime),
            dvTotFri = this.state.headerHrsData[0].Fri_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Fri_TotalTime),
            dvTotSat = this.state.headerHrsData[0].Sat_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Sat_TotalTime),
            dvTotSun = this.state.headerHrsData[0].Sun_TotalTime == null ? "0:00" : (this.state.headerHrsData[0].Sun_TotalTime),
            TotalTime = this.state.headerHrsData[0].TotalTime == null ? "0:00" : (this.state.headerHrsData[0].TotalTime);

        var timeArr = []
        Object.getOwnPropertyNames(this.props.time).map((key, index) => (
            this.props.time[key] <= format(this.state.headerData[0].MaxHrsPerDay * 60).toString() ?
                timeArr.push(this.props.time[key]) : null
        ))

        this.setState({
            // timeSheetStatus: this.state.timesheetData[0] !== undefined ? this.state.timesheetData[0].Status : "",
            MaxHrsPerDay: this.state.headerData[0].MaxHrsPerDay,
            MinHrsPerDay: this.state.headerData[0].MinHrsPerDay,
            pickerTime: timeArr, display: true,
            lblMon: lblMon, lblTue: lblTue,
            lblWed: lblWed, lblThu: lblThu,
            lblFri: lblFri, lblSat: lblSat, lblSun: lblSun,
            dvTotMon: dvTotMon, dvTotTue: dvTotTue,
            dvTotWed: dvTotWed, dvTotThu: dvTotThu,
            dvTotFri: dvTotFri, dvTotSat: dvTotSat,
            dvTotSun: dvTotSun, TotalTime: TotalTime,
            timesheetData: objArr
        }, () => {
            // console.log("mmmmmmmmmmmmmmmmm",this.state.MaxHrsPerDay,this.state.MinHrsPerDay);
            objArr = [], obj = '',
                lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
            TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
        });
    }

    getOrientation = () => {
        if (this.refs.rootView) {
            if (Dimensions.get('window').width < Dimensions.get('window').height) {
                this.setState({ orientation: 'portrait' });
            }
            else {
                this.setState({ orientation: 'landscape' });
            }
        }
    }

    renderHiddenItem = (data, rowMap) => (

        <View style={[styles.rowBack, { width: '99%', }]}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProjectDetail', { "timesheetData": data.item, "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData, "Status": data.item.Status == "Saved" ? true : false })}
            >
                <Text style={[styles.backTextWhite, { color: this.props.textColor }]}>Details</Text>
            </TouchableOpacity>

            {
                Status == "Submitted" ?
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                    >
                        <Text style={[styles.backTextWhite, { marginTop: 3, marginBottom: 3, color: 'blue' }]}>Approver</Text>
                        <Text numberOfLines={3} style={styles.backTextWhite}>{data.item.Approver}</Text>
                    </TouchableOpacity>
                    :
                    Status == "Approved" ?
                        <>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight, { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }]}
                                onPress={() => this.handledata(data.item, data.index)}
                            >
                                <Text style={[{ fontSize: 16, marginTop: 3, marginBottom: 3, color: 'blue' }]}>Approver</Text>
                                <Text numberOfLines={1} style={{ fontSize: 16 }}>{data.item.Approver}</Text>
                                <Image style={{ height: 40, width: 40, left: 5 }} source={require("../Assets/msgbg.png")} />
                            </TouchableOpacity>
                        </> :
                        <>
                            <TouchableOpacity
                                style={[styles.backRightBtn1, styles.backRightBtnLeft]}
                                onPress={() => this.props.navigation.navigate('EditTimeSheet', {
                                    "Edit": true,
                                    "header": "Edit Timesheet Entry",
                                    "timesheetData": data.item,
                                    "headerData": this.state.headerData,
                                    "headerHrsData": this.state.headerHrsData,
                                })}
                            >
                                <Image
                                    source={require('../Assets/edit.png')}
                                    style={{ width: 25, height: 25, tintColor: 'green' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.backRightBtn1, styles.backRightBtnRight1]}
                                onPress={() => this.setState({ visible: true, singleTsRecord: data.item })}
                            >
                                <Image
                                    source={require('../Assets/bin.png')}
                                    style={{ width: 25, height: 25, tintColor: 'red' }}
                                />
                            </TouchableOpacity>
                        </>
            }

        </View>
    );

    handledata = (item, index) => {
        this.setState({ daysVisible: true, daysData: item, dayIndex: index })
    }

    renderItem = (data) => (
        Status = data.item.Status,
        <>
            <TouchableHighlight
                onPress={() => { this.handledata(data.item, data.index) }}
                style={[styles.sheetData1, { flexDirection: 'row', backgroundColor: this.props.stripColor, flexDirection: 'row', padding: data.item.ApproverAction !== "Rejected" ? 10 : null }]}
                underlayColor={'#AAA'}
            >
                <>
                    {
                        data.item.ApproverAction == "Rejected" ?
                            <View style={[styles.rejected, { backgroundColor: "red" }]} /> : null
                    }
                    <View style={{ flexDirection: "row", width: data.item.Status !== 'Saved' ? '70%' : data.item.Status !== 'Submitted' ? '70%' : '80%', backgroundColor: 'transparent' }} >
                        <View style={{ width: '90%' }}>
                            <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{data.item.ProjectName}</Text>
                            <Text numberOfLines={1} style={{ color: "#4D504F" }}>{"(" + data.item.ClientName + ")"}</Text>
                            <Text numberOfLines={2} style={{ color: "#4D504F" }}>{data.item.TaskDesc}</Text>
                        </View>
                        <View style={{ width: '10%' }}>
                            <Icon1
                                name={'chevron-down-outline'}
                                style={styles.icon}
                                size={20}
                            />
                        </View>
                    </View>
                    {
                        console.log("dddddddddddddd", data.item.Status)
                        
                    }
                    {
                        data.item.Status !== 'Saved' && data.item.Status !== 'Submitted' ?
                            <>
                                {
                                    data.item.ApprOTPRating == '' ?
                                        <View style={{ justifyContent:'flex-start', alignItems: 'center', width: '30%',  backgroundColor: 'transparent' }}>
                                            <Text style={{ fontSize: 14, color: 'green', justifyContent: 'center', alignItems: 'center', }}>{data.item.Status.toUpperCase()}</Text>
                                        </View>
                                        :
                                        <>
                                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '15%', backgroundColor: 'transparent' }}>
                                                <Text style={{ fontSize: 14, color: 'blue', justifyContent: 'center', alignItems: 'center', }}>{"OTP"}</Text>
                                                <Text style={{ fontSize: 16, color: "black", padding: 5 }}>{data.item.ApprOTPRating}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '15%', backgroundColor: 'transparent' }}>
                                                <Text style={{ fontSize: 14, color: 'blue', justifyContent: 'center', alignItems: 'center', }}>{"QOW"}</Text>
                                                <Text style={{ fontSize: 16, color: "black", padding: 5 }}>{data.item.ApprQOWRating}</Text>
                                            </View>
                                        </>
                                }
                            </>
                            :
                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '30%', backgroundColor: 'transparent' }}>
                                <Text numberOfLines={1} style={{ color: data.item.Status == 'Saved' ? 'red' : "green" }}>{data.item.Status.toUpperCase()}</Text>
                            </View>
                    }
                </>
            </TouchableHighlight>
        </>

    );

    DeleteRecord = async () => {
        var tsEntryId = []
        if (this.state.singleTsRecord.Mon_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Mon_AutoId) }
        if (this.state.singleTsRecord.Tue_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Tue_AutoId) }
        if (this.state.singleTsRecord.Wed_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Wed_AutoId) }
        if (this.state.singleTsRecord.Thu_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Thu_AutoId) }
        if (this.state.singleTsRecord.Fri_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Fri_AutoId) }
        if (this.state.singleTsRecord.Sat_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Sat_AutoId) }
        if (this.state.singleTsRecord.Sun_AutoId !== null) { tsEntryId.push(this.state.singleTsRecord.Sun_AutoId) }
        var data = await DeleteTimesheetRecord(this.props.user, this.state.timesheetId, tsEntryId.toString(), this.props.baseUrl)
        console.log(data);

        if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                if (data.SuccessList != undefined) {
                    showToast("Record deleted successfully.");
                    this.empWeeklyTimesheetData(this.props.tsId);
                }
                else {
                    showToast("Something happens wrong!");
                }
            }

            else {
                showToast("error has an occer");
            }
        }
    }

    componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
        this.empTimesheetList()
    }

    render() {
        const startDate = this.state.selectedDate ? this.state.selectedDate.toString() : '';
        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <NavigationEvents
                    onDidFocus={() => this.handleLoadingData()}
                // onWillBlur={() =>this.componentDidMount()}
                />
                <View ref="rootView" style={[styles.Container, {}]}>

                    <View style={{ height: this.state.orientation == 'landscape' ? '11%' : '7%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"My Timesheet"}
                            calender={true}
                            calenderVisible={this.state.calenderVisible}
                            handleCalenderStatus={this.handleCalenderStatus}
                            submit={true}
                        />
                    </View>

                    <View style={{ height: this.state.orientation == 'landscape' ? '86%' : '90%', backgroundColor: this.state.secColor }}>
                        {
                            this.state.timesheetVisible == true ?
                                <>
                                    <View style={{ width: '100%', bottom: 2, padding: 5, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            {
                                                this.state.timesheetVisible == true ?
                                                    <Text style={styles.totalHrs}> {"Total Hours - " + this.state.TotalTime}</Text>
                                                    : null
                                            }
                                        </View>
                                        <TouchableOpacity onPress={() => this.setState({ weekVisible: true })}
                                            style={{ flexDirection: 'row', width: "50%", justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 3, borderColor: 'white' }}>
                                            <Text numberOfLines={1} style={styles.text}> {firstDate1 == '' ? "Select Week" : firstDate1 + " - " + lastDate1}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        <View style={{ backgroundColor: 'transparent', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                            {
                                                this.state.timesheetData.length == 0 && this.state.display == true ?
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditTimeSheet', { "header": "Timesheet Entry", "timesheetId": this.state.timesheetId, "TimeArr": this.props.time, "headerData": this.state.headerData, "timesheetData": [], "headerHrsData": [] })}
                                                        style={[styles.saveButton, { width: "92%" }]}>
                                                        <Text style={styles.text}> {"Add Row"}</Text>
                                                    </TouchableOpacity>
                                                    : this.state.timeSheetButton == false ?
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditTimeSheet', { "header": "Timesheet Entry", "timesheetId": this.state.timesheetId, "TimeArr": this.props.time, "headerData": this.state.headerData, "timesheetData": [], "headerHrsData": [] })}
                                                            style={[styles.saveButton, { width: "46%" }]}>
                                                            <Text style={styles.text}> {"Add Row"}</Text>
                                                        </TouchableOpacity>
                                                        : null
                                            }

                                            {
                                                this.state.timeSheetButton == false ?
                                                    <>
                                                        <TouchableOpacity onPress={() => this.submitTimesheetEntry("Submitted")}
                                                            style={[styles.saveButton, { width: "46%" }]}>
                                                            <Text style={styles.text}> {"Submit"}</Text>
                                                        </TouchableOpacity>
                                                    </> : null
                                            }
                                        </View>
                                    }

                                </> : null
                        }

                        <ScrollView style={{}}
                            // horizontal={true}
                            scrollEnabled={this.state.content}
                        >
                            <View style={{ height: '100%', marginLeft: 5, marginRight: 5, paddingBottom: 50 }}>

                                <SwipeListView
                                    data={this.state.timesheetData}
                                    renderItem={this.renderItem}
                                    renderHiddenItem={this.renderHiddenItem}
                                    leftOpenValue={75}
                                    rightOpenValue={-120}
                                    previewRowKey={'0'}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                />

                                <Modal isVisible={this.state.addDescVisible} collapsable={true}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: 'white', borderRadius: 5, width: Dimensions.get('window').width - 50, height: 250 }}>
                                            <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.rating == true ? "Rating" : 'Additional Description'}</Text>
                                                <TouchableOpacity onPress={() =>
                                                    this.setState({ addDescVisible: false, rating: false },
                                                        () => { this.handleAddDescription() })}>
                                                    <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                    {/* {this.state.descEdit == true ? */}
                                                    <ScrollView persistentScrollbar={true}>
                                                        <TextInput
                                                            editable={this.state.descEdit == true ? true : false}
                                                            multiline={true}
                                                            value={this.state.rating == true ? this.state.ratingText : this.state.addDesc}
                                                            dense
                                                            style={{ color: 'black' }}
                                                            onChangeText={value => this.setState({ addDesc: value })}
                                                        />
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <Dialog
                                    visible={this.state.timeVisible}
                                    onTouchOutside={() =>
                                        this.setState({ timeVisible: false }, () => { })}
                                    style={
                                        {
                                            width: 100,
                                            height: 350,
                                            borderWidth: 1,
                                            borderRadius: 10
                                        }
                                    }
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', right: 20 }}>

                                        <FlatList
                                            data={Object.keys(this.state.pickerTime)}
                                            renderItem={({ item, index }) => (

                                                <TouchableOpacity onPress={() => {
                                                    this.setState({ selectedTime: this.state.pickerTime[item], timeVisible: false },
                                                        () => {
                                                            this.updateTime()

                                                        })
                                                }}
                                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                                    <View>
                                                    <ScrollView
                                                    showsVerticalScrollIndicator= {true}
                                                    persistentScrollbar={true}>
                                                        <Text style={styles.textPopup}>
                                                            {this.state.pickerTime[item]}
                                                        </Text>
                                                        <Divider />
                                                        </ScrollView>
                                                    </View>
                                                </TouchableOpacity>)}
                                        />

                                    </View>
                                </Dialog>

                                <Modal isVisible={this.state.visible}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: 'white', borderRadius: 10, width: 300, height: 180, }}>
                                            <View style={{ padding: 10, height: "70%", justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#4D504F", marginBottom: 10 }}> Are you sure?</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '900', color: "#4D504F" }}>{"Once deleted, you will not be able to recover the record!"}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    height: "30%",
                                                    // backgroundColor:'green'
                                                }}
                                            >
                                                <TouchableOpacity onPress={() => this.setState({ visible: false })}
                                                    style={{ width: '50%', height: '100%', borderRightWidth: .5, borderTopWidth: .5, heigt: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '900', color: "#297AF9" }}> Cancel</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({ visible: false, deleteRecord: true }, () => { this.DeleteRecord() })
                                                    }
                                                    style={{ width: '50%', height: '100%', borderTopWidth: .5, justifyContent: 'center', alignItems: 'center', }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '900', color: "red" }}> Confirm Delete</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                                <Modal isVisible={this.state.weekVisible}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ backgroundColor: 'white', borderRadius: 5, width: 250, height: Dimensions.get('window').width - 50 }}>
                                            <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Select Week'}</Text>
                                                <TouchableOpacity onPress={() =>
                                                    this.setState({ weekVisible: false, },
                                                        () => { })}>
                                                    <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
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
                                                                    style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                                </Modal>

                                <Modal isVisible={this.state.calenderVisible}>
                                    <View style={{ backgroundColor: 'transparent' }}>
                                        <TouchableOpacity onPress={() => this.setState({ calenderVisible: false })}
                                            style={{ justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: 20, marginVertical: 40 }}
                                        >
                                            <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <CalendarPicker
                                                onDateChange={this.onDateChange}
                                                startFromMonday={true}
                                                maxDate={new Date()}
                                                width={350}
                                                height={800}
                                                textStyle={{ fontSize: 16, color: 'white' }}
                                                todayBackgroundColor={'tomato'}
                                            />
                                        </View>
                                    </View>
                                </Modal>

                                <View style={{ flex: 1 }}>
                                    <SheetBottom
                                        visible={this.state.daysVisible}
                                        style={{ backgroundColor: this.props.secColor }}
                                        onBackdropPress={() => this.setState({ daysVisible: false })}
                                        onSwipeDown={() => this.setState({ daysVisible: false })}>

                                        <View style={{ backgroundColor: this.props.secColor }}>
                                            <View style={[styles.flexRow1, { backgroundColor: 'transparent', borderRadius: 10, marginStart: 8, marginEnd: 8, }]}>

                                                <View style={{ width: "60%", height: '100%', margin: 2, backgroundColor: 'transparent' }}>
                                                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{this.state.daysData.ProjectName}</Text>
                                                    <Text numberOfLines={1} style={{}}>{"(" + this.state.daysData.ClientName + ")"}</Text>
                                                    {/* <Text numberOfLines={1}MaxHrsPerDay style={{ color: "#4D504F" }}>{this.state.daysData.TaskDesc}</Text> */}
                                                </View>
                                                {
                                                    this.state.daysData.Status == "Saved" ?
                                                        <TouchableOpacity onPress={() => this.setState({ daysVisible: true }, () => { this.insertUpdateTimesheetEntry("Saved") })}
                                                            style={[styles.saveButton, { width: '30%' }]}>
                                                            <Text style={styles.text}> {"Save"}</Text>
                                                        </TouchableOpacity>
                                                        : null
                                                }
                                            </View>
                                            <View style={{ marginLeft: 8, marginRight: 8, backgroundColor: 'transparent' }} >
                                                <View style={styles.flexRow}>
                                                    <View style={{ paddingLeft: 8 }}>
                                                        <View style={[styles.flexRow1]}>
                                                            <View style={{ width: "40%" }}>
                                                                <Text style={{ fontSize: 14, }}>{"Day"}</Text>
                                                            </View>
                                                            <View style={{ width: "60%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>

                                                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                                                    {/* {
                                                                        this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                            <>
                                                                                <Text style={{ fontSize: 14 }}>{"Total"}</Text>
                                                                                <Text style={{ fontSize: 14 }}>{"Hr."}</Text>
                                                                            </>
                                                                             {/* :
                                                                            <>
                                                                                <Text style={{ fontSize: 16 }}>{"Approver"}</Text>
                                                                                <Text style={{ fontSize: 16 }}>{"Rating."}</Text>
                                                                            </>
                                                                    } */}

                                                                </View>
                                                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 14 }}>{"Working"}</Text>
                                                                    <Text style={{ fontSize: 14 }}>{"Hr."}</Text>
                                                                </View>
                                                                <View style={{ width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 14 }}>{"Desc."}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={[styles.flexRow1]}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblMon}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Mon_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor}]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotMon}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", justifyContent: "center", alignItems: 'center', flexDirection: 'row' }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Mon_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Mon', dayField: 1, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Mon == "" || this.state.daysData.Mon == undefined ? "--:--" : this.state.daysData.Mon}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Mon_TaskComments, addDescField: 1, })}>
                                                                    <Image style={{ height: 35, width: 35, }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotMon > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblTue}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Tue_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor }]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotTue}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Tue_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Tue', dayField: 2, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Tue == "" ? "--:--" : this.state.daysData.Tue}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Tue_TaskComments, addDescField: 2, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotTue > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblWed}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Wed_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor }]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotWed}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Wed_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Wed', dayField: 3, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Wed == "" ? "--:--" : this.state.daysData.Wed}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Wed_TaskComments, addDescField: 3, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotWed > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblThu}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Thu_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor }]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotThu}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Thu_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Thu', dayField: 4, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Thu == "" ? "--:--" : this.state.daysData.Thu}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Thu_TaskComments, addDescField: 4, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotThu > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblFri}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Fri_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor }]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotFri}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Fri_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Fri', dayField: 5, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Fri == "" ? "--:--" : this.state.daysData.Fri}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Fri_TaskComments, addDescField: 5, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotFri > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblSat}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Sat_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor}]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotSat}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Sat_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Sat', dayField: 6, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Sat == "" ? "--:--" : this.state.daysData.Sat}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Sat_TaskComments, addDescField: 6, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotSat > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                            <Card elevation={2} style={styles.container} >
                                                <View style={styles.flexRow}>
                                                    <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                    <View style={styles.view}>
                                                        <View style={styles.flexRow1}>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 16 }}>{this.state.lblSun}</Text>
                                                            </View>
                                                            <View style={{ width: "70%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Sun_ApprRemark })}>
                                                                    <Image style={{ height: 40, width: 40, }} source={require("../Assets/msgbg.png")} />
                                                                </TouchableOpacity>
                                                                {/* {
                                                                    this.state.daysData.Status == "Saved" || this.state.daysData.Status == "Submitted" ? */}
                                                                        <TouchableOpacity style={[styles.hrsData, { width: "25%", borderColor: 'gray', backgroundColor: this.props.secColor }]}>
                                                                            <Text style={{ fontSize: 16, color: "#4D504F" }}>{this.state.dvTotSun}</Text>
                                                                        </TouchableOpacity>
                                                                        {/* :
                                                                        <TouchableOpacity style={{ width: "30%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.daysData.Sun_ApprRemark })}>
                                                                            <Image style={{ height: 50, width: 50, }} source={require("../Assets/msgbg.png")} />
                                                                        </TouchableOpacity>
                                                                } */}
                                                                <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Mon', dayField: 7, }) }}
                                                                    style={[styles.hrsData, { width: "25%", backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                    <Text style={{ fontSize: 16 }}>{this.state.daysData.Sun == "" ? "--:--" : this.state.daysData.Sun}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ width: "15%", flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() =>
                                                                    this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Sun_TaskComments, addDescField: 7, },
                                                                        () => { })}>
                                                                    <Image style={{ height: 35, width: 35 }} source={require("../Assets/message.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.dvTotSun > this.state.MaxHrsPerDay && this.state.daysData.Status !== "Approved" ?
                                                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '900', color: 'red' }}>
                                                                    {" * Maximum time allowed per day is "+  this.state.MaxHrsPerDay + " hr."}
                                                                </Text>
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </Card>

                                        </View>
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
        tsId: state.tsId,
        textColor: state.textColor,

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
        top: 23.5,
        width: '100%',
        height: '100%',
    },
    Title: {
        fontSize: 20,
        margin: 5,
        top: 3,
        marginLeft: 10,
        justifyContent: 'center'
    },
    card: {
        padding: 9,
        borderRadius: 5,
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#C1C0B9',
        top: 3,
    },

    text: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: 16,
        padding: 5,
        color: 'white'
    },
    saveButton: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: .3,
        margin: 5,
        borderRadius: 3,
        height: 40,
        backgroundColor: '#747474'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 17,
        top: 3,
    },
    totalHrs: {
        textAlign: 'left',
        // fontWeight: '500',
        fontSize: title,
        margin: 3,
        color: "white",
    },
    textPopup: {
        padding: 10,
        fontSize: cardDate,
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
        height: 75,
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },

    rejected: {
        marginRight: 10,
        height: 100,
        width: 4,
        borderRadius: 10,
        bottom: 10,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },

    sheetData: {
        padding: 10,
        height: 80,
        width: 75,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    approver: {
        padding: 10,
        height: 80,
        width: 110,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    OTP: {
        padding: 10,
        height: 80,
        width: 125,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hrsData: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        // width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 5,
    },
    hrsData1: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#FFFF'
    },
    picker: {
        height: 200,
        width: 50
    },
    backTextWhite: {
        fontSize: 16
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    sheetData1: {
        elevation: 3,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        marginStart: 3,
        marginEnd: 3,
    },
    rowBack: {
        elevation: 3,
        alignItems: 'center',
        backgroundColor: '#DDD',
        height: 99,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 99,
        padding: 5,
        margin: 5,
    },
    backRightBtn1: {
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        width: 60,
        padding: 5
    },
    backRightBtnLeft: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'transparent',
        right: 60,
    },
    backRightBtnRight1: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'transparent',
        right: 0,
        padding: 5
    },
    backRightBtnRight: {
        backgroundColor: 'transparent',
        right: 0,
        padding: 5
    },
    container: {
        // height: 50,
        borderRadius: 10,
        marginStart: 8,
        marginEnd: 8,
        marginTop: 10
    },
    flexRow1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    flexRow: {
        flexDirection: 'row'
    },
    strip1: {
        width: 5,
        backgroundColor: '#297AF9',
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    strip2: {
        width: 5,
        backgroundColor: '#297AF9',
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    view: {
        flex: 1,
        padding: 8,
    },
});