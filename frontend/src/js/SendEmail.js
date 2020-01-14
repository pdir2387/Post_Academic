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
				<label className={emailCss.emailDetailsInput}>Destinatar: </label><input id={emailCss.toInput} type="text" /><br/>
				<label className={emailCss.emailDetailsInput}>Subiect: </label><input id={emailCss.subjectInput} type="text"/>
    		</div>

			<div id={emailCss.emailContent}>
				<div id={emailCss.messageAndSendButtonContainer}>
					<div id={emailCss.emailMessage}>
						<textarea rows="20" cols="70" id={emailCss.emailMessageInput} />
					</div>

					<button id={emailCss.sendEmailButton} onClick={sendEmail}>Trimite</button>
				</div>

	    		<div id={emailCss.emailAttachments}>
	    			<div id={emailCss.ulAttachmentsTitle}>Atașamente</div>
	    			<div id={emailCss.attachmentsTableContainer}>
		    			<table id={emailCss.attachmentsTable}>
		    				<thead></thead>
		    				<tbody id="attachmentsTableBody"></tbody>
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
		draftSaver=setInterval(function(){ saveDraft(); }, 60000);
	}
	
	function getBytesOfFile(file)
	{
		return new Promise((resolve, reject) => 
		{
			let reader= new FileReader();
			reader.onload=function(fileToRead){
				resolve(fileToRead.target.result);
			}
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	async function getFilesInfo(files)
	{
		let fileInfo=[];

		for(const file of files)
		{
			let bytesToSend= await getBytesOfFile(file);
			let bytesString=bytesToSend.split(',')[1];

			let obj={
				lastModified: file.lastModified,
				lastModifiedDate: file.lastModifiedDate,
				name:file.name,
				size: file.size,
				type: file.type,
				bytes: bytesString
			}

			fileInfo.push(obj);
		}

		return fileInfo;
	}

    async function sendEmail()
    {
    	let to=document.getElementById(emailCss.toInput).value;
    	let subject=document.getElementById(emailCss.subjectInput).value;
		let message=document.getElementById(emailCss.emailMessageInput).value;

		if(to !== "")
		{
			getFilesInfo(filesToSend).then((files)=>{
				fetch('http://localhost:3000/api/all/emails/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						to:to,
						subject:subject,
						message:message,
						attachments:files
					})
				})
			})
			

			showConfirmation("Trimis");
			// document.getElementById(emailCss.attachmentsTable).children[0].innerHTML="";
			// document.getElementById(emailCss.attachmentsTable).children[1].innerHTML="";
			// document.getElementById(emailCss.toInput).value="";
			// document.getElementById(emailCss.subjectInput).value="";
			// document.getElementById(emailCss.emailMessageInput).value="";
			// filesToSend=[];
		}
		else
		{
			alert("Introdu destinatarul");
		}
    }

    function addFile(inputFile)
    {
    	let fileTable=document.getElementById("attachmentsTableBody");
    	let files=inputFile.files;

    	for(let i=0;i<files.length;i++)
    	{
			let aux=files[i];

			filesToSend.push(aux);
			
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
			    filesToSend.splice(filesToSend.indexOf(aux),1);
			});

			tdImg.appendChild(imgRemoveFile);
			tdName.innerText=aux.name;
			tdFile.innerText=aux;
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

    	document.getElementById(emailCss.toInput).value=to;
    	document.getElementById(emailCss.subjectInput).value=subject;
    	document.getElementById(emailCss.emailMessageInput).value=message;
	}
	
	function showConfirmation(message)
	{
		let divMessage=document.createElement("div");
    	let imgChecked=document.createElement("img");
    	let spanMessage=document.createElement("span")

    	imgChecked.src=CheckedIcon;
    	imgChecked.id=emailCss.checkedImage;
    	imgChecked.style.verticalAlign="middle";
    	spanMessage.innerText=message;
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
    	let to=document.getElementById(emailCss.toInput).value;
    	let subject=document.getElementById(emailCss.subjectInput).value;
    	let message=document.getElementById(emailCss.emailMessageInput).value

    	if(to!=="" || subject!== "" || message!=="")
    	{
			getFilesInfo(filesToSend).then((files)=>{
				fetch('http://localhost:3000/api/all/emails/draft', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						to:to,
						subject:subject,
						message:message,
						attachments:files
					})
				}).then(()=>showConfirmation("Schiță salvată"));
			})
    	}
    }
}