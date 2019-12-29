import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AttendanceTable from "./AttendanceTable"
import AttendanceTableProfessor from "./AttendanceTableProfessor"

import commons from '../css/commons.module.css'

export default function AttendancePage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

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

    function NavBar()
    {
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

    function Attendance()
    {
        if(accountType==="student")
        {
            return <AttendanceTable />;
        }
        else
        {
            if(accountType==="professor")
            {
                return <AttendanceTableProfessor />;
            }
        }
    }

    function getAccountType()
    {
        return "professor";
    }
}