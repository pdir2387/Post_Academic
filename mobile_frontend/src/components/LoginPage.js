import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity, ToastAndroid, Image} from 'react-native';
import { CheckBox } from  'react-native-elements';
import mainLogo from '../../assets/logo_facultate.png';
import userPng from '../../assets/username.png';
import passPng from '../../assets/password.png';
import {backend_base_url} from '../misc/constants';

export default class Login extends Component
{
    constructor(props){
        super(props);
        this.state ={
            username:"",
            password:"",
            checked:false,
        }
    }

    // componentDidMount(){
    //     this._loadInitialState().done();
    // }

    // _loadInitialState=async()=>{
    //     var value=await AsyncStorage.getItem('user');

    //     if(value!==null){
    //         this.props.navigation.navigate('Profile');
    //     }
    // }

    render(){
    return(
        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

            <View style={styles.container}>

                <Image style={styles.logo}
                    source={mainLogo}
                    className="logo"
                    alt="logo"
                    id="ubb-logo"
                />

                <View style={styles.loginBoxContainer}>
                    
                    <View style={{flex:2}}/>

                    <View style={styles.loginBox}>

                        <View style={styles.loginInputView}>
                            <Image
                                source={userPng}
                                className="logo"
                            />
                            
                            <TextInput
                                style={styles.textInput} placeholder='Username'
                                onChangeText={(username)=>this.setState({username})}
                                underlineColorAndroid='transparent'
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.loginInputView}>
                            <Image
                                source={passPng}
                                className="logo"
                            />

                            <TextInput
                                secureTextEntry={true}
                                style={styles.textInput} placeholder='Password'
                                onChangeText={(password)=>this.setState({password})}
                                underlineColorAndroid='transparent'
                                autoCapitalize="none"
                            />
                        </View>

                        <CheckBox
                            title='Remember Me'
                            checked={this.state.checked}
                            onPress={() => {this.setState({checked: !this.state.checked})}}
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.login}>
                            <Text style={styles.txt}>LOGIN</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{flex:2}}/>

                </View>

            </View>

        </KeyboardAvoidingView>
    );
    }

    login=() => {
        fetch(backend_base_url + 'api/login', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: 'username=' + this.state.username + '&password=' + this.state.password
        })
        .then((response)=> {
            return response.json();
        })
        .then(response => {
            if (response.path === '/home') {
                //login was successful, navigating to main screen(timetable)
                this.props.navigation.navigate('Timetable', {
                    user: this.state.username
                });
            }
            else {
                ToastAndroid.show('Date invalide! Incercati din nou', ToastAndroid.LONG);
                this.setState({password: ''});
            }
        })
    }


}

const styles=StyleSheet.create({
    wrapper:{
        flex:1,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'white'
    },
    loginBox:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#ffffff',
        elevation:15,
        flex: 10,
        paddingTop: 40,
        paddingBottom: 40,
    },
    logo:{
        top: 40,
    },
    loginBoxContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    loginInputView: {
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 30,
        alignItems: 'center'
    },
    textInput:{
        fontSize: 20,
        borderRadius: 5,
        borderColor: 'lightgrey',
        borderWidth: 2,
        padding: 5,
        margin: 10,
        flex: 1
    },
    btn:{
        backgroundColor: '#245caa',
        color: 'white',
    },
    txt:{
        color:'white',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
    },
    rememberTxt:{
        color: 'black',
    }
});
