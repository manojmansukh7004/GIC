import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, BackHandler, Alert, StatusBar } from "react-native";
import { storeData, getData } from '../Config/AsyncStorace'
// import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
var count = 0
import { connect } from 'react-redux'
import { } from '../Redux/Action'
class DrawerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: false, // i used 1 for cashier and 0 for chef
            TimeSheet: false,
            key: '',
            default: false,
            RedirectPage: '',

        };
    }
    backAction = () => {

        //  BackHandler.exitApp()


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

    // handleMenu = (response) => {

    //     Object.keys(response).map((key, index) => {
    //         // console.log("response[key].AutoId",response[key].AutoId);
    //         if ((response[key].AutoId) === 9) {
    //             SalesRcBu = true
    //         }
    //         if (response[key].AutoId === 13) {
    //             SalesVegBu = true
    //         }
    //         if (response[key].AutoId === 14) {
    //             Processing = true
    //         }
    //         if (response[key].AutoId === 16) {
    //             Leadership = true
    //         };
    //         if (response[key].AutoId === 17) {
    //             Production = true
    //         };
    //         if (response[key].AutoId === 19) {
    //             ProductionLeadership = true
    //         };
    //         if (response[key].AutoId === 21) {
    //             Talent = true
    //         };

    //     })

    //     this.setState({
    //         SalesRcBu: SalesRcBu, SalesVegBu: SalesVegBu, Leadership: Leadership, Processing: Processing,
    //         Production: Production, ProductionLeadership: ProductionLeadership, Talent: Talent
    //     }, () => {
    //         SalesRcBu = false, SalesVegBu = false, Leadership = false, Processing = false, Production = false, ProductionLeadership = false,
    //         Talent = false

    //     })
    //     // }
    //     BackHandler.addEventListener("hardwareBackPress", this.backAction);
    // }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }



    async componentDidMount() {

      
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1,}}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="#e7ebee" />

            <View style={styles.sideMenuContainer}>

                <Image
                    source={require('../Assets/logo.jpg')}
                    style={styles.sideMenuProfileIcon}
                />
                <View style={{ jujustifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 3 }}>
                    {/* <Text>{VersionCode} </Text> */}
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#e2e2e2',

                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'flex-start',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: '#E2EDE8',
                }}>
                    <Text style={styles.Title}>TIMESHEET</Text>
                </View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'flex-start',
                        paddingTop: 10,
                        paddingBottom: 10,
                        // backgroundColor: this.state.key === 1 ? '#e0dbdb' : '#ffffff',
                    }}
                    onPress={() => this.setState({ key: 1 }, () => {
                        // this.clearFilter()
                        navigation.navigate("TimeSheet")
                    })}
                >
                    <View style={{ marginRight: 10, marginLeft: 20 }}>
                    {/* <Icon name="favorite" size={48} /> */}

                        {/* <Icon
                                    name={'md-paper'}
                                    // style={styles.icon}
                                    size={28}
                                /> */}
                    </View>
                    <Text style={[styles.text,{color:this.state.key === 1 ? 'blue': 'black'}]}>My TimeSheet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'flex-start',
                        paddingTop: 10,
                        paddingBottom: 10,
                        // backgroundColor: this.state.key === 2 ? '#e0dbdb' : '#ffffff',
                    }}
                    onPress={() => this.setState({ key: 2 }, () => {
                        // this.clearFilter()
                        navigation.navigate("TimeSheet")
                    })}
                >
                    <View style={{ marginRight: 10, marginLeft: 20 }}>
                        {/* <Icon
                                name={'md-paper'}
                                // style={styles.icon}
                                size={28}
                            /> */}
                    </View>
                    <Text style={[styles.text,{color:this.state.key === 2 ? 'blue': 'black'}]}>TimeSheet Approval</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'flex-start',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: '#E2EDE8',
                }}>
                    <Text style={styles.Title}>REPORTS</Text>
                </View>
            </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        userId: state.userId,
        baseUrl: state.baseUrl,

    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setCountry: (country) => dispatch(setCountry(country)),
//         setCompany: (company) => dispatch(setCompany(company)),
//         setDivision: (division) => dispatch(setDivision(division)),
//         setSeason: (season) => dispatch(setSeason(season)),
//         setZone: (zone) => dispatch(setZone(zone)),
//         setRegion: (region) => dispatch(setRegion(region)),
//         setRbm: (rbm) => dispatch(setRbm(rbm)),
//         setterritory: (territory) => dispatch(setterritory(territory)),
//         setTbm: (tbm) => dispatch(setTbm(tbm)),
//         setCustomer: (customer) => dispatch(setCustomer(customer)),
//         setPlc: (plc) => dispatch(setPlc(plc)),
//         setCropType: (cropType) => dispatch(setCropType(cropType)),
//         setCrop: (crop) => dispatch(setCrop(crop)),
//         setProduct: (product) => dispatch(setProduct(product)),
//         setPlant: (plant) => dispatch(setPlant(plant)),
//         setSyear: (sYear) => dispatch(setSyear(sYear)),
//         setCenter: (center) => dispatch(setCenter(center)),
//         setTeamMember: (teamMember) => setTeamMember(setPlant(teamMember)),
//         setTfa: (tfa) => dispatch(setTfa(tfa)),
//         setOrganizer: (organiser) => dispatch(setOrganiser(organiser)),
//         setGrower: (grower) => dispatch(setGrower(grower)),


//     }
// }
export default connect(mapStateToProps)(DrawerComponent)
const styles = StyleSheet.create({
    Title: {
        fontSize: 18,
        // margin: 5,
        marginLeft: 15,
        fontWeight: 'bold',

    },
    text: {
        fontSize: 16,
        margin: 5,
        marginLeft: 15,
        // fontWeight: 'bold',

    },
    icon: {
        width: 24,
        height: 24,
        // margin: 5
    },
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        // alignItems: 'flex-start',
        marginTop: 20,
    },
    sideMenuProfileIcon: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 280,
        height: 90,
    },
});