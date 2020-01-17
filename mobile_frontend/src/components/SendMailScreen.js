import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import MailAttachmentItem from './MailAttachmentItem';
import * as DocumentPicker from 'expo-document-picker';
import * as mime from 'react-native-mime-types';
import * as FileSystem from 'expo-file-system';
import {backend_base_url} from '../misc/constants';

export default class SendMailScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            to: props.navigation.getParam("to",""),
            subject: props.navigation.getParam("subject",""),
            message: props.navigation.getParam("message",""),
            checkmarkMessage: "",
            showMessage: false,
            attachmentFiles: [],
            attachmentItems: []
        }

        this.goToEmails = this.goToEmails.bind(this);
        this.saveDraft = this.saveDraft.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.attachFile = this.attachFile.bind(this);
        this.removeAttachment = this.removeAttachment.bind(this);
        this.sendMail=this.sendMail.bind(this);
    }

    componentDidMount()
    {
        
    }

    willFocus = this.props.navigation.addListener('willFocus',(payload) => {
        if(payload.action.params)
        {
            let newTo=payload.action.params.to;
            let newSubject=payload.action.params.subject;
            let newMessage=payload.action.params.message;
            this.setState({to:newTo,subject:newSubject,message:newMessage});
        }
    });

    render()
    {    
        return (
        <Container>
            <NavBarOpener navigation={this.props.navigation}/>

            <Content style={styles.content} contentContainerStyle={{ flex:1,flexGrow: 1 }}>
                <View style={styles.pageContainer}>
                    <View style={styles.options}>
                        <Icon.Button backgroundColor="#a5a5a5" name='back' size={30} style={styles.iconButton} onPress={()=>this.goToEmails()}/>
                        <Icon.Button backgroundColor="#a5a5a5" name='save' size={30} style={styles.iconButton} onPress={()=>this.saveDraft()}/>
                        <Icon2.Button backgroundColor="#a5a5a5" name='ios-attach' style={styles.iconButton} size={30} onPress={()=>this.chooseFile()}/>
                        
                        {
                            this.state.showMessage && <View style={styles.checkmarkContainer}>
                                <Icon3 name="check" size={30}/>
                                <Text style={{fontSize: 20}}>{this.state.checkmarkMessage}</Text>
                            </View>
                        }   
                    </View>

                    <TouchableOpacity style={styles.sendButton} onPress={()=>this.sendMail()}>
                        <Text style={styles.sendButtonText}>Trimite</Text>
                    </TouchableOpacity>

                    <View style={styles.sendMailContainer}>
                        <View style={styles.mailInfo}>
                            <View style={styles.toContainer}>
                                <Text style={styles.mailInfoCategory}>Destinatar:</Text>
                                <TextInput defaultValue={this.state.to} 
                                            style={styles.textInput} 
                                            underlineColorAndroid='transparent' 
                                            onChangeText={(newTo)=>this.setState({to:newTo})}/>
                            </View>

                            <View style={styles.subjectContainer}>
                                <Text style={styles.mailInfoCategory}>Subiect:</Text>
                                <TextInput defaultValue={this.state.subject} 
                                            style={styles.textInput} 
                                            underlineColorAndroid='transparent' 
                                            onChangeText={(newSubject)=>this.setState({subject:newSubject})}/>
                            </View>
                        </View>

                        <ScrollView contentContainerStyle ={styles.messageAreaContainer}>
                            <View style={styles.messageViewContainer}>
                                <TextInput placeholder="Mesaj mail..." 
                                            defaultValue={this.state.message}
                                            style={styles.messageArea}
                                            multiline={true}
                                            numberOfLines={10}/>
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
        </Container>
        );
    }

    sendMail()
    {
        if(this.state.to !== "")
		{
            fetch(backend_base_url + 'api/all/emails/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    to:this.state.to,
                    subject:this.state.subject,
                    message:this.state.message,
                    attachments:this.state.attachmentFiles
                })
            }).then(()=>{
                this.setState({checkmarkMessage:"Trimis",showMessage:true},()=>{setInterval(() => {
                    this.setState({showMessage:false});
                }, 2000)});
            })
		}
		else
		{
			alert("Introdu destinatarul");
        }
    }

    goToEmails()
    {
        this.props.navigation.navigate('ViewMails');
    }

    saveDraft()
    {
        if(this.state.to!=="" || this.state.subject!== "" || this.state.message!=="")
    	{
            fetch(backend_base_url + 'api/all/emails/draft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    to:this.state.to,
                    subject:this.state.subject,
                    message:this.state.message,
                    attachments:this.state.attachmentFiles
                })
            }).then(()=>{
                this.setState({checkmarkMessage:"Salvat",showMessage:true},()=>{setInterval(() => {
                this.setState({showMessage:false});
                }, 2000)});
            });
    	}
    }

    async chooseFile()
    {
        let file = await DocumentPicker.getDocumentAsync({});
        
        if(file.type==="success")
        {
            this.attachFile(file)
        }
    }

    async attachFile(file)
    {
        let fileName=file.name;
        let newItems=this.state.attachmentItems;
        let fileExtension=fileName.split(".")[1];
        let attachmentItem=<MailAttachmentItem key={file.uri} uri={file.uri} file={file} extension={fileExtension} fileName={fileName} removeAttachment={this.removeAttachment}/>;

        newItems.push(attachmentItem);
        this.setState({attachmentItems:newItems});

        let mimeType=mime.lookup(file.uri);

        let bytes=await FileSystem.readAsStringAsync(file.uri, {encoding:FileSystem.EncodingType.Base64});

        const newFile={
            uri: file.uri,
            type: mimeType,
            name: file.name,
            bytes: bytes
        }

        this.state.attachmentFiles.push(newFile);
    }

    removeAttachment(uri)
    {
        let newItems=[];
        let newFiles=[];

        for(let i=0;i<this.state.attachmentItems.length;i++)
        {
            let item=this.state.attachmentItems[i];

            if(item.props.uri!==uri)
            {
                newItems.push(item);
            }
        }

        this.setState({attachmentItems:newItems});

        for(let i=0;i<this.state.attachmentFiles.length;i++)
        {
            let item=this.state.attachmentFiles[i];

            if(item.uri!==uri)
            {
                newFiles.push(item);
            }
        }

        this.setState({attachmentFiles:newFiles});
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
    options: {
        width: "100%",
        height: 50,
        backgroundColor: "#a5a5a5",
        flexDirection: "row",
    },
    sendMailContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    mailInfo: {
        width: "100%",
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
        padding: 5
    },
    messageAreaContainer: {
        height: "100%",
        flexDirection: "column",
        alignItems: "stretch",
    },
    iconButton:{
    },
    textInput:{
        alignSelf:'stretch',
        marginLeft: 10,
        width: "100%",
        backgroundColor:'#fff',
        fontSize: 15
    },
    messageArea:{
        width:"100%",
        height: "100%",
        padding: 10,
        fontSize: 15,
        textAlignVertical: "top",
    },
    messageViewContainer:{
        height:"100%",
        borderBottomWidth: 1
    },
    attachmentContainer:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    },
    sendButton:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        width: "100%",
        backgroundColor: "#3333ff",
        borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    sendButtonText:{
        fontSize: 20,
        color: "white"
    },
    checkmarkContainer:{
        backgroundColor: "green",
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        flexDirection:"row",
    }
});