import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Drawer from '../Navigation/NavigationDrawer'


const MainNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer, navigationOptions: { header: null } }
    },
    {
        initialRouteName: 'Drawer'
    }

);

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;