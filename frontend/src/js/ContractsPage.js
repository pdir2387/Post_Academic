import React from 'react'
import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import CreateContracts from "./CreateContracts"
import '../css/contracts.css'

var period;

export default function ContractsPage() {
    return (
        <div id="contractsPage">
            <div id="contractsLeft">
                <StudentNavBar />
                <LogoutButton />
            </div>

            <div id="contractsRight"> 
                <ContractsPageContent />
            </div>
        </div>
    );

    function getInfo()
    {
        period=JSON.parse('{"period":"0"}').period;
    }

    function ContractsPageContent(props)
    {
        getInfo();

        if(period=="0")
        {
            return <ViewContracts />;
        }
        else
        {
            if(period=="1")
            {
                return <CreateContracts />;
            }
            else
            {
                console.log("no");
            }
        }

    }
}