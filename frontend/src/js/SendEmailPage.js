import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AdminNavBar from "./AdminNavBar.js"
import SendEmail from "./SendEmail.js"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function SendEmailPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());
    
    return <Page />;

    function Page()
    {
        if(accountType==="student" || accountType==="profesor" || accountType==="admin")
        {
            return (
                <div id={commons.page}>
                    <div id={commons.left}>
                        <NavBar />
                        <LogoutButton />
                    </div>

                    <div id={commons.right}> 
                        <SendEmail />
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
            else
            {
                if(accountType==="admin")
                {
                    return <AdminNavBar />;
                }
            }
        }
    }

    function getAccountType()
    {
        return "student";
    }
}