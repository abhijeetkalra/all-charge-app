import React from 'react';
import MapView from 'react-native-maps';

const MyMapViewNew = (props) => {
    return (
        <MapView
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}
            onRegionChangeComplete={(reg) => props.onRegionChangeComplete(reg)} >
        </MapView>
    )
}

export default MyMapViewNew;