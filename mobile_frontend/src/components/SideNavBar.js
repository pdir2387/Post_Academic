import React,{Component} from 'react';
import { StyleSheet,Image } from 'react-native';
import { Container,Header,Body,Content } from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator } from 'react-navigation-drawer'
import LogoImage from '../../assets/logo_facultate.png';
import LoginPage from './LoginPage.js';
import AttendancesScreen from './AttendancesScreen';
import LocationsScreen from './LocationsScreen';
import StudentInfoScrenn from './StudentInfoScreen';

class SideNavBar extends Component
{
    render()
    {
        return (
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                        <Image style={styles.drawerImage} source={LogoImage}/>
                    </Body>
                </Header>

                <Content>
                    <DrawerItems {...this.props} />
                </Content>
            </Container>
        );
    }
}

class Hidden extends Component 
{
    render() 
    {
      return null;
    }
}

const navBar=createDrawerNavigator({
    Attendances: {
        screen: AttendancesScreen,
        navigationOptions:{
            title: 'Prezențe'
        }
    },
    StudentInfo: {
        screen: StudentInfoScrenn,
        navigationOptions:{
            title: 'Informații generale'
        }
    },
    Locations: {
        screen: LocationsScreen,
        navigationOptions:{
            drawerLabel: <Hidden />
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