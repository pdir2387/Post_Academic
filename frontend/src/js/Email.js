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
		            		<p id="messageP"></p>
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
		document.getElementById("messageP").innerText="";
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
		document.getElementById("messageP").innerText="";
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
		document.getElementById("messageP").innerText="";
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
			tdMessage.innerText=toFill[i].message;
			
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
		fillDraftsOrSentTableWithArray(drafts);
	}

	function fillSentTable()
	{
		getSent();
		fillDraftsOrSentTableWithArray(sent);
	}

	function fillDraftsOrSentTableWithArray(toFill)
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
			tdMessage.innerText=toFill[i].message;

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

				fillMessageBox(trEmail,"draft");
				currentlySelectedMail=trEmail;
			});
		}
	}

	function fillMessageBox(trEmail,source)
	{
		let tbodyInfo=document.getElementById("tbodyTableEmailInfo");
		tbodyInfo.innerHTML="";

		let trSubject=document.createElement("tr");
		let trFrom=document.createElement("tr");
		let trDate=document.createElement("tr"); 

		let thSubject=document.createElement("th");
		let thFrom=document.createElement("th");
		let thDate=document.createElement("th"); 

		thSubject.innerText="Subiect:";
		thDate.innerText="Data:";

		if(source==="email")
		{
			thFrom.innerText="Expeditor:";
		}
		else
		{
			if(source==="draft" || source==="sent")
			{
				thFrom.innerText="Destinatar:";
			}
		}

		let tdSubject=document.createElement("td");
		let tdFrom=document.createElement("td");
		let tdDate=document.createElement("td");

		tdSubject.innerText=trEmail.children[0].innerText;
		tdFrom.innerText=trEmail.children[1].innerText;
		tdDate.innerText=trEmail.children[2].innerText;

		trSubject.appendChild(thSubject);
		trSubject.appendChild(tdSubject);

		trFrom.appendChild(thFrom);
		trFrom.appendChild(tdFrom);

		trDate.appendChild(thDate);
		trDate.appendChild(tdDate);

		tbodyInfo.appendChild(trSubject);
		tbodyInfo.appendChild(trFrom);
		tbodyInfo.appendChild(trDate);

		document.getElementById("messageP").innerText=trEmail.children[3].innerText;
	}

	function getEmails()
	{
		emails=JSON.parse('{"emails":[{"read":"true","subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok. fuk da cops"},{"read":"false","subject":"subject2","from":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"},{"read":"false","subject":"subject3","from":"Big Smoke3","date":"2017-01-01 12:12","message":"lul u. wont betray. eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer"},{"read":"true","subject":"subject4","from":"Big Smoke4","date":"2014-01-01 12:12","message":"fo da hood"},{"read":"false","subject":"subject5","from":"Big Smoke5","date":"2015-01-01 12:12","message":"need some numba 9s"}]}').emails;
	}

	function getDrafts()
	{
		drafts=JSON.parse('{"drafts":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok draft. fuk da cops"},{"subject":"subject2","to":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"}]}').drafts;
	}

	function getSent()
	{
		sent=JSON.parse('{"sent":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok sent. fuk da cops"}]}').sent;
	}

	function deleteCurrentlySelectedMail()
	{
		if(currentlySelectedMail!==null)
		{
			let tbodyEmail=document.getElementById("tbodyEmail");
			document.getElementById("tbodyTableEmailInfo").innerHTML="";
			document.getElementById("messageP").innerText="";

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

	function sendDeleteRequest(subject,fromTo,date,message)
	{

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

	function sendReadEmail(email)
	{

	}
}