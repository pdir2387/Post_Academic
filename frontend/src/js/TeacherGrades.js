import React, {useState, useEffect} from 'react'
import Popup from "reactjs-popup";

import commons from '../css/commons.module.css'
import gradesCss from '../css/teacher_grades.module.css'

export default function TeacherGrades() {
    let [materii, setMaterii] = useState([]);
    let [grades, setGrades]  = useState([{materie:"Romana", nume:"Andrei",saptamana:"7",tip:"curs",nota:"7",observatii:"-", grupa:221},{materie:"Romana", nume:"Alex",saptamana:"5",tip:"curs",nota:"5",observatii:"prost", grupa:222}]);
    let filter = ["curs", "laborator", "seminar"];
    let [groups, setGroups] = useState([]);
    let [students, setStudents] = useState([]);

    let [selectedCourse, setSelectedCourse] = useState('');
    let [selectedTip, setSelectedTip] = useState('');
    let [selectedGroup, setSelectedGroup] = useState('');

    function handleSelectCourse(e) {
        setSelectedCourse(materii.find((el) => el.nume === e.target.value));

        if(selectedTip !== '')
            refillTable(grades, filter);
    }

    function getStudentsByCourse(){
        if(selectedCourse != '')
        if(selectedGroup != ''){
            fetch('http://localhost:3000/api/profesor/studenti/'+selectedCourse)
            .then(res => res.json())
            .then(res => setStudents(res));
        }
        else
            getStudentsByCourseAndGroup();
    }

    function getGradesByStuff(){
        if(selectedTip != '' && selectedCourse != '' && selectedGroup != '')
            fetch('http://localhost:3000/api/profesor/note/disciplina/'+selectedCourse.cod+ '/'+selectedTip +'/'+selectedGroup)
                .then(res => res.json())
                .then(res => setGrades(res));
        else if(selectedTip != '' && selectedCourse != '')
            fetch('http://localhost:3000/api/profesor/note/disciplina/'+selectedCourse.cod+ '/'+selectedTip)
                .then(res => res.json())
                .then(res => setGrades(res));
    }

    function getStudentsByCourseAndGroup(){
        if(selectedCourse != '')
            fetch('http://localhost:3000/api/profesor/studenti/'+selectedCourse.cod + '/'+selectedGroup)
            .then(res => res.json())
            .then(res => setStudents(res))
            .catch();
    }

    function getGroupsByCourse(){
        if(selectedCourse != '')
            fetch('http://localhost:3000/api/profesor/grupe/'+selectedCourse.cod)
            .then(res => res.json())
            .then(res => setGroups(res));
    }

    function getMaterii(){
        fetch('http://localhost:3000/api/profesor/materii')
            .then(res => res.json())
            .then(res => {
                if(res.length > 0)
                    setMaterii(res)
            })
            .catch(() => setMaterii([]));
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
        setGrades([...grades, {materie:selectedCourse.nume, nume:nume,saptamana:saptamana,tip:tipul,nota:nota,observatii:observatii, grupa:grupa}]);

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/api/profesor/addGrade/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                materie:selectedCourse.cod, nume:nume,saptamana:saptamana,tip:tipul,nota:nota,observatii:observatii, grupa:grupa,
              })
            }).then(() => getGradesByStuff());
          })();
    }

    useEffect(() => {
        getStudentsByCourse();
        getGroupsByCourse();
        getGradesByStuff();
    }, [selectedCourse])

    useEffect(() => {
        getStudentsByCourse();
        getGradesByStuff();
    }, [selectedGroup]);

    useEffect(() => {
        getGradesByStuff();
    }, [selectedTip])

    useEffect(() => {
        getMaterii();
    },[]);

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
                {getTrs(grades, selectedCourse.nume, selectedTip)}
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
    console.log(students);
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
                            <option value='curs'>Curs</option>
                            <option value='laborator'>Laborator</option>
                            <option value='seminar'>Seminar</option>
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
    console.log(options);
    let optionList = [];

    optionList.push(
        <option disabled selected="selected">--alege materia--</option>
    );

    for(let option of options){
        optionList.push(
            <option>{option.nume}</option>
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
            <option>{option.grupa}</option>
        );
    }

    return optionList;
}

function getTrs(grades, materie, selectedTip){
    console.log("V");
    console.log(grades);
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
        <td>{grade.student}</td>
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
    THList.push(
        <td></td>
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