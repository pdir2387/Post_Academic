import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentNavBar from "./StudentNavBar.js"
import Results from "./Results"

import commons from '../css/commons.module.css'

export default function ResultsPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

    return <Page />;

    function Page()
    {
        if(accountType==="student" || accountType==="professor")
        {
            return (
                <div id={commons.page}>
                    <div id={commons.left}>
                        <NavBar />
                        <LogoutButton />
                    </div>
        
                    <div id={commons.right}> 
                        <ResultsStudentOrProfessor />
                    </div>
                </div>
            );
        }
        else
        {
            return <div>Nu ai permisiunea necesara sa vizualizezi pagina</div>;
        }
    }

    function NavBar()
    {
        if(accountType==="student")
        {
            return <StudentNavBar />;
        }
        else
        {
            if(accountType==="professor")
            {
                return <ProfessorNavBar />;
            }
        }
    }

    function ResultsStudentOrProfessor()
    {
        if(accountType==="student")
        {
            return <Results />;
        }
        else
        {
            if(accountType==="professor")
            {
                return <Results />;
            }
        }
    }

    function getAccountType()
    {
        return "student";
    }
}