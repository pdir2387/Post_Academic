import React, { useState, useEffect } from 'react'
import tableCss from '../css/table.module.css'
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import NavBarItem from './NavBarItem';



function Timetable() {    
    const [orar, setOrar] = useState(0);
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [clickedClass, setClickedClass] = React.useState(null);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal(){
      setIsOpen(false);
    }

    useEffect(() => 
	{
        fetchOrar();
    }, []);

    return(
        <div id={tableCss.orar}>

        {
            orar ?
            generateOrar(orar)
            :
            <h3>Loading</h3>
        }

          {/*<button onClick={openModal}>Open Modal</button>*/}

            {
                clickedClass ?
                generateModal(clickedClass)
                :
                <div></div>
            }

            
        </div>
    )

    function fetchOrar() {
        if (orar === 0)
            //fetch('http://localhost:3000/api/orar')
            fetch('http://localhost:3000/api/student/ore')
            .then(res => res.json())
            .then(data => {
                setOrar(data);
            });
    }

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
                if (course.zi.toLowerCase() === day.toLowerCase() && time >= course.start && time < (course.start + course.durata))
                    return course;
            }
    
        return null;
    }
    
    function setInfoModal(course) {
        console.log(JSON.stringify(course));

        setClickedClass(course);
        openModal();
    }
    
    function generateColumnV2(columnData) {
        let defaultCellHeight = 60;
        let rowArray = [];
    
        for (let column of columnData) {
            if (typeof column == "object") {
                let cellHeight = defaultCellHeight * column.durata + 1.5
                var style = {
                    height : cellHeight + "px",
                    cursor : "pointer"
                }
    
                if (column.tip === 'curs')
                    style['backgroundColor'] = 'lightyellow';
                else if (column.tip === 'laborator')
                    style['backgroundColor'] = 'lightgreen';
                else 
                    style['backgroundColor'] = '#e59bff';

                rowArray.push(
                    <div className={tableCss.cell} style={style}>
                        <Button className={tableCss.button} onClick={_ => setInfoModal(column)}>
                            <p>{column.nume}</p>
                            <b><p>{column.tip} - {column.sala}</p></b>
                        </Button>
                    </div>
                )
            }
            else {
                // if(column.nume == 'luni') {
                //     rowArray.push(
                //         <div className={tableCss.headerCell}>{column}</div>
                //     )
                // }
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
        columnsArray.push(
            generateColumnV2(["", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"])
        );
    
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
    
    function generateModal(clickedClass) {
        if (clickedClass === null) 
            return (
                <alert>No classes clicked</alert>
            )

        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
            
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >

                <Button variant="outline-primary" size="lg" onClick={closeModal}>X</Button>
                <p>{clickedClass.tip} de </p>
                <p>{clickedClass.nume}</p>
                <p>With <u><i>{clickedClass.profesor}</i></u></p>
                <p>Sala {clickedClass.sala} <a href={"/location?sala_id=" + clickedClass.sala_id}>(View it on map)</a></p>
                
            </Modal>
        );
    }
}

export default Timetable