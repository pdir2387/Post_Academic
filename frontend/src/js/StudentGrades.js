import React, {useState} from 'react';

import commons from '../css/commons.module.css'
import gradesCss from '../css/grades.module.css'

// /api/student/note

export default function StudentGrades() {
    let options = ["Mate", "Info", "Romana"];
    let grades = [["Mate", "1/1/1","10","Curs", "-"],["Romana", "1/1/2","5","Laborator", "-"]];
    let filter = ["Curs", "Laborator", "Seminar"];
    
    let [selectedCourse, setSelectedCourse] = useState(options[0]);

    function handleSelectChange(e) {
        setSelectedCourse(e.target.value);

        refillTable(grades, filter);
    }

    return (
        <div className={commons.container}>
            <h1>Note</h1>

            <select id={gradesCss.courseSelect} className={commons.dropDown} onChange={handleSelectChange}>
                {getOptions(options)}
            </select>

            <table className={commons.table}>
                <tr>
                    <th>DATA</th>
                    <th>NOTA</th>
                    <th>C/S/L</th>
                    <th>NOTIȚE</th>
                </tr>
                {getTrs(grades, filter, selectedCourse)}
            </table>
        </div>
    );
}

function getOptions(options){
    let optionList = [];

    for(let option of options){
        optionList.push(
            <option>{option}</option>
        );
    }

    return optionList;
}

function getTrs(grades, filter, selectedCourse){
    let TRList = [];

    for(let grade of grades){
       if(filter.indexOf(grade[3]) !== -1 && grade[0] === selectedCourse)
            TRList.push(
                <tr>{getThs(grade)}</tr>
            );
    }

    return TRList;
}

function getThs(grade){
    let THList = [];

    THList.push(
        <td>{grade[1]}</td>
    );
    THList.push(
        <td>{grade[2]}</td>
    );
    THList.push(
        <td>{grade[3]}</td>
    );
    THList.push(
        <td>{grade[4]}</td>
    );

    return THList;
}

function getThsTitle(){
    let THList = [];

    THList.push(
        <td>DATA</td>
    );
    THList.push(
        <td>NOTA</td>
    );
    THList.push(
        <td>C/S/L</td>
    );
    THList.push(
        <td>NOTIȚE</td>
    );

    return THList;
}

function refillTable(grades, filter){
    let TRs = [];
    let table = document.getElementById("student-grades-table");

    TRs.push(<tr>{getThsTitle()}</tr>)
    TRs.push(<tr>{getTrs(grades, filter)}</tr>);
}