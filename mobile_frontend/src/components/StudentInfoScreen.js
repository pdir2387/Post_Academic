import React,{Component} from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import {backend_base_url} from '../misc/constants';

export default class StudentInfoScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      name:"",
      cnp:"",
      code:"",
      group:"",
      year:"",
      semester:""
    }
  }

  componentDidMount()
  {
    this.getStudentInfo();
  }

  render()
  {    
    return (
      <Container>
        <NavBarOpener navigation={this.props.navigation}/>
        <Content>
          <View style={styles.pageContainer}>
            <Text style={styles.title}>
              Informații student
            </Text>
    
            <View style={styles.infoContainer}>
                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>Nume: </Text>
                    <Text style={styles.text}>{this.state.name}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>CNP: </Text>
                    <Text style={styles.text}>{this.state.cnp}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>Nr. matricol: </Text>
                    <Text style={styles.text}>{this.state.code}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>Grupa: </Text>
                    <Text style={styles.text}>{this.state.group}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>Anul de studiu: </Text>
                    <Text style={styles.text}>{this.state.year}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={[styles.infoName,styles.text]}>Semestrul curent: </Text>
                    <Text style={styles.text}>{this.state.semester}</Text>
                </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  getStudentInfo()
  {
    fetch(backend_base_url + 'api/student/informatii_personale')
      .then(info => info.json())
      .then(info => {
        console.log(info);
        this.setState({name:info.name,cnp:info.cnp,code:info.cod,group:info.grupa,year:info.an,semester:info.semestru});     
      });
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
    infoContainer:{
        marginTop: 20,
        width:"90%"
    },
    infoName: {
        fontWeight: "bold",
    },
    text:{
        fontSize: 18
    },
    flexRow:{
        margin: 10,
        display: "flex",
        flexDirection: "row"
    }
});