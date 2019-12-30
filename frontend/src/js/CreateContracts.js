import React,{useState,useEffect} from 'react'
import commons from '../css/commons.module.css'
import contracts from '../css/create_contracts.module.css'

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
		getSemesters();
    }, []); 

	return (
        <div className={commons.container}>
            <h1 className={contracts.title}>Creare contract de studiu</h1>

			<div id={contracts.semestersTables}>
	       		<div id={contracts.disciplinesSem1} className={contracts.disciplinesDetails}>
	       			<h2>Discipline semestrul 1</h2>

	       			<table id="tableSem1" className={`${commons.table} ${contracts.table}`}>
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

	       		<div id={contracts.disciplinesSem2} className={contracts.disciplinesDetails}>
	       			<h2>Discipline semestrul 2</h2>

	       			<table id="tableSem2" className={`${commons.table} ${contracts.table}`}>
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

	        <button id={contracts.createContractButton} className={commons.button} onClick={sendContract} type="button">Creare contract</button>
        </div>
    );

    function fillSemester1Table()
    {
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

            if(occupiedPlaces===totalPlaces || type==="obligatorie")
            {
            	checkbox.disabled=true;
			}
			
			if(type==="obligatorie")
			{
				checkbox.checked=true;
				currentCreditsSem1+=credits;
			}
			else
			{
				checkbox.addEventListener("change", function(){modifyTotalCreditsSem1(checkbox)});
			}

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

            if(occupiedPlaces===totalPlaces || type==="obligatorie")
            {
            	checkbox.disabled=true;
			}
			
			if(type==="obligatorie")
			{
				checkbox.checked=true;
				currentCreditsSem2+=credits;
			}
			else
			{
				checkbox.addEventListener("change", function(){modifyTotalCreditsSem2(checkbox)});
			}

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
		
		let placesTd=e.parentNode.parentNode.children[3];
		let text=placesTd.innerText;
		let occupiedPlacesValue=parseInt(text.split("/")[0]);
		let allPlaces=text.split("/")[1];

		if(e.checked)
		{
			occupiedPlacesValue+=1;
		}
		else
		{
			occupiedPlacesValue-=1;
		}

		placesTd.innerText=occupiedPlacesValue+"/"+allPlaces;
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
		
		let placesTd=e.parentNode.parentNode.children[3];
		let text=placesTd.innerText;
		let occupiedPlacesValue=parseInt(text.split("/")[0]);
		let allPlaces=text.split("/")[1];

		if(e.checked)
		{
			occupiedPlacesValue+=1;
		}
		else
		{
			occupiedPlacesValue-=1;
		}

		placesTd.innerText=occupiedPlacesValue+"/"+allPlaces;
    }

    function setNrCreditsSem1()
    {
		document.getElementById("creditsNumberSem1").innerText="Credite: "+currentCreditsSem1.toString()+"/"+maxCreditsSem1;
    }

    function setNrCreditsSem2()
    {
    	document.getElementById("creditsNumberSem2").innerText="Credite: "+currentCreditsSem2.toString()+"/"+maxCreditsSem2;
    }

	function getSemesters()
	{
		fetch('http://localhost:3000/api/student/ani')
        .then(res => res.json())
        .then(res => {
			let firstSemester=res.semestru;
			getSemester1(firstSemester);
			getSemester2(firstSemester+1);
		});
	}

    function getSemester1(semester)
    {
		fetch('http://localhost:3000/api/student/materii/'+semester)
        .then(res => res.json())
        .then(res => {
			semester1=res;
			maxCreditsSem1=30;
			fillSemester1Table();
			setNrCreditsSem1();
		});
    }

    function getSemester2(semester)
    {
		fetch('http://localhost:3000/api/student/materii/'+semester)
        .then(res => res.json())
        .then(res => {
			semester2=res;
			maxCreditsSem2=30;
			fillSemester2Table();
			setNrCreditsSem2();
		});
	}
	
	function sendContract()
	{
		let tableTrSem1=document.getElementById("tableBodySem1").children;
		let tableTrSem2=document.getElementById("tableBodySem2").children;
		let disciplineCodes=[];

		for(let i=0;i<tableTrSem1.length;i++)
		{
			if(tableTrSem1[i].children[6].children[0].checked)
			{
				let code=tableTrSem1[i].children[1].innerText;
				let codeExists=false;

				for(let j=0;j<semester1.length;j++)
				{
					if(semester1[j].code===code)
					{
						codeExists=true;
						break;
					}
				}
				
				if(codeExists)
				{
					disciplineCodes.push(code);
				}
			}
		}

		for(let i=0;i<tableTrSem2.length;i++)
		{
			if(tableTrSem2[i].children[6].children[0].checked)
			{
				let code=tableTrSem1[i].children[1].innerText;
				let codeExists=false;

				for(let j=0;j<semester2.length;j++)
				{
					if(semester2[j].code===code)
					{
						codeExists=true;
						break;
					}
				}

				if(codeExists)
				{
					disciplineCodes.push(tableTrSem2[i][1]);
				}
			}
		}

		let toSendJSON=JSON.stringify(disciplineCodes);

		fetch('http://localhost:3000/api/student/contract/add',{method:'POST',body:toSendJSON});
	}
}