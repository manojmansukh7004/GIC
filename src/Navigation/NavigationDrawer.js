import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
// import Icon1 from 'react-native-vector-icons/Ionicons';
import DrawerComponent from "./DrawerComponent";
import TimeSheet from '../Pages/TimeSheet';
import TsApproval from '../Pages/TsApproval';
import Help from '../Pages/Help'
import ProjectStatus from '../Pages/ProjectStatus';
import SplashScreen11 from '../Pages/SplashScreen'


const DrawerNavigator = createDrawerNavigator({
    TimeSheet: { screen: TimeSheet },
    TsApproval: { screen: TsApproval },
    ProjectStatus: { screen: ProjectStatus },
    Help: { screen: Help },


},
  {

    contentComponent: DrawerComponent,

  }
);



export default createAppContainer(DrawerNavigator);
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

