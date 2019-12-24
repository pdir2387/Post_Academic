import React,{useState,useEffect} from 'react'
import '../css/commons.css'
import '../css/email.css'
import BackIcon from '../img/back.png'

export default function SendEmail() 
{
	useEffect(() => 
	{
    }, []);

    return (
    	<div id="containerAllSendEmail">
    		<div id="sendEmailAdditionalOptions">
    			<a href="/email" id="backToEmails"><img src={BackIcon} id="backToEmailsImage" alt="Înapoi" /></a>
    		</div>

    		<div id="emailDetails">
				<label className="emailDetailsInput">Destinatar: </label><input type="text" id="toInput"/><br/>
				<label className="emailDetailsInput">Subiect: </label><input type="text" id="subjectInput"/>
    		</div>

			<div id="emailContent">
	    		<div id="emailMessage">
	    			<textarea rows="20" cols="70" id="emailMessageInput" />
	    			<button id="sendEmailButton" onClick={sendEmail}>Trimite</button>
	    		</div>

	    		<div id="emailAttachments">
	    			<div id="ulAttachmentsTitle">Atașamente</div>
	    			<ul id="attachmentsUl">

	    			</ul>
	    		</div>
    		</div>
    	</div>
    );

    function sendEmail()
    {
    	let to=document.getElementById("toInput").value;
    	let subject=document.getElementById("subjectInput").value;
    	let message=document.getElementById("emailMessageInput").value;
    }
}