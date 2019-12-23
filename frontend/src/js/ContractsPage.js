import LogoutButton from "./LogoutButton.js"
import React from 'react'
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import CreateContracts from "./CreateContracts"
import '../css/contracts.css'

export default function ContractsPage() {
    return (
        <div id="contractsPage">
            <div id="contractsLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="contractsRight"> 
                {/*momentan doar una din astea 2 merge la un moment dat*/}
                {/*<ViewContracts />*/}
                <CreateContracts />
            </div>
        </div>
    );
}