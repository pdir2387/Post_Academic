import React, {useState, useEffect} from 'react'
import Popup from "reactjs-popup";

import commons from '../css/commons.module.css'
import gradesCss from '../css/teacher_grades.module.css'

export default function TeacherResults() {
    let [materii, setMaterii] = useState([]);
    let [grades, setGrades]  = useState([{materie:"Romana", nume:"Andrei",saptamana:"7",nota:"7", grupa:221},{materie:"Romana", nume:"Alex",saptamana:"5",nota:"5",grupa:222}]);
    let [groups, setGroups] = useState([]);
    let [students, setStudents] = useState([]);

    let [selectedCourse, setSelectedCourse] = useState('');
    let [selectedGroup, setSelectedGroup] = useState('');

    function handleSelectCourse(e) {
        setSelectedCourse(materii.find((el) => el.nume === e.target.value));

         refillTable(grades);
    }

    function getStudentsByCourse(){
        if(selectedCourse !== '')
        if(selectedGroup !== ''){
            fetch('http://localhost:3000/api/profesor/studenti/'+selectedCourse)
            .then(res => res.json())
            .then(res => setStudents(res));
        }
        else
            getStudentsByCourseAndGroup();
    }

    function getGradesByStuff(){
        if(selectedCourse !== '' && selectedGroup !== '')
            fetch('http://localhost:3000/api/profesor/medii/'+selectedCourse.cod+'/'+selectedGroup)
                .then(res => res.json())
                .then(res => setGrades(res));
        else if(selectedCourse !== '')
            fetch('http://localhost:3000/api/profesor/medii/'+selectedCourse.cod)
                .then(res => res.json())
                .then(res => setGrades(res));
    }

    function getStudentsByCourseAndGroup(){
        if(selectedCourse !== '')
            fetch('http://localhost:3000/api/profesor/studenti/'+selectedCourse.cod + '/'+selectedGroup)
            .then(res => res.json())
            .then(res => setStudents(res))
            .catch();
    }

    function getGroupsByCourse(){
        if(selectedCourse !== '')
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

    function handleSelectGroup(e) {
        setSelectedGroup(e.target.value);
        refillTable(grades);
    }

    function addGrade(nume, nota, grupa, cod){
        setGrades([...grades, {materie:selectedCourse.cod, nume:nume,nota:nota, grupa:grupa, cod:cod}]);

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/api/profesor/medii/add/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                materie:selectedCourse.cod, nota:nota, grupa:grupa, cod:cod
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
        getMaterii();
    },[]);

    return(
        <div className={commons.container}>
            <h1>Medii</h1>

            <div id={gradesCss.selectContainer}>
                <select id="course-select" className={`${gradesCss.select} ${commons.dropDown}`} onChange={handleSelectCourse}>
                    {getOptions(materii)}
                </select>

                <select id="group-select" className={`${gradesCss.select} ${commons.dropDown}`} onChange={handleSelectGroup}>
                    {getOptionsGroups(groups)}
                </select>
            </div>

            <table className={commons.table}>
                <tr>
                    <th>STUDENT</th>
                    <th>NOTA</th>
                    <th>BUTTONS</th>
                </tr>
                {getTrs(grades, selectedCourse.cod)}
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
    ////////////////console.log(students);
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
                        <label>Nota:</label>
                        <input id = "nota-add-value" type="text"></input>
                    </form>
                    <button onClick={() => {
                        let nume = student.nume;
                        let nota = document.getElementById("nota-add-value").value;
                        let grupa = student.grupa;
                        let cod = student.cod;

                        addGrade(nume, nota, grupa,cod);
                    }}>Add</button>
                </div>
            </Popup>
        </td>
    );

    return THList;
}

function getOptions(options){
    ////////////////console.log(options);
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

function getTrs(grades, materie){
    ////////////////console.log(grades);
    let TRList = [];
    for(let grade of grades){
       if(grade.materie === materie)
            TRList.push(
                <tr>{getThs(grade)}</tr>
            );
    }

    return TRList;
}

function getThs(grade){
    //////////////console.log(grade);
    let THList = [];

    THList.push(
        <td>{grade.nume}</td>
    );
    THList.push(
        <td>{grade.nota}</td>
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
        <td>NOTA</td>
    );

    return THList;
}

function refillTable(grades, materie){
    let TRs = [];
    let table = document.getElementById("student-grades-table");

    TRs.push(<tr>{getThsTitle()}</tr>)
    TRs.push(<tr>{getTrs(grades, materie)}</tr>);
}