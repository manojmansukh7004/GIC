
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from '../Pages/SplashScreen'
import Login from '../Pages/Login'
import ForgotPassword from '../Pages/ForgotPasswordScreen'
import NavigationStack from './StackNavigation'

const AppNavigator = createSwitchNavigator({
    SplashScreen: SplashScreen,
    ForgotPassword: ForgotPassword,
    Login: Login,
    NavigationStack: NavigationStack,
});

AppContainer = createAppContainer(AppNavigator);
export default AppContainer;