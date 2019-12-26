import React from 'react'
import NavBarItem from './NavBarItem'
import mainLogo from '../img/logo_facultate.png';
import '../css/home.css'

export default function AdminNavBar(){
    return(
        <div id="studentNavBar">
            <img src={mainLogo} alt="logo"></img>
            <div id="navBarSeparator"></div>
            <NavBarItem buttonText="ADMINISTRARE CONTURI" url="/admin_accounts"/>
            <NavBarItem buttonText="OPTIUNI ADMINISTRARE" url="/admin_options"/>
            <NavBarItem buttonText="E-MAIL" url="/email"/>
        </div>
    )
}