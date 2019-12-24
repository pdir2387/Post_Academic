import React,{useState,useEffect} from 'react'
import '../css/commons.css'
import '../css/email.css'
import ComposeImage from '../img/compose_email.png'

var emails=[];
var drafts=[];
var sent=[];

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
    			<a href="/send_email" id="toComposeEmail"><img id="toComposeEmailImage" src={ComposeImage} alt="Trimite email"/></a>
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

		            	<p id="messageP"></p>
		            </div>
	            </div>
	        </div>
        </div>
    );

	function openInbox()
	{
		deselectCategories();

		let liElem=document.getElementById("inboxLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillEmailTable();
	}

	function openDrafts()
	{
		deselectCategories();

		let liElem=document.getElementById("draftsLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillDraftsTable();
	}

	function openSent()
	{
		deselectCategories();

		let liElem=document.getElementById("sentLi");
		liElem.style.backgroundColor="#e30707";
		liElem.style.color="white";

		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillSentTable();
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
		let tbodyEmail=document.getElementById("tbodyEmail");
		tbodyEmail.innerHTML="";

		document.getElementById("fromToTh").innerText="Expeditor";

		for(let i=0;i<emails.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdSubject=document.createElement("td");
			let tdFrom=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			tdSubject.innerText=emails[i].subject;
			tdFrom.innerText=emails[i].from;
			tdDate.innerText=emails[i].date;
			tdMessage.innerText=emails[i].message;

			tdMessage.style.display="none";

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdFrom);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

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

				fillMessageBox(trEmail,"email");
			});

			tbodyEmail.appendChild(trEmail)
		}
	}

	function fillDraftsTable()
	{
		getDrafts();
		let tbodyEmail=document.getElementById("tbodyEmail");
		tbodyEmail.innerHTML="";

		document.getElementById("fromToTh").innerText="Destinatar";

		for(let i=0;i<drafts.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdSubject=document.createElement("td");
			let tdTo=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			tdSubject.innerText=drafts[i].subject;
			tdTo.innerText=drafts[i].to;
			tdDate.innerText=drafts[i].date;
			tdMessage.innerText=drafts[i].message;

			tdMessage.style.display="none";

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

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
			});

			tbodyEmail.appendChild(trEmail)
		}
	}

	function fillSentTable()
	{
		getSent();
		let tbodyEmail=document.getElementById("tbodyEmail");
		tbodyEmail.innerHTML="";

		document.getElementById("fromToTh").innerText="Destinatar";

		for(let i=0;i<sent.length;i++)
		{
			let trEmail=document.createElement("tr");
			let tdSubject=document.createElement("td");
			let tdTo=document.createElement("td");
			let tdDate=document.createElement("td");
			let tdMessage=document.createElement("td");

			tdSubject.innerText=sent[i].subject;
			tdTo.innerText=sent[i].to;
			tdDate.innerText=sent[i].date;
			tdMessage.innerText=sent[i].message;

			tdMessage.style.display="none";

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);
			trEmail.appendChild(tdMessage);

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

				fillMessageBox(trEmail,"sent");
			});

			tbodyEmail.appendChild(trEmail)
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
		emails=JSON.parse('{"emails":[{"subject":"subject1","from":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok. fuk da cops"},{"subject":"subject2","from":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"},{"subject":"subject3","from":"Big Smoke3","date":"2017-01-01 12:12","message":"lul u. wont betray. eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer"},{"subject":"subject4","from":"Big Smoke4","date":"2014-01-01 12:12","message":"fo da hood"},{"subject":"subject5","from":"Big Smoke5","date":"2015-01-01 12:12","message":"need some numba 9s"}]}').emails;
	}

	function getDrafts()
	{
		drafts=JSON.parse('{"drafts":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok draft. fuk da cops"},{"subject":"subject2","to":"Big Smoke2","date":"2018-01-01 11:12","message":"luv drugz"}]}').drafts;
	}

	function getSent()
	{
		sent=JSON.parse('{"sent":[{"subject":"subject1","to":"Big Smoke","date":"2019-01-01 12:12","message":"lul got big smok sent. fuk da cops"}]}').sent;
	}
}