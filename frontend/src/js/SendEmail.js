import React, {useState, useEffect} from 'react'
import BackIcon from '../img/back.png'
import RemoveIcon from '../img/remove.png'
import SaveDraftIcon from '../img/save_draft.png'
import CheckedIcon from '../img/checked.png'

import commons from '../css/commons.module.css'
import emailCss from '../css/email.module.css'

export default function SendEmail() 
{
    let [filesToSend,setFilesToSend]=useState([]);
    let [draftSaver,setDraftSaver]=useState(null);

	useEffect(() => 
	{
		startDraftSaver();
		fillData();
    }, []);

    return (
    	<div id={emailCss.containerAllSendEmail}>
    		<div id={emailCss.sendEmailAdditionalOptions}>
    			<a href="/email" id="backToEmails" title="Înapoi"><img src={BackIcon} id={emailCss.backToEmailsImage} alt="Înapoi" /></a>
    			<button id={emailCss.saveDraftButton} onClick={saveDraft} title="Salvează schiță"><img id={emailCss.saveDraftImage} src={SaveDraftIcon} alt="Salvează schiță"/></button>
    		</div>

    		<div id={emailCss.emailDetails}>
				<label className={emailCss.emailDetailsInput}>Destinatar: </label><input type="text" id="toInput"/><br/>
				<label className={emailCss.emailDetailsInput}>Subiect: </label><input type="text" id="subjectInput"/>
    		</div>

			<div id={emailCss.emailContent}>
	    		<div id={emailCss.emailMessage}>
	    			<textarea rows="20" cols="70" id={emailCss.emailMessageInput} />
					<button id={emailCss.sendEmailButton} onClick={sendEmail}>Trimite</button>
	    		</div>

	    		<div id={emailCss.emailAttachments}>
	    			<div id={emailCss.ulAttachmentsTitle}>Atașamente</div>
	    			<div id={emailCss.attachmentsTableContainer}>
		    			<table id={emailCss.attachmentsTable}>
		    				<thead></thead>
		    				<tbody></tbody>
		    			</table>
	    			</div>
					
	    			<form id={emailCss.fileInputForm}>
	    				<input id="fileInput" type="file" onChange={(e)=>addFile(e.target)} multiple />
	    			</form>
	    		</div>
    		</div>
    	</div>
    );

    function startDraftSaver()
    {
		draftSaver=setInterval(function(){ saveDraft(); }, 30000);
    }

    function sendEmail()
    {
    	let to=document.getElementById("toInput").value;
    	let subject=document.getElementById("subjectInput").value;
    	let message=document.getElementById(emailCss.emailMessageInput).value;

		

		document.getElementById(emailCss.attachmentsTable).children[0].innerHTML="";
		document.getElementById(emailCss.attachmentsTable).children[1].innerHTML="";
    	filesToSend=[];
    }

    function addFile(inputFile)
    {
    	let fileTable=document.getElementById(emailCss.attachmentsTable);
    	let files=inputFile.files;

    	for(let i=0;i<files.length;i++)
    	{
			filesToSend.push(files[i]);
			
			let trFile=document.createElement("tr");
			let tdImg=document.createElement("td");
			let tdName=document.createElement("td");
			let tdFile=document.createElement("td");
			let imgRemoveFile=document.createElement("img");

			imgRemoveFile.src=RemoveIcon;
			imgRemoveFile.style.width="20px";
			imgRemoveFile.style.height="auto";
			imgRemoveFile.alt="D:";

			imgRemoveFile.addEventListener('click',function(){
			    fileTable.removeChild(trFile);
			    filesToSend.splice(filesToSend.indexOf(files[i]),1);
			});

			tdImg.appendChild(imgRemoveFile);
			tdName.innerText=files[i].name;
			tdFile.innerText=files[i];
			tdFile.style.display="none";

			trFile.appendChild(tdImg);
			trFile.appendChild(tdName);
			trFile.appendChild(tdFile);

			fileTable.appendChild(trFile);
    	}
    }

    function fillData()
    {
    	let to="";
    	let subject="";
    	let message="";

    	if(localStorage.getItem("to")!==null)
    	{
    		to=localStorage.to;
    		localStorage.removeItem("to");
    	}

    	if(localStorage.getItem("subject")!==null)
    	{
    		subject=localStorage.subject;
    		localStorage.removeItem("subject");
    	}

    	if(localStorage.getItem("message")!==null)
    	{
    		message=localStorage.message;
    		localStorage.removeItem("message");
    	}

    	document.getElementById("toInput").value=to;
    	document.getElementById("subjectInput").value=subject;
    	document.getElementById(emailCss.emailMessageInput).value=message;
    }

    function createSaveDraftMessage()
    {
    	let divMessage=document.createElement("div");
    	let imgChecked=document.createElement("img");
    	let spanMessage=document.createElement("span")

    	imgChecked.src=CheckedIcon;
    	imgChecked.id=emailCss.checkedImage;
    	imgChecked.style.verticalAlign="middle";
    	spanMessage.innerText="Schiță salvată";
    	spanMessage.style.marginLeft="20px";

    	divMessage.appendChild(imgChecked);
    	divMessage.appendChild(spanMessage);
    	divMessage.style.display="inline-block";
    	divMessage.style.marginLeft="20px";
    	divMessage.style.padding="10px";
    	divMessage.style.backgroundColor="#deffd4";

    	let container=document.getElementById(emailCss.sendEmailAdditionalOptions);

    	container.appendChild(divMessage);

    	setTimeout(function(){container.removeChild(divMessage);},4000);
    }

    function saveDraft()
    {
    	let to=document.getElementById("toInput").value;
    	let subject=document.getElementById("subjectInput").value;
    	let message=document.getElementById(emailCss.emailMessageInput).value

    	if(to!=="" || subject!== "" || message!=="")
    	{
			createSaveDraftMessage();
    	}
    }
}