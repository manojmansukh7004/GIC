import React, { Component } from 'react';
import { ToastAndroid, TextInput, Image, StatusBar, StyleSheet, Picker, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, Card, Button } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { connect } from 'react-redux'
import { Dialog, List, Checkbox, SheetSide, } from 'material-bread';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { MultiPickerMaterialDialog } from 'react-native-material-dialog';
// import PickerCheckBox from 'react-native-picker-checkbox';
import moment from 'moment';
import { setTsId } from '../Redux/Action'
import { GetDrpDataForTSApproval } from '../Services/TsApproval/GetDrpDataForTSApproval'
import { GetTSListOnEmpChange } from '../Services/TsApproval/GetTSListOnEmpChange'
import { GetDataOnClientChange } from '../Services/TsApproval/GetDataOnClientChange'
import { GetEmpListForApproval } from '../Services/TsApproval/GetEmpListForApproval'
import { GetDataforApprOnSearch } from '../Services/TsApproval/GetDataforApprOnSearch'
import { SaveUpdateApproverAction } from '../Services/TsApproval/SaveUpdateApproverAction'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
var TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
var timesheetID = '', clientCode = '', projectCode = '', typeofWorkId = '', phaseId = '', activityId = '', workOrderId = '', taskDesc = '', status = '', duration = '', dailyTaskComments = '', date = '', autoId = '', status = '', currRecordStatus = ''
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var Type = [
    { Value: "5001", Text: "Pending" },
    { Value: "5002", Text: "Completed" }
]

class TimeSheet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            client: [],
            project: [],
            clientValue: [],
            projectValue: [],
            resourceName: '',
            tsName: '',
            type: '',
            resource: '',
            timesheet: '',
            type1: '',
            resource1: '',
            timesheet1: '',
            data: [],
            dropDownData: [],
            projectList: [],
            clientList: [],
            ratingList1: [],
            ratingList2: [],
            typeList: [],
            resourceList: [],
            timesheetList: [],
            selectedVal: [],
            arrayholder: [],
            filterVisible: true,
            visible: false,
            multiPickerVisible: false,
            multiPickerVisible1: false,
            dataTable: false,
            addDescVisible: false,
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
            timesheetData: [],
            headerData: [],
            headerHrsData: [],
            ratingVisible: false,
            action: '',
            RatingText: '',
            rating: false,
            rating1: [],
            rating2: [],
            rating3: '',
            QOW: [],
            OTP: [],
            apprActionData: []
        }
    }

    handleSelectAll = () => {
        if (this.state.field == 1) {
            this.setState({ client: this.state.clientList, selectedVal: this.state.clientList }, () => { this.handleSelectedData() })
        }
        else if (this.state.field == 2) {
            this.setState({ project: this.state.projectList, selectedVal: this.state.projectList }, () => { this.handleSelectedData() })
        }
    }

    handleDeSelectAll = () => {
        if (this.state.field == 1) {
            this.setState({ client: [], selectedVal: [] })
        }
        else if (this.state.field == 2) {
            this.setState({ project: [], selectedVal: [] })
        }
    }

    searchFilterFunction =
        text => {
            this.setState({
                value: text,
            });
            const newData = this.state.arrayholder.filter(item => {
                const itemData = ` ${item.Text.toUpperCase()} ${item.Value.toUpperCase()} `;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            this.setState({
                data: newData,
            });
        };

    handleRating = (item) => {
        if (this.state.field == 1) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, QOW: item.Value, rating1: temp
            })
        }
        else if (this.state.field == 2) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, OTP: item.Value, rating2: temp,
            })
        }
        console.log("rarrr", this.state.QOW, this.state.OTP)

    }

    handleSelectedData = (item, index) => {

        if (this.state.field == 1) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.client.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.clientValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, client: selectedNode, clientValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })
                    })
            }
            else {
                var selectedNode = this.state.client.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.clientValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, client: selectedNode, clientValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })

                    })
            }
        }
        else if (this.state.field == 2) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.project.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.projectValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, project: selectedNode, projectValue: selectedNode2, type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] })
            }
            else {
                var selectedNode = this.state.project.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.projectValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, project: selectedNode, projectValue: selectedNode2, type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] })
            }
        }
        else if (this.state.field == 3) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, type: item.Text, type1: temp, resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [], multiPickerVisible: false
            }, async () => {
                var typeData = await GetEmpListForApproval(this.props.user, this.state.type, this.state.clientValue, this.state.projectValue, this.props.baseUrl)
                this.setState({ resourceList: typeData.EmployeeList[0] })
            })
        }
        else if (this.state.field == 4) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, resource: item.Value, resourceName: item.Text, resource1: temp, timesheet: '', timesheetList: [], multiPickerVisible: false
            }, async () => {
                var resourceData = await GetTSListOnEmpChange(this.props.user, this.state.type, this.state.resource, this.props.baseUrl)
                this.setState({ timesheetList: resourceData.TimesheetList[0] })
            })
        }
        else if (this.state.field == 5) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, timesheet: item.Text, timesheet1: temp, multiPickerVisible: false
            })
        }
    }

    handleClear = () => {
        this.setState({
            client: [], project: [], type: '', resourceName: '', resource: [], timesheet: '',
            resourceList: [], timesheetList: [], resourceList: [], type1: '', resource1: '', timesheet1: '',
        })
    }

    handleShowReport = () => {
        this.setState({ validation: true })
        if (this.state.type == '') { showToast("Select the type.") }
        else if (this.state.resource.length == 0) { showToast("Select the resource.") }
        else if (this.state.timesheet.length == 0) { showToast("Select the timesheet.") }
        else {
            this.setState({ visible: false, validation: false })
            this.searchRecord()
        }
    }

    searchRecord = async () => {
        var timesheetData = await GetDataforApprOnSearch(this.props.user, this.state.type1[0].Text, this.state.resource,
            this.state.timesheet1[0].Value, this.state.clientValue, this.state.projectValue, this.props.baseUrl)

        this.setState({
            timesheetData: timesheetData.EmpTimesheetData[0],
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
            dvTotSun: dvTotSun, TotalTime: TotalTime,
            dataTable: true
        }, () => {
            lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
            TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""
        });
    }

    approveAllRecord = () => {
        this.setState({ validation: true })
        if (this.state.OTP == '') { showToast("Fill-up on time performance.") }
        else if (this.state.resource.length == 0) { showToast("Fill-up Quality of work.") }
        else {
            this.setState({ ratingVisible: false, validation: false })
            this.handleTsEntryId()
        }
    }

    rejectAllRecord = () => {
        this.setState({ validation: true })
        if (this.state.rating3 == '') { showToast("Give the Remark .") }
        else {
            this.setState({ ratingVisible: false, validation: false })
            this.handleTsEntryId()
        }
    }

    handleTsEntryId = () => {
        var tsEntryId = []
        if (this.state.apprActionData.Mon_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Mon_AutoId) }
        if (this.state.apprActionData.Tue_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Tue_AutoId) }
        if (this.state.apprActionData.Wed_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Wed_AutoId) }
        if (this.state.apprActionData.Thu_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Thu_AutoId) }
        if (this.state.apprActionData.Fri_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Fri_AutoId) }
        if (this.state.apprActionData.Sat_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Sat_AutoId) }
        if (this.state.apprActionData.Sun_AutoId !== null) { tsEntryId.push(this.state.apprActionData.Sun_AutoId) }
        this.SaveUpdateApproverActionData(tsEntryId)
    }

    SaveUpdateApproverActionData = async (tsEntryId) => {
        console.log("tsEntryId", tsEntryId, this.state.OTP, this.state.QOW, this.state.rating3);
        var status = ''
        var rating1 = this.state.rating1.length !== 0 ? this.state.rating1[0].Value : ''
        var rating2 = this.state.rating2.length !== 0 ? this.state.rating2[0].Value : ''
        if (this.state.action.toLowerCase() == "approved") {
            status = "Approved";
        } else {
            status = "Saved";
        }
        var data = await SaveUpdateApproverAction(this.props.user, this.state.resource, tsEntryId,
            rating1, rating2, this.state.rating3, this.state.action, status, this.props.baseUrl)
        console.log("ressss", data);

        if (data != null && data != "") {
            console.log("1111");

            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                // validationRemove();

                if (data.SuccessList != undefined) {
                    this.searchRecord()
                    showToast("Action completed sucessfully.");
                }
                else {
                    showToast("Error has an occer.");
                }
            }

            else {
                showToast("Error has an occer.");
            }
        }
    }

    sideDrawerVisible = (status) => {
        this.setState({ visible: status })
    }

    async componentDidMount() {
        var drpTSApproval = await GetDrpDataForTSApproval(this.props.user, this.props.baseUrl)
        this.setState({
            clientList: drpTSApproval.ClientList[0],
            projectList: drpTSApproval.ProjectList[0],
            ratingList1: drpTSApproval.Rating1List[0],
            ratingList2: drpTSApproval.Rating2List[0],
            validation: false,
            visible: true

        })
    }

    render() {

        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <NavigationEvents
                // onDidFocus={() => this.handleShowReport()}
                // onWillBlur={() =>this.pageChange()}
                />
                <View style={[styles.Container, {}]}>

                    <View style={{ height: "7%", backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"Timesheet Approval"}
                            filter={true}
                            sideDrawerVisible={this.sideDrawerVisible}
                        // handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={{ height: "90%", backgroundColor: this.props.secColor }}>
                        <View style={{ flex: 1 }}>
                            <ScrollView>

                                {/* <TouchableOpacity style={{ margin: 20 }} onPress={() => this.setState({ ratingVisible: true, })}>
                                    <View>
                                        <Text>Click</Text>
                                    </View>
                                </TouchableOpacity> */}

                                {this.state.dataTable == true ?
                                    <>
                                        {
                                            this.state.timesheetData.length !== 0 ?
                                                <View style={{ flexDirection: 'row', marginLeft: 5, }}>
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <View style={{ height: 75, backgroundColor: 'transparent' }}>
                                                            <View style={[styles.sheetHeader, { justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.stripHeaderColor }]}>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ fontSize: 18, fontWeight: '900', color: this.props.fontColor }}>{"Project"}</Text>
                                                                    <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"  (Client)"}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={{ fontSize: 16, color: this.props.fontColor }}>{"Description"}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {
                                                            this.state.timesheetData.length !== 0 ?
                                                                <View style={{ flexDirection: 'row', }}>
                                                                    <FlatList
                                                                        data={Object.keys(this.state.timesheetData)}
                                                                        renderItem={({ item }) => (
                                                                            <View style={[styles.sheetData1, { backgroundColor: this.props.stripColor, flexDirection: 'row' }]}>
                                                                                {
                                                                                    this.state.timesheetData[item].ApproverAction == "Rejected" ?
                                                                                        <View style={[styles.rejected, { backgroundColor: "red" }]} /> : null
                                                                                }
                                                                                <TouchableOpacity
                                                                                    onPress={() => this.props.navigation.navigate('ProjectDetail', { "timesheetData": this.state.timesheetData[item], "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData, "Status": this.state.timesheetData[item].Status == "Saved" ? true : false })}
                                                                                >
                                                                                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{this.state.timesheetData[item].ProjectName}</Text>
                                                                                    <Text numberOfLines={1} style={{ color: "#4D504F" }}>{"(" + this.state.timesheetData[item].ClientName + ")"}</Text>
                                                                                    <Text numberOfLines={1} style={{ color: "#4D504F" }}>{this.state.timesheetData[item].TaskDesc}</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        )}
                                                                    />
                                                                </View> : null
                                                        }
                                                    </View>

                                                    <ScrollView style={{ marginBottom: 40 }}
                                                        horizontal={true}
                                                        scrollEnabled={this.state.content}
                                                        showsVerticalScrollIndicator={false}
                                                    >
                                                        <View style={{ flexDirection: 'column', marginRight: 5, }}>
                                                            <View style={{ flexDirection: 'row', height: 75, top: 5, backgroundColor: this.props.stripHeaderColor }}>
                                                                {
                                                                    this.state.type == "Pending" ? null :
                                                                        <>
                                                                            <View style={[styles.OTP, { backgroundColor: this.props.stripHeaderColor }]}>
                                                                                <Text style={{ color: this.props.fontColor }}>{"ON TIME"}</Text>
                                                                                <Text style={{ color: this.props.fontColor }}>{"PERFORMANCE"}</Text>
                                                                            </View>
                                                                            <View style={[styles.approver, { backgroundColor: this.props.stripHeaderColor }]}>
                                                                                <Text style={{ color: this.props.fontColor }}>{"QUALITY  OF"}</Text>
                                                                                <Text style={{ color: this.props.fontColor }}>{"WORK"}</Text>
                                                                            </View>
                                                                        </>
                                                                }
                                                                {
                                                                    this.state.type == "Pending" ?
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripHeaderColor }]}>
                                                                            {/* <Text style={{ color: this.props.fontColor }}>{this.state.lblMon}</Text>
                                                                    <Text style={{ color: this.props.fontColor }}>{this.state.dvTotMon}</Text> */}
                                                                        </View>
                                                                        : null
                                                                }
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

                                                            </View>
                                                            {/* <View style={{ flexDirection: 'row',  marginRight: 5 }}> */}
                                                            <FlatList
                                                                data={Object.keys(this.state.timesheetData)}
                                                                renderItem={({ item, index }) => (
                                                                    <View style={{ flexDirection: 'row', }}>
                                                                        {
                                                                            this.state.type == "Pending" ? null :
                                                                                <>
                                                                                    <View style={[styles.OTP, { backgroundColor: this.props.stripColor, flexDirection: 'row' }]}>
                                                                                        <Text>{this.state.timesheetData[item].ApprOTPRating}</Text>
                                                                                    </View>
                                                                                    <View style={[styles.approver, { backgroundColor: this.props.stripColor, flexDirection: 'row' }]}>
                                                                                        <Text>{this.state.timesheetData[item].ApprQOWRating}</Text>
                                                                                        <TouchableOpacity style={{ height: 40, width: 40, left: 20, }} onPress={() =>
                                                                                            this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: this.state.timesheetData[item].ApproverRemarks },
                                                                                                () => { })}>
                                                                                            <Image style={{ height: 40, width: 40, position: 'relative' }} source={require("../Assets/msgbg.png")} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </>
                                                                        }
                                                                        {
                                                                            this.state.type == "Completed" ? null :
                                                                                <>
                                                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                                        <TouchableOpacity onPress={() =>
                                                                                            this.setState({ ratingVisible: true, action: 'Approved', apprActionData: this.state.timesheetData[item], },
                                                                                                () => { })}>
                                                                                            <Image style={styles.img1} source={require('../Assets/greenTick.png')} />
                                                                                        </TouchableOpacity>
                                                                                        <TouchableOpacity onPress={() =>
                                                                                            this.setState({ ratingVisible: true, action: 'Rejected', apprActionData: this.state.timesheetData[item], },
                                                                                                () => { })}>
                                                                                            <Image style={styles.img} source={require('../Assets/cross.png')} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </>
                                                                        }
                                                                      
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Mon', dayIndex: index, dayField: 1, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Mon== ""? '--:--': this.state.timesheetData[item].Mon}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                            //  onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Mon_TaskComments, addDescField: 1, addDescIndex: index })}
                                                                                >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Tue', dayIndex: index, dayField: 2, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Tue == ""? '--:--': this.state.timesheetData[item].Tue}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                            //  onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Tue_TaskComments, addDescField: 2, addDescIndex: index })}
                                                                                   >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Wed', dayIndex: index, dayField: 3, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Wed == ""? '--:--': this.state.timesheetData[item].Wed}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity 
                                                                            // onPress={() =>this.setState({ addDescVisible: true, descEdit: false, addDesc: this.state.timesheetData[item].Wed_TaskComments, addDescField: 3, addDescIndex: index })}
                                                                                >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Thu', dayIndex: index, dayField: 4, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Thu == ""? '--:--': this.state.timesheetData[item].Thu}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                            //  onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Thu_TaskComments, addDescField: 4, addDescIndex: index }}
                                                                                >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Fri', dayIndex: index, dayField: 5, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Fri == ""? '--:--': this.state.timesheetData[item].Fri}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity 
                                                                            // onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Fri_TaskComments, addDescField: 5, addDescIndex: index }}
                                                                                >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Sat', dayIndex: index, dayField: 6, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Sat == ""? '--:--': this.state.timesheetData[item].Sat}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity 
                                                                            // onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Sat_TaskComments, addDescField: 6, addDescIndex: index }}
                                                                            >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                                            <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.timesheetData[item].Status == "Saved" ? true : false, dayField: 'Sun', dayIndex: index, dayField: 7, }) }}
                                                                                style={[styles.hrsData, { backgroundColor: this.state.timesheetData[item].Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                <Text>{this.state.timesheetData[item].Sun == ""? '--:--': this.state.timesheetData[item].Sun}</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity 
                                                                            // onPress={() =>this.setState({ addDescVisible: true, descEdit: this.state.timesheetData[item].Status == "Saved" ? true : false, addDesc: this.state.timesheetData[item].Sun_TaskComments, addDescField: 7, addDescIndex: index }}
                                                                                   >
                                                                                <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                                            </TouchableOpacity>
                                                                        </View>

                                                                    </View>
                                                                )}
                                                            />

                                                            {/* </View> */}
                                                        </View>

                                                        <Dialog
                                                            visible={this.state.addDescVisible}
                                                            style={{ backgroundColor: 'white', height: 250, width: 350 }}
                                                            onTouchOutside={() => this.setState({ addDescVisible: false })}

                                                        >
                                                            <View style={{ backgroundColor: 'white', height: 300, width: 400, bottom: 25, right: 25 }}>
                                                                <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                                    <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.rating == true ? "Rating" : 'Additional Description'}</Text>
                                                                </View>
                                                                <View style={{ justifyContent: 'center', alignItems: 'center', right: 25 }}>
                                                                    <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                                        <TextInput
                                                                            multiline={true}
                                                                            editable={false}
                                                                            value={this.state.rating == true ? this.state.ratingText : this.state.addDesc}
                                                                            // placeholder="Enter Description"
                                                                            textAlignVertical="top"
                                                                            underlineColor="white"
                                                                            keyboardType="default"
                                                                            autoFocus={false}
                                                                            style={styles.longText}
                                                                        // dense
                                                                        // onChangeText={value => this.setState({ addDesc: value, description: value })}
                                                                        // onChangeText={value => this.handleAddDescription({ value})}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </Dialog>

                                                    </ScrollView>
                                                </View> : null
                                        }
                                    </>
                                    : null
                                }
                                <SheetSide
                                    visible={this.state.visible}
                                    // widthPercentage={50}
                                    onBackdropPress={() => this.setState({ visible: false })}
                                    onSwipeRight={() => this.setState({ visible: false })}>
                                    <View style={{ flexDirection: 'row', padding: 20, backgroundColor: this.props.secColor, bottom: 20 }}>
                                        <Image
                                            source={require('../Assets/done.png')}
                                            style={{ width: 20, height: 23, marginRight: 15 }}
                                        />
                                        <Text style={{ fontSize: title }}>Filter Criteria</Text>
                                    </View>
                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Client List", multiPickerVisible: true,
                                            field: 1, data: this.state.clientList, selectedVal: this.state.client, arrayholder: this.state.clientList
                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>CLIENT</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.client == '' ? "--select--" : this.state.client[1] == null ? this.state.client[0].Text : this.state.client[0].Text + ", " + this.state.client[1].Text}</Text>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Project List", multiPickerVisible: true, data: this.state.projectList, field: 2, selectedVal: this.state.project, arrayholder: this.state.projectList,
                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.project == '' ? "--select--" : this.state.project[1] == null ? this.state.project[0].Text : this.state.project[0].Text + ", " + this.state.project[1].Text}</Text>
                                        </TouchableOpacity>
                                    </Card>

                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.type == '' ? 'red' : "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Type", multiPickerVisible: true, field: 3, data: Type, type: this.state.type, selectedVal: this.state.type1, arrayholder: Type,

                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TYPE</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.type == '' ? "--select--" : this.state.type}</Text>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.resourceName == '' ? 'red' : "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Resource", data: this.state.resourceList, multiPickerVisible: true, field: 4, selectedVal: this.state.resource1, arrayholder: this.state.resourceList,

                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>RESOURCE</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>{this.state.resource == '' ? "--select--" : this.state.resourceName}</Text>
                                        </TouchableOpacity>
                                    </Card>

                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.timesheet == 0 ? 'red' : "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({ title: "Timesheet", multiPickerVisible: true, field: 5, data: this.state.timesheetList, selectedVal: this.state.timesheet1, arrayholder: this.state.timesheetList })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TIMESHEET</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F" }]}>
                                                {this.state.timesheet == '' ? "--select--" :
                                                    moment(new Date(this.state.timesheet.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM")
                                                    + ' - ' + moment(new Date(this.state.timesheet.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY")}</Text>
                                        </TouchableOpacity>
                                    </Card>

                                    <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-evenly' }}>
                                        <Button mode="contained" style={{ height: 40, width: 150, margin: 15, backgroundColor: this.props.primaryColor }}
                                            onPress={this.handleShowReport}>
                                            Search
                                        </Button>
                                        <Button mode="contained" style={{ height: 40, width: 150, margin: 15, backgroundColor: this.props.primaryColor }}
                                            onPress={this.handleClear}>
                                            Clear
                                        </Button>
                                    </View>
                                </SheetSide>

                                <Dialog
                                    visible={this.state.ratingVisible}
                                    style={{ backgroundColor: 'white', height: this.state.action == "Approved" ? 440 : 300, width: 400 }}
                                    onTouchOutside={() => this.setState({ ratingVisible: false, validation: false })}

                                >
                                    <View style={{ height: this.state.action == "Approved" ? 440 : 300, width: 400, bottom: 25, right: 25, backgroundColor: 'transparent' }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Rating'}</Text>
                                        </View>
                                        {/* <KeyboardAwareScrollView> */}
                                        <View style={{ display: 'flex', marginTop: 5, padding: 10, flexDirection: 'column', }}>
                                            {
                                                this.state.action == "Approved" ?
                                                    <>
                                                        <View style={{ elevation: 3, borderWidth: .5, borderColor: this.state.validation == true && this.state.rating1.length == 0 ? 'red' : "transparent", borderRadius: 5, width: 350, height: 60, marginBottom: 5, margin: 5 }}>
                                                            <TouchableOpacity onPress={() => this.setState({
                                                                title: "On time performance", multiPickerVisible1: true,
                                                                field: 1, data: this.state.ratingList1, selectedVal: this.state.rating1
                                                            })}
                                                                style={[styles.cardMenuSpasing, {}]}>
                                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ON TIME PERFORMANCE</Text>
                                                                <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.rating1.length == 0 ? "--select--" : this.state.rating1[0].Text}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ elevation: 3, borderWidth: .5, borderColor: this.state.validation == true && this.state.rating1.length == 0 ? 'red' : "transparent", borderRadius: 5, width: 350, height: 60, marginBottom: 5, margin: 5 }}>
                                                            <TouchableOpacity onPress={() => this.setState({
                                                                title: "Quality of work", multiPickerVisible1: true,
                                                                field: 2, data: this.state.ratingList2, selectedVal: this.state.rating2,
                                                            })}
                                                                style={[styles.cardMenuSpasing, {}]}>
                                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>QUALITY OF WORK</Text>
                                                                <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.rating2.length == 0 ? "--select--" : this.state.rating2.length == 0 ? "--select--" : this.state.rating2[0].Text}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </> : null
                                            }
                                            <View style={{ elevation: 3, borderWidth: .5, borderColor: this.state.action == "Rejected" && this.state.validation == true && this.state.rating3 !== null ? 'red' : "transparent", borderRadius: 5, width: 350, height: 150, marginBottom: 5, margin: 5 }}>
                                                <TouchableOpacity style={[styles.cardMenuSpasing, {}]}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>REMARK</Text>
                                                    {/* <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}> */}
                                                    <TextInput
                                                        multiline={true}
                                                        // numberOfLines={3}
                                                        value={this.state.rating3}
                                                        placeholder="Enter Remark"
                                                        textAlignVertical="top"
                                                        underlineColor="white"
                                                        keyboardType="default"
                                                        autoFocus={false}
                                                        style={{ paddingStart: 8, height: 130 }}
                                                        dense
                                                        onChangeText={value => this.setState({ rating3: value, })}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            {/* <Divider style={{ borderWidth: .3 }} /> */}
                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10, margin: 5, width: 350 }}>
                                                {
                                                    this.state.action !== 'Approved' ?
                                                        <Button mode="contained" style={{ height: 40, width: 150, backgroundColor: this.props.primaryColor }}
                                                            onPress={this.rejectAllRecord}>
                                                            reject
                                                     </Button>
                                                        :
                                                        <Button mode="contained" style={{ height: 40, width: 150, backgroundColor: this.props.primaryColor }}
                                                            onPress={this.approveAllRecord}>
                                                            approve
                                                     </Button>
                                                }

                                            </View>
                                        </View>
                                        {/* </KeyboardAwareScrollView> */}

                                    </View>
                                </Dialog>

                                <Dialog
                                    visible={this.state.multiPickerVisible1}
                                    style={{ backgroundColor: 'white', width: 300, height: 350 }}
                                    onTouchOutside={() => this.setState({ multiPickerVisible1: false, selectedVal: [] }, () => { })}

                                >
                                    <View style={{ backgroundColor: 'transparent', height: 350, bottom: 25, right: 24, width: 300 }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                        </View>

                                        <View style={{ backgroundColor: 'transparent', flex: 1, margin: 5 }}>
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
                                                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', margin: 5 }}
                                                                onPress={() => { this.handleRating(this.state.data[item]) }
                                                                }>

                                                                <View style={{ width: '90%', backgroundColor: 'transparent', borderBottomWidth: .2 }}>
                                                                    <Text style={{ padding: 5, fontSize: 16, color: "#4D504F" }}>
                                                                        {this.state.data[item].Text}</Text>
                                                                </View>
                                                                <View style={{ width: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                                                    {
                                                                        this.state.selectedVal.length == 0 ? null : this.state.selectedVal.includes(this.state.data[item]) ?
                                                                            <Image
                                                                                source={require('../Assets/tick.png')}
                                                                                style={{ width: 20, height: 23, marginRight: 15, padding: 5, tintColor: "#4D504F" }}
                                                                            /> : null
                                                                    }
                                                                </View>
                                                                <Divider />
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                            }
                                        </View>
                                    </View>
                                </Dialog>

                                <Dialog
                                    visible={this.state.multiPickerVisible}
                                    style={{ backgroundColor: 'white', width: 350, height: 400 }}
                                    onTouchOutside={() => this.setState({ multiPickerVisible: false, selectedVal: [] }, () => { })}

                                >
                                    <View style={{ backgroundColor: 'transparent', height: 400, bottom: 25, right: 24, width: 350 }}>
                                        <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                        </View>

                                        {this.state.field == 1 || this.state.field == 2 ?
                                            <>
                                                <TextInput style={{ height: 40, margin: 5, borderWidth: .3, borderRadius: 3, padding: 5 }}
                                                    underlineColorAndroid="transparent"
                                                    placeholder="Search here.."
                                                    autoCapitalize="none"
                                                    onChangeText={text => this.searchFilterFunction(text)}
                                                />
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 5, marginRight: 5, backgroundColor: 'white', }}>
                                                    <TouchableOpacity style={styles.header3}
                                                        onPress={() => this.handleSelectAll()}>
                                                        <Text style={styles.text3}>Select All</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.header3}
                                                        onPress={() => this.handleDeSelectAll()}>
                                                        <Text style={styles.text3}>Deselect All</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Divider style={{ height: 1 }} />
                                            </>
                                            : null
                                        }

                                        <View style={{ backgroundColor: 'transparent', flex: 1, margin: 5 }}>
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
                                                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', margin: 5 }}
                                                                onPress={() => { this.handleSelectedData(this.state.data[item], index) }
                                                                }>

                                                                <View style={{ width: '90%', backgroundColor: 'transparent', borderBottomWidth: .2 }}>
                                                                    <Text style={{ padding: 5, fontSize: 16, color: "#4D504F" }}>
                                                                        {this.state.field !== 5 ? this.state.data[item].Text
                                                                            :
                                                                            moment(new Date(this.state.data[item].Text.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM")
                                                                            + ' - ' + moment(new Date(this.state.data[item].Text.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY")}</Text>
                                                                </View>
                                                                <View style={{ width: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                                                    {
                                                                        this.state.selectedVal.length == 0 ? null : this.state.selectedVal.includes(this.state.data[item]) ?
                                                                            <Image
                                                                                source={require('../Assets/tick.png')}
                                                                                style={{ width: 20, height: 23, marginRight: 15, padding: 5, tintColor: "#4D504F" }}
                                                                            /> : null
                                                                    }
                                                                </View>
                                                                <Divider />
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                            }
                                        </View>

                                    </View>
                                </Dialog>

                            </ScrollView>
                        </View>
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
        elevation: 3,
        borderRadius: 5,
        margin: 10,
        width: "48%",
        height: 60,
        bottom: 10
    },
    cards: {
        elevation: 3,
        borderRadius: 5,
        margin: 10,
        // width: "48%",
        height: 60,
        bottom: 10
    },
    cardMenuSpasing: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 5
    },
    singleCardLabel: {
        fontSize: 14,
        // color: '#F2721C',
        paddingStart: 8
    },
    longText: { backgroundColor: 'white', fontSize: 16, marginEnd: 10, padding: 10, color: "#4D504F" },
    horizontalContainer: { flexDirection: 'row', margin: 10, backgroundColor: 'pink' },

    twoCardLabel1: {
        fontSize: 16,
        // color: '#F2721C',
        paddingStart: 12
    },
    img: {
        width: 30,
        height: 30,
        margin: 3,
        // tintColor: '#FFFF'
    },
    img1: {
        width: 40,
        height: 40,
        margin: 3,
        // tintColor: '#FFFF'
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
    header3: {
        width: '47%',
        borderWidth: 1,
        padding: 3,
        borderColor: '#C1C0B9',
        borderRadius: 3,
        height: 40,
        margin: 6,
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
        fontSize: cardTitle,
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
        height: 75,
        width: "auto",
        marginTop: 5,
        // left: 2,
        marginBottom: 5,
    },
    rejected: {
        // padding: 10,
        height: 80,
        width: 2,
        marginTop: 5,
        marginBottom: 5,
        bottom: 10
        // borderWidth: .3,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    sheetData1: {
        padding: 10,
        height: 80,
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        // bottom: 10
        // borderWidth: .3,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text3: {
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 17,
        top: 3,
        color: "#4D504F"
        // backgroundColor:'red'
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
        height: 80,
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
        height: 80,
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