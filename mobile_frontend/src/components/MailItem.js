import React,{Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class MailItem extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
        read:props.read
    }

    this.sendRead = this.sendRead.bind(this);
    this.subjectStyle = this.subjectStyle.bind(this);
  }

  componentDidMount()
  {
    
  }

  render()
  {    
    return (
        <View style={styles.itemContainer}>
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

  subjectStyle()
  {
    if(this.state.read===true)
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
    let source=this.props.mailType;

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

    // fetch('http://localhost:3000/api/all/emails/read/'+location, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //         },
    //     body:JSON.stringify({
    //         id:id
    //     })
    // });
  }
}

const styles = StyleSheet.create({
    itemContainer:{
        height: 80,
        width: "100%"
    },
    container: {
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: "grey",
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
        fontSize: 20
    },
    text:{
        fontSize: 20
    }
});