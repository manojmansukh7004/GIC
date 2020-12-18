import React, { Component } from "react";
import { ScrollView, Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, BackHandler, Alert, StatusBar, FlatList } from "react-native";
import { Divider } from 'material-bread';
import { connect } from 'react-redux'
import { storeData, getData } from '../Config/AsyncStorace'
import { FechDrawerMenu } from "../Services/FechDrawerMenu"

var myTimesheet = false, timesheetApproval = false
class DrawerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: false, // i used 1 for cashier and 0 for chef
            TimeSheet: false,
            key: 1,
            default: false,
            RedirectPage: '',
            visible: false,
            myTimesheet: false,
            timesheetApproval: false,
            colors: [
                '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
                '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
                '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
            ],
        }
    }
    backAction = () => {

        //  BackHandler.exitApp()

        // this.props.navigation.navigate("TimeSheet",{"Loading": false})
        Alert.alert("Hold on!", "Are you sure you want to Exit ?", [
            {
                text: "NO",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    handleMenu = (response) => {

        Object.keys(response).map((key, index) => {
            // console.log("response[key].AutoId",response[key].MenuName);
            if ((response[key].MenuName) === "My Timesheet") {
                myTimesheet = true
            }
            if (response[key].MenuName === "Timesheet Approval") {
                timesheetApproval = true
            }

        })

        this.setState({
            myTimesheet: myTimesheet, timesheetApproval: timesheetApproval
        }, () => {
            myTimesheet = false, timesheetApproval = false
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    async componentDidMount() {
        // BackHandler.addEventListener("hardwareBackPress", this.backAction);
        await getData('UserRole').then((value) => {
            this.setState({ UserRole: value }, async () => {
                var drawerMenu = await FechDrawerMenu(this.props.user, this.state.UserRole, this.props.baseUrl)                
                this.handleMenu(drawerMenu.EmployeeMenu[0])
            })
        })
    }

    render() {

        const { navigation } = this.props;
        return (
            <View style={{}}>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.state.primaryColor} />

                <View style={[styles.sideMenuContainer, { backgroundColor: this.props.secColor }]}>

                    <Image
                        source={require('../Assets/logo-sm.jpg')}
                        style={styles.sideMenuProfileIcon}
                    />
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 3 }}>
                        {/* <Text>{VersionCode} </Text> */}
                    </View>
                    <ScrollView style={{}}>
                        <View style={{ backgroundColor: 'transparent', height: Dimensions.get('window').height }}>

                            <View style={styles.drawer}>
                                <Text style={styles.Title}>TIMESHEET</Text>
                            </View>

                            {
                                this.state.myTimesheet == true ?
                                    <TouchableOpacity
                                        style={styles.title}
                                        onPress={() => this.setState({ key: 1 }, () => { navigation.navigate("TimeSheet", { "Loading": true }) })}
                                    >
                                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                                            <Image style={{ height: 23, width: 23 }} source={require("../Assets/darkCalendar.png")} />
                                        </View>
                                        <Text style={[styles.text, { color: this.state.key === 1 ? 'black' : 'black' }]}>My TimeSheet</Text>
                                    </TouchableOpacity>
                                    : null
                            }
                            {
                                this.state.timesheetApproval == true ?
                                    <TouchableOpacity style={styles.strip}
                                        onPress={() => this.setState({ key: 2 }, () => { navigation.navigate("TsApproval", { "Loading": true }) })}
                                    >
                                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                                            <Image style={{ height: 23, width: 23 }} source={require("../Assets/approval.png")} />
                                        </View>
                                        <Text style={[styles.text, { color: this.state.key === 2 ? 'black' : 'black' }]}>TimeSheet Approval</Text>
                                    </TouchableOpacity>
                                    : null
                            }
                            <TouchableOpacity style={styles.strip}
                                onPress={() => this.setState({ key: 3 }, () => { navigation.navigate("Help") })}
                            >
                                <View style={{ marginRight: 10, marginLeft: 20 }}>
                                    <Image style={{ height: 23, width: 23 }} source={require("../Assets/question.png")} />
                                </View>
                                <Text style={[styles.text, { color: this.state.key === 3 ? 'black' : 'black' }]}>{"User Guide"}</Text>
                            </TouchableOpacity>
                            <Divider style={{ borderWidth: .3, borderColor: 'grey', backgroundColor: 'grey' }} />
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        userId: state.userId,
        baseUrl: state.baseUrl,
        primaryColor: state.primaryColor,
        secColor: state.secColor,
        fontColor: state.fontColor,
        user: state.user
    }
}

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default connect(mapStateToProps)(DrawerComponent)
const styles = StyleSheet.create({
    Title: {
        fontSize: 14,
        marginLeft: 15,
        color: 'grey'
    },
    title: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        fontSize: 16,
        margin: 5,
        marginLeft: 15,
    },
    icon: {
        width: 24,
        height: 24,
    },
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    sideMenuProfileIcon: {
        justifyContent: 'center'
    },
    strip: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,

    },
    drawer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 10,
    }
});