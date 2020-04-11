import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import withBadge from './withBadge.js';


//remove this const
const StationEntryTemp = (props) => {
  return (
    <View style={{ flex: 1 }}>
            <View style={styles.sectionContainer}>
              <Image source={{uri: props.station.posters.thumbnail}} style={styles.thumbnail} />
            </View>
  
    </View>
  );
}



 
class StationEntry extends React.Component {
//const StationEntry = (props) => {
  
    

  getScoreStatus = (score) => {
    if (score >= 8) {
      return "success" //green
    } else if (score >= 5) {
      return "warning" //yellow
    } else {
      return "error" //red
    }
  }

  getAvailCount = (chargePoints) => {
    chargePoints.filter(u => u.available == 1).length
  }

  render(){
  const availCount = this.props.station.chargePoints.filter(u => u.available == 1).length
   const BadgedIcon = withBadge(availCount)(Button)
  return (

      <View style={{ flex: 1 }}>
            <View style={styles.sectionContainer}>
                <View style={{ flex: 1 , flexDirection:"row"}}>
                <TouchableHighlight
                    onPress={
                      () => this.props.nav.navigate('Detail', {
                        Id: this.props.station.id,
                        address: this.props.station.address,
                        name: this.props.station.name,
                        score: "score: " + this.props.station.score + "/10",
                        picture: this.props.station.images[0],
                        station: this.props.station,
                        chargePoints: this.props.station.chargePoints,
                      })
                    }
                    style={{ flex: 1}}
                    activeOpacity={0.9}
                    underlayColor='#EEEEEE'
                  >
                    <View style={{ flex: 1 , flexDirection:"row"}}>
                         
                         <Avatar rounded source={ this.props.station.network.image 
                                                ? 
                                                {uri: this.props.station.network.image}
                                                :
                                                require('../images/logo1.png')
                                              }  size="large"  />

                        <View  style={{flex:1}}>
                                <View style={{flexDirection: "column"}}>
                                      <Text style={styles.sectionTitle}>{this.props.station.network.name}</Text>
                                      <Text style={{marginLeft: 18, fontSize: 10}}>{this.props.station.name}</Text>
                                      <Text style={{marginLeft: 18, fontSize: 10}}>{parseFloat(2*this.props.station.distance/1.60934).toFixed(2)} miles</Text>

                                      <View style={{flex:1, marginTop:5, marginLeft:-50}}>
                                          <Badge  badgeStyle={{ backgroundColor:'grey'}} value={ 
                                                      <View style={{flex:1,  flexDirection: "row"}}>
                                                          <Text style={{fontSize: 12}}>   Rating: </Text>
                                                          <Badge status={this.getScoreStatus(this.props.station.score)} value={
                                                                    <Text style={{fontSize: 10}}>  {this.props.station.score}/10  </Text>
                                                                    } />
                                                      </View>
                                          } />
                                      </View>
        
                                  
                                </View>
                                
                        </View>
                    </View>
                </TouchableHighlight>
                </View>

                        
                  <View style={{ justifyContent: 'center', alignContent: "center", alignItems: 'center'}}>
                       <BadgedIcon style={{ justifyContent: 'center', alignContent: "center", alignItems: 'center'}}  title="Book Now" />
                  </View>

            </View>
        
      </View>

    

  );}
}

export default StationEntry;




const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  rightContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginLeft: 18,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginLeft: 18,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'transparent',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'transparent',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  thumbnail: {
    width: 45,
    height: 45
  },
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,


  },

});