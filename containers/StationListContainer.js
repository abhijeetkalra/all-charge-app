import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import StationEntry from '../components/StationEntry.js';
import Geolocation from '@react-native-community/geolocation';
//import { SERVER_DATA } from '../mock/ServerData.js';


function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  //alert(keyValuePairs.join('&'));
  return keyValuePairs.join('&');
}

const NEARBY_API_URL = "https://ev.funr.xyz/api/v1/stations/nearby"

var navigation = null;

export default class FlatListBasics extends Component {


  constructor(props){
    super(props);
    navigation = props.nav;
  }

 
  state = {
    nearbyStationData : [],
    isLoading: true,
    isListEmpty: true
  }
  

  getNearbyStations(region) {
     let radius = 50000
     let qs = objToQueryString({
       latitude: region.latitude,
       longitude: region.longitude,

       //Googleplex co-ordinates (Mountain View)
       //latitude: 37.421998,
       //longitude: -122.084,

       radius: radius,
       count: 20,
     })
     console.log("qs:", qs)
    fetch(`${NEARBY_API_URL}?${qs}`)
      .then(response => response.json())
      .then(responseData => {
        //console.log("nearby stations: ", responseData)
        this.setState({
          nearbyStationData: responseData,
          isLoading: false
        });
        if(responseData.length > 0){
          this.setState({
            isListEmpty: false
          })
        }
      });
  }


  _separator = () => {
    return <View style={{height:1,backgroundColor:'#DDDDDD'}}/>;
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(
        position => {
          
        let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            };
          this.getNearbyStations(region); 
        },
        error => console.log(error),
        {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 1000
        }
    );

  }


  componentDidMount() {
    console.log('Component did mount');
    this.getCurrentPosition();
  }


  render() {


    if(this.state.isLoading){
      return(
        <View style={{flex: 1, 
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',}}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }


    else if(this.state.isListEmpty){
      return(
        <View style={{flex: 1, padding: 20, justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',}}>
          <Text style={{ fontSize:15}}>Sorry.!! No Charging Stations around you</Text>
          <Image source={require('../images/no-stations.png')}  style = {{ width: 120, height: 120 }}  />
        </View>
      )
    }

    
    return (
      <View style={{ flex:1 }}>
        <View style={styles.container}>
          <FlatList
            data = {this.state.nearbyStationData}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this._separator}
            renderItem={({item}) => <StationEntry station={item} nav={navigation}/>}/>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 5
  }
})
