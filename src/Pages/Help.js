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
                            title={"Help"}
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
                                    <Paragraph>1. press on plus button to select the week and date.</Paragraph>
                                    <Paragraph>2. press on calendar icon to create timesheet for particular week.</Paragraph>
                                    <Paragraph>3. select week pop-up, it help to open the timesheet for particular week days .</Paragraph>
                                    <Paragraph>4. Add row Button which is help to create timesheet record. </Paragraph>
                                    <Paragraph>5. Save Button which is help to save the record. An save record can be edited.</Paragraph>
                                    <Paragraph>6. Submit Button which is help to submit the record to Approver. An submited record can not be edited.</Paragraph>
                                    <Paragraph>7. If you want to see project details, then press on project name.</Paragraph>
                                    <Paragraph>8. In Detail dashboard you can perform Edit and Delete operation</Paragraph>
                                </View>
                                <Text style={{fontSize: 16,fontWeight: 'bold',marginTop:5}}>Timesheet Approval</Text>
                                <View style={{paddingLeft:10}}>
                                    <Paragraph>1. Search Button which is help to open a specific timesheet record of user.</Paragraph>
                                    <Paragraph>2. clear Button clear the filter criteria fields.</Paragraph>
                                    <Paragraph>3. Green Button which is used for approve timesheet record.</Paragraph>
                                    <Paragraph>4. Red Button which is used for reject timesheet record. </Paragraph>
                                    <Paragraph>5. If you want to approve/reject specific timesheet record, 
                                        then hit on that single record.</Paragraph>
                                    <Paragraph>6. If you want to approve/reject multiple record at a time, then first long press on single 
                                        record, after starting of selection mode we can select multiple records for approve/reject.
                                    </Paragraph>
                                </View>
                                <Text style={{fontSize: 16,fontWeight: 'bold',marginTop:5}}>Common</Text>
                                <View style={{paddingLeft:10}}>
                                    <Paragraph>1. Each and Every pop-up, slide window, etc. are closed by pressing outside the window (Blanck space).</Paragraph>
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