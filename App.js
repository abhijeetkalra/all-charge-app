import React, { useEffect } from 'react'; 
import { View } from 'react-native';  
import TabNavigator from './containers/TabNavigatorScreen.js';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
    useEffect(() => {
        SplashScreen.hide();
      }, [])

    return(
        <View style={{flex:1}}>
            <TabNavigator/>
        </View>
    )
}

export default App;