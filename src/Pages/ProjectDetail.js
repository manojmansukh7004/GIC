import React, { Component } from 'react';
import {
    ToastAndroid, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, TextInput
} from 'react-native';
import { Paragraph, Card } from 'react-native-paper';
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import { DeleteTimesheetRecord } from '../Services/MyTimesheet/DeleteTimesheetRecord';
import { Dialog, Button } from 'material-bread';
import moment from 'moment';
import Appbar from '../Component/AppBar'
const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
var lblMon = "", lblTue = "", lblWed = "", lblThu = "", lblFri = "", lblSat = "", lblSun = ""
var TotalTime = "", dvTotMon = "", dvTotTue = "", dvTotWed = "", dvTotThu = "", dvTotFri = "", dvTotSat = "", dvTotSun = ""

class TimesheetEntry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orientation: '',
            timesheetId: '',
            client: '',
            workList: '',
            project: '',
            phase: '',
            activity: '',
            workOrder: '',
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
            type: '',
            time: [],
            headerData: [],
            timesheetData: [],
            headerHrsData: [],
            visible: false,
            deleteRecord: false,
            addDescVisible: false,
            validation: false,
            selectedType: 'Select',
            editVisible: true
        }
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

    async componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });

        this.setState({

            timesheetData: this.props.navigation.state.params.timesheetData,
            headerData: this.props.navigation.state.params.headerData,
            headerHrsData: this.props.navigation.state.params.headerHrsData,
            editVisible: this.props.navigation.state.params.Status,
            type: this.props.navigation.state.params.Type

        }, () => {
            lblMon = "Mon, " + moment(new Date(this.state.headerData[0].Mon_Date)).format("DD"),
                lblTue = "Tue, " + moment(new Date(this.state.headerData[0].Tue_Date)).format("DD"),
                lblWed = "Wed, " + moment(new Date(this.state.headerData[0].Wed_Date)).format("DD"),
                lblThu = "Thu, " + moment(new Date(this.state.headerData[0].Thu_Date)).format("DD"),
                lblFri = "Fri, " + moment(new Date(this.state.headerData[0].Fri_Date)).format("DD"),
                lblSat = "Sat, " + moment(new Date(this.state.headerData[0].Sat_Date)).format("DD"),
                lblSun = "Sun, " + moment(new Date(this.state.headerData[0].Sun_Date)).format("DD"),
                dvTotMon = moment(new Date(this.state.headerData[0].Mon_Date)).format("MMM YYYY"),
                dvTotTue = moment(new Date(this.state.headerData[0].Tue_Date)).format("MMM YYYY"),
                dvTotWed = moment(new Date(this.state.headerData[0].Wed_Date)).format("MMM YYYY"),
                dvTotThu = moment(new Date(this.state.headerData[0].Thu_Date)).format("MMM YYYY"),
                dvTotFri = moment(new Date(this.state.headerData[0].Fri_Date)).format("MMM YYYY"),
                dvTotSat = moment(new Date(this.state.headerData[0].Sat_Date)).format("MMM YYYY"),
                dvTotSun = moment(new Date(this.state.headerData[0].Sun_Date)).format("MMM YYYY"),
                this.setState({
                    timesheetId: this.state.timesheetData.TimesheetId,
                    lblMon: lblMon, lblTue: lblTue,
                    lblWed: lblWed, lblThu: lblThu,
                    lblFri: lblFri, lblSat: lblSat, lblSun: lblSun,
                    dvTotMon: dvTotMon, dvTotTue: dvTotTue,
                    dvTotWed: dvTotWed, dvTotThu: dvTotThu,
                    dvTotFri: dvTotFri, dvTotSat: dvTotSat,
                    dvTotSun: dvTotSun, TotalTime: TotalTime
                });
        });
    }
    handleDeleteRecord = () => {
        this.setState({ visible: true })
    }

    DeleteRecord = async () => {
        var tsEntryId = []
        if (this.state.timesheetData.Mon_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Mon_AutoId) }
        if (this.state.timesheetData.Tue_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Tue_AutoId) }
        if (this.state.timesheetData.Wed_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Wed_AutoId) }
        if (this.state.timesheetData.Thu_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Thu_AutoId) }
        if (this.state.timesheetData.Fri_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Fri_AutoId) }
        if (this.state.timesheetData.Sat_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Sat_AutoId) }
        if (this.state.timesheetData.Sun_AutoId !== null) { tsEntryId.push(this.state.timesheetData.Sun_AutoId) }

        var data = await DeleteTimesheetRecord(this.props.user, this.state.timesheetId, tsEntryId.toString(), this.props.baseUrl)

        if (data != null && data != "") {
            if (data.Message != null && data.Message != "") {
                showToast(data.Message);
            }
            if (data.SuccessList != undefined || data.ErrorList != undefined || data.ExceptionList != undefined) {
                // validationRemove();
                if (data.SuccessList != undefined) {
                    showToast("Record deleted successfully.");
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
    handleEditRecord = () => {
        this.props.navigation.navigate('EditTimeSheet', {
            "Edit": true,
            "header": "Edit Timesheet Entry",
            "timesheetData": this.state.timesheetData,
            "headerData": this.state.headerData,
            "headerHrsData": this.state.headerHrsData,
        })
    }
    render() {

        return (
            <>

                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <View ref="rootView" style={[styles.Container, {}]}>
                    {/* <View style={{ height: 50, backgroundColor: this.props.primaryColor, }}> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 50, backgroundColor: this.props.primaryColor }} >
                        <Appbar navigation={this.props.navigation}
                            title={"Project Details"}
                            handleDeleteRecord={this.handleDeleteRecord}
                            handleEditRecord={this.handleEditRecord}
                            details={this.state.editVisible}
                            backNavigation={this.props.navigation.state.params.backNavigation}
                        />
                    </View>

                    <View style={[styles.container, { height: this.state.orientation == 'landscape' ? '86%' : '90%', backgroundColor: this.props.secColor }]}>
                        <ScrollView
                            style={{ marginBottom: 5 }}
                            showsVerticalScrollIndicator={false}>
                            {
                                this.state.timesheetData.length !== 0 ?
                                    <>
                                        <View style={styles.horizontalContainer}>
                                            <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.client == 0 ? 'red' : "transparent" }]}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT GROUP</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.ProjectGroupText == null ? '--Select--' : this.state.timesheetData.ProjectGroupText}</Text>
                                                </View>
                                            </Card>

                                            <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.client == 0 ? 'red' : "transparent" }]}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>CLIENT</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.ClientName}</Text>

                                                </View>
                                            </Card>

                                        </View>
                                        <View style={styles.horizontalContainer}>

                                            <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.project == 0 ? 'red' : "transparent" }]}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PROJECT</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.ProjectName}</Text>

                                                </View>
                                            </Card>
                                            <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.workList == 0 ? 'red' : "transparent" }]}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>TYPE OF WORK</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.TypeOfWork}</Text>

                                                </View>
                                            </Card>


                                        </View>
                                        <View style={styles.horizontalContainer}>
                                            <Card style={styles.cards}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>PHASE</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.PhaseName == null ? "--Select--" : this.state.timesheetData.PhaseName}</Text>

                                                </View>
                                            </Card>
                                            <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.activity == 0 ? 'red' : "transparent" }]}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ACTIVITY</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.ActivityName}</Text>

                                                </View>
                                            </Card>

                                            {/* <Card style={styles.cards}>
                                                <View style={styles.cardMenuSpasing}>
                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>WORK ORDER</Text>
                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.WorkOrderName}</Text>

                                                </View>
                                            </Card> */}
                                        </View>
                                        <Card style={[styles.descCard, { borderWidth: 1, borderColor: this.state.validation == true && this.state.projectDesc == "" ? 'red' : "transparent" }]}>
                                            <View style={styles.reasonView}>
                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>DESCRIPTION</Text>
                                                <ScrollView showsVerticalScrollIndicator={false}>
                                                    <TextInput
                                                        mode="flat"
                                                        underlineColor="white"
                                                        multiline
                                                        editable={false}
                                                        placeholder="Enter Description"
                                                        textAlignVertical="top"
                                                        underlineColorAndroid="white"
                                                        keyboardType="default"
                                                        autoFocus={false}
                                                        value={this.state.timesheetData.TaskDesc}
                                                        onChangeText={desc => this.setState({ projectDesc: desc, })}
                                                        numberOfLines={5}
                                                        style={styles.longText}
                                                    />
                                                </ScrollView>
                                            </View>
                                        </Card>
                                        <Card style={styles.descCard}>
                                            <ScrollView horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                            >
                                                <View style={styles.timeView}>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblMon}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotMon}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Mon == "" ? "--:--" : this.state.timesheetData.Mon}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 1, addDesc: this.state.timesheetData.Mon_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblTue}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotTue}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Tue == "" ? "--:--" : this.state.timesheetData.Tue}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 2, addDesc: this.state.timesheetData.Tue_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblWed}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotWed}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Wed == "" ? "--:--" : this.state.timesheetData.Wed}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 3, addDesc: this.state.timesheetData.Wed_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblThu}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotThu}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Thu == "" ? "--:--" : this.state.timesheetData.Thu}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 4, addDesc: this.state.timesheetData.Thu_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblFri}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotFri}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Fri == "" ? "--:--" : this.state.timesheetData.Fri}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 5, addDesc: this.state.timesheetData.Fri_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblSat}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSat}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Sat == "" ? "--:--" : this.state.timesheetData.Sat}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 6, addDesc: this.state.timesheetData.Sat_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.sheetData, { backgroundColor: this.props.stripColor }]}>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.lblSun}</Text>
                                                        <Text style={{ color: this.props.primaryColor }}>{this.state.dvTotSun}</Text>
                                                        <View style={styles.hrsData}>
                                                            <Text>{this.state.timesheetData.Sun == "" ? "--:--" : this.state.timesheetData.Sun}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: true, addDescField: 7, addDesc: this.state.timesheetData.Sun_TaskComments })}>
                                                            <Image style={{ height: 30, width: 30 }} source={require("../Assets/message.png")} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ScrollView>
                                        </Card>
                                        {
                                            this.state.type !== "Pending" ?
                                                <>

                                                    <View style={styles.horizontalContainer}>
                                                        {
                                                            this.state.type !== "Completed" ?
                                                                <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.workList == 0 ? 'red' : "transparent" }]}>
                                                                    <View style={styles.cardMenuSpasing}>
                                                                        <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>APPROVER</Text>
                                                                        <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.Approver}</Text>
                                                                    </View>
                                                                </Card> 
                                                                :
                                                                <Card style={styles.cards}>
                                                                <View style={styles.cardMenuSpasing}>
                                                                    <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>STATUS</Text>
                                                                    <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.Status}</Text>
    
                                                                </View>
                                                            </Card>
                                                        }

                                                        <Card style={styles.cards}>
                                                            <View style={styles.cardMenuSpasing}>
                                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>QUALITY OF WORK</Text>
                                                                <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.ApprQOWRating}</Text>
                                                            </View>
                                                        </Card>
                                                    </View>
                                                    <View style={[styles.horizontalContainer, { marginBottom: 15 }]}>
                                                        <Card style={[styles.cards, { borderWidth: 1, borderColor: this.state.validation == true && this.state.activity == 0 ? 'red' : "transparent" }]}>
                                                            <View style={styles.cardMenuSpasing}>
                                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>ON TIME PERFORMANCE</Text>
                                                                <Text style={[styles.twoCardLabel, { color: "#4D504F", }]}>{this.state.timesheetData.ApprOTPRating}</Text>

                                                            </View>
                                                        </Card>
                                                        {
                                                            this.state.type !== "Completed" ?
                                                        <Card style={styles.cards}>
                                                            <View style={styles.cardMenuSpasing}>
                                                                <Text style={[styles.singleCardLabel, { color: this.props.primaryColor }]}>STATUS</Text>
                                                                <Text style={[styles.twoCardLabel, { color: "#4D504F" }]}>{this.state.timesheetData.Status}</Text>

                                                            </View>
                                                        </Card>:null 
                                                        }
                                                    </View>
                                                </> : null
                                        }
                                        <Modal isVisible={this.state.addDescVisible}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ backgroundColor: 'white', borderRadius: 5, width: 350, height: 250 }}>
                                                    <View style={{ borderTopStartRadius: 5, borderTopEndRadius: 5, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                        <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Description'}</Text>
                                                        <TouchableOpacity onPress={() =>
                                                            this.setState({ addDescVisible: false, },
                                                                () => { })}>
                                                            <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('../Assets/redCross.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                        <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                            <TextInput
                                                                multiline={true}
                                                                editable={false}
                                                                value={this.state.addDesc}
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
                                            </View>
                                        </Modal>
                                        {/* <Dialog
                                            visible={this.state.addDescVisiblre}
                                            style={{ backgroundColor: 'white', height: 250, width: 350 }}
                                            onTouchOutside={() => this.setState({ addDescVisible: false })}

                                        >
                                            <View style={{ backgroundColor: 'white', height: 300, width: 400, bottom: 25, right: 25 }}>
                                                <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                                    <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Additional Descriptions'}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', right: 25 }}>
                                                    <View style={{ borderRadius: 5, borderWidth: .5, width: 300, height: 170, margin: 15 }}>
                                                        <TextInput
                                                            multiline={true}
                                                            editable={false}
                                                            value={this.state.addDesc}
                                                            textAlignVertical="top"
                                                            underlineColor="white"
                                                            keyboardType="default"
                                                            autoFocus={false}
                                                            style={styles.longText}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </Dialog> */}

                                        <Dialog
                                            visible={this.state.visible}
                                            onTouchOutside={() => this.setState({ visible: false })}
                                            style={
                                                {
                                                    width: 400,
                                                }
                                            }
                                        >

                                            <Text style={{ fontSize: 20, marginBottom: 5, color: this.props.primaryColor }}>
                                                {"Are you sure ?"}
                                            </Text>
                                            <Paragraph style={{ fontSize: 16 }}>
                                                {"Once deleted, you will not be able to recover the record!"}
                                            </Paragraph>

                                            <View
                                                style={{
                                                    justifyContent: "flex-end",
                                                    flexDirection: 'row',
                                                    paddingVertical: 20,

                                                }}
                                            >
                                                <Button
                                                    text={'cancel'}
                                                    style={{ borderWidth: .3, margin: 5, marginRight: 5 }}
                                                    onPress={() => this.setState({ visible: false })}
                                                />
                                                <Button
                                                    text={'Confirm Delete'}
                                                    style={{ borderWidth: 1, margin: 5, borderColor: 'red' }}
                                                    onPress={() =>
                                                        this.setState({ visible: false, deleteRecord: true }, () => { this.DeleteRecord() })
                                                    }
                                                />
                                            </View>
                                        </Dialog>

                                    </>

                                    : null
                            }
                        </ScrollView>
                    </View>
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
        // backgroundColor: '#F9F9F9',
        // marginBottom: 30,
    },
    cards: {
        elevation: 3,
        borderRadius: 5,
        marginTop: 10,
        width: "49%"
    },
    cardContainer: { backgroundColor: 'white', height: 20, fontSize: 16 },
    singleCardLabel: {
        fontSize: 12,
        // color: '#F2721C',
        paddingStart: 8
    },
    twoCardLabel: {
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
        marginTop: 10
    },
    longText: { backgroundColor: 'white', fontSize: 16, marginEnd: 10, padding: 10, color: "#4D504F" },
    reasonView: { paddingStart: 3, padding: 10, height: 150 },
    timeView: { padding: 10, flexDirection: 'row' },
    sheetData: {
        padding: 10,
        width: 80,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hrsData: {
        padding: 10,
        borderWidth: .3,
        borderRadius: 3,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "#E9ECEF"
    },
    textPopup: {
        padding: 3,
        fontSize: cardDate,
        marginLeft: 15,
    },
})