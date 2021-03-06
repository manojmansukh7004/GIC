import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions';
import Drawer from '../Navigation/NavigationDrawer'
import TimesheetEntry from '../Pages/TimesheetEntry'
import EditTimeSheet from '../Pages/EditTimeSheet'
import ProjectDetail from '../Pages/ProjectDetail'
const MainNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer, navigationOptions: { header: null } },
        TimesheetEntry: { screen: TimesheetEntry, navigationOptions: { header: null } },
        ProjectDetail: { screen: ProjectDetail, navigationOptions: { header: null } },
        EditTimeSheet: { screen: EditTimeSheet, navigationOptions: { header: null } }

    },
    {
        initialRouteName: 'Drawer'
    }

);

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;