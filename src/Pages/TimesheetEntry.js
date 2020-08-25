import React, { Component } from 'react';
import {
    ToastAndroid, Text, View, StyleSheet, Picker, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, TextInput
} from 'react-native';
import { Divider, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import moment from 'moment';
import { Dialog } from 'material-bread';
import { saveTimesheetEntry } from '../Services/MyTimesheet/saveTimesheetEntry';
import { getTsEntryDropdownData } from '../Services/MyTimesheet/getTsEntryDropdownData';
import { getDataOnClientChange } from '../Services/MyTimesheet/getDataOnClientChange';
import { getDataOnProjectChange } from '../Services/MyTimesheet/getDataOnProjectChange';
import { GetDataOnPhaseChange } from '../Services/MyTimesheet/GetDataOnPhaseChange';
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
            timesheetId: '',
            client: "",
            typeOfWorkId: '',
            project: '',
            phase: '',
            activity: '',
            workOrder: '',
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
        autoId = null
        for (var dayField = 1; dayField <= 7; dayField++) {
            if (dayField == 1) {
                duration = this.state.lblMon
                dailyTaskComments = this.state.descMon
                date = (this.state.headerData[0].Mon_Date)
            }
            else if (dayField == 2) {
                duration = this.state.lblTue
                dailyTaskComments = this.state.descTue
                date = this.state.headerData[0].Tue_Date
            }
            else if (dayField == 3) {
                duration = this.state.lblWed
                dailyTaskComments = this.state.descWed
                date = this.state.headerData[0].Wed_Date
            }
            else if (dayField == 4) {
                duration = this.state.lblThu
                dailyTaskComments = this.state.descThu
                date = this.state.headerData[0].Thu_Date
            }
            else if (dayField == 5) {
                duration = this.state.lblFri
                dailyTaskComments = this.state.descFri
                date = this.state.headerData[0].Fri_Date
            }
            else if (dayField == 6) {
                duration = this.state.lblSat
                dailyTaskComments = this.state.descSat
                date = this.state.headerData[0].Sat_Date
            }
            else if (dayField == 7) {
                duration = this.state.lblSun
                dailyTaskComments = this.state.descSun
                date = this.state.headerData[0].Sun_Date
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
                    showToast("Timesheet data saved sucessfully.");
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
        console.log("client calling", this.state.timesheetId);

        var clientChange = await getDataOnClientChange(this.props.user, this.state.timesheetId, this.state.client, this.props.baseUrl)
        console.log(",clientChange", clientChange);

        this.setState({
            projetList: clientChange.ProjectList[0],
        });
    }
    handleDataOnProjectChange = async () => {
        console.log("project calling");

        var projectChange = await getDataOnProjectChange(this.props.user, this.state.timesheetId, this.state.project, this.props.baseUrl)
        this.setState({
            phaseList: projectChange.PhaseList[0],
            activityList: projectChange.ActivityList[0],
            workOrderList: projectChange.WorkOrderList[0],
        });
    }
    handleDataOnPhaseChange = async () => {
        console.log("phase calling");

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
            headerData: this.props.navigation.state.params.headerData,
          
            // edit: this.props.navigation.state.params.Edit
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
                });
        });
    }

    

    render() {
        // console.log("clientclientclient", this.state.timesheetID);

        return (
            <View>

                <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
                <View style={{ height: "100%", width: '100%', top: '3%' }}>
                    <View style={{ height: '7%', backgroundColor: this.props.primaryColor, }}>
                        <Appbar navigation={this.props.navigation}
                            title={"Timesheet Entry"}
                            handleSave={this.handleSave}
                            timeSheetEntry={true}
                        />
                    </View>
                    <View style={{ height: '90%', backgroundColor: "red" }}>
                        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                            <View style={styles.horizontalContainer}>

                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.client == 0 ? 'red' : "transparent" }]}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>CLIENT</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.client}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue, ) => this.setState({ client: itemValue }, () => {
                                                this.handleDataOnClientChange()
                                            })}
                                        >

                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.clientList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>

                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.project == 0 ? 'red' : "transparent" }]}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.project}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue) => this.setState({ project: itemValue }, () => { this.handleDataOnProjectChange() })}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.projetList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.typeOfWorkId == 0 ? 'red' : "transparent" }]}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TYPE OF WORK</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.typeOfWorkId}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue) => this.setState({ typeOfWorkId: itemValue })}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.typeOfWorkList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>

                                <Card style={styles.cards}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PHASE</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.phase == undefined ? "" : this.state.phase}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue) => this.setState({ phase: itemValue }, () => { this.handleDataOnPhaseChange() })}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.phaseList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.activity == 0 ? 'red' : "transparent" }]}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ACTIVITY</Text>

                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.activity}
                                            style={styles.pickers}
                                            // enabled={this.item.AttStatus !== 'MissingPunches'}
                                            onValueChange={(itemValue) => this.setState({ activity: itemValue })}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.activityList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>

                                    </View>
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
                                        value={this.state.reason}
                                        onChangeText={desc => this.setState({ projectDesc: desc, })}
                                        numberOfLines={7}
                                        style={styles.longText}
                                    />
                                </View>
                            </Card>
                            <Card style={styles.descCard}>
                                <ScrollView horizontal={true}>
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
        time: state.time,
        tsId: state.tsId

    }
}
export default connect(mapStateToProps)(TimesheetEntry)
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
        fontSize: cardDate,
        // margin: 5,
        marginLeft: 15,
    },
})