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
	            		<li><a id="inboxA" onClick={openInbox}>Mesaje primite</a></li>
	            		<li><a id="draftsA" onClick={openDrafts}>Schițe</a></li>
	            		<li><a id="sentA" onClick={openSent}>Mesaje trimise</a></li>
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
		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillEmailTable();
	}

	function openDrafts()
	{
		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillDraftsTable();
	}

	function openSent()
	{
		document.getElementById("tbodyTableEmailInfo").innerHTML="";
		document.getElementById("messageP").innerText="";
		fillSentTable();
	}

	function setup()
	{
		let categoriesLi=document.getElementById("ulCategories").children;

		categoriesLi[0].style.backgroundColor="#e30707";
		categoriesLi[0].style.color="white";

		for(let i=0;i<categoriesLi.length;i++)
		{
			categoriesLi[i].addEventListener("click",function()
			{
				for(let j=0;j<categoriesLi.length;j++)
				{
					categoriesLi[j].style.backgroundColor="white";
					categoriesLi[j].style.color="black";
				}

				this.style.backgroundColor="#e30707";
				this.style.color="white";
			});
		}
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

			tdSubject.innerText=emails[i].subject;
			tdFrom.innerText=emails[i].from;
			tdDate.innerText=emails[i].date;

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdFrom);
			trEmail.appendChild(tdDate);

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

				fillMessageBox(i,"email");
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

			tdSubject.innerText=drafts[i].subject;
			tdTo.innerText=drafts[i].to;
			tdDate.innerText=drafts[i].date;

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);

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

				fillMessageBox(i,"draft");
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

			tdSubject.innerText=sent[i].subject;
			tdTo.innerText=sent[i].to;
			tdDate.innerText=sent[i].date;

			trEmail.appendChild(tdSubject);
			trEmail.appendChild(tdTo);
			trEmail.appendChild(tdDate);

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

				fillMessageBox(i,"sent");
			});

			tbodyEmail.appendChild(trEmail)
		}
	}

	function fillMessageBox(emailNumber,source)
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

		tdSubject.innerText=emails[emailNumber].subject;
		tdFrom.innerText=emails[emailNumber].from;
		tdDate.innerText=emails[emailNumber].date;

		trSubject.appendChild(thSubject);
		trSubject.appendChild(tdSubject);

		trFrom.appendChild(thFrom);
		trFrom.appendChild(tdFrom);

		trDate.appendChild(thDate);
		trDate.appendChild(tdDate);

		tbodyInfo.appendChild(trSubject);
		tbodyInfo.appendChild(trFrom);
		tbodyInfo.appendChild(trDate);

		let message="";

		if(source==="email")
		{
			message=emails[emailNumber].message;
		}
		else
		{
			if(source==="draft")
			{
				message=drafts[emailNumber].message;
			}
			else
			{
				if(source==="sent")
				{
					message=sent[emailNumber].message;
				}
			}
		}

		document.getElementById("messageP").innerText=message;
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