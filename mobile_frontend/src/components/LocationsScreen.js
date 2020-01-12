import React,{Component} from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import MapView, { Marker } from 'react-native-maps';

export default class LocationsScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      region:{latitude:46.770920,longitude:23.589920,latitudeDelta: 0.0922,longitudeDelta: 0.0421,},
      locations: [],
      marker: null,
      dropDownItems:[],
      dropDownItemsPlaceholder: "---alege locatia---",
      selectedItemDropdown: ""
    }

    this.getLocations = this.getLocations.bind(this);
    this.setDropDownItems = this.setDropDownItems.bind(this);
  }

  componentDidMount()
  {
    this.getLocations();
  }

  render()
  {    
    return (
      <Container>
        <NavBarOpener navigation={this.props.navigation}/>
        <Content>
          <View style={styles.pageContainer}>
            <Text style={styles.title}>
              Locații
            </Text>

            <View style={styles.pickerContainer}>
              <Picker style={styles.pickerStyle} selectedValue={this.state.selectedItemDropdown} onValueChange={(value) => {this.setState({selectedItemDropdown:value});if(value!==""){this.setMarker(value);}}}>{this.state.dropDownItems}</Picker>
            </View>

            <MapView style={styles.map} region={this.state.region}>{this.state.marker}</MapView>
          </View>
        </Content>
      </Container>
    );
  }

  getLocations()
  {
    let l=JSON.parse('{"locations":[{"name":"FSEGA","lat":46.773077,"long":23.620982},{"name":"Cladirea centrala","lat":46.767536,"long":23.591345},{"name":"Parcul sportiv","lat":46.763206,"long":23.560394},{"name":"Facultatea de drept","lat":46.766426,"long":23.589613}]}').locations;
    this.setState({locations:l},()=>this.setDropDownItems());
  }

  setDropDownItems()
  {
    let placeholder=this.state.dropDownItemsPlaceholder;
    let newItems=[];
    newItems.push(<Picker.Item key={0} value='' label={placeholder} disabled/>);

    for(let i=0;i<this.state.locations.length;i++)
    {
      let currentlocation=this.state.locations[i];
      let item=<Picker.Item key={i+1} value={currentlocation.lat+","+currentlocation.long} label={currentlocation.name}/>;
      newItems.push(item);
    }

    this.setState({dropDownItems:newItems});
  }

  setMarker(value)
  {
    let coords=value.split(",");
    let latVal=parseFloat(coords[0]);
    let lngVal=parseFloat(coords[1]);

    let markerItem=<Marker coordinate={{latitude:latVal,longitude:lngVal}}/>;
    let newRegion={latitude:latVal,longitude:lngVal,latitudeDelta: 0.0922,longitudeDelta: 0.0421,};

    this.setState({region:newRegion});
    this.setState({marker:markerItem});
  }
}

const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      fontSize: 30
    },
    pickerStyle:{  
      height: 50,  
      width: "100%",  
      color: '#344953',  
      justifyContent: 'center',
    },
    pickerContainer: {
      width:"80%",
      borderColor:"black",
      borderStyle:"solid",
      borderWidth:1
    },
    map:{
        width: "80%",
        marginTop: 20,
        height: 500
    }
});