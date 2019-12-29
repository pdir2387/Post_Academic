import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import StudentInfo from "./StudentInfo"

import commons from '../css/commons.module.css'

export default function AttendancePage() {
    return (
        <div id={commons.page}>
            <div id={commons.left}>
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id={commons.right}> 
                <StudentInfo />
            </div>
        </div>
    );
}