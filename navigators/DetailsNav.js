import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import StationDetails from '../components/StationDetails'
import MapStationListContainer from '../containers/MapStationListContainer'

const RootStack = createStackNavigator({
      List: {
        screen: MapStationListContainer,
        navigationOptions: {
          title: "Nearby Charging Stations",
          headerStyle: {
            backgroundColor: '#4A89F3'
          },
          headerTintColor: '#f0edf6',
        },
      },
      Detail: {
        screen: StationDetails,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#4A89F3'
          },
          headerTintColor: '#f0edf6',
          headerTitleStyle: {fontWeight: '400'},
        },
      },
},
{ initialRouteName: 'List' },
);



const  AppContainer = createAppContainer(RootStack);


export default AppContainer;