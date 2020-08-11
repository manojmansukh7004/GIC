import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions';
import Drawer from '../Navigation/NavigationDrawer'
import TimesheetEntry from '../Pages/TimesheetEntry'
import ProjectDetail from '../Pages/ProjectDetail'
const MainNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer, navigationOptions: { header: null } },
        TimesheetEntry: { screen: TimesheetEntry, navigationOptions: { header: null } },
        ProjectDetail: { screen: ProjectDetail, navigationOptions: { header: null } }

    },
    {
        initialRouteName: 'Drawer',
        transitionConfig: () => zoomIn(1000),

    }

);

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;