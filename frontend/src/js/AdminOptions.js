import React,{useState, useEffect} from 'react'
import '../css/administrate_options.css'

export default function AdminOptions() 
{
	let [options,setOptions]=useState(()=>getOtions());

	useEffect(() => 
	{
        setOptionsPage();
    }, []);

	return (
        <div className="container">
            <h1 className="title">Administrare opțiuni</h1>

			<div id="adminOptionsContainer">
				<ul id="adminOptionsUl">
					<li id="periodLi">
						<form name="formPeriod">
							<input type="radio" name="period" value="view" id="viewPeriodRadio" onClick={viewPeriod}/> Perioadă vizualizare contracte<br/>
							<input type="radio" name="period" value="create" id="createPeriodRadio" onClick={createPeriod}/> Perioadă creare contracte<br/>
						</form>
					</li>
				</ul>
			</div>
        </div>
    );

    function setOptionsPage()
    {
    	if(options.period==="view")
    	{
    		document.getElementById("viewPeriodRadio").checked=true;
    	}
    	else
    	{
    		if(options.period==="create")
    		{
    			document.getElementById("createPeriodRadio").checked=true;
    		}
    	}
    }

    function getOtions()
    {
    	return JSON.parse('{"period":"view"}');
    }

	function viewPeriod()
	{
		if(document.getElementById("viewPeriodRadio").checked)
		{

		}
	}

	function createPeriod()
	{
		if(document.getElementById("createPeriodRadio").checked)
		{
			
		}
	}
}