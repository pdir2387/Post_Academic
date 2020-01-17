import React, {useState} from 'react'
import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import CreateContracts from "./CreateContracts"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function ContractsPage() 
{
    let [period,setPeriod]=useState(()=>getPeriod());
    let [accountType,setAccountType]=useState(()=>getAccountType());

    getAccountType();

    return <Page />;

    function Page()
    {
        if(accountType==="student")
        {
            return (
                <div id={commons.page}>
                    <div id={commons.left}>
                        <StudentNavBar />
                        <LogoutButton />
                    </div>
        
                    <div id={commons.right}> 
                        <ContractsPageContent />
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

    function getPeriod()
    {
        return JSON.parse('{"period":"1"}').period;
    }

    function ContractsPageContent(props)
    {
        if(period=="0")
        {
            return <ViewContracts />;
        }
        else
        {
            if(period=="1")
            {
                return <CreateContracts />;
            }
        }
    }
}