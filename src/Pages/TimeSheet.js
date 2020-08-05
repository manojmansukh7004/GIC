import React, { Component } from 'react';
import { StatusBar, StyleSheet, SafeAreaView, ScrollView, Text, Vibration, View } from 'react-native';
import { ActivityIndicator, Colors, Card } from 'react-native-paper';
import Appbar1 from '../Component/AppBar1'
import { FloatingAction } from "react-native-floating-action";

const actions = [

    {
        text: "Select Week",
        icon: require("../Assets/calendar.png"),
        name: "Select Week",
        position: 1
    },
    {
        text: "Select Date",
        icon: require("../Assets/calendar.png"),
        name: "Select Date",
        position: 2
    },
  
];
export default class TimeSheet extends Component {

    constructor(props) {
        super(props)
        this.state = {

            loading: true,
            count: 0,
            content: true,
        }
    }



    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent barStyle="dark-content" backgroundColor="#e7ebee" />
                <SafeAreaView style={styles.Container}>


                    <Appbar1 navigation={this.props.navigation} title={" TIMESHEET "} />

                    <ScrollView style={{ flex: 1 }}
                        scrollEnabled={this.state.content}
                    >

                        {/* </View> */}
                        <Card style={styles.card}>
                            <Text style={styles.text}> Default Dashboard not available.</Text>
                            <Text style={styles.text}> Please select other dashboard, if available in menu .</Text>

                        </Card>


                       

                    </ScrollView>
                    <FloatingAction
                            actions={actions}
                            onPressItem={name => {
                                alert(`selected button: ${name}`)
                                console.log(`selected button: ${name}`);
                            }}
                        />


                    {/* </View> */}
                </SafeAreaView >

            </SafeAreaView >
        );
    }
}


// export default (TimeSheet)

const styles = StyleSheet.create({
    Container: {

        // flex: 1,
        display: 'flex',
        marginTop: 20,
        width: '100%',
        height: '100%',
        backgroundColor: "white"

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

    text: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: 16
    },

});