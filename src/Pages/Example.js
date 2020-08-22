import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Dimensions
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
            orientation: ''
        };
    }
    getOrientation = () => {
        console.log("method call");
        
        if (this.refs.rootView) {
            if (Dimensions.get('window').width < Dimensions.get('window').height) {
                this.setState({ orientation: 'portrait' });
            }
            else {
                this.setState({ orientation: 'landscape' });
            }
        }
    }

    componentDidMount(){
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }

    render() {
        console.log("orrr",this.state.orientation);
        
        return (

            <View ref="rootView" style={{flex: 1,   }}>
            <View style={{width: '100%', height: this.state.orientation == 'landscape'?'12%': '8%', backgroundColor: 'steelblue'}} />
           <View style={{width: '100%', height: this.state.orientation == 'landscape'?'76%': '84%', backgroundColor: 'powderblue'}} />
             <View style={{width: '100%', height:  this.state.orientation == 'landscape'?'12%':'890%', backgroundColor: 'skyblue'}} />
          </View>
        )
    }
}
