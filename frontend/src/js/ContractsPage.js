import React, {useState,useEffect} from 'react'
import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import CreateContracts from "./CreateContracts"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function ContractsPage() 
{
    let [accountType,setAccountType]=useState("");
    let [page,setPage]=useState(null);
    getAccountType();

    useEffect(() => 
	{
		ContractsPageContent();
    }, []);

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
                        {page}
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

    function ContractsPageContent(props)
    {
        fetch('http://localhost:3000/api/all/perioada')
        .then(res=>res.text())
        .then(res=>{
            if(res=="0")
            {
                setPage(<ViewContracts />);
            }
            else
            {
                if(res=="1")
                {
                    setPage(<CreateContracts />);
                }
            }
        });
    }
}