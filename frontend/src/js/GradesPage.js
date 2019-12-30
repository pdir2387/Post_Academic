import React, {useState} from 'react';

import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentGrades from "./StudentGrades.js"
import TeacherGrades from "./TeacherGrades.js"

import commons from '../css/commons.module.css'
import grades from '../css/grades.module.css'

export default function GradesPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

    return (
        <div id={commons.page}>
            <div id={commons.left}>
                <NavBar />
                <LogoutButton />
            </div>
            <div id={commons.right}>
                <Grades />
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
        return "professor";
    }
}