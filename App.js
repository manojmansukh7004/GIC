// import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Text , StatusBar} from 'react-native';

import AppContainer from './src/Navigation/SwitchNavigation'
// import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/Navigation/NavigationDrawer'
import Store from './src/Redux/Store'
import { Provider } from 'react-redux'

export default class App extends Component {
  constructor(){
    super()
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
  }

  }
  render() {
    return (

      // <NavigationContainer>
      <Provider store={Store}>
              {/* <StatusBar translucent barStyle="dark-content" backgroundColor="#e7ebee" /> */}
        <AppContainer />
       </Provider>
      // </NavigationContainer>
        // <NavigationContainer>
          // <MyDrawer />
        // </NavigationContainer>
        // <TablrEx/>
    );
  }
}




