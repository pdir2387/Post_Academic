import React from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity,AsyncStorage, Image} from 'react-native';
import { CheckBox } from  'react-native-elements';
import mainLogo from '../img/logo_facultate.png';
import userPng from '../img/username.png';
import passPng from '../img/password.png';


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            username:"",
            password:"",
            checked:false,
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState=async()=>{
        var value=await AsyncStorage.getItem('user');

        if(value!==null){
            this.props.navigation.navigate('Profile');
        }
    }

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

    login=()=>{
        /*fetch('http://192.168.0.199:8080/api/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password,
            })
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.error===false){
                saveUser(res.user).then(()=>{
                    saveJwt(res.jwt).then(()=>{
                        this.props.navigation.navigate('HomePg',{user:res.user,connected:true});
                    });
                });
            }
            else{
                alert(res.message);
            }
        })
        .catch((error)=>{
            getUser().then((foundUser)=>{
                if(foundUser.username===this.state.username && foundUser.password===this.state.password)
                {
                    this.props.navigation.navigate('HomePg',{user:foundUser,connected:false});
                }
                else
                {
                    alert("Wrong username or password");
                }
            });
        })
        .done();*/

        this.props.navigation.navigate('HomePg');
    }


}

async function saveUser(userToSave)
{
    let json=await AsyncStorage.setItem('user',JSON.stringify(userToSave));
}

async function saveJwt(jwt)
{
    await AsyncStorage.setItem('jwt',jwt);
}

async function getUser()
{
    const retrievedItem =  await AsyncStorage.getItem('user');
    const item = JSON.parse(retrievedItem);
    return item;
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
        top: 0,
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
