import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import Results from "./Results"
import '../css/results.css'

export default function ResultsPage() {
    return (
        <div id="resultsPage">
            <div id="resultsLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="resultsRight"> 
                <Results />
            </div>
        </div>
    );
}