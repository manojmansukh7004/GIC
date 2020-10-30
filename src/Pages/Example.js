import React, { Component } from "react";
import { Animated, PanResponder, View, StyleSheet, Text } from "react-native";
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

class App extends Component {
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            this.pan.setOffset({
                x: this.pan.x._value,
                y: this.pan.y._value
            });
        },
        onPanResponderMove: Animated.event([
            null,
            { dx: this.pan.x, dy: this.pan.y }
        ]),
        onPanResponderRelease: () => {
            this.pan.flattenOffset();
        }
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Drag this box!</Text>
                <Animated.View
                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                    }}
                    {...this.panResponder.panHandlers}
                >
                    {/* <Text>Manoj</Text> */}
                    <FloatingAction
                        actions={actions}
                        animated={true}
                        position={"right"}
                        color={this.props.primaryColor}
                        // distanceToEdge={20 }
                        onPressItem={()=>{console.log("mjjjjj")}
                        }
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});

export default App;