import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import SendEmail from "./SendEmail.js"
import '../css/email.css'

export default function SendEmailPage() {
    return (
        <div id="emailPage">
            <div id="emailLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="emailRight"> 
                <SendEmail />
            </div>
        </div>
    );
}