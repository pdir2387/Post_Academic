import React,{Component} from 'react';
import { StyleSheet,Image } from 'react-native';
import { Container,Header,Body,Content } from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator } from 'react-navigation-drawer'
import LoginPage from './LoginPage.js';
import AttendancesScreen from './AttendancesScreen';

class SideNavBar extends Component
{
    render()
    {
        return (
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                        <Image style={styles.drawerImage} source={require('../assets/logo_facultate.png')}/>
                    </Body>
                </Header>

                <Content>
                    <DrawerItems {...this.props} />
                </Content>
            </Container>
        );
    }
}

const navBar=createDrawerNavigator({
    Attendances: {
        screen: AttendancesScreen,
        navigationOptions:{
            title: 'Prezente'
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions:{
            title: 'Logout',
            drawerLockMode: 'locked-closed'
        }
      },
  },{
        initialRouteName: 'Login',
        contentComponent: SideNavBar,
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    drawerImage:{
        
    },
    drawerHeader:{
        backgroundColor: '#fff',
        height: 200,
    }
});


export default navBar;