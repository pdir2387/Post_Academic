import LogoutButton from "./LogoutButton.js"
import React, {useState} from 'react'
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentNavBar from "./StudentNavBar.js"
import Results from "./Results"
import '../css/results.css'

export default function ResultsPage() 
{
    let [accountType,setAccountType]=useState(()=>getAccountType());

    return (
        <div id="resultsPage">
            <div id="resultsLeft">
                <NavBar />
                <LogoutButton />
            </div>

            <div id="resultsRight"> 
                <ResultsStudentOrProfessor />
            </div>
        </div>
    );

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