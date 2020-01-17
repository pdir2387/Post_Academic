import {Left,Icon,Header} from 'native-base';
import React,{Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NavBarOpener extends Component
{
    render()
    {
        return(
            <Header style={styles.header}>
                <Left style={styles.left}>
                    
                    <TouchableOpacity style={styles.touchable} onPress={()=>this.openNavBar(this.props)}>
                        <Icon name="ios-menu"/>
                        <Text style={styles.text}>Meniu</Text>
                    </TouchableOpacity>
                    
                </Left>
            </Header>
        );
    }

    openNavBar(props)
    {
        props.navigation.openDrawer();
    }
}

const styles = StyleSheet.create({
    header:{
        height: 70,
        paddingTop: 30,
    },
    left:{
        display: "flex",
        flexDirection: "row",
    },
    text:{
        fontSize: 20,
        paddingLeft: 10
    },
    touchable:{
        flexDirection:"row"
    }
});