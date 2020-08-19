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
            typeList: [],
            resourceList: [],
            timesheetList: [],
            selectedVal: [],
            arrayholder: [],
            filterVisible: true,
            visible: false,
            multiPickerVisible: false
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
                selectedVal: temp, type: item.Text, type1: temp, resourceList: [], resource: [], resourceName: '', timesheet: '', timesheetList: []
            }, async () => {
                var typeData = await GetEmpListForApproval(this.props.user, this.state.type, this.state.clientValue, this.state.projectValue, this.props.baseUrl)
                this.setState({ resourceList: typeData.EmployeeList[0] })
            })
        }
        else if (this.state.field == 4) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, resource: item.Value, resourceName: item.Text, resource1: temp, timesheet: '', timesheetList: []
            }, async () => {
                var resourceData = await GetTSListOnEmpChange(this.props.user, this.state.type, this.state.resource, this.props.baseUrl)
                this.setState({ timesheetList: resourceData.TimesheetList[0] })
            })
        }
        else if (this.state.field == 5) {
            var temp = []
            temp.push(item)
            this.setState({
                selectedVal: temp, timesheet: item.Text, timesheet1: temp
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
            this.setState({ visible: false })
            this.searchRecord()
        }
    }

    searchRecord = async () => {
        var timesheetList = await GetDataforApprOnSearch(this.props.user, this.state.type1[0].Text, this.state.resource,
            this.state.timesheet1[0].Value, this.state.clientValue, this.state.projectValue, this.props.baseUrl)
        console.log("ttttttt", timesheetList);

        // this.setState({
        //     timesheetList: timesheetList.EmpTimesheetList[0],
        // });
    }

    async componentDidMount() {
        var drpTSApproval = await GetDrpDataForTSApproval(this.props.user, this.props.baseUrl)
        this.setState({ clientList: drpTSApproval.ClientList[0], projectList: drpTSApproval.ProjectList[0] })
    }

    render() {


        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                {/* <NavigationEvents
                onDidFocus={() => this}
                onWillBlur={() =>this.pageChange()}
                /> */}
                <View style={[styles.Container, {}]}>

                    <View style={{ height: "7%", backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"Timesheet Approval"}
                            filter={true}
                        // calenderVisible={this.state.calenderVisible}
                        // handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={{ height: "90%", backgroundColor: this.props.secColor }}>
                        <View style={{ flex: 1 }}>

                            <Button
                                text="Open Sheet"
                                onPress={() => {
                                    this.setState({ visible: true });
                                }}
                            />

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

                            {/* <MultiPickerMaterialDialog
                                title={"Pick some more elements!"}
                                scrolled
                                items={this.state.data.map((row, index) => ({ value: this.state.data[index].Value, label: this.state.data[index].Text }))}
                                visible={this.state.multiPickerVisible}
                                selectedItems={this.state.scrolledMultiPickerSelectedItems}
                                onCancel={() => this.setState({ multiPickerVisible: false })}
                                onOk={result => {
                                    this.setState({ multiPickerVisible: false });
                                    this.setState({
                                        scrolledMultiPickerSelectedItems: result.selectedItems
                                    });
                                }}
                            /> */}
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

                            {/* <Dialog
                                visible={this.state.multiPickerVisible}
                                onTouchOutside={() => this.setState({ multiPickerVisible: false })}
                                style={
                                    {
                                        width: 350,
                                        height: 400

                                    }
                                }
                            >

                                <View style={{ height: 350, borderRadius: 3, right: 12 }}>
                                    <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                        <Text style={{ fontSize: title, color: this.props.fontColor }}>{this.state.title}</Text>
                                    </View>
                                    <View style={{ height: 40, borderWidth: .3, margin: 5, borderRadius: 3 }}>
                                        
                                        <SearchBar
                                            placeholder="Type Here..."
                                            lightTheme
                                            round
                                            onChangeText={text => this.searchFilterFunction(text)}
                                            autoCorrect={false}
                                            value={this.state.value}
                                        />
                                    </View>
                                    {
                                        this.state.prevPage !== "Sales Leadership" || this.state.index !== 2 ?
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
                                            : null
                                    }
                                    <FlatList
                                        data={Object.keys(this.state.data)}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={{}}
                                                onPress={() => console.log("mj")
                                                }>

                                                <Divider style={{ marginLeft: 5, marginRight: 5, }} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ width: '90%', }}>

                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />

                                </View>
                               
                            </Dialog> */}

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
        padding: 9,
        borderRadius: 5,
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#C1C0B9',
        top: 3,
        // height: 350,
        // backgroundColor:'pink'
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

    twoCardLabel1: {
        fontSize: 16,
        // color: '#F2721C',
        paddingStart: 12
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
        height: 70,
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