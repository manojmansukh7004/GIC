import React, { Component } from 'react';
import { ToastAndroid, TextInput, Image, StatusBar, StyleSheet, Dimensions, ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { Divider, Title, Paragraph, Subheading } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { connect } from 'react-redux'
import { Dialog, List, Checkbox, SheetSide, } from 'material-bread';
import { NavigationEvents } from 'react-navigation'

const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14


class Help extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orientation: '',
            visible: '',
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
                            title={"User Guide"}
                            // filter={true}
                            sideDrawerVisible={this.sideDrawerVisible}
                        // handleCalenderStatus={this.handleCalenderStatus}
                        />
                    </View>

                    <View style={[styles.container, { padding: 10, height: this.state.orientation == 'landscape' ? '86%' : '90%', backgroundColor: this.props.secColor }]}>
                        <ScrollView
                            style={{ marginBottom: 5 }}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ paddingleft: 10, paddingRight: 10, backgroundColor: 'transparent' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>My Timesheet</Text>
                                <View style={{ paddingLeft: 10 }}>
                                    <Paragraph>1. Click on plus button to select the week and date.</Paragraph>
                                    <Paragraph>2. Click on Calendar icon to create new timesheet for a particular week.</Paragraph>
                                    <Paragraph>3. Select week from the pop up, to open the timesheet for that particular week.</Paragraph>
                                    <Paragraph>4. Click on Add Row button to add timesheet records. </Paragraph>
                                    <Paragraph>5. Timesheet records save automatically. </Paragraph>
                                    <Paragraph>6. Time for an activity can be edited from week view page also.</Paragraph>
                                    <Paragraph>7. Swipe right on saved row to see the timesheet details and swipe left to edit or delete the saved timesheet.</Paragraph>
                                    <Paragraph>8. On clicking the timesheet row, pop up window with day wise timesheet details appears.</Paragraph>
                                    <Paragraph>9. For submitted and approved timesheet, user can view approver name and approver comments.</Paragraph>
                                    <Paragraph>10. Click on Submit button once you fill the timesheet for the whole week. Please note, timesheet once submitted cannot be edited.</Paragraph>
                                    {/* <Paragraph>8. Close the popup window by clicking outside the window.</Paragraph> */}
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Timesheet Approval</Text>
                                <View style={{ paddingLeft: 10 }}>
                                    <Paragraph>1. Click on filter button and apply filters to open the timesheet records filled by the subordinate .</Paragraph>
                                    <Paragraph>2. Use Clear button to clear the filter fields.</Paragraph>
                                    <Paragraph>3. Click on timesheet row, pop up window with day wise timesheet details appears.</Paragraph>
                                    <Paragraph>4. Individual time entries can be approved/ rejected by swiping left on individual time entries on pop up screen. </Paragraph>
                                    <Paragraph>5. One timesheet row can be approved/ rejected by swiping left on timesheet row.</Paragraph>
                                    <Paragraph>6. Swipe left on timesheet row to see details of the timesheet. </Paragraph>
                                    <Paragraph>7. Swipe left and right in completed timesheets to view details and status respectively.</Paragraph>
                                </View>
                            </View>
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
        // ts_Id: (data) => dispatch(setTsId(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)

const styles = StyleSheet.create({
    Container: {

        flex: 1,
        display: 'flex',
        top: 22.5,
        width: '100%',
        height: '100%',

    },

});