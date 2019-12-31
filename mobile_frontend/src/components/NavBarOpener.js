import {Left,Icon,Header} from 'native-base';
import React,{Component} from 'react';
import {StyleSheet} from 'react-native';

export default class NavBarOpener extends Component
{
    render()
    {
        return(
            <Header style={styles.header}>
                <Left>
                    <Icon name="ios-menu" onPress={()=>this.openNavBar(this.props)} />
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
});