import React from 'react';
import { View} from 'react-native';
//import MapContainer from './MapContainer.js';
import MyMapView from '../components/MapScreenExplore';
import StationList from './StationListContainer.js';

  
var navigation = null;

export default class MapListContainer extends React.Component {

  constructor(props){
      super(props);
      navigation = this.props.navigation;
  }


  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}><MyMapView/></View>
        <View style={{ flex: 1 }}><StationList nav={navigation}/></View>
      </View>
    );
  }
}