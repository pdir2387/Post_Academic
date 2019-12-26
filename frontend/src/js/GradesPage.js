import React from 'react';

import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentGrades from "./StudentGrades.js"
import TeacherGrades from "./TeacherGrades.js"

import '../css/grades.css'
import EmailPage from './EmailPage.js';

var accountType;

export default function GradesPage() {
    return (
        <div id="grades-page">
            <div id="grades-left">
                <NavBar />
                <LogoutButton />
            </div>
            <div id="grades-right">
                <div id="student-grades-container">
                    <Grades />
                </div>
            </div>
        </div>
    );

    function NavBar()
    {
        getAccountType();

        if(accountType==="student")
        {
            return <StudentNavBar />;
        }
        else
        {
            if(accountType==="professor")
            {
                return <ProfessorNavBar />;
            }
        }
    }

    function Grades()
    {
        if(accountType==="student")
        {
            return <StudentGrades />;
        }
        else
        {
            if(accountType==="professor")
            {
                return <TeacherGrades />;
            }
        }
    }

    function getAccountType()
    {
        accountType="professor";
    }
}