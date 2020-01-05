import React, {useState} from 'react'
import StudentNavBar from './StudentNavBar'
import TidorPage from './TidorPage'

import commons from '../css/commons.module.css'

export default function AI() {
    let [accountType,setAccountType]=useState(()=>getAccountType());

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
            return <div>Nu ai permisiunea necesara sa vizualizezi pagina</div>;
        }
    }

    function getAccountType()
    {
        return "student";
    }
}