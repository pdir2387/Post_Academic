import React,{Component} from 'react';
import { StyleSheet,View } from 'react-native';
import {Footer, FooterTab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'

export default class MailFooter extends Component
{
    constructor(props)
    {
        super(props);

        this.viewInbox = this.viewInbox.bind(this);
        this.viewDrafts = this.viewDrafts.bind(this);
        this.viewSent = this.viewSent.bind(this);
    }

    render()
    {    
        return (
            <Footer style={styles.footer}>
                <FooterTab style={styles.footerTab}>
                    <View style={styles.iconContainer}>
                        <Icon.Button style={styles.iconButton} backgroundColor="transparent" name='inbox' size={30} onPress={()=>this.viewInbox()}/>
                    </View>

                    <View style={styles.iconContainer}>
                        <Icon2.Button style={styles.iconButton} backgroundColor="transparent" name='drafts' size={30} onPress={()=>this.viewDrafts()}/>
                    </View>

                    <View style={styles.iconContainer}>
                        <Icon3.Button style={styles.iconButton} backgroundColor="transparent" name='md-send' size={30} onPress={()=>this.viewSent()}/>
                    </View>
                </FooterTab>
            </Footer>
        );
    }

    viewInbox()
    {
        this.props.viewInbox();
    }

    viewDrafts()
    {
        this.props.viewDrafts();
    }

    viewSent()
    {
        this.props.viewSent();
    }
}

const styles = StyleSheet.create({
    footer: {
      width: "100%",
      height: 50,
      backgroundColor: "white"
    },
    footerTab: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    iconContainer:{
        width: "33%",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#2670b5"
    },
    iconButton:{
        textAlign: "center",
        width: "100%",
        height: "100%"
    }
});