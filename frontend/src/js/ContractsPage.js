import React, {useState} from 'react'
import LogoutButton from "./LogoutButton.js"
import StudentNavBar from "./StudentNavBar.js"
import ViewContracts from "./ViewContracts"
import CreateContracts from "./CreateContracts"
import '../css/contracts.css'
import StudentContractPopup from './StudentContractPopup'
import Modal from 'react-modal'

export default function ContractsPage() 
{
    let [period,setPeriod]=useState(()=>getPeriod());

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

    function getPeriod()
    {
        return JSON.parse('{"period":"1"}').period;
    }

    function ContractsPageContent(props)
    {
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