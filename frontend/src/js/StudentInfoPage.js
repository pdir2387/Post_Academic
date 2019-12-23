import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import StudentInfo from "./StudentInfo"
import '../css/student_info.css'

export default function AttendancePage() {
    return (
        <div id="attendancePage">
            <div id="attendanceLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="attendanceRight"> 
                <StudentInfo />
            </div>
        </div>
    );
}