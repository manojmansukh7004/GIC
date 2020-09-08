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
import TimesheetEntry from '../Pages/TimesheetEntry'
import EditTimeSheet from '../Pages/EditTimeSheet'
import ProjectDetail from '../Pages/ProjectDetail'

const myTimesheetStack = createStackNavigator({
  TimeSheet: { screen: TimeSheet, navigationOptions: { header: null } },
TimesheetEntry: { screen: TimesheetEntry, navigationOptions: { header: null } },
ProjectDetail: { screen: ProjectDetail, navigationOptions: { header: null } },
EditTimeSheet: { screen: EditTimeSheet, navigationOptions: { header: null } }
})

const tsApprovaltStack = createStackNavigator({
  TsApproval: { screen: TsApproval, navigationOptions: { header: null } },
ProjectDetail: { screen: ProjectDetail, navigationOptions: { header: null } },
})

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

