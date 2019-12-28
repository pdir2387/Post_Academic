import React, {useState, useEffect} from 'react'
import '../css/commons.css'
import '../css/results.css'

export default function Results() 
{
	let [sortingOptions,setSortingOptions]=useState([]);
	let [filteringOptions,setFilteringOptions]=useState([]);
	let [results,setResults]=useState(()=>getResults());

	useEffect(() => 
	{
        fillTable(results);
    }, []);

	return (
        <div className="container">
            <h1 className="title">Medii</h1>

			<div id="optionsAndTable">
				<div id="sortingAndFilteringOptions">
					<h2 id="sortingH2">Sortează după:</h2>
					<div id="sortingOptions">
						<input type="checkbox" id="yearS" name="yearS" value="0" onChange={(e) => manageSortingOptions("year",e.target)}/> An<br/>
						<input type="checkbox" id="semesterS" name="semesterS" value="0" onChange={(e) => manageSortingOptions("semester",e.target)}/> Semestru<br/>
						<input type="checkbox" id="nameS" name="nameS" value="0" onChange={(e) => manageSortingOptions("name",e.target)}/> Denumire<br/>
						<input type="checkbox" id="gradeS" name="gradeS" value="0" onChange={(e) => manageSortingOptions("grade",e.target)}/> Notă<br/>
						<input type="checkbox" id="dateS" name="dateS" value="0" onChange={(e) => manageSortingOptions("date",e.target)}/> Dată<br/>
					</div>

					<h2 id="filterH2">Vizualizează:</h2>
					<div id="filteringOptions">
						<input type="checkbox" id="semester1F" name="semester1F" value="0" onChange={(e) => manageFilteringOptions("1",e.target)}/> Semestrul 1<br/>
						<input type="checkbox" id="semester2F" name="semester2F" value="0" onChange={(e) => manageFilteringOptions("2",e.target)}/> Semestrul 2<br/>
						<input type="checkbox" id="semester3F" name="semester3F" value="0" onChange={(e) => manageFilteringOptions("3",e.target)}/> Semestrul 3<br/>
						<input type="checkbox" id="semester4F" name="semester4F" value="0" onChange={(e) => manageFilteringOptions("4",e.target)}/> Semestrul 4<br/>
						<input type="checkbox" id="semester5F" name="semester5F" value="0" onChange={(e) => manageFilteringOptions("5",e.target)}/> Semestrul 5<br/>
						<input type="checkbox" id="semester6F" name="semester6F" value="0" onChange={(e) => manageFilteringOptions("6",e.target)}/> Semestrul 6<br/>
						<input type="checkbox" id="semester7F" name="semester7F" value="0" onChange={(e) => manageFilteringOptions("7",e.target)}/> Semestrul 7<br/>
						<input type="checkbox" id="semester8F" name="semester8F" value="0" onChange={(e) => manageFilteringOptions("8",e.target)}/> Semestrul 8<br/>
						<input type="checkbox" id="semester9F" name="semester9F" value="0" onChange={(e) => manageFilteringOptions("9",e.target)}/> Semestrul 9<br/>
						<input type="checkbox" id="semester10F" name="semester10F" value="0" onChange={(e) => manageFilteringOptions("10",e.target)}/> Semestrul 10<br/>
					</div>
				</div>

	            <table id="tableResults" className="table">
	            	<thead id="theadResults">
	            		<tr>
	            			<th>An studiu</th>
	            			<th>Semestru plan</th>
	            			<th>Cod discuplină</th>
	            			<th>Disciplină</th>
	            			<th>Notă</th>
	            			<th>Număr credite</th>
	            			<th>Data promovării</th>
	            		</tr>
		            </thead>

		            <tbody id="tbodyResults">
		            </tbody>
	            </table>
            </div>
        </div>
    );

    function manageSortingOptions(type,checkbox)
    {
    	if(checkbox.checked)
    	{
    		sortingOptions.push(type);
    	}
    	else
    	{
			sortingOptions.splice( sortingOptions.indexOf(type), 1 );
    	}

    	filterAndSort();
    }

    function manageFilteringOptions(semester,checkbox)
    {
    	if(checkbox.checked)
    	{
			filteringOptions.push(semester);
		}
		else
		{
			filteringOptions.splice( filteringOptions.indexOf(semester), 1 );
		}

		filterAndSort();
    }

    function filterAndSort()
    {
    	if(filteringOptions.length==0 && sortingOptions.length==0)
    	{
			fillTable(results);
			return;
    	}

    	let filtered=filter(results);
    	let sorted=sort(filtered);

    	fillTable(sorted);
    }

    function fillTable(elements)
    {
    	let resultsBody=document.getElementById("tbodyResults");
    	resultsBody.innerHTML="";

		for(let i=0;i<elements.length;i++)
		{
			let trResult=document.createElement("tr");
			let tdYear=document.createElement("td");
			let tdSemester=document.createElement("td");
			let tdCode=document.createElement("td");
			let tdName=document.createElement("td");
			let tdGrade=document.createElement("td");
			let tdCredits=document.createElement("td");
			let tdDate=document.createElement("td");

			tdYear.innerText=elements[i].year;
			tdSemester.innerText=elements[i].semester;
			tdCode.innerText=elements[i].code;
			tdName.innerText=elements[i].name;
			tdGrade.innerText=elements[i].grade;
			tdCredits.innerText=elements[i].credits;
			tdDate.innerText=elements[i].date;

			trResult.appendChild(tdYear);
			trResult.appendChild(tdSemester);
			trResult.appendChild(tdCode);
			trResult.appendChild(tdName);
			trResult.appendChild(tdGrade);
			trResult.appendChild(tdCredits);
			trResult.appendChild(tdDate);

			resultsBody.appendChild(trResult);
		}
    }

    function sort(toSort)
    {
		if(sortingOptions.length===0)
		{
			return toSort.slice();
		}

		let primarySortingCriteria=sortingOptions[0];

		for(let i=0;i<toSort.length-1;i++)
		{
			for(let j=i+1;j<toSort.length;j++)
			{
				if(compareByCriteria(primarySortingCriteria,toSort[i][primarySortingCriteria],toSort[j][primarySortingCriteria])===1)
				{
					let aux=toSort[i];
					toSort[i]=toSort[j];
					toSort[j]=aux
				}
				else
				{
					if(compareByCriteria(primarySortingCriteria,toSort[i][primarySortingCriteria],toSort[j][primarySortingCriteria])===0)
					{
						let currentSortingCriteriaIndex=0;
						let newSortingCriteria=primarySortingCriteria;

						while(compareByCriteria(newSortingCriteria,toSort[i][newSortingCriteria],toSort[j][newSortingCriteria])===0)
						{
							if(currentSortingCriteriaIndex>=sortingOptions.length)
							{
								break;
							}

							newSortingCriteria=sortingOptions[currentSortingCriteriaIndex];
							currentSortingCriteriaIndex+=1;
						}

						if(compareByCriteria(newSortingCriteria,toSort[i][newSortingCriteria],toSort[j][newSortingCriteria])===1)
						{
							let aux=toSort[i];
							toSort[i]=toSort[j];
							toSort[j]=aux
						}
					}
				}
			}
		}

		return toSort;
    }

    function compareByCriteria(criteria,value1,value2)
    {
    	let compared=0;

    	if(criteria==="name" || criteria==="year")
		{
			compared=value1.localeCompare(value2);
		}
		else
		{
			if(criteria==="semester" || criteria==="grade")
			{
				let grade1=parseInt(value1);
				let grade2=parseInt(value2);

				if(grade1>grade2)
				{
					compared=1;
				}
				else
				{
					if(grade1<grade2)
					{
						compared=-1;
					}
					else
					{
						compared=0;
					}
				}
			}
			else
			{
				if(criteria==="date")
				{
					let date1=new Date(value1.split(".")[2]+"-"+value1.split(".")[1]+"-"+value1.split(".")[0]);
					let date2=new Date(value2.split(".")[2]+"-"+value2.split(".")[1]+"-"+value2.split(".")[0]);

					if(date1.getTime()>date2.getTime())
					{
						compared=1;
					}
					else
					{
						if(date1.getTime()<date2.getTime())
						{
							compared=-1;
						}
						else
						{
							compared=0;
						}
					}
				}
			}
		}

		return compared;
    }

    function filter(toFilter)
    {
    	if(filteringOptions.length===0)
		{
			return toFilter.slice();
		}

		let filtered=[];

    	for(let i=0;i<toFilter.length;i++)
    	{
			if(filteringOptions.includes(toFilter[i].semester))
			{
				filtered.push(toFilter[i]);
			}
    	}

    	return filtered;
    }

    function getResults()
    {
    	return JSON.parse('{"results":[{"year":"2017/2018","semester":"1","code":"M123","name":"Fundamentele programarii","grade":"6","credits":"6","date":"17.01.2018"},{"year":"2017/2018","semester":"1","code":"M124","name":"Tundamentele programarii","grade":"10","credits":"5","date":"19.05.2018"},{"year":"2018/2019","semester":"3","code":"M126","name":"Fundamentele programarii3","grade":"6","credits":"6","date":"06.04.2018"},{"year":"2018/2019","semester":"4","code":"M127","name":"Fundamentele programarii2","grade":"8","credits":"6","date":"17.01.2018"},{"year":"2019/2020","semester":"6","code":"M153","name":"Fundamentela programarii","grade":"5","credits":"6","date":"06.04.2018"},{"year":"2019/2020","semester":"6","code":"M113","name":"Fundaaentele programarii","grade":"5","credits":"6","date":"01.01.2019"},{"year":"2020/2021","semester":"7","code":"M223","name":"FFundamentele programarii","grade":"9","credits":"6","date":"17.01.2017"},{"year":"2021/2022","semester":"8","code":"M183","name":"Fundamentele programarii4","grade":"10","credits":"6","date":"17.01.2018"}]}').results;
    }
}