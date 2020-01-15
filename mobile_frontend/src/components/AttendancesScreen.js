import React,{Component} from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener'
import {Table,Row,Rows,Col,TableWrapper} from 'react-native-table-component';

export default class AttendancesScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      nrWeeks: 14,
      disciplines: [],
      tableWeeks: [],
      tableFirstRow: [],
      courseAttendances: [],
      seminarAttendances: [],
      labAttendances: [],
      dropDownItems:[],
      dropDownItemsPlaceholder: "---alege materia---",
      selectedItemDropdown: "",
      courseAttendancesCount: 0,
      seminarAttendancesCount: 0,
      labAttendancesCount: 0
    }

    this.getDisciplines = this.getDisciplines.bind(this);
    this.getTableWeeks = this.getTableWeeks.bind(this);
    this.setTableData = this.setTableData.bind(this);
    this.getTableFirstRow = this.getTableFirstRow.bind(this);
    this.setDropDownItems = this.setDropDownItems.bind(this);

    this.state.tableWeeks=this.getTableWeeks();
    this.state.tableFirstRow=this.getTableFirstRow();
  }

  componentDidMount()
  {
    this.getDisciplines();
  }

  render()
  {    
    return (
      <Container>
        <NavBarOpener navigation={this.props.navigation}/>
        <Content>
          <View style={styles.pageContainer}>
            <Text style={styles.title}>
              Prezențe
            </Text>

            <View style={styles.pickerContainer}>
              <Picker style={styles.pickerStyle} selectedValue={this.state.selectedItemDropdown} onValueChange={(value) => {this.setState({selectedItemDropdown:value});this.setTableData(value)}}>{this.state.dropDownItems}</Picker>
            </View>

            <View style={styles.tableContainer}>
              <Table>
                <TableWrapper style={styles.wrapper} borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                  <Row data={this.state.tableFirstRow} style={styles.firstRow} textStyle={styles.text}/>
                  <TableWrapper style={styles.wrapperCols} >
                    <Col data={this.state.tableWeeks} style={styles.weeks} textStyle={styles.text}/>
                    <Col data={this.state.courseAttendances} textStyle={styles.text}/>
                    <Col data={this.state.seminarAttendances} textStyle={styles.text}/>
                    <Col data={this.state.labAttendances} textStyle={styles.text}/>
                    {/* <Rows data={this.state.tableData} /> */}
                  </TableWrapper>
                </TableWrapper>
              </Table>
            </View>

            <View style={styles.attendanceInfoContainer}>
              <Text>
                Prezente curs: {this.state.courseAttendancesCount}/{this.state.nrWeeks}
              </Text>
              <Text>
                Prezente seminar: {this.state.seminarAttendancesCount}/{this.state.nrWeeks}
              </Text>
              <Text>
                Prezente laborator: {this.state.labAttendancesCount}/{this.state.nrWeeks}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  getDisciplines()
  {
    // fetch('http://localhost:3000/api/student/materii/')
    // .then(res => res.json())
    // .then(res => {
    //     this.setState({disciplines:res},()=>this.setDropDownItems());
    // });
  }

  setDropDownItems()
  {
    let placeholder=this.state.dropDownItemsPlaceholder;
    let newItems=[];
    newItems.push(<Picker.Item key={0} value='' label={placeholder} disabled/>);

    for(let i=0;i<this.state.disciplines.length;i++)
    {
      let item=<Picker.Item key={i+1} value={this.state.disciplines[i]} label={this.state.disciplines[i]}/>;
      newItems.push(item);
    }

    this.setState({dropDownItems:newItems});
  }

  getTableWeeks()
  {
    let headers=[];

    for(let i=1;i<=this.state.nrWeeks;i++)
    {
      headers.push(i.toString());
    }

    return headers;
  }

  getTableFirstRow()
  {
    return ["Sapt.","Curs","Sem.","Lab."];
  }

  setTableData(discipline)
  {
    if(discipline!=="")
    {
      // fetch('http://localhost:3000/api/student/prezente/'+discipline)
      // .then(res => res.json())
      // .then(res => {
      //   let counter=0;
      //   let attendancesCourse=res.curs.map(el=>{
      //     if(el===true)
      //     {
      //         counter+=1;
      //         return "x";
      //     }
      //     else
      //     {
      //         return "";
      //     }
      //   });

      //   this.setState({courseAttendances:attendancesCourse});
      //   this.setState({courseAttendancesCount:counter})
      //   counter=0;

      //   let attendancesSeminar=res.seminar.map(el=>{
      //       if(el===true)
      //       {
      //           counter+=1;
      //           return "x";
      //       }
      //       else
      //       {
      //           return "";
      //       }
      //   });

      //   this.setState({seminarAttendances:attendancesSeminar});
      //   this.setState({seminarAttendancesCount:counter})
      //   counter=0;
        
      //   let attendancesLab=res.laborator.map(el=>{
      //       if(el===true)
      //       {
      //           counter+=1;
      //           return "x";
      //       }
      //       else
      //       {
      //           return "";
      //       }
      //   });

      //   this.setState({labAttendances:attendancesLab});
      //   this.setState({labAttendancesCount:counter});
      // });
    }
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
    tableContainer: { 
      flex: 1, 
      padding: 10,
      backgroundColor: '#fff',
      alignSelf: "stretch",      
    },
    weeks: {  
      backgroundColor: '#547598'  
    },
    wrapper: { 
      flexDirection: 'column' 
    },
    wrapperCols:{
      flex: 5,
      flexDirection: "row"
    },
    firstRow: { 
      flex: 1,
      backgroundColor: '#547598' 
    },
    text: { 
      textAlign: 'center' 
    },
    attendanceInfoContainer: {
      flex: 2,
      padding: 10,
      alignSelf:"flex-start"
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
    }
});