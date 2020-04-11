import React from 'react';  
import {StyleSheet, Text, View, Image} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import MyMapView from '../components/MapScreen.js';
//import MapContainer from './containers/MapContainer.js';

//import MapStationListContainer from './containers/MapStationListContainer.js';
import StationNav from '../navigators/DetailsNav.js';


class HomeScreen extends React.Component {  
  render() {  
    return (  
        <View style={{ flex: 1 }}>  
          <MyMapView/>
        </View>  
    );  
  }  
}  
class ExploreScreen extends React.Component {  
  render() {  
    return (  
        <View style={{ flex: 1 }}>  
          <StationNav /> 
        </View>  
    );  
  }  
}  
class PlannerScreen extends React.Component {  
  render() {  
    return (  
        <View style={styles.container}>  
            <View style={{flex: 1, padding: 20, justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',}}>
             <Image source={require('../images/ComingSoon.jpg')}  style = {{ width: 250, height: 250 }}  />
            </View>  
        </View>  
    );  
  }  
}  


/*class ForyouScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Cart Screen</Text>  
            </View>  
        );  
    }  
}*/

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
});  
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  

                    </View>),  
            }  
        },  
        Explore: { screen: ExploreScreen,  
            navigationOptions:{  
                tabBarLabel:'Explore Nearby',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-navigate'}/>  
                    </View>),  
                  
            }  
        },  
       
        Planner: {  
            screen: PlannerScreen,  
            navigationOptions:{  
                tabBarLabel:'Planner',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'md-map'}/>  
                    </View>),  
            }  
        },

       /* Foryou: {  
            screen: ForyouScreen,  
            navigationOptions:{  
                tabBarLabel:'For You',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'}/>  
                    </View>),  
            }  
        },*/ 


    },  
    
    {  
      initialRouteName: "Home",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#4A89F3' },  
    },  
);  
 
export default createAppContainer(TabNavigator); 

//export default FetchExample;
class FetchExample extends React.Component {

render () {
    return (
      <View style={{ flex: 1 }}>

      <Text>Itss Working1234</Text>
      <MapStationListContainer/>

              
        </View>
    );
  }
}