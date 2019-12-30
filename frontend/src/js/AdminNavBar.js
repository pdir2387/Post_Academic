import React from 'react'
import NavBarItem from './NavBarItem'
import mainLogo from '../img/logo_facultate.png';

import home from '../css/home.module.css'

export default function AdminNavBar(){
    return(
        <div id={home.studentNavBar}>
            <img src={mainLogo} alt="logo"></img>
            <div id={home.navBarSeparator}></div>
            <NavBarItem buttonText="ADMINISTRARE CONTURI" url="/admin_accounts"/>
            <NavBarItem buttonText="OPTIUNI ADMINISTRARE" url="/admin_options"/>
            <NavBarItem buttonText="E-MAIL" url="/email"/>
        </div>
    )
}