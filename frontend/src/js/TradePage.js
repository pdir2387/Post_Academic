import React, {useState} from 'react'
import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import PermissionDeniedPage from "./PermissionDeniedPage"
import MyTrade from "./MyTrade";

import commons from '../css/commons.module.css'

export default function TradePage() 
{
    let [accountType,setAccountType]=useState("");

    return <Page />;

    function Page()
    {
        getAccountType();
        if(accountType==="student")
        {
            return (
                <div id={commons.page}>
                    <div id={commons.left}>
                        <StudentNavBar />
                        <LogoutButton />
                    </div>
        
                    <div id={commons.right}> 
                        <MyTrade />
                    </div>
                </div>
            );
        }
        else
        {
            return <PermissionDeniedPage />;
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