import React, { useState, useEffect } from 'react'
import '../css/table.css'

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function createTableRow(columnList, columnClassName) {
    return <tr>{createTableData(columnList, columnClassName)}</tr>;
}

function createTableData(columnList, columnClassName) {
    let TDList = [];
    let index = 0;

    for (let column of columnList) {
        TDList.push(
            <td key={index} className={columnClassName}>{column}</td>
        );
        index++;
    }
        
    return TDList;
}

function getClassFromTimeAndDay(orar, time, day) {
    if (isIterable(orar))
        for (let course of orar) {
            if (course.zi === day && time >= course.start && time <= (course.start + course.durata))
                return course;
        }

    return null;
}

function getFormattedOrar(orar) {
    let TRList = [];
    let time = 8;
    let days = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];

    while (time <= 20) {
        let TDList = [];
        TDList.push(
            <div>{time}:00</div>
        )

        for (let day of days) {
            let course = getClassFromTimeAndDay(orar, time, day);

            if (course !== null)
                TDList.push(
                    <div className={course.color}>{course.nume}<br/>{course.tip}</div> 
                )
            else
                TDList.push(
                    <div></div>
                )
        }

        TRList.push(createTableRow(TDList));
        time++;
    }

    return TRList;
}

function Orar(){
    let [orar, setOrar] = useState(0);


    fetch('http://localhost:3000/api/orar')
    .then(res => res.json())
    .then(data => setOrar(data));

    
    // console.log("Am ora luni incepand cu ora 12? " + doIHaveClassNow(orar, 12, "luni"));
    // console.log("Am ora marti incepand cu ora 12? " + doIHaveClassNow(orar, 14, "marti"));
    // console.log("Am ora miercuri incepand cu ora 15? " + doIHaveClassNow(orar, 15, "miercuri"));

    return(

        <div id="orar">
            {/*TO DO: orar logic*/}
            <table>
                <tbody>
                    {createTableRow(["", "Luni", "Marti", "Miercuri", "Joi", "Vineri"], "th")}
                    {getFormattedOrar(orar)}
                </tbody>
            </table>
        </div>
    )
}

export default Orar