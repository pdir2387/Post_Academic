import React, { useState } from 'react'

import commons from '../css/commons.module.css'
import ai from '../css/ai.module.css';
import LoadingDots from './LoadingDots'

class RositaTextView extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            logo_rosita: require('../img/logo_rosita.png'),
            isRositaEnabled: false,
            index : 0,
            _interval : -1,
            colors : ['red', 'blue', 'green', 'black'],
            phrases : ['Try saying: Who is teaching software security?','Try saying: Search something about artificial intelligence on wikipedia.','Try saying: What\'s the time?','Try saying: What\'s the next big holiday?','Try saying: Where\'s Bucharest?','Try saying: What\'s my schedule for tomorrow?','Try saying: I like databases, what can you recommend?','Try saying: Open youtube.'],
        }
    }
    
    componentDidMount() {
        let intervalReference = setInterval(() => {
            let newIndex = this.state.index + 1;

            this.setState({index : newIndex});
        }, 2500);

        this.setState({_interval : intervalReference});
    }

    componentWillUnmount() {
        if (this.state._interval !== -1)
            clearInterval(this.state._interval);
    }

    render() {
        if (!this.state.isRositaEnabled) {
            return (
                <div style={{display: 'flex', flexDirection: "row", padding: 10}}>
                    <input 
                        type="checkbox"
                        onChange={() => this.setState({isRositaEnabled : !this.state.isRositaEnabled})}
                        checked={this.state.isRositaEnabled}
                        style={{width: 25, height: 25, marginRight: 30, marginTop: 5}}
                    />
                </div>
            )
        }

        return (
            <div style={{display: 'flex', flexDirection: "row", padding: 10}}>
                <input 
                    type="checkbox"
                    onChange={() => this.setState({isRositaEnabled : !this.state.isRositaEnabled})}
                    checked={this.state.isRositaEnabled}
                    style={{width: 25, height: 25, marginRight: 30, marginTop: 5}}
                />

                <img src={this.state.logo_rosita} style={{width: 25, height: 25, marginTop: 5}}/>
                <div style={{marginTop: 5, elevation: -1}}>
                    <LoadingDots />
                </div>
    
                <p style={{maxWidth: "80%", fontSize: 16}}>{this.state.phrases[this.state.index % this.state.phrases.length]}</p>    
            </div>
        )
    }
        
}

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
<<<<<<< HEAD
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
=======
        <div id={ai.mainContainer}>
            <div id={ai.rosita}>
                <RositaTextView />
            </div>
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
>>>>>>> 808266fbea0faf82db35e93a39c650306b5594f9
                    </div>
                </div>

                <div id={ai.aiRight}>
                    <p>{username}</p>
                    <img src={profilePic} />
                    <p>{about}</p>

<<<<<<< HEAD
                <table className={ai.table}>
                    <tbody>
                        <tr>
                            <th>Optionale Sugerate</th>
                            <th>Facultatea</th>
                        </tr>
=======
                    <table className={ai.table}>
                        <tbody>
                            <tr>
                                <th>Optionale Sugerate</th>
                            </tr>
>>>>>>> 808266fbea0faf82db35e93a39c650306b5594f9

                            {getFormattedOrar(optionale)}
                        </tbody>
                    </table>
                </div>
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
