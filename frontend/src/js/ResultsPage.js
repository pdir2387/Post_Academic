import LogoutButton from "./LogoutButton.js"
import React from 'react'
import ProfessorNavBar from "./ProfessorNavBar.js"
import StudentNavBar from "./StudentNavBar.js"
import Results from "./Results"
import '../css/results.css'

var accountType;

export default function ResultsPage() {
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
        getAccountType();

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
        accountType="student";
    }
}