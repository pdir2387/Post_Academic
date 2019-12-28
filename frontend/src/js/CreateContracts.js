import React,{useState,useEffect} from 'react'
import '../css/commons.css'
import '../css/create_contracts.css'

export default function CreateContracts()
{
	let [semester1,setSemester1]=useState([]);
	let [semester2,setSemester2]=useState([]);
	let [maxCreditsSem1,setMaxCreditsSem1]=useState(0);
	let [maxCreditsSem2,setMaxCreditsSem2]=useState(0);
	let [currentCreditsSem1,setCurrentCreditsSem1]=useState(0);
	let [currentCreditsSem2,setCurrentCreditsSem2]=useState(0);

	useEffect(() => 
	{
        fillSemester1Table();
        fillSemester2Table();
        setNrCreditsSem1();
        setNrCreditsSem2();
    }, []); 

	return (
        <div className="container">
            <h1 className="title">Creare contract de studiu</h1>

			<div id="semestersTables">
	       		<div id="disciplinesSem1" className="disciplinesDetails">
	       			<h2>Discipline semestrul 1</h2>

	       			<table id="tableSem1" className="table">
	       				<thead>
	       					<tr>
	       						<th>Nr. Crt.</th>
	       						<th>Cod disciplina</th>
	       						<th>Materie</th>
	       						<th>Nr. locuri</th>
	       						<th>Nr. credite</th>
	       						<th>Tip materie</th>
	       						<th>Aleasa</th>
	       					</tr>
	       				</thead>
	       				<tbody id="tableBodySem1"></tbody>
	       			</table>

	       			<h2 id="creditsNumberSem1"></h2>
	       		</div>

	       		<div id="disciplinesSem2" className="disciplinesDetails">
	       			<h2>Discipline semestrul 2</h2>

	       			<table id="tableSem2" className="table">
	       				<thead>
	       					<tr>
	       						<th>Nr. Crt.</th>
	       						<th>Cod disciplina</th>
	       						<th>Materie</th>
	       						<th>Nr. locuri</th>
	       						<th>Nr. credite</th>
	       						<th>Tip materie</th>
	       						<th>Aleasa</th>
	       					</tr>
	       				</thead>
	       				<tbody id="tableBodySem2"></tbody>
	       			</table>

	       			<h2 id="creditsNumberSem2"></h2>
	       		</div>
	        </div>

	        <button id="createContractButton" type="button">Creare contract</button>

	        <div id="legend">
	        	1. Obligatorie<br/>
	        	2. Opțională<br/>
	        	3. Facultativă<br/>
	        </div>
        </div>
    );

    function fillSemester1Table()
    {
		getSemester1();
		let tableBody=document.getElementById("tableBodySem1");
		tableBody.innerHTML="";

		for(let i=0;i<semester1.length;i++)
		{
			let nrCrt=i+1;
			let code=semester1[i].code;
			let name=semester1[i].name;
			let occupiedPlaces=semester1[i].occupiedPlaces;
			let totalPlaces=semester1[i].totalPlaces;
			let type=semester1[i].type;
			let credits=semester1[i].credits;

			let trTable=document.createElement("tr");
			let tdNrCrt=document.createElement("td");
			let tdCode=document.createElement("td");
			let tdName=document.createElement("td");
			let tdPlaces=document.createElement("td");
			let tdCredits=document.createElement("td");
			let tdType=document.createElement("td");
			let tdChosen=document.createElement("td");

			let checkbox=document.createElement('input'); 
            checkbox.type="checkbox"; 
            checkbox.name="chosen";
            checkbox.class="chosenCheckbox";

            if(occupiedPlaces===totalPlaces)
            {
            	checkbox.disabled=true;
            }

			checkbox.addEventListener("change", function(){modifyTotalCreditsSem1(checkbox)});

			tdNrCrt.innerText=nrCrt.toString();
			tdCode.innerText=code;
			tdName.innerText=name;
			tdPlaces.innerText=occupiedPlaces+"/"+totalPlaces;
			tdType.innerText=type;
			tdCredits.innerText=credits;
			tdChosen.appendChild(checkbox);

			trTable.appendChild(tdNrCrt);
			trTable.appendChild(tdCode);
			trTable.appendChild(tdName);
			trTable.appendChild(tdPlaces);
			trTable.appendChild(tdCredits);
			trTable.appendChild(tdType);
			trTable.appendChild(tdChosen);

			tableBody.appendChild(trTable);
		}
    }

    function fillSemester2Table()
    {
		getSemester2();
		let tableBody=document.getElementById("tableBodySem2");
		tableBody.innerHTML="";

		for(let i=0;i<semester2.length;i++)
		{
			let nrCrt=i+1;
			let code=semester2[i].code;
			let name=semester2[i].name;
			let occupiedPlaces=semester2[i].occupiedPlaces;
			let totalPlaces=semester2[i].totalPlaces;
			let type=semester2[i].type;
			let credits=semester2[i].credits;

			let trTable=document.createElement("tr");
			let tdNrCrt=document.createElement("td");
			let tdCode=document.createElement("td");
			let tdName=document.createElement("td");
			let tdPlaces=document.createElement("td");
			let tdCredits=document.createElement("td");
			let tdType=document.createElement("td");
			let tdChosen=document.createElement("td");

			let checkbox=document.createElement('input'); 
            checkbox.type="checkbox"; 
            checkbox.name="chosen";
            checkbox.class="chosenCheckbox";

            if(occupiedPlaces===totalPlaces)
            {
            	checkbox.disabled=true;
            }

            checkbox.addEventListener("change", function(){modifyTotalCreditsSem2(checkbox)});

			tdNrCrt.innerText=nrCrt.toString();
			tdCode.innerText=code;
			tdName.innerText=name;
			tdPlaces.innerText=occupiedPlaces+"/"+totalPlaces;
			tdType.innerText=type;
			tdCredits.innerText=credits;
			tdChosen.appendChild(checkbox);

			trTable.appendChild(tdNrCrt);
			trTable.appendChild(tdCode);
			trTable.appendChild(tdName);
			trTable.appendChild(tdPlaces);
			trTable.appendChild(tdCredits);
			trTable.appendChild(tdType);
			trTable.appendChild(tdChosen);

			tableBody.appendChild(trTable);
		}
    }

    function modifyTotalCreditsSem1(e)
    {
    	let credits=parseInt(e.parentElement.parentElement.children[4].innerText);

    	if(e.checked)
    	{
    		currentCreditsSem1+=credits;
    	}
    	else
    	{
    		currentCreditsSem1-=credits;
    	}

    	document.getElementById("creditsNumberSem1").innerText="Credite: "+currentCreditsSem1.toString()+"/"+maxCreditsSem1;
    }

    function modifyTotalCreditsSem2(e)
    {
    	let credits=parseInt(e.parentElement.parentElement.children[4].innerText);

    	if(e.checked)
    	{
    		currentCreditsSem2+=credits;
    	}
    	else
    	{
    		currentCreditsSem2-=credits;
    	}

    	document.getElementById("creditsNumberSem2").innerText="Credite: "+currentCreditsSem2.toString()+"/"+maxCreditsSem2;
    }

    function setNrCreditsSem1()
    {
		document.getElementById("creditsNumberSem1").innerText="Credite: "+currentCreditsSem1.toString()+"/"+maxCreditsSem1;
    }

    function setNrCreditsSem2()
    {
    	document.getElementById("creditsNumberSem2").innerText="Credite: "+currentCreditsSem2.toString()+"/"+maxCreditsSem2;
    }

    function getSemester1()
    {
		semester1=JSON.parse('{"maxCredits":"30","semester":[{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M2774","name":"Fundamentele programarii2","occupiedPlaces":"80","totalPlaces":"80","type":"2","credits":"5"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"}]}').semester;
		maxCreditsSem1=JSON.parse('{"maxCredits":"30","semester":[{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M2774","name":"Fundamentele programarii2","occupiedPlaces":"80","totalPlaces":"80","type":"2","credits":"5"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"}]}').maxCredits;
    }

    function getSemester2()
    {
    	semester2=JSON.parse('{"maxCredits":"30","semester":[{"code":"M2434","name":"Fundamentele programarii11","occupiedPlaces":"80","totalPlaces":"80","type":"1","credits":"6"},{"code":"M277f4","name":"Fundamentele programarii12","occupiedPlaces":"52","totalPlaces":"80","type":"2","credits":"5"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"}]}').semester;
    	maxCreditsSem2=JSON.parse('{"maxCredits":"30","semester":[{"code":"M2434","name":"Fundamentele programarii11","occupiedPlaces":"80","totalPlaces":"80","type":"1","credits":"6"},{"code":"M277f4","name":"Fundamentele programarii12","occupiedPlaces":"52","totalPlaces":"80","type":"2","credits":"5"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"},{"code":"M234","name":"Fundamentele programarii","occupiedPlaces":"12","totalPlaces":"80","type":"1","credits":"6"}]}').maxCredits;
    }
}