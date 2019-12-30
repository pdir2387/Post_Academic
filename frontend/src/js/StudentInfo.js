import React,{useState, useEffect} from 'react'

import studentInfoCss from '../css/student_info.module.css'
import commons from '../css/commons.module.css'

export default function StudentInfo() 
{
    let [studentInfo,setStudentInfo]=useState(null);

	useEffect(() => 
	{
		getStudentInfo();
    }, []); 

	return (
        <div className={commons.container}>
            <h1 className="title">Informații student</h1>

            <div id={studentInfoCss.infoStudent}>
            	<span className={studentInfoCss.bold}>Nume:</span> <span id="nameSpan"></span><br/>
            	<span className={studentInfoCss.bold}>CNP:</span> <span id="cnpSpan"></span><br/>
            	<span className={studentInfoCss.bold}>Nr. matricol:</span> <span id="codeSpan"></span><br/>
            	<span className={studentInfoCss.bold}>Grupa:</span> <span id="groupNumberSpan"></span><br/>
            	<span className={studentInfoCss.bold}>An de studiu:</span> <span id="yearSpan"></span><br/>
            	<span className={studentInfoCss.bold}>Semestrul curent:</span> <span id="semesterNumberSpan"></span><br/>
            </div>
        </div>
    );

    function setStudentInfoSpan()
    {
    	document.getElementById("nameSpan").innerText=studentInfo.name;
    	document.getElementById("cnpSpan").innerText=studentInfo.cnp;
    	document.getElementById("codeSpan").innerText=studentInfo.cod;
    	document.getElementById("groupNumberSpan").innerText=studentInfo.grupa;
    	document.getElementById("yearSpan").innerText=studentInfo.an;
    	document.getElementById("semesterNumberSpan").innerText=studentInfo.semestru;
    }

    function getStudentInfo()
    {
		fetch('http://localhost:3000/api/student/informatii_personale')
        .then(res => res.json())
        .then(res => {
            studentInfo=res;
            setStudentInfoSpan();
		});

    	return JSON.parse('{"name":"Carl Johnson","cnp":"1234567891123","code":"cjir2242","group":"211","year":"1","semester":"2"}');
    }
}