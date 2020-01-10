import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import MailFooter from './MailFooter';
import MailAttachmentItem from './MailAttachmentItem';

export default class MailContentScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            mail: JSON.parse(props.navigation.getParam("mail","")),
            type: props.navigation.getParam("type",""),
            toFrom: "",
            subject: "",
            message: "",
            destination:"",
            attachmentItems: []
        }

        this.viewInbox = this.viewInbox.bind(this);
        this.viewDrafts = this.viewDrafts.bind(this);
        this.viewSent = this.viewSent.bind(this);
        this.setAttachmentFiles=this.setAttachmentFiles.bind(this);
        this.setupInfo=this.setupInfo.bind(this);
    }

    componentDidMount()
    {

    }

    willFocus = this.props.navigation.addListener('willFocus',(payload) => {
        if(payload.action.params)
        {
            let newMail=JSON.parse(payload.action.params.mail);
            let newType=payload.action.params.type;
            this.setState({mail:newMail,type:newType},()=>{this.setupInfo()});
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
                    <View style={styles.viewMailContainer}>
                        <View style={styles.mailInfo}>
                            <View style={styles.toContainer}>
                                <Text style={styles.mailInfoCategory}>{this.state.destination}</Text>
                                <Text style={styles.mailInfoText}>{this.state.toFrom}</Text>
                            </View>

                            <View style={styles.subjectContainer}>
                                <Text style={styles.mailInfoCategory}>Subiect:</Text>
                                <Text style={styles.mailInfoText}>{this.state.subject}</Text>
                            </View>
                        </View>

                        <ScrollView contentContainerStyle ={styles.messageAreaContainer}>
                            <View style={styles.messageViewContainer}>
                                <Text style={styles.messageText}>{this.state.message}</Text>
                            </View>
                        </ScrollView>

                        <ScrollView>
                            <View style={styles.attachmentContainer}>
                                {this.state.attachmentItems}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Content>

            <MailFooter viewInbox={this.viewInbox} viewDrafts={this.viewDrafts} viewSent={this.viewSent}/>
        </Container>
        );
    }

    setupInfo()
    {
        let mail=this.state.mail;

        this.setState({subject:mail.subject});
        this.setState({message:mail.message});

        if(mail.to===null || mail.to===undefined)
        {
            if(mail.from!==null && mail.from!==undefined)
            {
                let aux=this.state.mail.from;
                this.setState({toFrom:aux});
                this.setState({destination:"Expeditor: "});
            }
        }
        else
        {
            let aux=this.state.mail.to;
            this.setState({toFrom:aux});
            this.setState({destination:"Destinatar: "});
        }

        this.setAttachmentFiles();
    }

    viewInbox()
    {
        this.props.navigation.navigate('ViewMails',{category:"inbox"});
    }

    viewDrafts()
    {
        this.props.navigation.navigate('ViewMails',{category:"drafts"}); 
    }

    viewSent()
    {
        this.props.navigation.navigate('ViewMails',{category:"sent"});
    }

    setAttachmentFiles()
    {
        let type=this.state.type;

        if(type==="inbox" || type==="sent")
        {
            let files=this.state.mail.attachments;
            let newItems=[];

            for(let i=0;i<files.length;i++)
            {
                let file=files[i];
                let item=<MailAttachmentItem key={file.id} fileId={file.id} extension={file.name.split(".")[1]} fileName={file.name} downloadFile={this.downloadFile}/>
                newItems.push(item);
            }

            this.setState({attachmentItems:newItems});
        }
    }

    downloadFile(id)
    {

    }
}

const styles = StyleSheet.create({
    content:{
        width: "100%",
        height: "100%",
    },
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },
    viewMailContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    mailInfo: {
        width: "100%",
        flex:1
    },
    toContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderColor: "black",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderTopWidth: 2,
        padding: 5
    },
    mailInfoCategory: {
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: "#a5a5a5",
        fontSize: 18
    },
    subjectContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderColor: "black",
        borderStyle: "solid",
        borderBottomWidth: 2,
        padding: 5,
    },
    messageAreaContainer: {
        height: "100%",
        flexDirection: "column",
        alignItems: "stretch",
    },
    messageViewContainer:{
        borderBottomWidth: 1,
        height: "100%",
        padding: 10,
    },
    attachmentContainer:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    },
    mailInfoText:{
        marginLeft: 10,
        fontSize: 15,
        marginTop: 3
    },
    messageText:{
        fontSize: 15,
    }
});