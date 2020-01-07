import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AttendanceTable from "./AttendanceTable"
import AttendanceTableProfessor from "./AttendanceTableProfessor"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function AttendancePage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

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
                        <Attendance />
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

    function Attendance()
    {
        if(accountType==="student")
        {
            return <AttendanceTable />;
        }
        else
        {
            if(accountType==="profesor")
            {
                return <AttendanceTableProfessor />;
            }
        }
    }

    function getAccountType()
    {
        return "student";
    }
}