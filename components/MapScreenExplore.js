import React from 'react';
import { Alert, Platform, StyleSheet, Dimensions, View, Text} from 'react-native';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window')


const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.08

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

const NEARBY_API_URL = "https://ev.funr.xyz/api/v1/stations/nearby"

class MyMapView extends React.Component {

  map = null;

  state = {
    region: {
      latitude: 37.370523,
      longitude: -121.930767,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    mylocation: null,
    destination: {
      latitude: 38.370523,
      longitude: -121.930767,
    },
    ready: false,
    filteredMarkers: [],
    markers: [],
    stations: {},
    mapMargin: 1,
    marginBottom: 1,
  };

  setRegion(region) {
    if(this.state.ready) {
        //setTimeout(() => this.map.animateToRegion(region), 500);
    }
  }

  componentDidMount() {
    console.log('Component did mount');
    //
  }

  getStationsInRegion() {
     let radius = 50000
     let region = this.state.region
     let qs = objToQueryString({
       latitude: region.latitude,
       longitude: region.longitude,
       latitudeDelta: region.latitudeDelta,
       longitudeDelta: region.longitudeDelta,
       radius: radius,
       count: 20,
     })
     console.log("qs:", qs)
    fetch(`${NEARBY_API_URL}?${qs}`)
      .then(response => response.json())
      .then(responseData => {
        //console.log("region stations: ", responseData)
        var newMarkers = []
        responseData.forEach((station) => {
          if (!this.state.stations[station.id]) {
            station.totalCount = station.chargePoints.length
            station.availCount = station.chargePoints.filter(u => u.available == 1).length;
            var marker = {
              id: station.id,
              name: station.name,
              address: station.address,
              totalCount: station.totalCount,
              availCount: station.availCount,
              networkId: station.network.id,
              networkName: station.network.name,
              coordinate: {
                latitude: station.geoLocation.coordinates[1],
                longitude: station.geoLocation.coordinates[0],
              },
            }

            this.state.stations[station.id] = station
            //console.log(marker)
            newMarkers.push(marker)
          }
        }
        )
        console.log(`got ${newMarkers.length} stations`)
        this.setState({markers: [...this.state.markers, ...newMarkers]})
        // this.setState({
        //   markers: responseData
        // });
      });
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(
        position => {
          console.log("location: ", position)
          
        let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
          this.setState({region: region})
          this.setState({mylocation: region})
           this.getStationsInRegion();
        if (!this.state.ready) {
          this.state.ready = true
          this.map.animateToRegion(this.state.region)
        }
            
        },
        
        error => console.log(error),
        {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 1000
        }
    );

  }

  onMapReady = (e) => {
    console.log("map ready")
    this.setState({ mapMargin: 0, marginBottom: 0});
    this.getCurrentPosition();
  };

  onRegionChange = (region) => {
    //console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
    this.setState({region: region})
    //this.getStationsInRegion()
  };

  onCalloutPress = (e) => {
    console.log("callout pressed")
    console.log(e)
  }

  getPinColor = (station) => {
    if (station.availCount <= 2) {
      return "#ff0000" //red
    } else if (station.availCount <= 4) {
      return "#fcd303" //yellow
    } else {
      return "#03fc07" //green
    }
  }

  render() {

    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;

    return (
      <View style={{ flex: 1 }}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={ map => { this.map = map }}
        initialRegion={this.state.region}
        onMapReady={this.onMapReady}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={{ ...styles.map, margin: this.state.marginBottom }}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}> 

        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            pinColor={this.getPinColor(marker)}
            title={marker.name}
            description={marker.networkName + "(" + marker.availCount + "/" + marker.totalCount +  ")"}
            onCalloutPress={this.onCalloutPress}>

            </MapView.Marker>
          
        ))}
        

      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
});

export default MyMapView;