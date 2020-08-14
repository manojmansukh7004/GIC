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

            <DropDownPicker
                items={[
                    { label: "1002 : Circular Angle", value: "1002" },
                    { label: "1001 : General Industrial Controls", value: "1001" },
                ]}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"
                seachableStyle={{}}
                searchableError={() => <Text>Not Found</Text>}
                defaultValue={this.state.country}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => this.setState({
                    country: item.value
                })}
            />
        )
    }
}
