import LogoutButton from "./LogoutButton.js"
import React,{useState} from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdminOptions from "./AdminOptions.js"

import commons from '../css/commons.module.css'

export default function AdminOptionsPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

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
            return <div>Nu ai permisiunea necesara sa vizualizezi pagina</div>;
        }
    }

    function getAccountType()
    {
        return "admin";
    }
}