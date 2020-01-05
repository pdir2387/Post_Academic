import LogoutButton from "./LogoutButton.js"
import React,{useState} from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdministrateAccounts from "./AdministrateAccounts.js"

import commons from '../css/commons.module.css'

export default function AdminAdministrateAccountsPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

    return <Page />;
    
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
                        <AdministrateAccounts />
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