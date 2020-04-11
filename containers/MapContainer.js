import React from 'react';
import { View } from 'react-native';
import MyMapView from '../components/MapView';


export default class MapContainer extends React.Component {
    state = {
        region: {}
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
    navigator.geolocation.getCurrentPosition(
        position => {
        this.setState({
          region: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
          }
        });        
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }


  onMapRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };
    

    render() {
        return (
            <View style={{ flex: 1 }}>
                   <MyMapView
                      region={this.state.region}
                      onRegionChange={(reg) => this.onMapRegionChange(reg)}
                      onRegionChangeComplete={(reg) => this.onRegionChangeComplete(reg)} />
            </View>
        );
    }
}
