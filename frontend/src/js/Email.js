import React,{useState,useEffect} from 'react'
import '../css/commons.css'
import '../css/email.css'
import ComposeImage from '../img/compose_email.png'
import DeleteImage from '../img/trash.png'
import SearchImage from '../img/search.png'

var emails=[];
var drafts=[];
var sent=[];
var currentlySelectedMail=null;
var currentlySelectedCategory="inbox";

export default function Email() 
{
	useEffect(() => 
	{
        setup();
        fillEmailTable();
    }, []);

    return (
    	<div id="containerAllEmail">
    		<div id="additionalOptions">
    			<div id="imageButtons">
	    			<a href="/send_email" id="toComposeEmail"><img id="toComposeEmailImage" src={ComposeImage} alt="Trimite email"/></a>
	    			<button id="deleteButtonMail" onClick={deleteCurrentlySelectedMail}><img id="deleteEmailImage" src={DeleteImage} alt="Delete"/></button>
	    		</div>

    			<div id="searchArea">
    				<input type="text" id="searchField" />
    				<button id="searchButtonEmail" onClick={searchEmails}><img id="searchEmailImage" src={SearchImage} alt="Caută"/></button>
    			</div>
    		</div>

	        <div id="containerEmailInfo">
	            <div id="leftPanel">
	            	<div id="ulCategoriesTitle">Categorii</div>
	            	<ul id="ulCategories">
	            		<li id="inboxLi" onClick={openInbox}>Mesaje primite</li>
	            		<li id="draftsLi" onClick={openDrafts}>Schițe</li>
	            		<li id="sentLi" onClick={openSent}>Mesaje trimise</li>
	            	</ul>
	            </div>
				
				<div id="emails">
		            <div id="emailList">
		            	<table id="tableEmails">
		            		<thead>
		            			<tr>
		            				<th>Subiect</th>
		            				<th id="fromToTh">Expeditor</th>
		            				<th>Data</th>
		            			</tr>
		            		</thead>

		            		<tbody id="tbodyEmail">
		            		</tbody>
		            	</table>
		            </div>

		            <div id="emailMessage">
		            	<table id="tableEmailInfo">
		            		<thead id="theadTableEmailInfo">
		            		</thead>

		            		<tbody id="tbodyTableEmailInfo">
		            		</tbody>
		            	</table>
						
						<div id="messageArea">
		            		
		            	</div>
		            </div>
	            </div>
	        </div>
        </div>
    );

	function openInbox()
	{
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("inboxLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageArea").innerHTML="";
		fillEmailTable();
		currentlySelectedCategory="inbox";
	}

	function openDrafts()
	{
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("draftsLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageArea").innerHTML="";
		fillDraftsTable();
		currentlySelectedCategory="draft";
	}

	function openSent()
	{
		currentlySelectedMail=null;
		deselectCategories();

		let liElem=document.getElementById("sentLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageArea").innerHTML="";
		fillSentTable();
		currentlySelectedCategory="sent";
	}

	function deselectCategories()
	{
		let categoriesLi=document.getElementById("ulCategories").children;

		for(let j=0;j<categoriesLi.length;j++)
		{
			categoriesLi[j].style.backgroundColor="white";
			categoriesLi[j].style.color="black";
		}
	}

	function setup()
	{
		let liElem=document.getElementById("inboxLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";
	}

	function fillEmailTable()
	{
		getEmails();
		fillEmailTableWithArray(emails);
	}

	function fillEmailTableWithArray(toFill)
	{
		let tbodyEmail=document.getElementById("tbodyEmail");
		tbodyEmail.innerHTML="";

		document.getElementById("fromToTh").innerText="Expeditor";

		for(let i=0;i<toFill.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdSubject=document.createElement("td");
			let tdFrom=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			tdSubject.innerText=toFill[i].subject;
			tdFrom.innerText=toFill[i].from;
			tdDate.innerText=toFill[i].date;
			tdMessage.innerText=toFill[i].message.replace("\n","\\n");
			
			if(toFill[i].read=="false")
			{
				tdSubject.style.fontWeight="bold";
				tdFrom.style.fontWeight="bold";
				tdDate.style.fontWeight="bold";
			}

			tdMessage.style.display="none";

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdFrom);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

			tbodyEmail.appendChild(trEmail)

			trEmail.addEventListener("click",function()
			{
				let emailTr=tbodyEmail.children;

				for(let j=0;j<emailTr.length;j++)
				{
					emailTr[j].style.backgroundColor="white";
					emailTr[j].style.color="black";
				}

				this.style.backgroundColor="#e30707";
				this.style.color="white";
				
				let emailTd=this.children;

				for(let j=0;j<emailTd.length;j++)
				{
					emailTd[j].style.fontWeight="normal";
				}

				toFill[i].read="true";
				sendReadEmail(toFill[i]);

				fillMessageBox(trEmail,"email");
				currentlySelectedMail=trEmail;
			});
		}
	}

	function fillDraftsTable()
	{
		getDrafts();
		fillDraftsOrSentTableWithArray(drafts,"draft");
	}

	function fillSentTable()
	{
		getSent();
		fillDraftsOrSentTableWithArray(sent,"sent");
	}

	function fillDraftsOrSentTableWithArray(toFill,source)
	{
		let tbodyEmail=document.getElementById("tbodyEmail");
		tbodyEmail.innerHTML="";

		document.getElementById("fromToTh").innerText="Destinatar";

		for(let i=0;i<toFill.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdSubject=document.createElement("td");
			let tdTo=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			tdSubject.innerText=toFill[i].subject;
			tdTo.innerText=toFill[i].to;
			tdDate.innerText=toFill[i].date;
			tdMessage.innerText=toFill[i].message.replace("\n","\\n");

			tdMessage.style.display="none";

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

			tbodyEmail.appendChild(trEmail)

			trEmail.addEventListener("click",function()
			{
				let emailTr=tbodyEmail.children;

				for(let j=0;j<emailTr.length;j++)
				{
					emailTr[j].style.backgroundColor="white";
					emailTr[j].style.color="black";
				}

				this.style.backgroundColor="#e30707";
				this.style.color="white";

				fillMessageBox(trEmail,source);
				currentlySelectedMail=trEmail;
			});
		}
	}

	function fillMessageBox(trEmail,source)
	{
		let tbodyInfo=document.getElementById("tbodyTableEmailInfo");
		let messageArea=document.getElementById("messageArea");
		tbodyInfo.innerHTML="";
		messageArea.innerHTML="";

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
		tdFromTo.id="messageDetailsFromTo";

		tdSubject.innerText=trEmail.children[0].innerText;
		tdFromTo.innerText=trEmail.children[1].innerText;
		tdDate.innerText=trEmail.children[2].innerText;

		tdFromTo.addEventListener('click',function(){goToComposeTo(tdFromTo.innerText)});

		trSubject.appendChild(thSubject);
		trSubject.appendChild(tdSubject);

		trFromTo.appendChild(thFromTo);
		trFromTo.appendChild(tdFromTo);

		trDate.appendChild(thDate);
		trDate.appendChild(tdDate);

		tbodyInfo.appendChild(trSubject);
		tbodyInfo.appendChild(trFromTo);
		tbodyInfo.appendChild(trDate);

		let messageText=trEmail.children[3].innerText.replace("\\n","\n");

		if(source==="draft")
		{
			let button=document.createElement("button");
			button.innerText="Editeaza schița";
			button.id="editDraftButton";
			button.addEventListener('click',function(){editDraft(tdFromTo.innerText,tdSubject.innerText,messageText)});
			messageArea.appendChild(button);
		}
		
		renderMessage(messageText);

		messageArea.appendChild(document.createElement("br"));

		if(source==="email")
		{
			let button=document.createElement("button");
			button.innerText="Răspunde";
			button.id="replyButton";
			button.addEventListener('click',function(){replyToEmail(tdFromTo.innerText,tdSubject.innerText,messageText,tdDate.innerText)});
			messageArea.appendChild(button);
		}
	}

	function renderMessage(messageText)
	{
		let messageContainer=document.getElementById("messageArea");
		messageContainer.innerHTML="";
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

				messageContainer.innerHTML+=getBlockQuoteHTML(linesToBlockQuote);
			}
			else
			{
				messageContainer.innerHTML+=lines[i];
				messageContainer.innerHTML+="<br/>"
			}
		}
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
			blockQuoteHtml+="<blockquote class='replyQuoteEmail'>";
		}

		blockQuoteHtml+=text[0];

		for(let i=1;i<nr.length;i++)
		{
			if(nr[i]>nr[i-1])
			{
				for(let j=0;j<nr[i]-nr[i-1];j++)
				{
					blockQuoteHtml+="<blockquote class='replyQuoteEmail'>";
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

	function getEmails()
	{
		emails=JSON.parse('{"emails":[{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok.\\nfuk da cops"},{"read":"false","subject":"subject2","from":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"},{"read":"false","subject":"subject3","from":"Big Smoke3","date":"2017-01-01 12:12","message":"lul u. wont betray. eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer"},{"read":"true","subject":"subject4","from":"Big Smoke4","date":"2014-01-01 12:12","message":"fo da hood"},{"read":"false","subject":"subject5","from":"Big Smoke5","date":"2015-01-01 12:12","message":"need some numba 9s"}]}').emails;
	}

	function getDrafts()
	{
		drafts=JSON.parse('{"drafts":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok draft. fuk da cops"},{"subject":"subject2","to":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"}]}').drafts;
	}

	function getSent()
	{
		sent=JSON.parse('{"sent":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":">lul got big smok sent. fuk da cops>>ima black\\n>>nigga"}]}').sent;
	}

	function deleteCurrentlySelectedMail()
	{
		if(currentlySelectedMail!==null)
		{
			let tbodyEmail=document.getElementById("tbodyEmail");
			document.getElementById("tbodyTableEmailInfo").innerHTML="";
			document.getElementById("messageArea").innerHTML="";

			sendDeleteRequest(currentlySelectedMail.children[0].innerText,currentlySelectedMail.children[1].innerText,currentlySelectedMail.children[2].innerText,currentlySelectedMail.children[3].innerText);

			if(currentlySelectedCategory==="inbox")
			{
				emails.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(currentlySelectedMail),1);
			}
			else
			{
				if(currentlySelectedCategory==="draft")
				{
					drafts.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(currentlySelectedMail),1);
				}
				else
				{
					if(currentlySelectedCategory==="sent")
					{
						sent.splice(Array.prototype.slice.call(tbodyEmail.children).indexOf(currentlySelectedMail),1);
					}
				}
			}

			tbodyEmail.removeChild(currentlySelectedMail);

			currentlySelectedMail=null;
		}
	}

	function searchEmails()
	{
		let term=document.getElementById("searchField").value;

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

		let replyMessage="Pe data de "+date+", "+to+" a trimis:\r\n"+messageReply;
		localStorage.to=to;
		localStorage.subject=subject;
		localStorage.message=replyMessage;
		window.location="/send_email";
	}

	function sendDeleteRequest(subject,fromTo,date,message)
	{

	}

	function sendReadEmail(email)
	{

	}
}