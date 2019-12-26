import React, {useState} from 'react'
import '../css/teacher_grades.css'

export default function TeacherGrades() {
    let materii = ["Mate", "Info", "Romana"];
    let grades = [{materie:"Romana", nume:"Andrei",saptamana:"7",tip:"Curs",nota:"7",observatii:"-"},{materie:"Romana", nume:"Alex",saptamana:"5",tip:"Curs",nota:"5",observatii:"prost"}];
    let filter = ["Curs", "Laborator", "Seminar"];
    let groups = [221,222,223,224,225,226,227];

    let [selectedCourse, setSelectedCourse] = useState('');
    let [selectedTip, setSelectedTip] = useState('');
    let [selectedGroup, setSelectedGroup] = useState('');

    function handleSelectCourse(e) {
        setSelectedCourse(e.target.value);

        if(selectedTip !== '')
            refillTable(grades, filter);
    }

    function handleSelectType(e) {
        setSelectedTip(e.target.value);

        if(selectedCourse !== '')
            refillTable(grades, filter);
    }

    function handleSelectGroup(e) {
        setSelectedGroup(e.target.value);
        refillTable(grades, filter);
    }

    return(
        <div id="teacher-grades-container">
            <h1>Note</h1>

            <div id="select-container">
                <select id="course-select" onChange={handleSelectCourse}>
                    {getOptions(materii)}
                </select>

                <select id="type-select" onChange={handleSelectType}>
                    {getOptionsTypes(filter)}
                </select>

                <select id="group-select" onChange={handleSelectGroup}>
                    {getOptionsGroups(groups)}
                </select>
            </div>

            <table id="student-grades-table">
                <tr>
                    <th>STUDENT</th>
                    <th>SAPTAMANA</th>
                    <th>NOTA</th>
                    <th>OBSERVATII</th>
                    <th>BUTTONS</th>
                </tr>
                {getTrs(grades, selectedCourse, selectedTip)}
            </table>

            <table id="students-table">
                <tr>
                    <th>STUDENT</th>
                    <th>BUTTONS</th>
                </tr>
            </table>
        </div>
    )
}

function getOptions(options){
    let optionList = [];

    optionList.push(
        <option disabled selected="selected">--alege materia--</option>
    );

    for(let option of options){
        optionList.push(
            <option>{option}</option>
        );
    }

    return optionList;
}

function getOptionsTypes(types){
    let optionList = [];

    optionList.push(
        <option disabled selected="selected">--alege tipul--</option>
    );

    for(let option of types){
        optionList.push(
            <option>{option}</option>
        );
    }

    return optionList;
}

function getOptionsGroups(groups){
    let optionList = [];

    optionList.push(
        <option disabled selected="selected">--grupa--optional--</option>
    );

    for(let option of groups){
        optionList.push(
            <option>{option}</option>
        );
    }

    return optionList;
}

function getTrs(grades, materie, selectedTip){
    let TRList = [];
    for(let grade of grades){
       if(grade.tip === selectedTip && grade.materie === materie)
            TRList.push(
                <tr>{getThs(grade)}</tr>
            );
    }

    return TRList;
}

function getThs(grade){
    let THList = [];

    THList.push(
        <td>{grade.nume}</td>
    );
    THList.push(
        <td>{grade.saptamana}</td>
    );
    THList.push(
        <td>{grade.nota}</td>
    );
    THList.push(
        <td>{grade.observatii}</td>
    );

    return THList;
}

function getThsTitle(){
    let THList = [];

    THList.push(
        <td>STUDENT</td>
    );
    THList.push(
        <td>SAPTAMANA</td>
    );
    THList.push(
        <td>NOTA</td>
    );
    THList.push(
        <td>OBSERVATII</td>
    );

    return THList;
}

function refillTable(grades, filter, materie, selectedTip){
    let TRs = [];
    let table = document.getElementById("student-grades-table");

    TRs.push(<tr>{getThsTitle()}</tr>)
    TRs.push(<tr>{getTrs(grades, filter, materie, selectedTip)}</tr>);
}