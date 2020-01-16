import React,{useState, useEffect} from 'react'

import commons from '../css/commons.module.css'
import attendances from '../css/attendances.module.css'

export default function AttendanceTableProfessor() 
{
	let [nrWeeks,setNrWeeks]=useState(14);
	let [students,setStudents]=useState([]);
	let [disciplinesItems,setDisciplinesItems]=useState([<option disabled selected value="nothing"> --- alege materia --- </option>]);
	let [categoryItems,setCategoryItems]=useState([<option disabled selected value="nothing"> --- alege categoria --- </option>]);
	let [groupItems,setGroupItems]=useState([<option selected value="nothing"> --- alege grupa --- </option>]);
	let [groups,setGroups]=useState([]);

	useEffect(() => 
	{
		getSelectOptionsDiscipline();
    }, []); 

	function disciplineDropDownOptionsChanged()
	{
		let discipline=document.getElementById("disciplineDropDown").value;
		getInfo(discipline);
	}

	function categoryDropDownOptionsChanged()
	{
		fillTable();
	}

	function groupNumberDropDownOptionsChanged()
	{
		fillTable();
	}

    return (
        <div className={commons.container}>
            <h1 className={attendances.title}>Prezențe</h1>

			<div id={attendances.dropDownContainer}>
	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="disciplineDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={disciplineDropDownOptionsChanged}>
	                    {disciplinesItems}
	                </select>
	            </fieldset>

	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="categoryDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={categoryDropDownOptionsChanged}>
	                    {categoryItems}
	                </select>
	            </fieldset>

	            <fieldset className={`${commons.fieldset} ${attendances.fieldset}`}>
	                <select id="groupNumberDropDown" className={`${commons.dropDown} ${attendances.dropDown}`} onChange={groupNumberDropDownOptionsChanged}>
	                    {groupItems}
	                </select>
	            </fieldset>
            </div>
			
			<div id={attendances.containerAttendancesProfessor}>
	            <table id="tableAttendances" className={commons.table}>
	            	<thead id={attendances.theadAttendances}>
		                <tr id="headers">
		                    {getHeader(nrWeeks)}
		                </tr>
		            </thead>

		            <tbody id="tbody">

		            </tbody>
	            </table>
            </div>
        </div>
    );

    function fillTable()
    {
    	let discipline=document.getElementById("disciplineDropDown").value;
    	let category=document.getElementById("categoryDropDown").value;
    	let groupNumber=document.getElementById("groupNumberDropDown").value;
    	
    	if(discipline!=="nothing" && category!=="nothing")
    	{
			fillRows(category,groupNumber);
		}
    }

    async function fillRows(category,groupNumber)
	{
		fillRowsWithStudentsOfGroup(category,groupNumber);
	}

	function fillRowsWithStudentsOfGroup(category,groupNumber)
	{
		let tableBody=document.getElementById("tbody");
		tableBody.innerHTML="";

		console.log(students.length);

		for(let i=0;i<students.length;i++)
		{
			if(groupNumber==="nothing" || students[i].grupa===groupNumber)
			{
				let trStudent=document.createElement("tr");
				let thNameStudent=document.createElement("th");
				thNameStudent.innerHTML=students[i].nume;
				thNameStudent.classList.add(attendances.stickyColumn);
				trStudent.appendChild(thNameStudent);

				for(let j=0;j<nrWeeks;j++)
				{
					let tdAttendance=document.createElement("td");
					tdAttendance.classList.add(attendances.tdAttendance);

					if(category==="curs")
					{
						tdAttendance.innerHTML=students[i].prezente.curs[j]===true? "x" : "";
					}
					else
					{
						if(category==="seminar")
						{
							tdAttendance.innerHTML=students[i].prezente.seminar[j]===true? "x" : "";
						}
						else
						{
							if(category==="laborator")
							{
								tdAttendance.innerHTML=students[i].prezente.laborator[j]===true? "x" : "";
							}
						}
					}
					
					tdAttendance.addEventListener("click", function(){markAttendance(tdAttendance,students[i].cod)});
					trStudent.appendChild(tdAttendance);
				}

				tableBody.appendChild(trStudent);
			}
		}
	}

	function markAttendance(e,studentCode)
	{
		let discipline=document.getElementById("disciplineDropDown").value;
    	let category=document.getElementById("categoryDropDown").value;
		let attendance=false;
		let arr=e.parentNode.children;
		let week=-1;

		for(let i=0;i<arr.length;i++)
		{
			if(arr[i]===e)
			{
				week=i;
				break;
			}
		}

		if(week!==-1)
		{
			if(e.innerText==="x")
			{
				e.innerText="";
			}
			else
			{
				e.innerText="x";
				attendance=true;
			}

			sendAttendanceData(discipline,category,studentCode,attendance,week);
		}
	}

	function sendAttendanceData(discipline,category,studentCode,attendance,week)
	{
		fetch('http://localhost:3000/api/profesor/prezente/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				cod_disciplina:discipline,
				categorie:category,
				cod_student:studentCode,
				prezent:attendance,
				saptamana:week
			})
		});
	}

    function getInfo(discipline)
	{
		fetch('http://localhost:3000/api/profesor/tipuriOra/'+discipline)
		.then((res)=>res.json())
		.then((res)=>{
			setSelectOptionsCategory(res);

			fetch('http://localhost:3000/api/profesor/studenti/'+discipline)
			.then((response)=>response.json())
			.then((response)=>{
				setSelectOptionsGroupNumber(response);
				setStudents(response);
			});
		})
    }

    function getSelectOptionsDiscipline()
	{
		let options=[];
     
	     options.push(
	        <option disabled selected value="nothing"> --- alege materia --- </option>
		 )
		 
		 fetch('http://localhost:3000/api/profesor/materii')
		 .then(res => res.json())
		 .then(res => {
			 for(let i=0;i<res.length;i++)
			 {
				 let item=res[i];
				 let itemDropDown=<option value={item.cod}>{item.nume}</option>;
				 options.push(itemDropDown);
			 }

			 setDisciplinesItems(options)
		 });
	}

	function setSelectOptionsCategory(array)
	{
		let options=[];
     
	    options.push(
	       <option disabled selected value="nothing"> --- alege categoria --- </option>
	    )
		
		for(let i=0;i<array.length;i++)
		{
			let item=<option value={array[i]}>{array[i]}</option>
			options.push(item);
		}

	    setCategoryItems(options);
	}

	function setSelectOptionsGroupNumber(array)
	{
		let options=[];
     
	     options.push(
	        <option selected value="nothing"> --- alege grupa --- </option>
	     )

		 for(let i=0;i<array.length;i++)
		 {
			 let groupNr=array[i].grupa;

			 if(!groups.includes(groupNr))
			 {
				groups.push(groupNr);
				options.push(<option value={groupNr}>{groupNr}</option>)
			 }
		 }

		 for(let i=1;i<options.length-1;i++)
		 {
			 for(let j=i+1;j<options.length;j++)
			 {
				 if(options[i].value>options[j].value)
				 {
					let aux=options[i];
					options[i]=options[j];
					options[j]=aux;
				 }
			 }
		 }

		 setGroupItems(options);
	}

	function getHeader()
	{
		let headers=[];

	    headers.push(<th className={attendances.stickyColumn}>&nbsp;</th>);

	    for(let i=1;i<=nrWeeks;i++)
	    {
	        headers.push(
	            <th>Săptămâna {i}</th>
	        );
	    }

	    return headers;
	}
}