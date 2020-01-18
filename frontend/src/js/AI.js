import React, {useState} from 'react'
import StudentNavBar from './StudentNavBar'
import AISuggestionsPage from './AISuggestionsPage'
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
                        <AISuggestionsPage />
                    </div>
                </div>
            )
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
        .then(auth => setAccountType('student'))
        .catch( e => alert(e));
    }
}