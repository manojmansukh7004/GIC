import React, { Component } from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';



export default class Example extends Component {
    constructor(props) {
        super(props);
        // var label = Text
        this.state = {
            isModalVisible: false
        };
    }
     toggleModal = () => {
        this.setState({isModalVisible : !this.state.isModalVisible})
      };

    render() {

        return (

            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={this.toggleModal} />

                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ backgroundColor:'white',height:400, justifyContent:'center', alignItems: 'center'}}>
                        <Text>Hello!</Text>
                        <Text>Hello!</Text>
                        <Text>Hello!</Text>

                        <Button title="Hide modal" onPress={this.toggleModal} />
                    </View>
                </Modal>
            </View>
        )
    }
}
