import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AdminNavBar from "./AdminNavBar.js"
import Email from "./Email.js"
import '../css/email.css'

var accountType;

export default function EmailPage() {
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
        accountType="student";
    }
}