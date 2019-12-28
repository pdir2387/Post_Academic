import React,{useState,useEffect} from 'react'
import '../css/commons.css'
import '../css/contracts.css'

export default function ViewContracts()
{
	let [semesters,setSemesters]=useState(()=>getSemesters());

	useEffect(() => 
	{
        loadSemesters();
    }, []); 

	return (
        <div className="container">
            <h1 className="title">Contracte de studii</h1>

			<div id="content">
	       		<div id="semesters">
	       			Semestrul:<br/>
	       			<select name="user" id="semestersSelect" size="10">

				  	</select>
	       		</div>

	            <table id="tableDisciplines" className="table">
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

	        <button id="generateButton" type="button">Generare contract</button>
        </div>
    );

    function loadSemesters()
    {	
		for(let i=0;i<semesters.length;i++)
		{
			let text="Sem: "+semesters[i].number+" An: "+semesters[i].year;
			let option=document.createElement("option");
			option.innerText=text;
			option.addEventListener("click", function(){loadDisciplinesIntoTable(option)});
			document.getElementById("semestersSelect").appendChild(option);
		}
    }

    function loadDisciplinesIntoTable(e)
    {
    	let semesterNumber=e.innerText.split(" ")[1];
		let bodyTable=document.getElementById("bodyTable");
    	bodyTable.innerHTML="";
		let i=0;

    	for(i=0;i<semesters.length;i++)
    	{
			if(semesters[i].number===semesterNumber)
			{
				break;
			}
    	}
		
		for(let j=0;j<semesters[i].disciplines.length;j++)
			{
				let nrCrt=j+1;
				let passed=semesters[i].disciplines[j].passed;
				let code=semesters[i].disciplines[j].code;
				let name=semesters[i].disciplines[j].name;

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

    function getSemesters()
    {
    	return JSON.parse('{"semesters":[{"number":"1","year":"2017","disciplines":[{"passed":"true","code":"M123","name":"Fundamentele programarii"},{"passed":"true","code":"M124","name":"Logica computationala"},{"passed":"true","code":"M125","name":"Arhitectura sistemelor de calcul"},{"passed":"false","code":"M127","name":"Algebra"},{"passed":"true","code":"M123","name":"Analiza matematica"}]},{"number":"2","year":"2017","disciplines":[{"passed":"true","code":"M123","name":"Programare orientata obiect"},{"passed":"true","code":"M123","name":"Geometrie"},{"passed":"true","code":"M123","name":"Sisteme de operare"},{"passed":"true","code":"M123","name":"Sisteme dinamice"},{"passed":"true","code":"M123","name":"Algoritmica grafelor"}]},{"number":"3","year":"2018","disciplines":[{"passed":"true","code":"M123","name":"Fundamentele programarii3"},{"passed":"true","code":"M123","name":"Logica computationala3"},{"passed":"true","code":"M123","name":"Arhitectura sistemelor de calcul3"},{"passed":"true","code":"M123","name":"Algebra3"},{"passed":"true","code":"M123","name":"Analiza matematica3"}]},{"number":"4","year":"2018","disciplines":[{"passed":"true","code":"M123","name":"Fundamentele programarii4"},{"passed":"true","code":"M123","name":"Logica computationala4"},{"passed":"true","code":"M123","name":"Arhitectura sistemelor de calcul4"},{"passed":"true","code":"M123","name":"Algebra4"},{"passed":"true","code":"M123","name":"Analiza matematica4"}]},{"number":"5","year":"2019","disciplines":[{"passed":"true","code":"M123","name":"Fundamentele programarii5"},{"passed":"true","code":"M123","name":"Logica computationala5"},{"passed":"true","code":"M123","name":"Arhitectura sistemelor de calcul5"},{"passed":"true","code":"M123","name":"Algebra5"},{"passed":"true","code":"M123","name":"Analiza matematica5"}]},{"number":"6","year":"2019","disciplines":[{"passed":"true","code":"M123","name":"Fundamentele programarii6"},{"passed":"true","code":"M123","name":"Logica computationala6"},{"passed":"true","code":"M123","name":"Arhitectura sistemelor de calcul6"},{"passed":"true","code":"M123","name":"Algebra6"},{"passed":"true","code":"M123","name":"Analiza matematica6"}]}]}').semesters;
    }
}