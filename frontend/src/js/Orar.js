import React, { useState, useEffect } from 'react'
import tableCss from '../css/table.module.css'

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function getClassFromTimeAndDay(orar, time, day) {
    if (isIterable(orar))
        for (let course of orar) {
            if (course.zi === day && time >= course.start && time < (course.start + course.durata))
                return course;
        }

    return null;
}

function generateColumnV2(columnData) {
    let defaultCellHeight = 60;
    let rowArray = [];

    for (let column of columnData) {
        if (typeof column == "object") {
            let key = column.tip + " " + column.nume;
            let cellHeight = defaultCellHeight * column.durata + 1.5
            var style = {
                height : cellHeight + "px",
                backgroundColor : column.color
            }

            rowArray.push(
                <div className={tableCss.cell} style={style}>{key}</div>
            )
        }
        else {
            rowArray.push(
                <div className={tableCss.cell}>{column}</div>
            )
        }
    }

    return <div className={tableCss.column}>{rowArray}</div>;
}

function generateOrar(orar) {
    console.log(orar);
    let columnsArray = [];
    let days = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];
    columnsArray.push(generateColumnV2(["", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]));

    for (let day of days) {
        let time = 8;
        let columnForToday = [day];

        while (time <= 20) {
            let course = getClassFromTimeAndDay(orar, time, day);

            if (course !== null) {

                columnForToday.push(course);
                time += course.durata;
            }
            else {
                columnForToday.push("");

                time++;
            }
        }

        columnsArray.push(generateColumnV2(columnForToday));
    }

    return columnsArray;
}

function Orar(){
    let [orar, setOrar] = useState(0);


    useEffect(() => 
	{
        fetchOrar();
    }, []);

    return(
        <div id={tableCss.orar}>
            { }
            {
                orar ?
                generateOrar(orar)
                :
                <div>Loading</div>
            }
        </div>
    )

    function fetchOrar() {
        fetch('http://localhost:3000/api/orar')
        .then(res => res.json())
        .then(data => {
            setOrar(data);
        });
    }

}

export default Orar