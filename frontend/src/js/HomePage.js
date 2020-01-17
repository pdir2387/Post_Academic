import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ProfessorNavBar from "./ProfessorNavBar.js"
import AdminNavBar from "./AdminNavBar.js"
import Orar from "./Orar.js"
import PermissionDeniedPage from "./PermissionDeniedPage"

import home from '../css/home.module.css'

export default function HomePage() {
    let [accountType,setAccountType]=useState("");
    getAccountType();

    return <Page />;

    function Page()
    {
        if(accountType==="student" || accountType==="profesor" || accountType==="admin")
        {
            return (
                <div id={home.homePage}>
                    <div id={home.homeLeft}>
                        <NavBar />
                        <LogoutButton />
                    </div>
                    <div id={home.homeRight}> 
                        <Orar />
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

function fetchCall() {
    // fetch('http://localhost:3000/api/authority')
    //     .then(response => response.text())
    //     .then(alo => alert(alo))
    //     .catch( e => alert(e));
}