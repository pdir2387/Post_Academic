import React, { useState } from 'react'

import commons from '../css/commons.module.css'
import ai from '../css/ai.module.css'
import AI from './AI';

export default function AISuggestionsPage() {
    let [username, setUsername] = useState("Tidor Pricope");
    let [about, setAbout] = useState("Machine learning, Databases, Mathematics");
    let [profilePic, setProfilePic] = useState(require("../img/tidor.jpg"));
    let [optionale, setOptionale] = useState([]);
    let [aiTextArea, setAITextArea] = useState('Write here...');
    let [aiField1, setAiField1] = useState('Write here...');
    let [aiField2, setAiField2] = useState('Write here...');
    let [aiField3, setAiField3] = useState('Write here...');

    function submitText(){
        (async () => {
            const rawResponse = await fetch('http://localhost:3000/api/student/recomandareText', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text: aiTextArea
              })
            })
            .then(res => res.json())
            .then(res => setOptionale(res))
            .catch(setOptionale([]));
          })();
    }

    function submitFielda(){
        (async () => {
            const rawResponse = await fetch('http://localhost:3000/api/student/recomandareFields', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                label1: aiField1,
                label2: aiField2,
                label3: aiField3
              })
            })
            .then(res => res.json())
            .then(res => setOptionale(res))
            .catch(setOptionale([]));
          })();
    }

    return (
        <div id={ai.aiContent}>
            <div id={ai.aiLeft}><br/><br/>
                <p>Tough to choose an optional course for the final year? Let us recommend you something!</p>
                <p>What do you like? Write up to three words below</p><br/>
                <div id="first-form-container">
                    <form id="first-form">
                        <input className={ai.input} type="text" value={aiField1}  onChange={(e) => setAiField1(e.target.value)}/>
                        <input className={ai.input} type="text" value={aiField2}  onChange={(e) => setAiField2(e.target.value)}/>
                        <input className={ai.input} type="text" value={aiField3}  onChange={(e) => setAiField3(e.target.value)}/>
                        <br/><br/>
                        <button className={ai.button} type='button'>Submit</button>
                    </form>
                </div><br/><br/>

                <p>Or... maybe it's easier to tell us what concepts you enjoy, past favourite courses or preferred programming languages in a few sentences:</p>
                <div id="second-form-container">
                    <form id="second-form">
                        <textarea id="textarea-input" className={ai.textarea} value={aiTextArea}  onChange={(e) => setAITextArea(e.target.value)}></textarea><br/>
                        <button className={ai.button} onClick={() => submitText()} type='button'>Submit</button>
                    </form><br/><br/>

                    <div id="second-form-hidden-content">
                        <p>We identified the following keywords:</p>
                    </div>
                </div><br/><br/>
                <div id="any-form-hidden-content">
                    <p>The recommended courses are filtered in the table.</p>
                    <span>If you like what you see let us add them to your profile!</span>
                    <button className={ai.button}>Add</button>
                </div>
            </div>

            <div id={ai.aiRight}>
                <p>{username}</p>
                <img src={profilePic} />
                <p>{about}</p>

                <table className={ai.table}>
                    <tbody>
                        <tr>
                            <th>Optionale Sugerate</th>
                            <th>Facultatea</th>
                        </tr>

                        {getFormattedOrar(optionale)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function getFormattedOrar(optionale) {
    let TRList = [];
    
    for (let optional of optionale) {
            let TDList = [];
            TDList.push(
                <div>{optional}</div>
            )

        TRList.push(createTableRow(TDList));
    }

    return TRList;
}

function createTableRow(columnList, columnClassName) {
    return <tr>{createTableData(columnList, columnClassName)}</tr>;
}

function createTableData(columnList, columnClassName) {
    let TDList = [];
    let index = 0;

    for (let column of columnList) {
        console.log(column.props.children);
        TDList.push(
            <td >{column.props.children.nume}</td>
        );TDList.push(
            <td >{column.props.children.facultate}</td>
        );
        index++;
    }
        
    return TDList;
}