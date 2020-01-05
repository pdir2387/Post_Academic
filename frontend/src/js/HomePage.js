import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Orar from "./Orar.js"

import home from '../css/home.module.css'

export default function HomePage() {
    let [accountType,setAccountType]=useState(()=>getAccountType());
    fetchCall();

    return <Page />;

    function Page()
    {
        if(accountType==="student" || accountType==="professor" || accountType==="admin")
        {
            return (
                <div id={home.homePage}>
                    <div id={home.homeLeft}>
                        <StudentNavBar />
                        <LogoutButton />
                    </div>
                    <div id={home.homeRight}> 
                        <Orar />
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
        return "student";
    }
}

function fetchCall() {
    // fetch('http://localhost:3000/api/authority')
    //     .then(response => response.text())
    //     .then(alo => alert(alo))
    //     .catch( e => alert(e));
}