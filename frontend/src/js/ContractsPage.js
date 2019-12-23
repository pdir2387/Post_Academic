import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import '../css/attendances.css'

export default function ContractsPage() {
    return (
        <div id="contractsPage">
            <div id="contractsLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="contractsRight"> 
                <ViewContracts />
            </div>
        </div>
    );
}