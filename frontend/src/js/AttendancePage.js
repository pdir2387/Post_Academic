import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import AttendanceTable from "./AttendanceTable"
import '../css/attendances.css'

export default function AttendancePage() {
    return (
        <div id="attendancePage">
            <div id="attendanceLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="attendanceRight"> 
                <AttendanceTable />
            </div>
        </div>
    );
}