import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    paragraph: {
        textAlign: 'center',
        color: '#002f2f',
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
});



export default class Example extends Component {
    constructor(props) {
        super(props);
        // var label = Text
        this.state = {
            country: '1002'
        };
    }

    render() {
        return (

            <View style={{flex: 1,   }}>
            <View style={{width: '100%', height: '10%', backgroundColor: 'steelblue'}} />
           <View style={{width: '100%', height: '80%', backgroundColor: 'powderblue'}} />
             <View style={{width: '100%', height: '10%', backgroundColor: 'skyblue'}} />
          </View>
        )
    }
}
