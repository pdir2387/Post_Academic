import React from 'react';

import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import StudentGrades from "./StudentGrades.js"

import '../css/grades.css'

export default function GradesPage() {
    return (
        <div id="grades-page">
            <div id="grades-left">
                <StudentNavBar />
                <LogoutButton />
            </div>
            <div id="grades-right">
                <div id="student-grades-container">
                    <StudentGrades />
                </div>
            </div>
        </div>
    );
}