import React, { Component } from 'react';
import { 
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  Dimensions,
  ListView,
  TouchableHighlight,
  Alert,
} from "react-native";

import LaunchNavigator from 'react-native-launch-navigator';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { MOCKED_REVIEW_DATA as MOCKED_STATION_DATA}  from '../mock/MockData'
import { MOCKED_STATION_DATA as a} from '../mock/MockData'
import { MOCKED_STATION_DETAILS_DATA as stationDetails} from '../mock/MockData'



export default class StationDetails extends Component {


  render() {
    return (
    <>
      <StatusBar barStyle="dark-content" />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
          {/*<Header /> */}
          
          <View style={styles.body}>
            <View style={styles.detailsBarContainer}>
              <View style={styles.detailsLeftContainer}>
                <Image source={{uri:  this.props.navigation.getParam('picture')}} style={styles.stationPicture} />
              </View>
              <View style={styles.detailsRightContainer}>
                <View style={styles.detailsNameRowContainer}>
                  <View style={styles.stationNameContainer}>
                    <Text style={styles.stationName} numberOfLines={2}>{this.props.navigation.getParam('name')}</Text>
                  </View>
{/*                  <View style={styles.detailsRightBox}>
                    <Text style={styles.smallDetails}>{stationDetails.openTime}</Text>
                  </View>*/}
                </View>
                <View style={styles.detailsRowContainer}>
                  <View style={styles.detailsLeftBox}>
                    <Text style={styles.smallDetails}>{this.props.navigation.getParam('score')}</Text>
                  </View>
                  <View style={styles.detailsRightBox}>
                    <Text style={styles.smallDetails}>{stationDetails.openTime}</Text>
                  </View>
                </View>
                <View style={styles.detailsLocationContainer}>
                  <View style={styles.locationLeftBox}>
                    <Image source={{uri:  "http://img.51miz.com/preview/element/00/01/04/51/E-1045139-E8839469.jpg"}} style={styles.locationIcon} />
                  </View>
                  <View style={styles.locationRightBox}>
                    <Text style={styles.smallDetails} numberOfLines={3}>{this.props.navigation.getParam('address')}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.iconBarContainer}>
              
              <View style={styles.iconBar}>
                <TouchableHighlight onPress={() => {
                  cords = this.props.navigation.getParam('station').geoLocation.coordinates.slice().reverse()
                  LaunchNavigator.navigate(cords)
                    .then(() => console.log("Launched navigator"))
                    .catch((err) => console.error("Error launching navigator: " + err));
                }
                }>
                  <Image source={{ uri: "http://pic.51yuansu.com/pic2/cover/00/37/60/581213ea94419_610.jpg" }} style={styles.iconPicture} />
                  </TouchableHighlight>
                  <Text style={styles.iconText}>Navigate</Text>
                </View>
                
                
              
              <View style={styles.iconBar}>
                <Image source={{uri:  "http://pic.51yuansu.com/pic2/cover/00/30/19/581075af0d408_610.jpg"}} style={styles.iconPicture} />
                <Text style={styles.iconText}>Call</Text>
              </View>
              <View style={styles.iconBar}>
                <Image source={{uri:  "http://pic.51yuansu.com/pic2/cover/00/30/65/58108b7a5803a_610.jpg"}} style={styles.iconPicture} />
                <Text style={styles.iconText}>Share</Text>
              </View>
              <View style={styles.iconBar}>
                <Image source={{uri:  "http://pic.51yuansu.com/pic3/cover/02/27/67/59c0389f727c5_610.jpg"}} style={styles.iconPicture} />
                <Text style={styles.iconText}>Save</Text>
              </View>
            </View>
            {/* <View style={styles.operationBarContainer}>
              <Text style={styles.smallDetails}>{stationDetails.connectors}</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonLeftContainer}>
                  <TouchableHighlight onPress={
                      ()=> {
                          Alert.alert(
                              `You clicked button`,
                              'Hello World！',
                              [
                                  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ]
                          )
                      }
                  } style={styles.button}>
                      <Text style={styles.buttonText}>Review</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.buttonLeftContainer}>
                                    <TouchableHighlight onPress={
                      ()=> {
                          Alert.alert(
                              `You clicked button`,
                              'Hello World！',
                              [
                                  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                  {text: 'cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'ok', onPress: () => console.log('OK Pressed')},
                              ]
                          )
                      }
                  } style={styles.button}>
                      <Text style={styles.buttonText}>Book</Text>
                  </TouchableHighlight>
                </View>              
              </View> */}
            {/* </View> */}
            <View style={styles.listHeaderContainer}>           
              <Text style={styles.stationName}>Charge Points</Text>
            </View>
              <View style={{flex: 1}}>
              <FlatList
                style={{flex: 1}}
                data={this.props.navigation.getParam('chargePoints')}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this._separator}
                renderItem = { (item) => this._renderItem(item) }
              />
              </View>
          </View>
    </>
  );
  }

  _renderItem(data) {
    console.log(data)
    return (
        <View style={styles.sectionContainer}>
        <Image source={ {uri: data.item.connector.image}} style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.sectionTitle}>{data.item.connector.name}</Text>
            <Text style={styles.sectionDescription} numberOfLines={2}>
              {this.statesMap[data.item.available]}  | {data.item.kilowatts}kw
            </Text>
          </View>
        </View>
    );
  }

  _separator = () => {
      return <View style={{height:1,backgroundColor:'#DDDDDD'}}/>;
  }

  _keyExtractor =  (item, index) => index + '';

  statesMap = {
    0: "Unknown",
    1: "Available",
    2: "InUse", 
    3: "Offline",
    4: "Under Repair",
  }
};


  let screenW = Dimensions.get('window').width;
  let icon ;
  let hMergin = screenW;

  let stationW = screenW/2;
  let stationLeftBoxw = screenW/2-75;

  let link = "https://photos.plugshare.com/photos/348643.jpg";

const styles = StyleSheet.create({

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex:1
  },
  listHeaderContainer: {
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    height: 66,
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  rightContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginLeft: 18,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginLeft: 18,
    marginTop: 4,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  thumbnail: {
    width: 62,
    height: 62,
  },

  //For station details:

  stationPicture: {
    width: stationW,
    height: 150,
  },
  detailsBarContainer: {
    height:150,
    flexDirection: 'row',
  },
  detailsLeftContainer: {
    flex: 1,
  },
  detailsRightContainer: {
    flex: 1,
  },
  detailsNameRowContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  detailsRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsLocationContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  stationNameContainer: {
    flex: 1,
    marginLeft: 8,
    marginTop: 4,
    justifyContent:'center',
    alignItems:'flex-start',
  },
  stationName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.black,
  },
  detailsLeftBox: {
    flex: 1,
    marginLeft: 8,
    alignItems:'flex-start',
    justifyContent:'center',
  },
  detailsRightBox: {
    flex: 1,
    marginRight: 8,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  smallDetails: {
    marginTop: 8,
    fontSize: 12,
  },
  locationLeftBox: {
    width: 60,
    height: 60,
    justifyContent:'center',
    alignItems:'center',
  },
  locationRightBox: {
    width: stationLeftBoxw, 
    height: 60,
    marginLeft: 4,
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  locationIcon: {
    width: 50,
    height: 50,
    resizeMode:'cover',
  },
  //End details bar
  //For operation bar

  operationBarContainer: {
    height:150,
    // justifyContent:'center',
    // alignItems:'center',
    marginLeft: 18,
    marginRight: 18,
  },
  buttonContainer: {
    height:150,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginLeft: 18,
    marginRight: 28,    
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#444444',
    marginBottom: 28,  
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: "white",
  },

  //End operation bar

  //For icon bar
  iconBarContainer: {
    height:150,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginLeft: 18,
    marginRight: 28,
  },
  iconBar: {
    // backgroundColor: 'red',
    flex : 1,
    // justifyContent:'center',
    alignItems:'center',
    marginTop: 8,
    marginLeft: 8,
  },
  iconPicture: {
    marginTop: 8,
    marginLeft: 8,
    width: 62,
    height: 62,
    justifyContent:'center',
    alignItems:'center',
  },
  iconText: {
    marginTop: 8,
    fontSize: 14,
    // textAlign:'center',
    fontWeight: '700'
    // alignItems:'center',
    // justifyContent:'center',
    // textAlignVertical:'center',
  }
});