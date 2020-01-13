import React, {useState, useEffect} from 'react'
import ComposeImage from '../img/compose_email.png'
import DeleteImage from '../img/trash.png'
import SearchImage from '../img/search.png'

import commons from '../css/commons.module.css'
import emailCss from '../css/email.module.css'

export default function Email() 
{
	let [emails,setEmails]=useState([]);
	let [drafts,setDrafts]=useState([]);
	let [sent,setSent]=useState([]);
	let [selectedEmails,setSelectedEmails]=useState([]);
	let [currentlySelectedMail,setCurrentlySelectedMail]=useState(null);
	let [currentlySelectedCategory,setCurrentlySelectedCategory]=useState("inbox");
	let [emailFetcher,setEmailFetcher]=useState(null);
	let [unreadEmailsCount,setUnreadEmailsCount]=useState(0);

	useEffect(() => 
	{
		getInfo().then(()=>{
			openInbox();
        	startEmailFetcher();
		});
    }, []);

    return (
    	<div id={emailCss.containerAllEmail}>
    		<div id={emailCss.additionalOptions}>
    			<div id={emailCss.imageButtons}>
	    			<a href="/send_email" id={emailCss.toComposeEmail} title="Trimite email"><img id={emailCss.toComposeEmailImage} src={ComposeImage} alt="Trimite email"/></a>
	    			<button id={emailCss.deleteButtonMail} onClick={deleteSelectedMails} title="Șterge email-uri selectate"><img id={emailCss.deleteEmailImage} src={DeleteImage} alt="Delete"/></button>
	    		</div>

    			<div id={emailCss.searchArea}>
    				<input type="text" id={emailCss.searchField} />
    				<button id={emailCss.searchButtonEmail} onClick={searchEmails}><img id={emailCss.searchEmailImage} src={SearchImage} alt="Caută"/></button>
    			</div>
    		</div>

	        <div id={emailCss.containerEmailInfo}>
	            <div id={emailCss.leftPanel}>
	            	<div id={emailCss.ulCategoriesTitle}>Categorii</div>
	            	<ul id={emailCss.ulCategories}>
	            		<li id="inboxLi" onClick={openInbox}>Mesaje primite<span id="unreadNumber"></span></li>
	            		<li id="draftsLi" onClick={openDrafts}>Schițe</li>
	            		<li id="sentLi" onClick={openSent}>Mesaje trimise</li>
	            	</ul>
	            </div>
				
				<div id={emailCss.emails}>
		            <div id={emailCss.emailList}>
		            	<table id={emailCss.tableEmails}>
		            		<thead>
		            			<tr>
		            				<th className={emailCss.checkboxTh}></th>
		            				<th>Subiect</th>
		            				<th id="fromToTh">Expeditor</th>
		            				<th>Data</th>
		            			</tr>
		            		</thead>

		            		<tbody id={emailCss.tbodyEmail}>
		            		</tbody>
		            	</table>
		            </div>

		            <div id={emailCss.emailMessage}>
		            	<table id={emailCss.tableEmailInfo}>
		            		<thead id="theadTableEmailInfo">
		            		</thead>

		            		<tbody id="tbodyTableEmailInfo">
		            		</tbody>
		            	</table>
						
						<div id={emailCss.messageArea}>
		            	</div>

						<div id={emailCss.attachmentsArea}>
						</div>
		            </div>
	            </div>
	        </div>
        </div>
	);
	
	async function getInfo()
	{
		getDrafts().then((res)=>{
			drafts=res;
		});

		getSent().then((res)=>{
			sent=res;
		});

		emails= await getEmails();
	}

	function openInbox()
	{
		selectedEmails=[];
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("inboxLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById(emailCss.messageArea).innerHTML="";
		document.getElementById(emailCss.attachmentsArea).innerHTML="";

		fillEmailTable();
		currentlySelectedCategory="inbox";
	}

	function openDrafts()
	{
		selectedEmails=[];
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("draftsLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById(emailCss.messageArea).innerHTML="";
		document.getElementById(emailCss.attachmentsArea).innerHTML="";

		fillDraftsTable();
		currentlySelectedCategory="draft";
	}

	function openSent()
	{
		selectedEmails=[];
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("sentLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById(emailCss.messageArea).innerHTML="";
		document.getElementById(emailCss.attachmentsArea).innerHTML="";

		fillSentTable();
		currentlySelectedCategory="sent";
	}

	function startEmailFetcher()
	{
		emailFetcher=setInterval(function(){ getInfo(); }, 30000);
	}

	function deselectCategories()
	{
		let categoriesLi=document.getElementById(emailCss.ulCategories).children;

		for(let j=0;j<categoriesLi.length;j++)
		{
			categoriesLi[j].style.backgroundColor="white";
			categoriesLi[j].style.color="black";
		}
	}

	function fillEmailTable()
	{
		document.getElementById(emailCss.tbodyEmail).innerHTML="";

		fillEmailTableWithArray(emails);
		updateUnreadCount();
	}

	function fillEmailTableWithArray(toFill)
	{
		let tbodyEmail=document.getElementById(emailCss.tbodyEmail);

		document.getElementById("fromToTh").innerText="Expeditor";

		for(let i=0;i<toFill.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdCheck=document.createElement("td");
			let tdSubject=document.createElement("td");
			let tdFrom=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			let checkboxRow = document.createElement("input");
			checkboxRow.type="checkbox";

			tdCheck.appendChild(checkboxRow);
			tdSubject.innerText=toFill[i].subject;
			tdFrom.innerText=toFill[i].from;
			tdDate.innerText=toFill[i].date;
			tdMessage.innerText=toFill[i].message.replace("\n","\\n");
			
			if(toFill[i].read==="false")
			{
				tdSubject.style.fontWeight="bold";
				tdFrom.style.fontWeight="bold";
				tdDate.style.fontWeight="bold";
			}

			tdMessage.style.display="none";
			
			trEmail.appendChild(tdCheck);
			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdFrom);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

			tbodyEmail.appendChild(trEmail)

			checkboxRow.addEventListener('change',function()
			{
				let parentTr=this.parentNode.parentNode;

				if(this.checked===false)
				{
					parentTr.style.backgroundColor="white";
					parentTr.style.color="black";
					selectedEmails.splice(selectedEmails.indexOf(parentTr),1);
				}
				else
				{
					parentTr.style.backgroundColor="#e30707";
					parentTr.style.color="white";
					selectedEmails.push(parentTr);
				}
			});

			let aux=toFill[i];

			trEmail.addEventListener("click",function()
			{
				let emailTr=tbodyEmail.children;

				for(let j=0;j<emailTr.length;j++)
				{
					if(emailTr[j].children[0].children[0].checked===false)
					{
						emailTr[j].style.backgroundColor="white";
						emailTr[j].style.color="black";
					}
				}

				this.style.backgroundColor="#e30707";
				this.style.color="white";
				
				let emailTd=this.children;
				
				if(aux.read==="false")
				{
					for(let j=0;j<emailTd.length;j++)
					{
						emailTd[j].style.fontWeight="normal";
					}

					unreadEmailsCount-=1;

					if(unreadEmailsCount===0)
					{
						document.getElementById("unreadNumber").innerText="";
					}
					else
					{
						document.getElementById("unreadNumber").innerText="("+unreadEmailsCount.toString()+")";
					}

					aux.read="true";
					sendReadEmail(aux.id);
				}

				fillMessageBox(this,"email");
				showAttachments(aux.id,aux.attachments);
				currentlySelectedMail=this;
			});
		}
	}

	function fillDraftsTable()
	{
		document.getElementById(emailCss.tbodyEmail).innerHTML="";

		fillDraftsOrSentTableWithArray(drafts,"draft");
	}

	function fillSentTable()
	{
		document.getElementById(emailCss.tbodyEmail).innerHTML="";

		fillDraftsOrSentTableWithArray(sent,"sent");
	}

	function fillDraftsOrSentTableWithArray(toFill,source)
	{
		let tbodyEmail=document.getElementById(emailCss.tbodyEmail);

		document.getElementById("fromToTh").innerText="Destinatar";

		for(let i=0;i<toFill.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdCheck=document.createElement("td");
			let tdSubject=document.createElement("td");
			let tdTo=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");
			let tdMailId=document.createElement("td");

			let checkboxRow = document.createElement("input");
			checkboxRow.type="checkbox";

			tdCheck.appendChild(checkboxRow);
			tdSubject.innerText=toFill[i].subject;
			tdTo.innerText=toFill[i].to;
			tdDate.innerText=toFill[i].date;
			tdMessage.innerText=toFill[i].message.replace("\n","\\n");
			tdMailId.innertext=toFill[i].id;

			tdMessage.style.display="none";
			tdMailId.style.display="none";

			trEmail.appendChild(tdCheck);
			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);
			trEmail.appendChild(tdMailId);

			tbodyEmail.appendChild(trEmail)

			checkboxRow.addEventListener('change',function()
			{
				let parentTr=this.parentNode.parentNode;

				if(this.checked===false)
				{
					parentTr.style.backgroundColor="white";
					parentTr.style.color="black";
					selectedEmails.splice(selectedEmails.indexOf(parentTr),1);
				}
				else
				{
					parentTr.style.backgroundColor="#e30707";
					parentTr.style.color="white";
					selectedEmails.push(parentTr);
				}
			});
			
			let aux=null;

			if(source==="sent")
			{
				aux=toFill[i];
			}

			trEmail.addEventListener("click",function()
			{
				let emailTr=tbodyEmail.children;

				for(let j=0;j<emailTr.length;j++)
				{
					if(emailTr[j].children[0].children[0].checked===false)
					{
						emailTr[j].style.backgroundColor="white";
						emailTr[j].style.color="black";
					}
				}

				this.style.backgroundColor="#e30707";
				this.style.color="white";

				fillMessageBox(this,source);

				if(source==="sent")
				{
					showAttachments(aux.id,aux.attachments);
				}

				currentlySelectedMail=this;
			});
		}
	}

	function fillMessageBox(trEmail,source)
	{
		let tbodyInfo=document.getElementById("tbodyTableEmailInfo");
		let messageArea=document.getElementById(emailCss.messageArea);
		tbodyInfo.innerHTML="";
		messageArea.innerHTML="";
		document.getElementById(emailCss.attachmentsArea).innerHTML="";

		let trSubject=document.createElement("tr");
		let trFromTo=document.createElement("tr");
		let trDate=document.createElement("tr"); 

		let thSubject=document.createElement("th");
		let thFromTo=document.createElement("th");
		let thDate=document.createElement("th"); 

		thSubject.innerText="Subiect:";
		thDate.innerText="Data:";

		if(source==="email")
		{
			thFromTo.innerText="Expeditor:";
		}
		else
		{
			if(source==="draft" || source==="sent")
			{
				thFromTo.innerText="Destinatar:";
			}
		}

		let tdSubject=document.createElement("td");
		let tdFromTo=document.createElement("td");
		let tdDate=document.createElement("td");

		tdSubject.id="messageDetailsSubject";
		tdFromTo.id=emailCss.messageDetailsFromTo;

		tdSubject.innerText=trEmail.children[1].innerText;
		tdFromTo.innerText=trEmail.children[2].innerText;
		tdDate.innerText=trEmail.children[3].innerText;

		tdFromTo.addEventListener('click',function(){goToComposeTo(this.innerText)});

		trSubject.appendChild(thSubject);
		trSubject.appendChild(tdSubject);

		trFromTo.appendChild(thFromTo);
		trFromTo.appendChild(tdFromTo);

		trDate.appendChild(thDate);
		trDate.appendChild(tdDate);

		tbodyInfo.appendChild(trSubject);
		tbodyInfo.appendChild(trFromTo);
		tbodyInfo.appendChild(trDate);

		let messageText=trEmail.children[4].innerText.replace("\\n","\n");

		if(source==="draft")
		{
			let button=document.createElement("button");
			button.innerText="Editeaza schița";
			button.id=emailCss.editDraftButton;
			button.addEventListener('click',function(){editDraft(tdFromTo.innerText,tdSubject.innerText,messageText)});
			messageArea.appendChild(button);
			messageArea.appendChild(document.createElement("br"));
		}

		if(source==="email")
		{
			let button=document.createElement("button");
			button.innerText="Răspunde";
			button.id=emailCss.replyButton;
			button.addEventListener('click',function(){replyToEmail(tdFromTo.innerText,tdSubject.innerText,messageText,tdDate.innerText)});
			messageArea.appendChild(button);
		}

		messageArea.appendChild(document.createElement("br"));
		renderMessage(messageText);
	}

	function renderMessage(messageText)
	{
		let messageContainer=document.getElementById(emailCss.messageArea);
		let message=document.createElement("div");
		message.id="renderedMessage";

		let lines=messageText.split("\n");

		for(let i=0;i<lines.length;i++)
		{
			if(lines[i][0]===">")
			{
				let linesToBlockQuote=[];

				while(i<lines.length && lines[i][0]===">")
				{
					linesToBlockQuote.push(lines[i]);
					i++;
				}

				message.innerHTML+=getBlockQuoteHTML(linesToBlockQuote);
			}
			else
			{
				message.innerHTML+=lines[i];
				message.innerHTML+="<br/>"
			}
		}

		messageContainer.appendChild(message);
	}

	function showAttachments(mailId,attachments)
	{
		let attachmentsArea=document.getElementById(emailCss.attachmentsArea);

		for(let i=0;i<attachments.length;i++)
		{
			let id=attachments[i].id;
			let attachmentElement=document.createElement("div");
			attachmentElement.classList.add(emailCss.attachmentsElement);

			let attachmentElmentExtension=document.createElement("div");
			attachmentElmentExtension.classList.add(emailCss.attachmentsExtension);
			attachmentElmentExtension.innerText=attachments[i].name.split(".")[1];

			let attachmentElementFileName=document.createElement("div");
			attachmentElementFileName.classList.add(emailCss.attachmentsName);
			attachmentElementFileName.innerText=attachments[i].name;
			attachmentElementFileName.style.flex="1";

			attachmentElement.appendChild(attachmentElmentExtension);
			attachmentElement.appendChild(attachmentElementFileName);
			attachmentElement.addEventListener('click',function(){downloadFile(mailId,id)});

			attachmentsArea.appendChild(attachmentElement);
		}
	}

	function downloadFile(id)
	{
		
	}

	function getBlockQuoteHTML(lines)
	{
		let blockQuoteHtml="";
		let nr=[];
		let text=[];

		for(let i=0;i<lines.length;i++)
		{
			let j=0;

			while(lines[i][j]===">")
			{
				j++;
			}

			nr.push(j);
			text.push(lines[i].substr(j));
		}

		for(let i=0;i<nr[0];i++)
		{
			blockQuoteHtml+="<blockquote class="+emailCss.replyQuoteEmail+">";
		}

		blockQuoteHtml+=text[0];

		for(let i=1;i<nr.length;i++)
		{
			if(nr[i]>nr[i-1])
			{
				for(let j=0;j<nr[i]-nr[i-1];j++)
				{
					blockQuoteHtml+="<blockquote class="+emailCss.replyQuoteEmail+">";
				}

				blockQuoteHtml+=text[i];
			}
			else
			{
				if(nr[i]===nr[i-1])
				{
					blockQuoteHtml+=" ";
					blockQuoteHtml+=text[i];
				}
				else
				{
					for(let j=0;j<nr[i-1]-nr[i];j++)
					{
						blockQuoteHtml+="</blockquote>";
					}

					blockQuoteHtml+=text[i];
				}
			}
		}

		for(let i=0;i<nr[nr.length-1];i++)
		{
			blockQuoteHtml+="</blockquote>";
		}

		return blockQuoteHtml;
	}

	async function getEmails()
	{
		//emails=JSON.parse('{"emails":[{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops","attachments":[{"id":"1","name":"file1.txt"},{"id":"2","name":"file2.txt"}]},{"read":"false","subject":"subject2","from":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz","attachments":[{"id":"3","name":"file3.txt"},{"id":"4","name":"file4.txt"}]},{"read":"false","subject":"subject3","from":"Big Smoke3","date":"2017-01-01 12:12","message":"lul u. wont betray. eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer","attachments":[{"id":"5","name":"file5.txt"},{"id":"6","name":"file6.txt"}]},{"read":"true","subject":"subject4","from":"Big Smoke4","date":"2014-01-01 12:12","message":"fo da hood","attachments":[{"id":"7","name":"file7.txt"},{"id":"8","name":"file8.txt"}]},{"read":"false","subject":"subject5","from":"Big Smoke5","date":"2015-01-01 12:12","message":"need some numba 9s","attachments":[{"id":"9","name":"file9.txt"},{"id":"10","name":"file10.txt"},{"id":"11","name":"file11.txt"},{"id":"12","name":"file12.txt"},{"id":"13","name":"file13.txt"},{"id":"14","name":"file14.txt"}]}]}').emails;
		let res= await fetch('http://localhost:3000/api/all/emails/getAll').then(res => res.json());
		return res;
	}

	function updateUnreadCount()
	{
		let unread=0;

		for(let i=0;i<emails.length;i++)
		{
			if(emails[i].read==="false")
			{
				unread+=1;
			}
		}

		unreadEmailsCount=unread;

		if(unreadEmailsCount===0)
		{
			document.getElementById("unreadNumber").innerText="";
		}
		else
		{
			document.getElementById("unreadNumber").innerText="("+unreadEmailsCount.toString()+")";
		}
	}

	async function getDrafts()
	{
		// drafts=JSON.parse('{"drafts":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok draft. fuk da cops"},{"subject":"subject2","to":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"}]}').drafts;
		
		let res= await fetch('http://localhost:3000/api/all/emails/getDrafts').then(res => res.json());
        return res;
	}

	async function getSent()
	{
		//sent=JSON.parse('{"sent":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":">lul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. ful got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fukul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent.ul got big smok sent. fuk da copsk da copsul got big smok sent. fuk da copsul got big smok sent. da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da copsul got big smok sent. fuk da cops>>ima black\\n>>nigga","attachments":[{"id":"15","name":"file15.txt"}]}]}').sent;
		let res= await fetch('http://localhost:3000/api/all/emails/getSent').then(res => res.json());
		return res;
	}

	function deleteSelectedMails()
	{
		if(selectedEmails.length>0)
		{
			let tbodyEmail=document.getElementById(emailCss.tbodyEmail);
			document.getElementById("tbodyTableEmailInfo").innerHTML="";
			document.getElementById(emailCss.messageArea).innerHTML="";
			let toDeleteMailsIds=[];

			for(let i=0;i<selectedEmails.length;i++)
			{
				toDeleteMailsIds.push(selectedEmails[i].children[5].innerText);

				if(currentlySelectedCategory==="inbox")
				{
					emails.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(selectedEmails[i]),1);
				}
				else
				{
					if(currentlySelectedCategory==="draft")
					{
						drafts.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(selectedEmails[i]),1);
					}
					else
					{
						if(currentlySelectedCategory==="sent")
						{
							sent.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(selectedEmails[i]),1);
						}
					}
				}

				tbodyEmail.removeChild(selectedEmails[i]);

				if(selectedEmails[i]===currentlySelectedMail)
				{
					currentlySelectedMail=null;
				}
			}

			sendDeleteRequest(toDeleteMailsIds);

			selectedEmails=[];
		}
	}

	function searchEmails()
	{
		let term=document.getElementById(emailCss.searchField).value;

		if(term==="")
		{
			if(currentlySelectedCategory==="inbox")
			{
				fillEmailTableWithArray(emails);
			}
			else
			{
				if(currentlySelectedCategory==="draft")
				{
					fillDraftsOrSentTableWithArray(drafts);
				}
				else
				{
					if(currentlySelectedCategory==="sent")
					{
						fillDraftsOrSentTableWithArray(sent);
					}
				}
			}

			return;
		}

		let toSearchEmails=[];
		let foundEmails=[];

		if(currentlySelectedCategory==="inbox")
		{
			toSearchEmails=emails;
		}
		else
		{
			if(currentlySelectedCategory==="draft")
			{
				toSearchEmails=drafts;
			}
			else
			{
				if(currentlySelectedCategory==="sent")
				{
					toSearchEmails=sent;
				}
			}
		}

		for(let i=0;i<toSearchEmails.length;i++)
		{
			if(toSearchEmails[i].subject.includes(term) || toSearchEmails[i].date.includes(term) || toSearchEmails[i].message.includes(term))
			{
				foundEmails.push(toSearchEmails[i]);
			}

			if(currentlySelectedCategory==="inbox")
			{
				if(toSearchEmails[i].from.includes(term))
				{
					foundEmails.push(toSearchEmails[i]);
				}
			}
			else
			{
				if(currentlySelectedCategory==="draft" || currentlySelectedCategory==="sent")
				{
					if(toSearchEmails[i].to.includes(term))
					{
						foundEmails.push(toSearchEmails[i]);
					}
				}
			}
		}
		
		if(currentlySelectedCategory==="inbox")
		{
			fillEmailTableWithArray(foundEmails);
		}
		else
		{
			if(currentlySelectedCategory==="draft" || currentlySelectedCategory==="sent")
			{
				fillDraftsOrSentTableWithArray(foundEmails);
			}
		}
	}

	function editDraft(to,subject,message)
	{
		localStorage.to=to;
		localStorage.subject=subject;
		localStorage.message=message;
		window.location="/send_email";
	}

	function goToComposeTo(to)
	{
		localStorage.to=to;
		window.location="/send_email";
	}

	function replyToEmail(to,subject,message,date)
	{
		let lines=message.split("\n");
		let messageReply="";

		for(let i=0;i<lines.length;i++)
		{
			messageReply+=">";
			messageReply+=lines[i];
			messageReply+="\n";
		}

		if(subject[0]!=="R" && subject[1]!=="e" && subject[2]!=":")
		{
			subject="Re: "+subject;
		}

		let replyMessage=">Pe data de "+date+", "+to+" a trimis:\r\n"+messageReply;
		localStorage.to=to;
		localStorage.subject=subject;
		localStorage.message=replyMessage;
		window.location="/send_email";
	}

	function sendDeleteRequest(idArray)
	{
		// fetch('http://localhost:3000/api/all/emails/send', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 		},
		// 	body:JSON.stringify({
		// 		idArray:idArray
		// 	})
		// });
	}

	function sendReadEmail(id)
	{

	}
}