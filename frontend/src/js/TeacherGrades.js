import React, {useState, useReducer} from 'react'
import Popup from "reactjs-popup";

import commons from '../css/commons.module.css'
import gradesCss from '../css/teacher_grades.module.css'

export default function TeacherGrades() {
    let materii = ["Mate", "Info", "Romana"];
    let [grades, setGrades]  = useState([{materie:"Romana", nume:"Andrei",saptamana:"7",tip:"Curs",nota:"7",observatii:"-", grupa:221},{materie:"Romana", nume:"Alex",saptamana:"5",tip:"Curs",nota:"5",observatii:"prost", grupa:222}]);
    let filter = ["Curs", "Laborator", "Seminar"];
    let groups = [221,222,223,224,225,226,227];
    let [students, setStudents] = useState([{nume:"Andrei", grupa: 221},{nume:"Alex", grupa:222}]);

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

    function addGrade(nume, saptamana, nota, observatii, tipul, grupa){
        console.log({materie:selectedCourse, nume:nume,saptamana:saptamana,tip:tipul,nota:nota,observatii:observatii, grupa:grupa})
        setGrades([...grades, {materie:selectedCourse, nume:nume,saptamana:saptamana,tip:tipul,nota:nota,observatii:observatii, grupa:grupa}]);
        console.log(grades);
    }

    return(
        <div className={commons.container}>
            <h1>Note</h1>

            <div id={gradesCss.selectContainer}>
                <select id="course-select" className={`${gradesCss.select} ${commons.dropDown}`} onChange={handleSelectCourse}>
                    {getOptions(materii)}
                </select>

                <select id="type-select" className={`${gradesCss.select} ${commons.dropDown}`} onChange={handleSelectType}>
                    {getOptionsTypes(filter)}
                </select>

                <select id="group-select" className={`${gradesCss.select} ${commons.dropDown}`} onChange={handleSelectGroup}>
                    {getOptionsGroups(groups)}
                </select>
            </div>

            <table className={commons.table}>
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
                {getTrsStudentsTable(students, selectedGroup, addGrade)}
            </table>
        </div>
    )
}

function getTrsStudentsTable(students, selectedGroup, addGrade){
    let TRList = [];
    for(let student of students){
       if(selectedGroup === '')
            TRList.push(
                <tr>{getThsStudentsTable(student, addGrade)}</tr>
            );
        else{
            if(student.grupa.toString() === selectedGroup.toString()){
                TRList.push(
                    <tr>{getThsStudentsTable(student, addGrade)}</tr>
                );
            }
        }
    }

    return TRList;
}

function getThsStudentsTable(student, addGrade){
    let THList = [];

    THList.push(
        <td>{student.nume}</td>
    );
    THList.push(
        <td>
            <Popup trigger={<button>Adauga Nota</button>} position="center center">
                <div>
                    {student.nume} - {student.grupa}
                    <form>
                        <select id="select-tip-add-nota">
                            <option value='Curs'>Curs</option>
                            <option value='Laborator'>Laborator</option>
                            <option value='Seminar'>Seminar</option>
                        </select><br/>

                        <label>Nota:</label>
                        <input id = "nota-add-value" type="text"></input>

                        <label>Saptamana:</label>
                        <input id = "saptamana-add-value" type="text"></input>

                        <label>Observatii:</label>
                        <input id = "obs-add-value" type="text"></input>
                    </form>
                    <button onClick={() => {
                        let nume = student.nume;
                        let saptamana = document.getElementById("saptamana-add-value").value;
                        let nota = document.getElementById("nota-add-value").value;
                        let observatii = document.getElementById("obs-add-value").value;
                        let tipul = document.getElementById("select-tip-add-nota").options[document.getElementById("select-tip-add-nota").selectedIndex].value;
                        let grupa = student.grupa;

                        addGrade(nume, saptamana, nota, observatii, tipul, grupa);
                    }}>Add</button>
                </div>
            </Popup>
        </td>
    );

    return THList;
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