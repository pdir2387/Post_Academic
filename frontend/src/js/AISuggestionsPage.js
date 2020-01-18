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

        this.sendRositaInfo=this.sendRositaInfo.bind(this);
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
                        onChange={() => {this.sendRositaInfo(!this.state.isRositaEnabled);this.setState({isRositaEnabled : !this.state.isRositaEnabled})}}
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
                    onChange={() => {this.sendRositaInfo(!this.state.isRositaEnabled);this.setState({isRositaEnabled : !this.state.isRositaEnabled})}}
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
    
    sendRositaInfo(value)
    {
        if(value)
        {
            fetch('http://localhost:8000/api/student/startRosita', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              })
            });
        }
        else
        {
            fetch('http://localhost:8000/api/student/stopRosita', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              })
            });
        }
    }

}

export default function AISuggestionsPage() {
    let [username, setUsername] = useState("Tidor Pricope");
    let [about, setAbout] = useState("Machine learning, Databases, Mathematics");
    let [profilePic, setProfilePic] = useState(require("../img/tidor.jpg"));
    let [optionale, setOptionale] = useState([]);
    let [aiTextArea, setAITextArea] = useState('');
    let [aiField1, setAiField1] = useState('');
    let [aiField2, setAiField2] = useState('');
    let [aiField3, setAiField3] = useState('');
    let [tableData,setTableData] = useState([]);

    function submitText(){
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/api/student/recomandareText', {
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
            .then(res => refillTable(res))
            .catch(refillTable([]));
          })();
    }

    function refillTable(data)
    {
        let newItems=[];

        for(let i=0;i<data.length;i++)
        {
            newItems.push(<tr>
                <td>{data[i].course}</td>
                <td>{data[i].faculty}</td>
            </tr>)
        }

        setTableData(newItems);
    }

    function submitFields(){
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/api/student/recomandareFields', {
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
            .then(res => refillTable(res))
            .catch(refillTable([]));
          })();
    }

    return (
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
                            <input className={ai.input} placeholder="Write here..." type="text" value={aiField1}  onChange={(e) => setAiField1(e.target.value)}/>
                            <input className={ai.input} placeholder="Write here..." type="text" value={aiField2}  onChange={(e) => setAiField2(e.target.value)}/>
                            <input className={ai.input} placeholder="Write here..." type="text" value={aiField3}  onChange={(e) => setAiField3(e.target.value)}/>
                            <br/><br/>
                            <button className={ai.button} type='button' onClick={()=>submitFields()}>Submit</button>
                        </form>
                    </div><br/><br/>

                    <p>Or... maybe it's easier to tell us what concepts you enjoy, past favourite courses or preferred programming languages in a few sentences:</p>
                    <div id="second-form-container">
                        <form id="second-form">
                            <textarea id="textarea-input" placeholder="Write here..." className={ai.textarea} value={aiTextArea}  onChange={(e) => setAITextArea(e.target.value)}></textarea><br/>
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
                        <thead>
                            <tr>
                                <th>Optionale Sugerate</th>
                                <th>Facultati</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                            {/* {getFormattedOrar(optionale)} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function getFormattedOrar(optionale) {
    let TRList = [];
    
    if(!isIterable(optionale))
     return TRList;
    
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

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }