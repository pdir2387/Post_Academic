import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AdminNavBar from "./AdminNavBar.js"
import Email from "./Email.js"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function EmailPage() 
{
    let [accountType,setAccountType]=useState("");
    getAccountType();

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
                        <Email />
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

    async function getAccountType()
    {
        await fetch('http://localhost:3000/api/authority')
        .then(response => response.text())
        .then(auth => setAccountType(auth))
        .catch( e => alert(e));
    }
}