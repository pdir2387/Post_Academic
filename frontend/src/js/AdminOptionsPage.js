import LogoutButton from "./LogoutButton.js"
import React,{useState} from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdminOptions from "./AdminOptions.js"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function AdminOptionsPage() 
{
    let [accountType,setAccountType]=useState("");
    getAccountType();

    return <Page />

    function Page()
    {
        if(accountType==="admin")
        {
            return (
                <div id={commons.page}>
                    <div id={commons.left}>
                        <AdminNavBar />
                        <LogoutButton />
                    </div>
        
                    <div id={commons.right}> 
                        <AdminOptions />
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

    async function getAccountType()
    {
        await fetch('http://localhost:3000/api/authority')
        .then(response => response.text())
        .then(auth => setAccountType(auth))
        .catch( e => alert(e));
    }
}