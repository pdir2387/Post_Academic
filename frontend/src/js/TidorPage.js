import React, { useState } from 'react'

import commons from '../css/commons.module.css'
import ai from '../css/ai.module.css'
import AI from './AI';

export default function TidorPage() {
    let [username, setUsername] = useState("Tidor Pricope");
    let [about, setAbout] = useState("Machine learning, Databases, Mathematics");
    let [profilePic, setProfilePic] = useState(require("../img/tidor.jpg"));
    let optionale = ["AI", "Dans", "HCI", "ASG", "PSH", "GHX", "AWE", "CCP"];

    return (
        <div id={ai.aiContent}>
            <div id={ai.aiLeft}><br/><br/>
                <p>Tough to choose an optional course for the final year? Let us recommend you something!</p>
                <p>What do you like? Write up to three words below</p><br/>
                <div id="first-form-container">
                    <form id="first-form">
                        <input className={ai.input} type="text" />
                        <input className={ai.input} type="text" />
                        <input className={ai.input} type="text" /><br/><br/>
                        <button className={ai.button}>Submit</button>
                    </form>
                </div><br/><br/>

                <p>Or... maybe it's easier to tell us what concepts you enjoy, past favourite courses or preferred programming languages in a few sentences:</p>
                <div id="second-form-container">
                    <form id="second-form">
                        <textarea id="textarea-input" className={ai.textarea}>Write here...</textarea><br/>
                        <button className={ai.button}>Submit</button>
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
        TDList.push(
            <td key={index} className={columnClassName}>{column}</td>
        );
        index++;
    }
        
    return TDList;
}