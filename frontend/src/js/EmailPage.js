import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Email from "./Email.js"
import '../css/email.css'

export default function EmailPage() {
    return (
        <div id="emailPage">
            <div id="emailLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="emailRight"> 
                <Email />
            </div>
        </div>
    );
}