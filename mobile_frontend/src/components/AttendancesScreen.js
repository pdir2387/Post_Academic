import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Header,Left,Icon,Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener'
import {Table,Row,Rows,Col,TableWrapper} from 'react-native-table-component'

export default class AttendancesScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      nrWeeks: 14,
      tableWeeks: [],
      tableFirstRow: [],
      courseAttendances: [],
      seminarAttendances: [],
      labAttendances: [],
      courseAttendancesCount: 0,
      seminarAttendancesCount: 0,
      labAttendancesCount: 0
    }

    this.getTableWeeks = this.getTableWeeks.bind(this);
    this.setTableData = this.setTableData.bind(this);
    this.getTableFirstRow = this.getTableFirstRow.bind(this);

    this.state.tableWeeks=this.getTableWeeks();
    this.state.tableFirstRow=this.getTableFirstRow();
    this.setTableData("FP");
  }

  render()
  {
    return (
      <Container>
        <NavBarOpener navigation={this.props.navigation}/>
        <Content>
          <View style={styles.pageContainer}>
            <Text style={styles.title}>
              Prezente
            </Text>

            <View style={styles.tableContainer}>
              <Table>
                <TableWrapper style={styles.wrapper} borderStyle={{borderWidth: 1, borderColor: 'black',}}>
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
    let c=[true,false,false,true,true,true,false,true,true,true,true,false,false,true];
    let s=[false,true,false,true,true,true,false,true,true,true,true,false,false,true];
    let l=[false,false,true,true,true,true,false,true,true,true,true,false,false,true];

    let counter=0;
    this.state.courseAttendances=c.map(el=>{
      if(el===true)
      {
          counter+=1;
          return "x";
      }
      else
      {
          return "";
      }
    });

    this.state.courseAttendancesCount=counter;
    counter=0;

    this.state.seminarAttendances=s.map(el=>{
        if(el===true)
        {
            counter+=1;
            return "x";
        }
        else
        {
            return "";
        }
    });

    this.state.seminarAttendancesCount=counter;
    counter=0;
    
    this.state.labAttendances=l.map(el=>{
        if(el===true)
        {
            counter+=1;
            return "x";
        }
        else
        {
            return "";
        }
    });

    this.state.labAttendancesCount=counter;
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
      flex: 3,
      padding: 10,
      alignSelf:"flex-start"
    }
});