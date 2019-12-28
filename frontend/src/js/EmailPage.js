import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AdminNavBar from "./AdminNavBar.js"
import Email from "./Email.js"
import '../css/email.css'

export default function EmailPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

    return (
        <div id="emailPage">
            <div id="emailLeft">
                <NavBar />
                <LogoutButton />
            </div>

            <div id="emailRight"> 
                <Email />
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