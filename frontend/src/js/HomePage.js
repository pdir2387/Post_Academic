import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Orar from "./Orar.js"
import '../css/home.css'

function HomePage() {
    return (
        <div id="homePage">
            <div id="homeLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>
            <div id="homeRight"> 
                <Orar />
            </div>
        </div>
    );
}

export default HomePage;