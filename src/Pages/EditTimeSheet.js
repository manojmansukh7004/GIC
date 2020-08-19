import React, { Component } from 'react';
import {
    ToastAndroid, Text, View, StyleSheet, Picker, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, TextInput
} from 'react-native';
import { Divider, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import moment from 'moment';
import { Dialog } from 'material-bread';
import { saveTimesheetEntry } from '../Services/saveTimesheetEntry';
import { getTsEntryDropdownData } from '../Services/getTsEntryDropdownData';
import { getDataOnClientChange } from '../Services/getDataOnClientChange';
import { getDataOnProjectChange } from '../Services/getDataOnProjectChange';
import { GetDataOnPhaseChange } from '../Services/GetDataOnPhaseChange';
import Appbar from '../Component/AppBar'
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var lblMon1 = "", lblTue1 = "", lblWed1 = "", lblThu1 = "", lblFri1 = "", lblSat1 = "", lblSun1 = ""
var dvTotMon1 = "", dvTotTue1 = "", dvTotWed1 = "", dvTotThu1 = "", dvTotFri1 = "", dvTotSat1 = "", dvTotSun1 = ""
var timesheetID = '', clientCode = '', projectCode = '', typeofWorkId = '', phaseId = '', activityId = '', workOrderId = '', taskDesc = '', status = '', duration = '', dailyTaskComments = '', date = '', autoId = '', status = ''

class TimesheetEntry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            timesheetId: '',
            timesheetData: [],
            client: "",
            typeOfWorkId: '',
            project: '',
            phase: '',
            activity: '',
            workOrder: '',
            activityName: '',
            clientName: '',
            projectName: '',
            typeOfWork: "",
            phaseName: '',
            workOrderName: '',
            field: '',
            lblMon1: "",
            lblTue1: "",
            lblWed1: "",
            lblThu1: "",
            lblFri1: "",
            lblSat1: "",
            lblSun1: "",
            dvTotMon1: "",
            dvTotTue1: "",
            dvTotWed1: "",
            dvTotThu1: "",
            dvTotFri1: "",
            dvTotSat1: "",
            dvTotSun1: "",
            lblMon: "",
            lblTue: "",
            lblWed: "",
            lblThu: "",
            lblFri: "",
            lblSat: "",
            lblSun: "",
            descMon: "",
            descTue: "",
            descWed: "",
            descThu: "",
            descFri: "",
            descSat: "",
            descSun: "",
            dayField: "",
            dayValue: "",
            addDesc: "",
            addDescField: "",
            description: "",
            projectDesc: "",
            data: [],
            time: [],
            headerData: [],
            clientList: [],
            typeOfWorkList: [],
            projetList: [],
            phaseList: [],
            activityList: [],
            workOrderList: [],
            activityList1: [],
            workOrderList1: [],
            edit: false,
            timesheetVisible: false,
            addDescVisible: false,
            validation: false,
            selectedType: 'Select'
        }
    }
    updateTime = (time) => {
        var dayValue = this.state.dayValue
        if (dayValue == 1) {
            this.setState({ lblMon: time });
        }
        else if (dayValue == 2) {
            this.setState({ lblTue: time });
        }
        else if (dayValue == 3) {
            this.setState({ lblWed: time });
        }
        else if (dayValue == 4) {
            this.setState({ lblThu: time });
        }
        else if (dayValue == 5) {
            this.setState({ lblFri: time });
        }
        else if (dayValue == 6) {
            this.setState({ lblSat: time });
        }
        else if (dayValue == 7) {
            this.setState({ lblSun: time });
        }
    }

    handleDescription = () => {
        var descField = this.state.addDescField
        var description = this.state.description

        if (descField == 1) {
            this.setState({ descMon: description });
        }
        else if (descField == 2) {
            this.setState({ descTue: description });
        }
        else if (descField == 3) {
            this.setState({ descWed: description });
        }
        else if (descField == 4) {
            this.setState({ descThu: description });
        }
        else if (descField == 5) {
            this.setState({ descFri: description });
        }
        else if (descField == 6) {
            this.setState({ descSat: description });
        }
        else if (descField == 7) {
            this.setState({ descSun: description });
        }
    }

    handleSave = () => {
        this.setState({ validation: true })
        if (this.state.client == 0) { showToast("Select client details.") }
        else if (this.state.project == 0) { showToast("Select project details.") }
        else if (this.state.typeOfWorkId == 0) { showToast("Select type of work.") }
        else if (this.state.activity == 0) { showToast("Select activity.") }
        else if (this.state.projectDesc == "") { showToast("Fill up project description.") }
        else if (this.state.lblMon == "" && this.state.lblTue == "" && this.state.lblWed == "" && this.state.lblFri == "" &&
            this.state.lblSat == "" && this.state.lblSun == "" && this.state.lblThu == "") { showToast("Please enter time.") }
        else { this.insertUpdateTimesheetEntry() }

    }

    insertUpdateTimesheetEntry = async () => {
        var timesheetData = []

        // timesheetId = this.state.timesheetId
        clientCode = this.state.client
        projectCode = this.state.project
        typeofWorkId = this.state.typeOfWorkId
        phaseId = this.state.phase == 0 ? "" : this.state.phase
        activityId = this.state.activity
        workOrderId = this.state.workOrder == 0 ? "" : this.state.workOrder
        taskDesc = this.state.projectDesc
        status = "Saved"
        // autoId = null

        for (var dayField = 1; dayField <= 7; dayField++) {
            if (dayField == 1) {
                duration = this.state.lblMon
                dailyTaskComments = this.state.descMon
                date = (this.state.headerData[0].Mon_Date)
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Mon_AutoId
            }
            else if (dayField == 2) {
                duration = this.state.lblTue
                dailyTaskComments = this.state.descTue
                date = this.state.headerData[0].Tue_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Tue_AutoId

            }
            else if (dayField == 3) {
                duration = this.state.lblWed
                dailyTaskComments = this.state.descWed
                date = this.state.headerData[0].Wed_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Wed_AutoId

            }
            else if (dayField == 4) {
                duration = this.state.lblThu
                dailyTaskComments = this.state.descThu
                date = this.state.headerData[0].Thu_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Thu_AutoId

            }
            else if (dayField == 5) {
                duration = this.state.lblFri
                dailyTaskComments = this.state.descFri
                date = this.state.headerData[0].Fri_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Fri_AutoId

            }
            else if (dayField == 6) {
                duration = this.state.lblSat
                dailyTaskComments = this.state.descSat
                date = this.state.headerData[0].Sat_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Sat_AutoId

            }
            else if (dayField == 7) {
                duration = this.state.lblSun
                dailyTaskComments = this.state.descSun
                date = this.state.headerData[0].Sun_Date
                autoId = this.state.timesheetData.length == 0 ? "" : this.state.timesheetData.Sun_AutoId

            }

            timesheetData.push({
                Action: 10,
                EmployeeNo: this.props.user,
                TimesheetId: this.props.tsId,
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
                Status: status,
                CurrRecordStatus: status
            });
        }

        var data = await saveTimesheetEntry(this.props.user, timesheetData, this.props.baseUrl)
        if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                // validationRemove();
                if (data.SuccessList != undefined) {
                    showToast("Timesheet data Saved sucessfully.");
                    this.props.navigation.navigate("TimeSheet")
                    // this.empWeeklyTimesheetData(timesheetId);
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


    handleDataOnClientChange = async () => {
        var clientChange = await getDataOnClientChange(this.props.user, this.state.timesheetId, this.state.client, this.props.baseUrl)
        this.setState({
            projetList: clientChange.ProjectList[0],
        });
    }
    handleDataOnProjectChange = async () => {
        var projectChange = await getDataOnProjectChange(this.props.user, this.state.timesheetId, this.state.project, this.props.baseUrl)
        this.setState({
            phaseList: projectChange.PhaseList[0],
            activityList: projectChange.ActivityList[0],
            workOrderList: projectChange.WorkOrderList[0],
        });
    }
    handleDataOnPhaseChange = async () => {
        if (this.state.phase !== null) {
            var phaseChange = await GetDataOnPhaseChange(this.props.user, this.state.timesheetId, this.state.project, this.state.phase == 0 ? "" : this.state.phase, this.props.baseUrl)
            this.setState({
                activityList: phaseChange.ActivityList[0],
                workOrderList: phaseChange.WorkOrderList[0],
            });
        }
    }

    async componentDidMount() {
        var dropdownData = await getTsEntryDropdownData(this.props.user, this.props.baseUrl)
        this.setState({
            clientList: dropdownData.ClientList[0],
            typeOfWorkList: dropdownData.TypeOfWorkList[0],
            timesheetId: this.props.tsId,
            time: this.props.time,
            header: this.props.navigation.state.params.header,
            headerData: this.props.navigation.state.params.headerData,
            timesheetData: this.props.navigation.state.params.timesheetData,
            headerHrsData: this.props.navigation.state.params.headerHrsData,
            edit: this.props.navigation.state.params.Edit
        }, () => {

            lblMon1 = "Mon, " + moment(new Date(this.state.headerData[0].Mon_Date)).format("DD"),
                lblTue1 = "Tue, " + moment(new Date(this.state.headerData[0].Tue_Date)).format("DD"),
                lblWed1 = "Wed, " + moment(new Date(this.state.headerData[0].Wed_Date)).format("DD"),
                lblThu1 = "Thu, " + moment(new Date(this.state.headerData[0].Thu_Date)).format("DD"),
                lblFri1 = "Fri, " + moment(new Date(this.state.headerData[0].Fri_Date)).format("DD"),
                lblSat1 = "Sat, " + moment(new Date(this.state.headerData[0].Sat_Date)).format("DD"),
                lblSun1 = "Sun, " + moment(new Date(this.state.headerData[0].Sun_Date)).format("DD"),
                dvTotMon1 = moment(new Date(this.state.headerData[0].Mon_Date)).format("MMM YYYY"),
                dvTotTue1 = moment(new Date(this.state.headerData[0].Tue_Date)).format("MMM YYYY"),
                dvTotWed1 = moment(new Date(this.state.headerData[0].Wed_Date)).format("MMM YYYY"),
                dvTotThu1 = moment(new Date(this.state.headerData[0].Thu_Date)).format("MMM YYYY"),
                dvTotFri1 = moment(new Date(this.state.headerData[0].Fri_Date)).format("MMM YYYY"),
                dvTotSat1 = moment(new Date(this.state.headerData[0].Sat_Date)).format("MMM YYYY"),
                dvTotSun1 = moment(new Date(this.state.headerData[0].Sun_Date)).format("MMM YYYY"),
                this.setState({
                    lblMon1: lblMon1, lblTue1: lblTue1,
                    lblWed1: lblWed1, lblThu1: lblThu1,
                    lblFri1: lblFri1, lblSat1: lblSat1, lblSun1: lblSun1,
                    dvTotMon1: dvTotMon1, dvTotTue1: dvTotTue1,
                    dvTotWed1: dvTotWed1, dvTotThu1: dvTotThu1,
                    dvTotFri1: dvTotFri1, dvTotSat1: dvTotSat1,
                    dvTotSun1: dvTotSun1,


                }, () => {
                    if (this.state.edit == true) {

                        this.editTimesheet()
                    }
                });
        });
    }

    editTimesheet = () => {
        this.setState({

            client: this.state.timesheetData.ClientCode,
            clientName: this.state.timesheetData.ClientName,
            project: this.state.timesheetData.ProjectCode,
            projectName: this.state.timesheetData.ProjectName,
            typeOfWorkId: this.state.timesheetData.TypeOfWorkId,
            typeOfWork: this.state.timesheetData.TypeOfWork,
            phase: this.state.timesheetData.PhaseId,
            phaseName: this.state.timesheetData.phaseName,
            activity: this.state.timesheetData.ActivityId,
            activityName: this.state.timesheetData.ActivityName,
            projectDesc: this.state.timesheetData.TaskDesc,
            lblMon: this.state.timesheetData.Mon,
            lblTue: this.state.timesheetData.Tue,
            lblWed: this.state.timesheetData.Wed,
            lblThu: this.state.timesheetData.Thu,
            lblFri: this.state.timesheetData.Fri,
            lblSat: this.state.timesheetData.Sat,
            lblSun: this.state.timesheetData.Sun,
            descMon: this.state.timesheetData.Mon_TaskComments,
            descTue: this.state.timesheetData.Tue_TaskComments,
            descWed: this.state.timesheetData.Wed_TaskComments,
            descThu: this.state.timesheetData.Thu_TaskComments,
            descFri: this.state.timesheetData.Fri_TaskComments,
            descSat: this.state.timesheetData.Sat_TaskComments,
            descSun: this.state.timesheetData.Sun_TaskComments,

        }, () => {
            this.handleDataOnClientChange()
            this.handleDataOnProjectChange()
            this.handleDataOnPhaseChange()
        });
    }

    handleSelectedData = (item, index) => {
        if (this.state.field == 1) {
            this.setState({
                clientName: item.Text, client: item.Value, fieldVisible: false, project: "", projectName: '',
                typeOfWorkId: '', typeOfWork: '', phase: '', phaseName: '', activity: '', activityName: '',
                projetList: [], phaseList: [], activityList: [], workOrderList: [], data: []
            }, () => { this.handleDataOnClientChange() })
        }
        else if (this.state.field == 2) {
            this.setState({
                projectName: item.Text, project: item.Value, fieldVisible: false, phase: '', phaseName: '', activity: '', activityName: '',
                typeOfWorkId: '', typeOfWork: '', phaseList: [], activityList: [], workOrderList: [], data: []
            }, () => { this.handleDataOnProjectChange() })
        }
        else if (this.state.field == 3) {
            this.setState({
                typeOfWork: item.Text, typeOfWorkId: item.Value, fieldVisible: false
            }, () => { })
        }
        else if (this.state.field == 4) {
            this.setState({
                phaseName: item.Text, Phase: item.Value, fieldVisible: false, activityName: '', activityList: [], activity: ''
            }, () => { this.handleDataOnPhaseChange() })
        }
        else if (this.state.field == 5) {
            this.setState({
                activityName: item.Text, activity: item.Value, fieldVisible: false
            }, () => { })
        }
    }


    render() {
        return (
            <>

                <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
                <View style={[styles.Container, { backgroundColor: this.props.primaryColor }]}>
                    <View style={{ height: 50, backgroundColor: this.props.primaryColor, }}>
                        <Appbar navigation={this.props.navigation}
                            title={this.state.header}
                            handleSave={this.handleSave}
                            timeSheetEntry={true}
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                    <View style={{ height: '90%', }}>
                          

                            <View style={styles.horizontalContainer}>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.project == 0 ? 'red' : "transparent" }]}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Project List", data: this.state.projetList, fieldVisible: true, field: 2, })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT GROUP</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.projectName == '' ? "--select--" : this.state.projectName}</Text>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.client == 0 ? 'red' : "transparent" }]}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Client List", fieldVisible: true, field: 1, data: this.state.clientList })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>CLIENT</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.client == '' ? "--select--" : this.state.clientName}</Text>
                                    </TouchableOpacity>
                                </Card>
                            </View>

                            <View style={styles.horizontalContainer}>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.project == 0 ? 'red' : "transparent" }]}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Project List", data: this.state.projetList, fieldVisible: true, field: 2, })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.projectName == '' ? "--select--" : this.state.projectName}</Text>
                                    </TouchableOpacity>
                                </Card>

                                <Card style={[styles.cards, {  }]}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Type Of Work", fieldVisible: true, field: 3, data: this.state.typeOfWorkList })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TYPE OF WORK</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.typeOfWork == '' ? "--select--" : this.state.typeOfWork}</Text>
                                    </TouchableOpacity>
                                </Card>


                            </View>
                            <View style={styles.horizontalContainer}>
                                <Card style={styles.cards}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Phase", fieldVisible: true, field: 4, data: this.state.phaseList })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PHASE</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.phaseName == '' || this.state.phaseName == null ? "--select--" : this.state.phaseName}</Text>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.activity == 0 ? 'red' : "transparent" }]}>
                                    <TouchableOpacity onPress={() => this.setState({ title: "Activity", fieldVisible: true, field: 5, data: this.state.activityList })}
                                        style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ACTIVITY</Text>
                                        <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.activityName == '' ? "--select--" : this.state.activityName}</Text>
                                    </TouchableOpacity>
                                </Card>

                                {/* <Card style={styles.cards}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>WORK ORDER</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.workOrder}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue) => this.setState({ workOrder: itemValue })}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.workOrderList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={index} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card> */}
                            </View>
                            <Card style={[styles.descCard, { borderWidth: 1, borderColor: this.state.validation == true && this.state.projectDesc == "" ? 'red' : "transparent" }]}>
                                <View style={styles.reasonView}>
                                    <Text style={[styles.twoCardLabel, { color: this.props.primaryColor }]}>DESCRIPTION</Text>
                                    <TextInput
                                        mode="flat"
                                        underlineColor="white"
                                        multiline
                                        placeholder="Enter Description"
                                        textAlignVertical="top"
                                        underlineColorAndroid="white"
                                        keyboardType="default"
                                        autoFocus={false}
                                        // maxLength={500}
                                        dense
                                        selectionColor={this.props.primaryColor}
                                        value={this.state.projectDesc}
                                        onChangeText={desc => this.setState({ projectDesc: desc, })}
                                        numberOfLines={5}
                                        style={styles.longText}
                                    />
                                </View>
                            </Card>
                            <Card style={styles.descCard}>
                                <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                    <View style={styles.timeView}>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblMon1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotMon1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayField: 'Mon', dayValue: 1, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblMon}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 1, addDesc: this.state.descMon })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblTue1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotTue1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 2, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblTue}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 2, addDesc: this.state.descTue })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblWed1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotWed1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 3, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblWed}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 3, addDesc: this.state.descWed })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblThu1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotThu1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 4, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblThu}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 4, addDesc: this.state.descThu })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblFri1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotFri1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 5, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblFri}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 5, addDesc: this.state.descFri })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblSat1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSat1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 6, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblSat}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 6, addDesc: this.state.descSat })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.lblSun1}</Text>
                                            <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSun1}</Text>
                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: true, dayValue: 7, }) }} style={styles.hrsData}>
                                                <Text>{this.state.lblSun}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ addDescVisible: true, addDescField: 7, addDesc: this.state.descSun })}>
                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </Card>

                            <Dialog
                                visible={this.state.fieldVisible}
                                style={{ backgroundColor: 'white', width: 350 }}
                                onTouchOutside={() => this.setState({ fieldVisible: false }, () => { })}

                            >
                                <View style={{ backgroundColor: 'white', height: 300, bottom: 25, right: 25, width: 350  }}>
                                    <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                        <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', top: 15 }}>
                                        <View style={{ borderRadius: 5, height: 275, }}>
                                            {
                                                this.state.data.length == 0 ?
                                                    <View style={{ width: '100%', }}>
                                                        <Text style={styles.textPopup}>
                                                            {"No Data Available"}
                                                        </Text>
                                                        <Divider />
                                                    </View>
                                                    :
                                                    <FlatList
                                                        data={Object.keys(this.state.data)}
                                                        renderItem={({ item, index }) => (

                                                            <TouchableOpacity onPress={() => {
                                                                this.handleSelectedData(this.state.data[item], index)
                                                            }}
                                                                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                                                <View style={{ width: '100%', }}>
                                                                    <Text style={styles.textPopup}>
                                                                        {this.state.data[item].Text}
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

                            <Dialog
                                visible={this.state.addDescVisible}
                                style={{ backgroundColor: 'white', height: 250, width: 350 }}
                                onTouchOutside={() => this.setState({ addDescVisible: false }, () => { this.handleDescription() })}

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
                                                placeholder="Enter Description"
                                                textAlignVertical="top"
                                                underlineColor="white"
                                                keyboardType="default"
                                                autoFocus={false}
                                                // maxLength={500}
                                                dense
                                                onChangeText={value => this.setState({ addDesc: value, description: value })}
                                            // onChangeText={value => this.handleAddDescription({ value})}
                                            />
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
                                        data={Object.keys(this.state.time)}
                                        renderItem={({ item, index }) => (

                                            <TouchableOpacity onPress={() => {
                                                this.setState({ timeVisible: false }, () => { this.updateTime(this.state.time[item]) })
                                            }}
                                                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                                <View>
                                                    <Text style={styles.textPopup}>
                                                        {this.state.time[item]}
                                                    </Text>
                                                    <Divider />
                                                </View>
                                            </TouchableOpacity>)}
                                    />

                                </View>
                            </Dialog>
                    </View>
                    </ScrollView>

                </View>


            </>
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
        time: state.time,
        tsId: state.tsId

    }
}
export default connect(mapStateToProps)(TimesheetEntry)
const styles = StyleSheet.create({
    Container: {

        flex: 1,
        display: 'flex',
        top: 23.5,
        width: '100%',
        height: '100%',

    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F9F9F9',
        marginBottom: 20,
      },
    cards: {
        elevation: 3,
        borderRadius: 5,
        marginTop: 15,
        width: "48%",
        height: 60
    },
    cardContainer: { backgroundColor: 'white', height: 20, fontSize: 16 },
    singleCardLabel: {
        fontSize: 14,
        // color: '#F2721C',
        paddingStart: 8
    },

    twoCardLabel1: {
        fontSize: 16,
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
    longText: { backgroundColor: 'white', color: "#4D504F", fontSize: 16, marginEnd: 10, padding: 10 },
    reasonView: { paddingStart: 15, padding: 10, },
    timeView: { padding: 10, flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center'},
    sheetData: {
        padding: 10,
        // height: 70,
        width: 85,
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
        fontSize: cardTitle,
        color: "#4D504F",
        marginLeft: 15,
    },
})