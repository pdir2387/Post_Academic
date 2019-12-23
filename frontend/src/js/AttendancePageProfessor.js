import LogoutButton from "./LogoutButton.js"
import React from 'react'
import ProfessorNavBar from "./ProfessorNavBar.js"
import AttendanceTableProfessor from "./AttendanceTableProfessor"
import '../css/attendances.css'

export default function AttendancePageProfessor() {
    return (
        <div id="attendancePage">
            <div id="attendanceLeft">
                <ProfessorNavBar />
                <LogoutButton />
            </div>

            <div id="attendanceRight"> 
                <AttendanceTableProfessor />
            </div>
        </div>
    );
}