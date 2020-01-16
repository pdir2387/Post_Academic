import React,{Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'native-base';

export default class MailItem extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
        checked: false
    }

    this.sendRead = this.sendRead.bind(this);
    this.subjectStyle = this.subjectStyle.bind(this);
    this.checkBoxClicked = this.checkBoxClicked.bind(this);
  }

  componentDidMount()
  {
    
  }

  render()
  {    
    return (
        <View style={styles.itemContainer}>
            <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=>this.setState({checked:!this.state.checked},()=>{this.checkBoxClicked()})} checked={this.state.checked}/>
            </View>

            <TouchableOpacity style={styles.container} onPress={()=>{this.sendRead();this.props.viewMail(this.props.mailData,this.props.type)}}>
                <View style={styles.toFromDateContainer}>
                    <View style={styles.toFromContainer}>
                        <Text style={styles.text}>{this.props.toFromText}</Text>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.text}>{this.props.date}</Text>
                    </View>
                </View>

                <View style={styles.subjectContainer}>
                    <Text style={this.subjectStyle()}>{this.props.subject}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }

  checkBoxClicked()
  {
    this.props.manageSelectedMails(this.props.mailData,this.state.checked);
  }

  subjectStyle()
  {
    if(this.props.read===true)
    {
        return styles.text;
    }

    return styles.bold;
  }

  sendRead()
  {
    this.setState({read:true});

    let location="";
    let id=this.props.mailData.id;
    let source=this.props.type;

    if(source==="inbox")
    {
        location="Inbox"
    }
    else
    {
        if(source==="drafts")
        {
            location="Drafts";
        }
        else
        {
            if(source==="sent")
            {
                location="Sent";
            }
        }
    }

    fetch('http://192.168.0.181:8080/api/all/emails/read/'+location, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body:JSON.stringify({
            id:id
        })
    });
  }
}

const styles = StyleSheet.create({
    itemContainer:{
        height: 80,
        width: "100%",
        flex:1,
        flexDirection:"row",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: "grey",
    },
    container: {
        flex: 6,
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },
    toFromDateContainer:{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flex: 1,
        padding: 5
    },
    toFromContainer:{
        textAlign: "left",
        flex: 1
    },
    dateContainer:{
        textAlign: "right",
        alignItems: "flex-end",
        width: "100%",
        flex: 1
    },
    subjectContainer:{
        textAlign: "left",
        width: "100%",
        flex: 1,
        padding: 5
    },
    bold:{
        fontWeight: "bold",
        fontSize: 10
    },
    text:{
        fontSize: 10
    },
    checkboxContainer:{
        flex: 1,
        justifyContent: "center"
    }
});