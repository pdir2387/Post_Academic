import React from 'react';
import {createAppContainer} from 'react-navigation'
import AppNav from './src/components/SideNavBar'

const Application=createAppContainer(AppNav);

export default function App(){
    return(
      <Application />
    )
}