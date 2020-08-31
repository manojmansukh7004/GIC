import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, TextInput, Image, StatusBar, StyleSheet, Dimensions, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, Card, Button } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { connect } from 'react-redux'
import { Dialog, SheetBottom, Checkbox, SheetSide, } from 'material-bread';
import { NavigationEvents } from 'react-navigation';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon1 from 'react-native-vector-icons/Ionicons';

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
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
var Status = '', selectedRow = ''

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
            orientation: '',
            projectName: "",
            clientName: "",
            data: [],
            client: [],
            project: [],
            deliverType: [],
            projectGroup: [],
            clientValue: [],
            deliverTypeValue:[],
            projectGroupValue:[],
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
            deliverTypeList: [],
            projectGroupList: [],
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
            actionVisible: false,
            singleRecord: false,
            autoId: '',
            action: '',
            RatingText: '',
            rating: false,
            rating1: [],
            rating2: [],
            rating3: '',
            QOW: [],
            OTP: [],
            apprActionData: [],
            selectionMode: false,
            multiselector: false,
            selectedData: [],
            SelectedEntryId: [],
            loading: false,
            daysData: [],
            details: [],
            Status: '',
            field:''
        }
    }

    handleSelectAll = () => {
        if (this.state.field == 1) {
            var selectedNode = []
            Object.getOwnPropertyNames(this.state.data).map((key, index) => (
                selectedNode.push(this.state.data[key].Value)
            ))
            this.setState({ selectedVal: this.state.clientList, client: this.state.clientList, clientValue: selectedNode, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                async () => {
                    var projectData = await GetDataOnClientChange(this.props.user, this.state.clientValue, this.props.baseUrl)
                    this.setState({ projectList: projectData.ProjectList[0] })
                })
        }
        else if (this.state.field == 11) {
            var selectedNode = []
            Object.getOwnPropertyNames(this.state.data).map((key, index) => (
                selectedNode.push(this.state.data[key].Value)
            ))
            this.setState({ selectedVal: this.state.deliverTypeList, deliverType: this.state.deliverTypeList, deliverTypeValue: selectedNode, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                async () => {
                    var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                    this.setState({ projectList: projectData.ProjectList[0] })
                })
        }
        else if (this.state.field == 12) {
            var selectedNode = []
            Object.getOwnPropertyNames(this.state.data).map((key, index) => (
                selectedNode.push(this.state.data[key].Value)
            ))
            this.setState({ selectedVal: this.state.projectGroupList, projectGroup: this.state.projectGroupList, projectGroupValue: selectedNode, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                async () => {
                    var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                    this.setState({ projectList: projectData.ProjectList[0] })
                })
        }
        else if (this.state.field == 2) {
            var selectedNode = []
            Object.getOwnPropertyNames(this.state.data).map((key, index) => (
                selectedNode.push(this.state.data[key].Value)
            ))
            this.setState({ selectedVal: this.state.projectList, project: this.state.projectList, projectValue: selectedNode, type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] })
            // this.setState({ project: this.state.projectList, selectedVal: this.state.projectList }, () => { this.handleSelectedData() })
        }
    }

    handleDeSelectAll = () => {
        if (this.state.field == 1) {
            this.setState({ client: [], selectedVal: [] })
        }
        else if (this.state.field == 2) {
            this.setState({ project: [], selectedVal: [] })
        }
        else if (this.state.field == 11) {
            this.setState({ deliverType: [], selectedVal: [] })
        }
        else if (this.state.field == 12) {
            this.setState({ projectGroup: [], selectedVal: [] })
        }
    }

    searchFilterFunction =
    
        text => {
            this.setState({
                value: text,
            });
            console.log( this.state.arrayholder)
            
                const newData = this.state.arrayholder.filter(item => {
                    const itemData =  this.state.field==11 || this.state.field ==12 ? `${item.Text.toUpperCase()} ${item.Value}` : ` ${item.Text.toUpperCase()} ${item.Value.toUpperCase()} `
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            
          

            this.setState({
                data: newData,
            });
        };

        searchFilterFunction1 =
    
        text => {
            this.setState({
                value: text,
            });
            console.log( this.state.arrayholder)

            const newData = this.state.arrayholder.filter(item => {
                const itemData = `${item.Text.toUpperCase()} ${item.Value} `;
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

    }

    handleSelectedData = (item, index) => {
        if (this.state.field == 11) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.deliverType.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.deliverTypeValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, deliverType: selectedNode, deliverTypeValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })
                    })
            }
            else {
                var selectedNode = this.state.deliverType.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.deliverTypeValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, deliverType: selectedNode, deliverTypeValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        console.log("projectData",projectData)
                        
                        this.setState({ projectList: projectData.ProjectList[0] })

                    })
            }
        }
        if (this.state.field == 12) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.projectGroup.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.projectGroupValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, projectGroup: selectedNode, projectGroupValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })
                    })
            }
            else {
                var selectedNode = this.state.projectGroup.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.projectGroupValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, projectGroup: selectedNode, projectGroupValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })

                    })
            }
        }

        if (this.state.field == 1) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.client.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.clientValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, client: selectedNode, clientValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })
                    })
            }
            else {
                var selectedNode = this.state.client.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.clientValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, client: selectedNode, clientValue: selectedNode2, project: [], type: '', resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] },
                    async () => {
                        var projectData = await GetDataOnClientChange(this.props.user,this.state.deliverTypeValue,this.state.projectGroupValue, this.state.clientValue, this.props.baseUrl)
                        this.setState({ projectList: projectData.ProjectList[0] })

                    })
            }
        }
        else if (this.state.field == 2) {
            if (this.state.selectedVal.includes(item)) {
                var selectedNode = this.state.project.filter(element => element !== item)
                var selectedNode1 = this.state.selectedVal.filter(element => element !== item)
                var selectedNode2 = this.state.projectValue.filter(element => element !== item.Value)
                this.setState({ selectedVal: selectedNode1, project: selectedNode, projectValue: selectedNode2, type: '',type1:[], resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] })
            }
            else {
                var selectedNode = this.state.project.concat(item)
                var selectedNode1 = this.state.selectedVal.concat(item)
                var selectedNode2 = this.state.projectValue.concat(item.Value)
                this.setState({ selectedVal: selectedNode1, project: selectedNode, projectValue: selectedNode2, type: '', type1:[], resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: [] })
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
            dataTable: false, projectGroupList:[], projectGroup:[] ,deliverTypeValue:[], deliverType:[], deliverTypeList:[], 
            client: [], project: [], type: '', resourceName: '', resource: [], timesheet: '', timesheetData: [],
            resourceList: [], timesheetList: [], resourceList: [], type1: '', resource1: '', timesheet1: '', visible: true
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
        this.setState({ validation: true, loading: true })
        if (this.state.OTP == '') { showToast("Fill-up on time performance.") }
        else if (this.state.resource.length == 0) { showToast("Fill-up Quality of work.") }
        else {
            this.setState({ ratingVisible: false, validation: false, daysVisible: false })
            if (this.state.singleRecord == true) {

                this.SaveUpdateApproverActionData(this.state.autoId)
            }
            else if (this.state.multiselector == true) {
                this.handleMultipleTsEntryId()
            }
            else {
                this.handleTsEntryId()
            }
        }
    }

    rejectAllRecord = () => {
        this.setState({ validation: true, loading: true })
        if (this.state.rating3 == '') { showToast("Give the Remark .") }
        else {
            this.setState({ ratingVisible: false, validation: false, daysVisible: false })
            if (this.state.singleRecord == true) {
                console.log("aaaaaaa", this.state.autoId, this.state.action);

                this.SaveUpdateApproverActionData(this.state.autoId)
            }
            else if (this.state.multiselector == true) {
                this.handleMultipleTsEntryId()
            }
            else {
                this.handleTsEntryId()
            }
        }
    }

    handleMultipleTsEntryId = () => {
        var tsEntryId = []
        for (var i = 0; i < this.state.selectedData.length; i++) {
            if (this.state.selectedData[i].Mon_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Mon_AutoId) }
            if (this.state.selectedData[i].Tue_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Tue_AutoId) }
            if (this.state.selectedData[i].Wed_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Wed_AutoId) }
            if (this.state.selectedData[i].Thu_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Thu_AutoId) }
            if (this.state.selectedData[i].Fri_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Fri_AutoId) }
            if (this.state.selectedData[i].Sat_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Sat_AutoId) }
            if (this.state.selectedData[i].Sun_AutoId !== null) { tsEntryId.push(this.state.selectedData[i].Sun_AutoId) }
        }
        this.SaveUpdateApproverActionData(tsEntryId)
        this.setState({ selectedData: [], })
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

    SaveUpdateApproverActionData = async (EntryId) => {
        var status = ''
        var rating1 = this.state.rating1.length !== 0 ? this.state.rating1[0].Value : ''
        var rating2 = this.state.rating2.length !== 0 ? this.state.rating2[0].Value : ''
        if (this.state.action.toLowerCase() == "approved") {
            status = "Approved";
        } else {
            status = "Saved";
        }
        var data = await SaveUpdateApproverAction(this.props.user, this.state.resource, EntryId,
            rating1, rating2, this.state.rating3, this.state.action, status, this.props.baseUrl)

        if (data != null && data != "") {

            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                // validationRemove();

                if (data.SuccessList != undefined) {
                    this.searchRecord()
                    showToast("Action completed sucessfully.");
                    this.setState({ rating1: [], rating2: [], rating3: '', loading: false })
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

    handleLongClick = (item) => {
        this.setState({ selectionMode: true, multiselector: true })
        this.handleSelectionNode(item)
    };

    handleSelectionNode = (item) => {
        // if (this.state.selectedVal.includes(item)) {
        //     var selectedNode = this.state.project.filter(element => element !== item)
        if (this.state.selectedData.includes(item)) {
            var selectedNode = this.state.selectedData.filter(element => element !== item)
            this.setState({ selectedData: selectedNode }, () => {

                if (this.state.selectedData.length == 0) {
                    this.setState({ selectionMode: false, multiselector: false }, () => {
                    })
                }
            })
        }
        else {
            var selectedNode = this.state.selectedData.concat(item)
            this.setState({ selectedData: selectedNode }, () => {
            })
        }
    }



    handledata = (item, index) => {
        var arr = [], details = []
        arr.push({ date: this.state.lblMon, addDescField: 1, Status: item.Status, time: item.Mon, entryId: item.Mon_AutoId, comment: item.Mon_TaskComments, day: "Mon" })
        arr.push({ date: this.state.lblTue, addDescField: 2, Status: item.Status, time: item.Tue, entryId: item.Tue_AutoId, comment: item.Tue_TaskComments, day: "Tue" })
        arr.push({ date: this.state.lblWed, addDescField: 3, Status: item.Status, time: item.Wed, entryId: item.Wed_AutoId, comment: item.Wed_TaskComments, day: "Wed" })
        arr.push({ date: this.state.lblThu, addDescField: 4, Status: item.Status, time: item.Thu, entryId: item.Thu_AutoId, comment: item.Thu_TaskComments, day: "Thu" })
        arr.push({ date: this.state.lblFri, addDescField: 5, Status: item.Status, time: item.Fri, entryId: item.Fri_AutoId, comment: item.Fri_TaskComments, day: "Fri" })
        arr.push({ date: this.state.lblSat, addDescField: 6, Status: item.Status, time: item.Sat, entryId: item.Sat_AutoId, comment: item.Sat_TaskComments, day: "Sat" })
        arr.push({ date: this.state.lblSun, addDescField: 7, Status: item.Status, time: item.Sun, entryId: item.Sun_AutoId, comment: item.Sun_TaskComments, day: "Sun" })

        details.push({ ProjectName: item.ProjectName, ClientName: item.ClientName, Status: item.Status, ApprOTPRating: item.ApprOTPRating, ApprQOWRating: item.ApprQOWRating, })

        this.setState({ ratingVisible: false, daysData: arr, details: details, projectName: item.ProjectName, clientName: item.ClientName, dayIndex: index }, () => {
            console.log("mjjjjjj", this.state.details);

            this.setState({ daysVisible: true, ratingVisible: false })
        })

    }

    renderItem = (data) => (

        Status = data.item.Status,
        // this.setState({Status: data.item.Status},()=>{
        console.log("Status", Status),
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
                    <View style={{ flexDirection: "row", width: data.item.Status !== 'Saved' && data.item.Status !== 'Submitted' ? '70%' : '100%', backgroundColor: 'transparent' }} >
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
                        data.item.Status !== 'Saved' && data.item.Status !== 'Submitted' ?
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
                            :
                            null
                        // <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '20%', backgroundColor: 'transparent' }}>
                        //     <Text numberOfLines={1} style={{ color: data.item.Status == 'Saved' ? 'red' : "green" }}>{data.item.Status}</Text>
                        // </View>
                    }
                </>
            </TouchableHighlight>
        </>
        // })
    );


    renderItem1 = (data) => (

        <>
            <TouchableHighlight
                onPress={() => { this.handledata(data.item, data.index) }}
                // style={[styles.sheetData1, { flexDirection: 'row', backgroundColor: this.props.stripColor, flexDirection: 'row', padding: data.item.ApproverAction !== "Rejected" ? 10 : null }]}
                underlayColor={'#AAA'}
            >
                <>
                {
                    console.log("ssssss",this.state.daysData.time)
                    
                }
                    <Card elevation={2} style={styles.container} >
                        <View style={styles.flexRow}>
                            <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                            <View style={styles.view}>
                                <View style={styles.flexRow1}>
                                    <View style={{ width: "60%" }}>
                                        <Text style={{ fontSize: 16 }}>{data.item.date}</Text>
                                    </View>
                                    <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.setState({ timeVisible: data.item.Status == "Saved" ? true : false, dayField: 'Tue', dayField: this.state.daysData.dayField, }) }}
                                            style={[styles.hrsData, { backgroundColor: data.item.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                            <Text style={{ fontSize: 16 }}>{data.item.time == "" ? "--:--" : data.item.time}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                            this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: data.item.comment, addDescField: this.state.daysData.dayField, },
                                                () => { })}>
                                            <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Card>
                </>
            </TouchableHighlight>
        </>
    );
    renderHiddenItem = (data, rowMap) => (
        //      <Card elevation={2} style={styles.container} onPress={this.onPress}>

        <View style={[styles.rowBack, { height: 99, width: '99%', }]}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProjectDetail', {"Type": this.state.type , "backNavigation": "TsApproval", "timesheetData": data.item, "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData, "Status": data.item.Status == "Saved" ? true : false })}
            >
                <Text style={[styles.backTextWhite, { color: this.props.textColor }]}>Details</Text>
            </TouchableOpacity>

            {
                data.item.Status == "Approved" ?
                    <>
                        <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnLeft, { backgroundColor: 'transparent' }]}
                        >
                            {/* <Text style={[styles.backTextWhite, { marginTop: 3, marginBottom: 3, color: 'blue' }]}>Approver</Text> */}
                            <Text numberOfLines={3} style={[styles.backTextWhite, { color: 'green', fontSize: 16 }]}>{data.item.Status}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight, { justifyContent: 'center', alignItems: 'center' }]}
                            onPress={() => this.setState({ addDescVisible: true, descEdit: false, rating: true, ratingText: data.item.ApproverRemarks })}
                        >
                            <Image style={{ height: 50, width: 50, left: 5 }} source={require("../Assets/msgbg.png")} />
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnLeft]}
                            onPress={() => this.setState({ ratingVisible: true, action: 'Approved', apprActionData: data.item })}
                        >
                            <Image
                                source={require('../Assets/greenTick.png')}
                                style={{ width: 52, height: 52, }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnRight1]}
                            onPress={() => this.setState({ ratingVisible: true, action: 'Rejected', apprActionData: data.item })}
                        >
                            <Image
                                source={require('../Assets/cross.png')}
                                style={{ width: 40, height: 40, }}
                            />
                        </TouchableOpacity>
                    </>
            }

        </View>
    );

    renderHiddenItem1 = (data, rowMap) => (
        console.log("ddddddddddddddddd", data),


        <View style={[styles.rowBack, { borderRadius: 10, height: 60, margin: 5, width: this.state.orientation == 'landscape' ? '100%' : 'auto', }]}>
            {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProjectDetail', { "timesheetData": data.item, "headerData": this.state.headerData, "headerHrsData": this.state.headerHrsData, "Status": data.item.Status == "Saved" ? true : false })}
            >
                <Text style={[styles.backTextWhite, { color: this.props.textColor }]}>Details</Text>
            </TouchableOpacity> */}

            {
                Status == "Approved" ?
                    <>
                        {/* <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnLeft, { backgroundColor: 'transparent' }]}
                        >
                            <Text style={[styles.backTextWhite, { marginTop: 3, marginBottom: 3, color: 'blue' }]}>Approver</Text>
                            <Text numberOfLines={3} style={[styles.backTextWhite, { color: 'green', fontSize: 16 }]}>{data.item.Status}</Text>

                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={[styles.backRightBtn11, styles.backRightBtnRight, { justifyContent: 'center', alignItems: 'center' }]}
                        >
                            <Text numberOfLines={3} style={[styles.backTextWhite, { color: 'green', fontSize: 16 }]}>{data.item.Status}</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnLeft]}
                            onPress={() => this.setState({ singleRecord: true, ratingVisible: data.item.time !== "" && data.item.time !== null ? true : false, action: 'Approved', autoId: data.item.entryId, })}
                        >
                            <Image
                                source={require('../Assets/greenTick.png')}
                                style={{ width: 47, height: 47, }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn1, styles.backRightBtnRight1]}
                            onPress={() => this.setState({ singleRecord: true, ratingVisible: data.item.time !== "" && data.item.time !== null ? true : false, action: 'Rejected', autoId: data.item.entryId })}
                        >
                            <Image
                                source={require('../Assets/cross.png')}
                                style={{ width: 35, height: 35 }}
                            />
                        </TouchableOpacity>
                    </>
            }

        </View>
    );
    async componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
        var drpTSApproval = await GetDrpDataForTSApproval(this.props.user, this.props.baseUrl)
        this.setState({
            clientList: drpTSApproval.ClientList[0],
            projectList: drpTSApproval.ProjectList[0],
            deliverTypeList: drpTSApproval.DeliverType[0],
            projectGroupList: drpTSApproval.ProjectGroup[0],
            ratingList1: drpTSApproval.Rating1List[0],
            ratingList2: drpTSApproval.Rating2List[0],
            validation: false,
            visible: true,
            // ratingVisible: true,

            // action: 'Approved'
        })
    }

    render() {

        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <NavigationEvents
                    onDidFocus={() => this.props.navigation.state.params.Loading == true ? this.handleClear() : null}
                // onWillBlur={() =>this.handleClear()}
                />
                <View ref="rootView" style={[styles.Container, {}]}>
                    <View style={{ height: this.state.orientation == 'landscape' ? '11%' : '7%', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"Subordinate's Timesheet"}
                            filter={true}
                            sideDrawerVisible={this.sideDrawerVisible}
                        // handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={[styles.container1, { height: this.state.orientation == 'landscape' ? '86%' : '90%', backgroundColor: this.props.secColor }]}>
                        <ScrollView
                            style={{ marginBottom: 5 }}
                            showsVerticalScrollIndicator={false}>

                            {this.state.dataTable == true ?
                                <>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                                        <View style={{ width: '50%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={styles.totalHrs}> {this.state.resourceName}</Text>
                                        </View>
                                        <View style={{ borderWidth: 1, margin: 5, borderRadius: 3, borderColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                                            {/* <Image style={{ height: 20, width: 20, marginLeft: 5, tintColor: 'white' }} source={require("../Assets/calendar.png")} /> */}
                                            <Text style={styles.text}> {this.state.timesheet == '' ? "--select--" :
                                                moment(new Date(this.state.timesheet.slice(0, 10).split('-').reverse().join('/'))).format("DD MMM")
                                                + ' - ' + moment(new Date(this.state.timesheet.slice(14, 24).split('-').reverse().join('/'))).format("DD MMM YYYY")}</Text>
                                        </View>

                                    </View>
                                    {
                                        this.state.loading == true ?
                                            <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <UIActivityIndicator color={this.props.primaryColor} size={30} />
                                            </View> : null
                                    }

                                    {
                                        this.state.timesheetData.length !== 0 ?
                                            // <View style={{ flexDirection: 'row', marginLeft: 5, }}>
                                            <ScrollView style={{ marginBottom: 10 }}
                                                // horizontal={true}
                                                // scrollEnabled={this.state.content}
                                                showsVerticalScrollIndicator={false}
                                            >
                                                <View style={{ height: '100%', marginLeft: 5, marginRight: 5 }}>
                                                    <SwipeListView
                                                        data={this.state.timesheetData}
                                                        renderItem={this.renderItem}
                                                        renderHiddenItem={this.renderHiddenItem}
                                                        leftOpenValue={75}
                                                        rightOpenValue={-140}
                                                        previewRowKey={'0'}
                                                        previewOpenValue={-40}
                                                        previewOpenDelay={3000}
                                                        onRowDidOpen={this.onRowDidOpen}
                                                    />

                                                    <View style={{ flex: 1 }}>
                                                        <SheetBottom
                                                            visible={this.state.daysVisible}
                                                            style={{ backgroundColor: this.props.secColor }}
                                                            onBackdropPress={() => this.setState({ daysVisible: false })}
                                                            onSwipeDown={() => this.setState({ daysVisible: false })}>

                                                            <View style={{ backgroundColor: this.props.secColor }}>
                                                                {/* <Card  style={{}} > */}
                                                                <View style={[styles.flexRow1, { backgroundColor: 'transparent', borderRadius: 10, marginBottom: 10, marginStart: 8, marginEnd: 8, }]}>

                                                                    <View style={{ width: "60%", height: '100%', margin: 2, marginBottom: 8 }}>
                                                                        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '900', }}>{this.state.projectName}</Text>
                                                                        <Text numberOfLines={1} style={{ color: "#4D504F" }}>{"(" + this.state.clientName + ")"}</Text>
                                                                        {/* <Text numberOfLines={1} style={{ color: "#4D504F" }}>{this.state.daysData.TaskDesc}</Text> */}
                                                                    </View>
                                                                    {/* <View style={{ width: "40%", height: '100%', margin: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 18, color: this.state.details.Status == "Saved" ? 'red' : 'green' }}>{this.state.details.Status}</Text>
                                                                    </View> */}
                                                                </View>
                                                                <SwipeListView
                                                                    data={this.state.daysData}
                                                                    renderItem={this.renderItem1}
                                                                    renderHiddenItem={this.renderHiddenItem1}
                                                                    disableLeftSwipe={false}
                                                                    // leftOpenValue={0}
                                                                    rightOpenValue={-130}
                                                                    previewRowKey={'0'}
                                                                    previewOpenValue={-40}
                                                                    previewOpenDelay={3000}
                                                                    onRowDidOpen={this.onRowDidOpen}
                                                                />
                                                                {/* </Card> */}
                                                                {/* <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={[styles.flexRow1]}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblMon}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Mon', dayField: 1, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Mon == "" ? "0:00" : this.state.daysData.Mon}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Mon_TaskComments, addDescField: 1, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblTue}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Tue', dayField: 2, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Tue == "" ? "0:00" : this.state.daysData.Tue}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Tue_TaskComments, addDescField: 2, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblWed}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Wed', dayField: 3, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Wed == "" ? "0:00" : this.state.daysData.Wed}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Wed_TaskComments, addDescField: 3, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblThu}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Thu', dayField: 4, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Thu == "" ? "0:00" : this.state.daysData.Thu}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Thu_TaskComments, addDescField: 4, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblFri}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Fri', dayField: 5, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Fri == "" ? "0:00" : this.state.daysData.Fri}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Fri_TaskComments, addDescField: 5, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={2 % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblSat}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Sat', dayField: 6, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Sat == "" ? "0:00" : this.state.daysData.Sat}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Sat_TaskComments, addDescField: 6, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card>
                                                                <Card elevation={2} style={styles.container} >
                                                                    <View style={styles.flexRow}>
                                                                        <View style={this.props.index % 2 === 0 ? styles.strip1 : styles.strip2} />
                                                                        <View style={styles.view}>
                                                                            <View style={styles.flexRow1}>
                                                                                <View style={{ width: "60%" }}>
                                                                                    <Text style={{ fontSize: 16 }}>{this.state.lblSun}</Text>
                                                                                </View>
                                                                                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                                    <TouchableOpacity onPress={() => { this.setState({ timeVisible: this.state.daysData.Status == "Saved" ? true : false, dayField: 'Mon', dayField: 7, }) }}
                                                                                        style={[styles.hrsData, { backgroundColor: this.state.daysData.Status == "Saved" ? '#FFFF' : "#E9ECEF" }]}>
                                                                                        <Text style={{ fontSize: 16 }}>{this.state.daysData.Sun == "" ? "0:00" : this.state.daysData.Sun}</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() =>
                                                                                        this.setState({ addDescVisible: true, descEdit: this.state.daysData.Status == "Saved" ? true : false, addDesc: this.state.daysData.Sun_TaskComments, addDescField: 7, },
                                                                                            () => { })}>
                                                                                        <Image style={{ height: 40, width: 40 }} source={require("../Assets/message.png")} />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </Card> */}

                                                            </View>
                                                        </SheetBottom>
                                                    </View>
                                                    <Modal isVisible={this.state.addDescVisible}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ backgroundColor: 'white', borderRadius: 5, width: 350, height: 250 }}>
                                                                <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                                    <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.rating == true ? "Rating" : 'Additional Description'}</Text>
                                                                    <TouchableOpacity onPress={() =>
                                                                        this.setState({ addDescVisible: false, rating: false },
                                                                            () => { })}>
                                                                        <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
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
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </Modal>
                                                </View>
                                            </ScrollView>
                                            : null
                                    }
                                </>
                                : null
                            }
                            <SheetSide
                                visible={this.state.visible}
                                // pageWidth={800}
                                // widthPercentage={2}
                                onBackdropPress={() => this.setState({ visible: false })}
                                onSwipeRight={() => this.setState({ visible: false })}>
                                <View style={{ flexDirection: 'row', padding: 20, backgroundColor: this.props.secColor, bottom: 20 }}>
                                    <Image
                                        source={require('../Assets/done.png')}
                                        style={{ width: 20, height: 23, marginRight: 15 }}
                                    />
                                    <Text style={{ fontSize: title }}>Filter Criteria</Text>
                                </View>
                                <ScrollView style={{ marginBottom: 40 }}>
                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Deliver Type", multiPickerVisible: true,
                                            field: 11, data: this.state.deliverTypeList, selectedVal: this.state.deliverType, arrayholder: this.state.deliverTypeList
                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>DELIVERY TYPE</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.deliverType == '' ? "--select--" : this.state.deliverType[1] == null ? this.state.deliverType[0].Text : this.state.deliverType[0].Text + ", " + this.state.deliverType[1].Text}</Text>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.cards, { borderWidth: 1, borderColor: "transparent" }]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            title: "Project Group", multiPickerVisible: true,
                                            field: 12, data: this.state.projectGroupList, selectedVal: this.state.projectGroup, arrayholder: this.state.projectGroupList
                                        })}
                                            style={styles.cardMenuSpasing}>
                                            <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT GROUP</Text>
                                            <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.projectGroup == '' ? "--select--" : this.state.projectGroup[1] == null ? this.state.projectGroup[0].Text : this.state.projectGroup[0].Text + ", " + this.state.projectGroup[1].Text}</Text>
                                        </TouchableOpacity>
                                    </Card>
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

                                    <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'center', alignItems: 'center', width: '90%', backgroundColor: 'transparent' }}>
                                        <Button mode="contained" style={{ height: 40, width: "45%", margin: 10, backgroundColor: this.props.primaryColor }}
                                            onPress={this.handleShowReport}>
                                            Search
                                        </Button>
                                        <Button mode="contained" style={{ height: 40, width: "45%", margin: 10, backgroundColor: this.props.primaryColor }}
                                            onPress={this.handleClear}>
                                            Clear
                                        </Button>
                                    </View>
                                </ScrollView>
                            </SheetSide>

                            <Modal isVisible={this.state.ratingVisible}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', borderRadius: 5, width: 370, height: this.state.action == "Approved" && this.state.orientation == 'portrait' ? 450 : this.state.action == "Approved" && this.state.orientation == 'landscape' ? 300 : 300 }}>
                                        <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Rating'}</Text>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ ratingVisible: false, },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView style={{ marginBottom: 10 }}>
                                            <View style={{ marginTop: 5, padding: 10, flexDirection: 'column' }}>
                                                {
                                                    this.state.action == "Approved" ?
                                                        <>
                                                            <View style={{ elevation: 2, borderWidth: .5, borderColor: this.state.validation == true && this.state.rating1.length == 0 ? 'red' : "transparent", borderRadius: 5, height: 60, marginBottom: 5, margin: 5 }}>
                                                                <TouchableOpacity onPress={() => this.setState({
                                                                    title: "On time performance", multiPickerVisible1: true,
                                                                    field: 1, data: this.state.ratingList1, selectedVal: this.state.rating1
                                                                })}
                                                                    style={[styles.cardMenuSpasing, {}]}>
                                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ON TIME PERFORMANCE</Text>
                                                                    <Text numberOfLines={1} style={[styles.twoCardLabel1, { color: "#4D504F", }]}>{this.state.rating1.length == 0 ? "--select--" : this.state.rating1[0].Text}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ elevation: 2, borderWidth: .5, borderColor: this.state.validation == true && this.state.rating1.length == 0 ? 'red' : "transparent", borderRadius: 5, height: 60, marginBottom: 5, margin: 5 }}>
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
                                                <View style={{ elevation: 2, borderWidth: .5, borderColor: this.state.action == "Rejected" && this.state.validation == true && this.state.rating3 !== null ? 'red' : "transparent", borderRadius: 5, height: 150, marginBottom: 5, margin: 5 }}>
                                                    <TouchableOpacity style={[styles.cardMenuSpasing, {}]}>
                                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>REMARK</Text>
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
                                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10, marginBottom: 10, margin: 5 }}>
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
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>


                            <Dialog
                                visible={this.state.actionVisible}
                                style={{ backgroundColor: 'white', width: 150, height: 80, justifyContent: 'center', alignItems: 'center' }}
                                onTouchOutside={() => this.setState({ actionVisible: false, selectedVal: [] }, () => { })}
                            >
                                <View style={[{ flexDirection: 'row', bottom: 12, right: 12, }]}>
                                    <TouchableOpacity onPress={() =>
                                        this.setState({ ratingVisible: true, action: 'Approved', singleRecord: true, actionVisible: false },
                                            () => { })}>
                                        <Image style={{ height: 70, width: 70 }} source={require('../Assets/greenTick.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>
                                        this.setState({ ratingVisible: true, action: 'Rejected', singleRecord: true, actionVisible: false },
                                            () => { })}>
                                        <Image style={{ height: 55, width: 55, top: 8 }} source={require('../Assets/cross.png')} />
                                    </TouchableOpacity>
                                </View>
                            </Dialog>

                            <Modal isVisible={this.state.multiPickerVisible1}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', height: 350, width: 300, borderRadius: 5 }}>
                                        <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ multiPickerVisible1: false, },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                            </TouchableOpacity>
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
                                </View>
                            </Modal>

                            <Modal isVisible={this.state.multiPickerVisible}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', height: 400, width: 350, borderRadius: 5 }}>
                                        <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                            <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                            <TouchableOpacity onPress={() =>
                                                this.setState({ multiPickerVisible: false, },
                                                    () => { })}>
                                                <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.field == 1 || this.state.field == 2 ||  this.state.field == 11 || this.state.field == 12 ?
                                                <>
                                                    <TextInput style={{ height: 40, margin: 5, borderWidth: .3, borderRadius: 3, padding: 5 }}
                                                        underlineColorAndroid="transparent"
                                                        placeholder="Search here.."
                                                        autoCapitalize="none"
                                                        onChangeText={text =>  this.searchFilterFunction(text)}
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
                                </View>
                            </Modal>


                        </ScrollView>
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
        top: 22.5,
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
    horizontalContainer: { flexDirection: 'row', margin: 10, },

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
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,
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
        // height: 99,
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
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        width: 80,
        padding: 5
    },
    backRightBtn1: {
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        width: 80,
        padding: 5,
        backgroundColor: 'red'
    },
    backRightBtn11: {
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        width: 130,
        padding: 5,
        backgroundColor: 'red'
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
        height: 60,
        flexDirection: 'row',
        // width: '100%',
        borderRadius: 10,
        // marginStart: 8,
        // marginEnd: 8,
        margin: 5
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