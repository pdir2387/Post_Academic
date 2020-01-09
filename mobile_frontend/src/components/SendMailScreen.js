import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default class SendMailScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            to: props.navigation.getParam("to","yes"),
            subject: props.navigation.getParam("subject","works"),
            message: props.navigation.getParam("message",""),
            files: []
        }

        this.goToEmails = this.goToEmails.bind(this);
        this.saveDraft = this.saveDraft.bind(this);
        this.attachFile = this.attachFile.bind(this);
    }

    componentDidMount()
    {
        
    }

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
                        <Icon2.Button backgroundColor="#a5a5a5" name='ios-attach' style={styles.iconButton} size={30} onPress={()=>this.attachFile()}/>
                    </View>

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
                                            style={styles.messageArea}
                                            multiline={true}
                                            numberOfLines={10}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Content>
        </Container>
        );
    }

    goToEmails()
    {
        this.props.navigation.navigate('ViewMails');
    }

    saveDraft()
    {

    }

    attachFile()
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
        
    }
});