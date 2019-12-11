import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginPage from './src/components/LoginPage.js'
import HomePage from './src/components/HomePage.js'

const AppNav=createStackNavigator({
  Home:{screen:LoginPage},
  HomePg:{screen:HomePage},
  },{
        navigationOptions:{
          header:false,
        }
});

const Application=createAppContainer(AppNav);

export default function App(){
    return(
      <Application />
    )
}