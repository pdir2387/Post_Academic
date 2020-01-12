import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import StudentInfo from "./StudentInfo"
import PermissionDeniedPage from "./PermissionDeniedPage"

import commons from '../css/commons.module.css'

export default function StudentInfoPage() {
    let [accountType,setAccountType]=useState(()=>getAccountType());

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
                        <StudentInfo />
                    </div>
                </div>
            );
        }
        else
        {
            return <PermissionDeniedPage />;
        }
    }

    function getAccountType()
    {
        return "student";
    }
}