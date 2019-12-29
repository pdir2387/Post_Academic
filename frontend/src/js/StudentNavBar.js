import React from 'react'
import NavBarItem from './NavBarItem'
import mainLogo from '../img/logo_facultate.png';

import home from '../css/home.module.css'

function StudentNavBar(){
    return(
        <div id={home.studentNavBar}>
            <img src={mainLogo} alt="logo"></img>
            <div id={home.navBarSeparator}></div>
            <NavBarItem buttonText="ORAR" url="/home"/>
            <NavBarItem buttonText="PREZENTA" url="/prezenta"/>
            <NavBarItem buttonText="NOTE" url="/note"/>
            <NavBarItem buttonText="MEDII" url="/medii"/>
            <NavBarItem buttonText="CONTRACTE" url="/contracte"/>
            <NavBarItem buttonText="E-MAIL" url="/email"/>
            <NavBarItem buttonText="INFORMAȚII GENERALE" url="/student"/>
        </div>
    )
}

export default StudentNavBar