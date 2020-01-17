import React, {useState} from 'react';

import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentGrades from "./StudentGrades.js"
import TeacherGrades from "./TeacherGrades.js"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'
import grades from '../css/grades.module.css'

export default function GradesPage() 
{
    let [accountType,setAccountType]=useState("");
    getAccountType();

    return <Page />;

    function Page()
    {
        if(accountType==="student" || accountType==="profesor")
        {
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
        }
        else
        {
            return <PermissionDeniedPage />;
        }
    }

    function NavBar()
    {
        getAccountType();

        if(accountType==="student")
        {
            return <StudentNavBar />;
        }
        else
        {
            if(accountType==="profesor")
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
            if(accountType==="profesor")
            {
                return <TeacherGrades />;
            }
        }
    }

    async function getAccountType()
    {
        await fetch('http://localhost:3000/api/authority')
        .then(response => response.text())
        .then(auth => setAccountType(auth))
        .catch( e => alert(e));
    }
}