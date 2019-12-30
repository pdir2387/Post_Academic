import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Orar from "./Orar.js"

import home from '../css/home.module.css'

export default function HomePage() {
    fetchCall();

    return (
        <div id={home.homePage}>
            <div id={home.homeLeft}>
                <StudentNavBar />
                <LogoutButton />
            </div>
            <div id={home.homeRight}> 
                <Orar />
            </div>
        </div>
    );
}

function fetchCall() {
    // fetch('http://localhost:3000/api/authority')
    //     .then(response => response.text())
    //     .then(alo => alert(alo))
    //     .catch( e => alert(e));
}