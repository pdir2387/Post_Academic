import React, {useState} from 'react'
import StudentNavBar from './StudentNavBar'
import TidorPage from './TidorPage'
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function AI() {
    let [accountType,setAccountType]=useState("");
    getAccountType();

    return <Page />;

    function Page()
    {
        if(accountType==="student")
        {
            return(
                <div id={commons.page}>
                    <div id={commons.left}>
                        <StudentNavBar />
                    </div>
                    
                    <div id={commons.right}>
                        <TidorPage />
                    </div>
                </div>
            )
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