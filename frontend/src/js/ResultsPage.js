import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import TeacherNavBar from "./TeacherNavBar.js"
import StudentNavBar from "./StudentNavBar.js"
import Results from "./Results"
import PermissionDeniedPage from "./PermissionDeniedPage"
import TeacherResults from "./TeacherResults"

import commons from '../css/commons.module.css'

export default function ResultsPage() 
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
                        <ResultsStudentOrProfessor />
                    </div>
                </div>
            );
        }
        else
        {
            if(accountType!=="")
            {
                return <PermissionDeniedPage />;
            }
            else
            {
                return null
            }
        }
    }

    function NavBar()
    {
        if(accountType==="student")
        {
            return <StudentNavBar />;
        }
        else
        {
            if(accountType==="profesor")
            {
                return <TeacherNavBar />;
            }
        }
    }

    function ResultsStudentOrProfessor()
    {
        if(accountType==="student")
        {
            return <Results />;
        }
        else
        {
            if(accountType==="profesor")
            {
                return <TeacherResults />;
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