import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Picker, ActivityIndicator, Alert, Dimensions, ScrollView, StatusBar
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { saveTimesheetEntry } from '../Services/saveTimesheetEntry';
import { getTsEntryDropdownData } from '../Services/getTsEntryDropdownData';
import { getDataOnClientChange } from '../Services/getDataOnClientChange';

import Appbar from '../Component/AppBar'

class TimesheetEntry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timesheetId:'',
            client:'',
            workList: '',
            project:'',
            clientList: [],
            typeOfWorkList: [],
            projetList: [],
            selectedType: 'Select'
        }
    }
    handleDataOnClientChange = async (Client) => {
        console.log("mjjjj",Client);
        
        var clientChange = await getDataOnClientChange(this.props.user, this.state.timesheetId, Client, this.props.baseUrl)
       console.log("pprprr", clientChange.ProjectList[0]);
       
        this.setState({
            projetList: clientChange.ProjectList[0],
        });
    }

    async componentDidMount() {
        console.log("timesheetId",this.props.navigation.state.params.timesheetId);
        
        var dropdownData = await getTsEntryDropdownData(this.props.user, this.props.baseUrl)
        console.log("dropdownData", dropdownData.ClientList[0]);
        this.setState({
            clientList: dropdownData.ClientList[0],
            typeOfWorkList: dropdownData.TypeOfWorkList[0],
            timesheetId: this.props.navigation.state.params.timesheetId
        });

    }

    render() {
        return (
            <View>
                <StatusBar translucent barStyle="light-content" backgroundColor='#297AF9' />
                <View style={{ height: "100%", width: '100%', top: '3%' }}>
                    <View style={{ height: '7%', backgroundColor: this.props.primaryColor, }}>
                        <Appbar navigation={this.props.navigation}
                            title={"Timesheet Entry"}
                        />
                    </View>
                    <View style={{ height: '90%', backgroundColor: this.props.secColor }}>
                        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                            <View style={styles.horizontalContainer}>
                                <Card style={styles.cards}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.state.primaryColor }]}>CLIENT</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.client}
                                            style={styles.pickers}
                                        // enabled={this.item.AttStatus !== 'MissingPunches'}
                                        onValueChange={(itemValue) => this.setState({client: itemValue},()=>{this.handleDataOnClientChange(itemValue)})}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.clientList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={item.Value} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>

                                <Card style={styles.cards}>
                                    <View style={styles.cardMenuSpasing}>
                                        <Text style={[styles.singleCardLabel, { color: this.state.primaryColor }]}>TYPE OF WORK</Text>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.workList}
                                            style={styles.pickers}
                                        // enabled={this.item.AttStatus !== 'MissingPunches'}
                                        onValueChange={(itemValue) =>this.setState({workList: itemValue})}
                                        >
                                            <Picker.Item label="--Select--" value="0" />
                                            {this.state.typeOfWorkList.map((item, index) => {
                                                return (<Picker.Item label={item.Text} value={index} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </Card>
                            </View>
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
    twoCards: {
        width: '48%',
        elevation: 3,
        borderRadius: 5,
        marginTop: 15
    },
    longText: { backgroundColor: 'white', fontSize: 16, marginEnd: 10 },
    reasonView: { paddingStart: 3, paddingTop: 10, paddingBottom: 10 },
})