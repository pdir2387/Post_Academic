import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import MailFooter from './MailFooter';
import MailItem from './MailItem';
import Icon from 'react-native-vector-icons/Octicons';

export default class ViewMailsScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            toOpen:props.navigation.getParam("category","inbox"),
            title:"Mesaje primite",
            inbox:[],
            drafts:[],
            sent:[],
            shownItems:[],
        }

        this.composeMail = this.composeMail.bind(this);
        this.viewInbox = this.viewInbox.bind(this);
        this.viewDrafts = this.viewDrafts.bind(this);
        this.viewSent = this.viewSent.bind(this);
        this.viewMail = this.viewMail.bind(this);
        this.getEmails = this.getEmails.bind(this);
        this.getDrafts = this.getDrafts.bind(this);
        this.getSent = this.getSent.bind(this);
        this.getEmailsFromServer = this.getEmailsFromServer.bind(this);
        this.getDraftsFromServer = this.getDraftsFromServer.bind(this);
        this.getSentFromServer = this.getSentFromServer.bind(this);
        this.getAllFolders = this.getAllFolders.bind(this);
        this.setShownItems = this.setShownItems.bind(this);
        this.pickScreen = this.pickScreen.bind(this);
    }

    componentDidMount()
    {
        this.getAllFolders().then((arr)=>{
            this.setState({inbox:arr[0],drafts:arr[1],sent:arr[2]},()=>this.pickScreen());
        });
    }

    willFocus = this.props.navigation.addListener('willFocus',(payload) => {
            if(payload.action.params)
            {
                this.getAllFolders().then((arr)=>{
                    this.setState({inbox:arr[0],drafts:arr[1],sent:arr[2]},()=>this.pickScreen());
                    let newCategory=payload.action.params.category;
                    this.setState({toOpen:newCategory},()=>{this.pickScreen()});
                });
            }
        }
    );

    render()
    {    
        return (
        <Container>
            <NavBarOpener navigation={this.props.navigation}/>

            <Content style={styles.content}>
                <View style={styles.pageContainer}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>

                    <ScrollView style={styles.mailsList}>
                        {this.state.shownItems}
                    </ScrollView>
                </View>
            </Content>

            <TouchableOpacity onPress={this.composeMail} style={styles.composeButton}>
                <Icon name='plus' style={styles.composeIcon} size= {30}/>
            </TouchableOpacity>

            <MailFooter viewInbox={this.viewInbox} viewDrafts={this.viewDrafts} viewSent={this.viewSent}/>
        </Container>
        );
    }

    async getAllFolders()
    {
        return await Promise.all([this.getEmailsFromServer(),this.getDraftsFromServer(),this.getSentFromServer()]);
    }

    pickScreen()
    {
        let category=this.state.toOpen;

        if(category==="inbox")
        {
            this.viewInbox();
        }
        else
        {
            if(category==="drafts")
            {
                this.viewDrafts();
            }
            else
            {
                if(category==="sent")
                {
                    this.viewSent();
                }
            }
        }
    }

    viewInbox()
    {
        this.setState({title:"Mesaje primite"});
        this.getEmails();
    }

    viewDrafts()
    {
        this.setState({title:"Schițe"});
        this.getDrafts();
    }

    viewSent()
    {
        this.setState({title:"Mesaje trimise"});
        this.getSent();
    }

    viewMail(mail,type)
    {
        let mailJson=JSON.stringify(mail);
        this.props.navigation.navigate('MailContent',{mail:mailJson,type:type});
    }

    composeMail()
    {
        this.props.navigation.navigate('SendMail');
    }

    setShownItems(items,destination,mailType)
    {
        let newItems=[];

        for(let i=0;i<items.length;i++)
        {
            let mail=items[i];
            let mailDestination;
            let read;

            if(destination==="from")
            {
                mailDestination=mail.from;
            }
            else
            {
                if(destination==="to")
                {
                    mailDestination=mail.to;
                }
            }

            if(mail.read==="false")
            {
                read=false;
            }
            else
            {
                read=true;
            }

            let item=<MailItem type={mailType} toFrom={destination} toFromText={mailDestination} date={mail.date} subject={mail.subject} read={read} viewMail={this.viewMail} mailData={mail}/>;
            newItems.push(item);
        }

        this.setState({shownItems:newItems});
    }

    async getEmailsFromServer()
    {
        let res= await fetch('http://localhost:3000/api/all/emails/getAll').then(res => res.json());
		return res;
    }

    getEmails()
	{
		// this.state.inbox=JSON.parse('{"emails":[{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]},{"read":"false","subject":"subject2","from":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz","attachments":[{"id":"3","name":"file3.txt"},{"id":"4","name":"file4.txt"}]},{"read":"false","subject":"subject3","from":"Big Smoke3","date":"2017-01-01 12:12","message":"lul u. wont betray. eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer","attachments":[{"id":"5","name":"file5.txt"},{"id":"6","name":"file6.txt"}]},{"read":"true","subject":"subject4","from":"Big Smoke4","date":"2014-01-01 12:12","message":"fo da hood","attachments":[{"id":"7","name":"file7.txt"},{"id":"8","name":"file8.txt"}]},{"read":"false","subject":"subject5","from":"Big Smoke5","date":"2015-01-01 12:12","message":"need some numba 9s","attachments":[{"id":"9","name":"file9.txt"},{"id":"10","name":"file10.txt"},{"id":"11","name":"file11.txt"},{"id":"12","name":"file12.txt"},{"id":"13","name":"file13.txt"},{"id":"14","name":"file14.txt"}]},{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]},{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]},{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]},{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]}]}').emails;
        this.setShownItems(this.state.inbox,"from","inbox");
    }

    async getDraftsFromServer()
    {
        let res= await fetch('http://localhost:3000/api/all/emails/getDrafts').then(res => res.json());
        return res;
    }
    
    getDrafts()
	{
		// this.state.drafts=JSON.parse('{"drafts":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok draft. fuk da cops"},{"subject":"subject2","to":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"}]}').drafts;
        this.setShownItems(this.state.drafts,"to","drafts");
    }

    async getSentFromServer()
    {
        let res= await fetch('http://localhost:3000/api/all/emails/getSent').then(res => res.json());
		return res;
    }

	getSent()
	{
		// this.state.sent=JSON.parse('{"sent":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":">lul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. ful got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fukul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent. da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da cops>>ima black\\n>>nigga","attachments":[{"id":"15","name":"file15.txt"}]}]}').sent;
        this.setShownItems(this.state.sent,"to","sent");
    }
}

const styles = StyleSheet.create({
    content:{
        width: "100%",
        height: "100%"
    },
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
    composeButton:{
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#324ea8',
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    composeIcon:{
    },
    mailsList:{
        width: "100%",
        height: "80%",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderColor: "grey",
    }
});