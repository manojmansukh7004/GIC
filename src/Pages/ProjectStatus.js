import React, { Component } from 'react';
import { ToastAndroid, TextInput, Image, StatusBar, StyleSheet, Dimensions, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
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

class ProjectStatus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orientation: '',
            visible:'',
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



    async componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
      
    }

    render() {

        return (
            <>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.props.primaryColor} />
                <NavigationEvents
                // onDidFocus={() => this.handleShowReport()}
                // onWillBlur={() =>this.pageChange()}
                />
                <View ref="rootView" style={[styles.Container, { backgroundColor: this.props.primaryColor }]}>
                    <View style={{ height: this.state.orientation == 'landscape' ? '11%' : '7%', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.primaryColor }}>
                        <Appbar1 navigation={this.props.navigation}
                            title={"Project Status Report"}
                            filter={true}
                            sideDrawerVisible={this.sideDrawerVisible}
                        // handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={[styles.container, { height: this.state.orientation == 'landscape' ? '86%' : '90%', backgroundColor: this.props.secColor }]}>
                        <ScrollView
                            style={{ marginBottom: 5 }}
                            showsVerticalScrollIndicator={false}>


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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatus)

const styles = StyleSheet.create({
    Container: {

        flex: 1,
        display: 'flex',
        top: 22.5,
        width: '100%',
        height: '100%',

    },
    
});