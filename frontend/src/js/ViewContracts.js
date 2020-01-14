import React,{useState,useEffect} from 'react'

import commons from '../css/commons.module.css'
import contracts from '../css/contracts.module.css'

export default function ViewContracts()
{
	useEffect(() => 
	{
        getSemesters();
    }, []); 

	return (
        <div className={commons.container}>
            <h1 className="title">Contracte de studii</h1>

			<div id={contracts.content}>
	       		<div id={contracts.semesters}>
	       			<select name="user" id={contracts.semestersSelect} size="10">

				  	</select>
	       		</div>

	            <table id={contracts.tableDisciplines} className={commons.table}>
	                <thead>
	                    <tr id="headers">
	                   		<th>Nr. Crt.</th>
	                   		<th>Cod disciplină</th>
	                   		<th>Materie</th>
	                   		<th>Promovată</th>
	                    </tr>
	                </thead>

	                <tbody id="bodyTable">
	                </tbody>
	            </table>
	        </div>

	        <button id={contracts.generateButton} className={commons.button} onClick={downloadContract} type="button">Generare contract</button>
        </div>
    );

    function loadSemesters(startYear,endYear)
    {	
		let semNr=1;

		for(let i=startYear;i<endYear;i++)
		{
			let text="Sem: "+semNr+" An: "+i;
			let option=document.createElement("option");
			option.innerText=text;
			option.addEventListener("click", function(){getDisciplines(option.innerText.split(" ")[1])});
			document.getElementById(contracts.semestersSelect).appendChild(option);
			semNr++;

			let text2="Sem: "+semNr+" An: "+i;
			let option2=document.createElement("option");
			option2.innerText=text2;
			option2.addEventListener("click", function(){getDisciplines(option2.innerText.split(" ")[1])});
			document.getElementById(contracts.semestersSelect).appendChild(option2);
			semNr++;
		}
    }

    function loadDisciplinesIntoTable(disciplines)
    {
		let bodyTable=document.getElementById("bodyTable");
    	bodyTable.innerHTML="";
		
		for(let i=0;i<disciplines.length;i++)
			{
				let nrCrt=i+1;
				let passed=disciplines[i].promovat;
				let code=disciplines[i].code;
				let name=disciplines[i].name;

				let trTable=document.createElement("tr");
				let tdNrCrt=document.createElement("td");
				let tdPassed=document.createElement("td");
				let tdCode=document.createElement("td");
				let tdName=document.createElement("td");

				tdNrCrt.innerText=nrCrt.toString();
				tdPassed.innerText=passed;
				tdCode.innerText=code;
				tdName.innerText=name;

				trTable.appendChild(tdNrCrt);
				trTable.appendChild(tdCode);
				trTable.appendChild(tdName);
				trTable.appendChild(tdPassed);

				bodyTable.appendChild(trTable);
			}
	}

	function saveFileToDisk(file,fileName)
	{
		if (window.navigator.msSaveOrOpenBlob)
		{ // IE10+
			window.navigator.msSaveOrOpenBlob(file, fileName);
		}
		else 
		{ // Others
			var a = document.createElement("a"),
					url = URL.createObjectURL(file);
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);  
			}, 0); 
		}
	}

	function dataURLtoFile(bytes, type, fileName) 
	{
		let bstr = atob(bytes);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
            
		while(n--)
		{
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, {type:type});
    }
	
	function downloadContract()
	{
		fetch('http://localhost:3000/api/student/contract/')
		.then((res)=>res.json())
		.then((res)=>{
			console.log(res);
			let type="application/pdf";
			let name="Contract.pdf";
			let file=dataURLtoFile(res.bytes,type,name);
			saveFileToDisk(file,name);
		});
	}

    function getSemesters()
    {
		fetch('http://localhost:3000/api/student/ani')
        .then(res => res.json())
        .then(res => {
            loadSemesters(res.inceput,res.inceput+res.durata);
		});
	}
	
	function getDisciplines(semester)
	{
		console.log(semester);
		fetch('http://localhost:3000/api/student/materii/'+semester)
        .then(res => res.json())
        .then(res => {
            loadDisciplinesIntoTable(res);
		});
	}
}