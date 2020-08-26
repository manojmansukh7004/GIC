import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, BackHandler, Alert, StatusBar, FlatList } from "react-native";
import { Divider } from 'material-bread';
import { Dialog, Button, Avatar } from 'material-bread';
import ColorPalette from 'react-native-color-palette'

// import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { } from '../Redux/Action'
const title = 18
const cardTitle = 16
const cardDate = 14
const subTitle = 14
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
        BackHandler.addEventListener("hardwareBackPress", this.backAction);


    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ }}>
                <StatusBar translucent barStyle="light-content" backgroundColor={this.state.primaryColor} />

                <View style={[styles.sideMenuContainer, { backgroundColor: this.props.secColor }]}>

                    <Image
                        source={require('../Assets/logo-sm.jpg')}
                        style={styles.sideMenuProfileIcon}
                    />
                    <View style={{ jujustifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 3 }}>
                        {/* <Text>{VersionCode} </Text> */}
                    </View>
                   
                    <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'flex-start',
                        paddingTop: 10,
                        // paddingBottom: 10,
                        // backgroundColor: '#E2EDE8',
                    }}>
                        <Text style={styles.Title}>TimeSheet</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.title}
                        onPress={() => this.setState({ key: 1 }, () => {navigation.navigate("TimeSheet",{"Loading": true})})}
                    >
                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                            <Image style={{ height: 25, width: 25 }} source={require("../Assets/darkCalendar.png")} />
                        </View>
                        <Text style={[styles.text, { color: this.state.key === 1 ? 'blue' : 'black' }]}>My TimeSheet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.strip}
                        onPress={() => this.setState({ key: 2 }, () => {navigation.navigate("TsApproval",{"Loading": true})})}
                    >
                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                            <Image style={{ height: 25, width: 25 }} source={require("../Assets/approval.png")} />
                        </View>
                        <Text style={[styles.text, { color: this.state.key === 2 ? 'blue' : 'black' }]}>TimeSheet Approval</Text>
                    </TouchableOpacity>

                    

                    <TouchableOpacity style={styles.strip}
                        onPress={() => this.setState({ key: 3 }, () => {navigation.navigate("Help")})}
                    >
                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                            <Image style={{ height: 25, width: 25 }} source={require("../Assets/question.png")} />
                        </View>
                        <Text style={[styles.text, { color: this.state.key === 3 ? 'blue' : 'black' }]}>{"User Guide"}</Text>
                    </TouchableOpacity>

                    <Divider style={{ borderWidth: .3, borderColor: 'grey', backgroundColor: 'grey' }} />

                    {/* <TouchableOpacity
                        style={styles.title}
                        onPress={() => this.setState({ visible: 1 }, () => {
                            // navigation.navigate("TimeSheet")
                        })}
                    >
                        <View style={{ marginRight: 10, marginLeft: 20 }}>
                            <Image style={{ height: 25, width: 25 }}
                                source={require("../Assets/theme.png")} />
                        </View>
                        <Text style={[styles.text, { color: this.state.key === 1 ? 'blue' : 'black' }]}>Theme</Text>
                    </TouchableOpacity> */}

                    <Dialog
                        visible={this.state.visible}
                        style={{ backgroundColor: 'white', height: 250, width: 350 }}
                        onTouchOutside={() => this.setState({ visible: false })}

                    >
                        <View style={{ backgroundColor: 'white', height: 300, width: 400, bottom: 25, right: 25 }}>
                            <View style={{ height: 50, padding: 15, marginBottom: .3, backgroundColor: this.props.primaryColor }}>
                                <Text style={{ fontSize: title, color: this.props.fontColor }}>{'Select Theme Color'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', right: 25 }}>

                                <FlatList
                                    data={Object.keys(this.state.colors)}
                                    // horizontal={true}
                                    renderItem={({ item, index }) => (
                                        console.log(this.state.colors[item]),
                                        <>
                                            <Text>mj</Text>
                                            <Text>mj</Text>
                                            <Text>mj</Text>
                                        </>
                                    )}
                                />
                            </View>
                            {/* <ColorPalette
                                    onChange={color => this.setState({selectedColor : color},()=>{console.log(this.state.selectedColor);
                                    })}
                                    paletteStyles={{flexWrap: "wrap"}}
                                    value={this.state.selectedColor}
                                    colors={['#ffffff', '#f28b82', 
                                    '#fbbc04', '#fff475',
                                    '#ccff90', '#a7ffeb', 
                                    '#d7aefb', '#fdcfe8']}
                                    title={""}
                                    icon={
                                        <Icon name={'check-circle-o'} size={25} color={'black'} />
                                        // React-Native-Vector-Icons Example
                                    }
                                /> */}
                            {/* </View> */}
                        </View>
                    </Dialog>
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
        fontColor: state.fontColor
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
        fontSize: 14,
        marginLeft: 15,
        color: 'grey'
        // fontWeight: 'bold',
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
        // backgroundColor: '#fff',
        // alignItems: 'flex-start',
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

    }
});