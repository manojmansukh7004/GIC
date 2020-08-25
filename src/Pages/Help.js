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
                            <Text style={{fontSize: 16,fontWeight: 'bold',marginTop:5}}>My Timesheet</Text>
                                <View style={{paddingLeft:10}}>
                                    <Paragraph>1. Click on plus button to select the week and date.</Paragraph>
                                    <Paragraph>2. Click on Calendar icon to create new timesheet for a particular week.</Paragraph>
                                    <Paragraph>3. Select week from the pop up, to open the timesheet for that particular week.</Paragraph>
                                    <Paragraph>4. Click on Add Row button to add timesheet records. </Paragraph>
                                    <Paragraph>5. Click on Save button on the bottom to save the timesheet details. Time for an activity can be edited from week view page also.</Paragraph>
                                    <Paragraph>6. Click on Submit button once you fill the timesheet for the whole week. Please note, timesheet once submitted cannot be edited.</Paragraph>
                                    <Paragraph>7. To view the timesheet entry detail, click on project name.</Paragraph>
                                    <Paragraph>8. Close the popup window by clicking outside the window.</Paragraph>
                                </View>
                                <Text style={{fontSize: 16,fontWeight: 'bold',marginTop:5}}>Timesheet Approval</Text>
                                <View style={{paddingLeft:10}}>
                                    <Paragraph>1. Click on filter button and apply filters to open the timesheet records filled by the subordinate .</Paragraph>
                                    <Paragraph>2. Use Clear button to clear the filter fields.</Paragraph>
                                    <Paragraph>3. Click on Green tick mark button to approve and Red cross button to reject the entire row.</Paragraph>
                                    <Paragraph>4. Click on the time filled by the subordinate, a screen will pop up with approve and reject buttons. Specific timesheet record can be approved or rejected through these buttons. </Paragraph>
                                    <Paragraph>5. To approve or reject the multiple rows at a time, long press on a single row. Entire row will be selected and highlighted in green color. Select other rows by clicking on it and use buttons on top to approve or reject.</Paragraph>
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