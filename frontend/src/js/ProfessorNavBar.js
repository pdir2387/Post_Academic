import React from 'react'
import NavBarItem from './NavBarItem'
import mainLogo from '../img/logo_facultate.png';
import '../css/home.css'

export default function ProfessorNavBar(){
    return(
        <div id="studentNavBar">
            <img src={mainLogo} alt="logo"></img>
            <div id="navBarSeparator"></div>
            <NavBarItem buttonText="ORAR" url="/home"/>
            <NavBarItem buttonText="PREZENTA" url="/prezentaP"/>
            <NavBarItem buttonText="NOTE" url="/note"/>
            <NavBarItem buttonText="E-MAIL" url="/email"/>
        </div>
    )
}