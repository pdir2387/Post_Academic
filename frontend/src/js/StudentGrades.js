import React, {useState, useEffect} from 'react';

import commons from '../css/commons.module.css'
import gradesCss from '../css/grades.module.css'

// /api/student/note

export default function StudentGrades() {
    let [options, setOptions] = useState([]);
    let [grades, setGrades] = useState([]);
    //let filter = ["curs", "laborator", "seminar"];
    
    let [selectedCourse, setSelectedCourse] = useState('');
    //let [selectedFilter, setSelectedFilter] = useState('');


    function handleSelectChange(e) {
        setSelectedCourse(options.find((el) => el.name === e.target.value));

        refillTable(grades);
    }

    function getGradesByCourse() {
        console.log(selectedCourse);
        if(selectedCourse !== '')
            fetch('http://localhost:3000/api/student/note/'+selectedCourse.code)
                .then(res => res.json())
                .then(res => setGrades(res));
    }

    function getMaterii(){
        fetch('http://localhost:3000/api/student/materii/')
            .then(res => res.json())
            .then(res => {
                    setOptions(res);
            })
            .catch(() => setOptions([]));
    }

    useEffect(() => {
        getGradesByCourse();
    }, [selectedCourse])

    useEffect(() => {
        getMaterii();
    },[]);

    return (
        <div className={commons.container}>
            <h1>Note</h1>

            <select id={gradesCss.courseSelect} className={commons.dropDown} onChange={handleSelectChange}>
                {getOptions(options)}
            </select>

            <table className={commons.table}>
                <tr>
                    <th>SĂPTĂMÂNĂ</th>
                    <th>NOTA</th>
                    <th>C/S/L</th>
                    <th>NOTIȚE</th>
                </tr>
                {getTrs(grades, selectedCourse.name)}
            </table>
        </div>
    );
}

function getOptions(options){
    let optionList = [];

    optionList.push(
        <option disabled selected="selected">--alege materia--</option>
    );

    for(let option of options){
        optionList.push(
            <option>{option.name}</option>
        );
    }

    return optionList;
}

function getTrs(grades, selectedCourse){
    let TRList = [];

    for(let grade of grades){
       if(grade.materie === selectedCourse)
            TRList.push(
                <tr>{getThs(grade)}</tr>
            );
    }

    return TRList;
}

function getThs(grade){
    let THList = [];

    THList.push(
        <td>{grade.saptamana}</td>
    );
    THList.push(
        <td>{grade.nota}</td>
    );
    THList.push(
        <td>{grade.tip}</td>
    );
    THList.push(
        <td>{grade.observatii}</td>
    );

    return THList;
}

function getThsTitle(){
    let THList = [];

    THList.push(
        <td>SĂPTĂMÂNĂ</td>
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

function refillTable(grades){
    let TRs = [];
    let table = document.getElementById("student-grades-table");

    TRs.push(<tr>{getThsTitle()}</tr>)
    TRs.push(<tr>{getTrs(grades)}</tr>);
}