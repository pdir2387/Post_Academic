import React,{useState} from 'react'
import '../css/commons.css'
import '../css/attendances.css'

var courseAttendances=[];
var seminarAttendances=[];
var labAttendances=[];

export default function AttendanceTable() 
{
    let [nrWeeks,setNrWeeks]=useState(14);

    function disciplineChanged(e)
    {
        fillTable(e.target.value);
    }

    return (
        <div className="container">
            <h1 className="title">Prezențe</h1>

            <fieldset>
                <select id="disciplineDropDown" className="dropDown" onChange={disciplineChanged}>
                    {getSelectOptions()}
                </select>
            </fieldset>

            <table id="tableAttendances" className="table">
                <thead>
                    <tr id="headers">
                        {getHeader(nrWeeks)}
                    </tr>
                </thead>

                <tbody>
                    <tr id="courseRow"></tr>
                    <tr id="seminarRow"></tr>
                    <tr id="labRow"></tr>
                </tbody>
            </table>

            <div id="infoAttendances">
                <h2 id="attendancesCourse"></h2>
                <h2 id="attendancesSeminar"></h2>
                <h2 id="attendancesLab"></h2>
            </div>
        </div>
    );
}

function getHeader(nrWeeks)
{
    let headers=[];

    headers.push(<th>&nbsp;</th>);

    for(let i=1;i<=nrWeeks;i++)
    {
        headers.push(
            <th>Săptămâna {i}</th>
        );
    }

    return headers;
}

function getSelectOptions()
{
    let options=[];
     
     options.push(
        <option disabled selected value> --- alege materia --- </option>
     )

     options.push(
        <option value="FP">FP</option>
     )

     options.push(
        <option value="OOP">OOP</option>
     )

     return options;
}

function fillTable(discipline)
{
    getAttendances(discipline);
    setCourseAttendances();
    setSeminarsAttendances();
    setLabsAttendances();
    setAttendancesNumbersCourse();
    setAttendancesNumbersSeminar();
    setAttendancesNumbersLab()
}

function getAttendances()
{
    let attendances=JSON.parse('{"course":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"seminar":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"laboratory":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"]}');
    courseAttendances=attendances.course;
    seminarAttendances=attendances.seminar;
    labAttendances=attendances.laboratory;
}

function setCourseAttendances()
{
    let courseTr=document.getElementById("courseRow");
    courseTr.innerHTML="";

    let td=document.createElement("td");
    td.innerHTML="Prezente Curs: ";
    courseTr.appendChild(td);

    for(let i=0;i<courseAttendances.length;i++)
    {
        let tdInfo=document.createElement("td");
        tdInfo.innerHTML=courseAttendances[i];
        courseTr.appendChild(tdInfo);
    }
}

function setSeminarsAttendances()
{
    let seminarTr=document.getElementById("seminarRow");
    seminarTr.innerHTML="";

    let td=document.createElement("td");
    td.innerHTML="Prezente seminar: ";
    seminarTr.appendChild(td);

    for(let i=0;i<seminarAttendances.length;i++)
    {
        let tdInfo=document.createElement("td");
        tdInfo.innerHTML=seminarAttendances[i];
        seminarTr.appendChild(tdInfo);
    }
}

function setLabsAttendances()
{
    let labTr=document.getElementById("labRow");
    labTr.innerHTML="";

    let td=document.createElement("td");
    td.innerHTML="Prezente laborator: ";
    labTr.appendChild(td);

    for(let i=0;i<labAttendances.length;i++)
    {
        let tdInfo=document.createElement("td");
        tdInfo.innerHTML=labAttendances[i];
        labTr.appendChild(tdInfo);
    }
}

function setAttendancesNumbersCourse()
{
    let currentAttendances=0;
    let allAttendances=courseAttendances.length;

    for(let i=0;i<courseAttendances.length;i++)
    {
        if(courseAttendances[i]==="x")
        {
            currentAttendances+=1;
        }
    }

    document.getElementById("attendancesCourse").innerHTML="Prezente curs: "+currentAttendances+"/"+allAttendances;
}

function setAttendancesNumbersSeminar()
{
    let currentAttendances=0;
    let allAttendances=seminarAttendances.length;

    for(let i=0;i<seminarAttendances.length;i++)
    {
        if(seminarAttendances[i]==="x")
        {
            currentAttendances+=1;
        }
    }

    document.getElementById("attendancesSeminar").innerHTML="Prezente seminar: "+currentAttendances+"/"+allAttendances;
}

function setAttendancesNumbersLab()
{
    let currentAttendances=0;
    let allAttendances=labAttendances.length;

    for(let i=0;i<labAttendances.length;i++)
    {
        if(labAttendances[i]==="x")
        {
            currentAttendances+=1;
        }
    }

    document.getElementById("attendancesLab").innerHTML="Prezente laborator: "+currentAttendances+"/"+allAttendances;
}