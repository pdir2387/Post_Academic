import React, {useState, useEffect} from 'react'
import '../css/commons.css'
import '../css/attendances.css'

export default function AttendanceTable() 
{
    let [nrWeeks,setNrWeeks]=useState(14);
    let [disciplines,setDisciplines]=useState(()=>getDisciplines());
    let [courseAttendances,setCourseAttendances]=useState([]);
    let [seminarAttendances,setSeminarAttendances]=useState([]);
    let [labAttendances,setLabAttendances]=useState([]);

    useEffect(() => 
    {
        setDisciplinesOptions();
    }, []);

    function disciplineChanged(e)
    {
        fillTable(e.target.value);
    }

    return (
        <div className="container">
            <h1 className="title">Prezențe</h1>

            <fieldset>
                <select id="disciplineDropDown" className="dropDown" onChange={disciplineChanged}>
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

    function setDisciplinesOptions()
    {
        let disciplinesSelect=document.getElementById("disciplineDropDown");

        let firstOption=document.createElement("option");
        firstOption.innerText="---alege materia---";
        firstOption.selected="selected";
        firstOption.disabled="true";
        disciplinesSelect.appendChild(firstOption);

        for(let i=0;i<disciplines.length;i++)
        {
            let option=document.createElement("option");
            option.innerText=disciplines[i].name;
            disciplinesSelect.appendChild(option);
        }
    }

    function fillTable(discipline)
    {
        getAttendances(discipline);
        setCourseAttendancesTable();
        setSeminarsAttendancesTable();
        setLabsAttendancesTable();
        setAttendancesNumbersCourse();
        setAttendancesNumbersSeminar();
        setAttendancesNumbersLab()
    }

    function getAttendances(discipline)
    {
        for(let i=0;i<disciplines.length;i++)
        {
            if(disciplines[i].name===discipline)
            {
                courseAttendances=disciplines[i].course;
                seminarAttendances=disciplines[i].seminar;
                labAttendances=disciplines[i].laboratory;
            }
        }
    }

    function getDisciplines()
    {
        return JSON.parse('{"disciplines":[{"name":"FP","course":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"seminar":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"laboratory":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"]},{"name":"OOP","course":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"seminar":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"],"laboratory":["x","x","x","x","x"," ","x"," "," ","x"," ","x","x","x"]}]}').disciplines;
    }

    function setCourseAttendancesTable()
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

    function setSeminarsAttendancesTable()
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

    function setLabsAttendancesTable()
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
}