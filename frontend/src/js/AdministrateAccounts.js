import React,{useState} from 'react'
import '../css/administrate_accounts.css'

export default function AdministrateAccounts() 
{
	return (
        <div className="container">
            <h1 className="title">Administrare conturi</h1>

			<div id="options_and_fields">
	            <div id="buttonOptions">
					<button type="button" id="addAccount" onClick={openAddForm}>Adaugă conturi</button> 
					<button type="button" id="deleteAccount" onClick={openDeleteForm}>Șterge conturi</button> 
					<button type="button" id="modifyAccount" onClick={openModifyForm}>Modifică conturi</button> 
	            </div>
				
	            <div id="addFields" className="fields">
	            	<form>
	            		Nume:<br/>
						<input type="text" id="lastNameAdd" name="lastNameAdd"/><br/>
						Prenume:<br/>
						<input type="text" id="firstNameAdd" name="firstNameAdd"/><br/>
						Inițială tată:<br/>
						<input type="text" id="fathersFirstLetterAdd" name="fathersFirstLetterAdd"/><br/>
						CNP:<br/>
						<input type="text" id="cnpAdd" name="cnpAdd"/><br/>
						Număr matricol:<br/>
						<input type="text" id="codeAdd" name="codeAdd"/><br/>
						Nume utilizator:<br/>
						<input type="text" id="usernameAdd" name="usernameAdd"/><br/>
						Parolă:<br/>
						<input type="text" id="passwordAdd" name="passwordAdd"/><br/>

                        <input type="file" id="fileAdd" name="fileAdd"/><br/>

						<input type="submit" value="Confirma adăugarea"/>
	            	</form>
	            </div>

	            <div id="deleteFields" className="fields">
	           		<form>
	           			Număr matricol:<br/>
						<input type="text" id="codeDelete" name="codeDelete"/><br/>

                        <input type="file" id="fileAdd" name="fileDelete"/><br/>

						<input type="submit" value="Confirma ștergerea"/>
	           		</form>
	            </div>

	            <div id="modifyFields" className="fields">
					<div id="searchAccountContainer">
						Număr matricol:<br/>
						<input type="text" id="codeSearchModify" name="codeSearchModify"/><br/>

						<button type="button" id="searchAccount" onClick={searchAccountToModify}>Cauta cont</button> 
					</div>

	            	<form>
	            		Nume:<br/>
						<input type="text" id="lastNameModify" name="lastNameModify"/><br/>
						Prenume:<br/>
						<input type="text" id="firstNameModify" name="firstNameModify"/><br/>
						Inițială tată:<br/>
						<input type="text" id="fathersFirstLetterModify" name="fathersFirstLetterModify"/><br/>
						CNP:<br/>
						<input type="text" id="cnpModify" name="cnpModify"/><br/>
						Număr matricol:<br/>
						<input type="text" id="codeModify" name="codeModify"/><br/>
						Nume utilizator:<br/>
						<input type="text" id="usernameModify" name="usernameModify"/><br/>
						Parolă:<br/>
						<input type="text" id="passwordModify" name="passwordModify"/><br/>

                        <input type="file" id="fileAdd" name="fileModify"/><br/>

						<input type="submit" value="Confirma modificarea"/>
	            	</form>
	            </div>
            </div>
        </div>
    );

    function hideForms()
    {
    	document.getElementById("addFields").style.display="none";
    	document.getElementById("deleteFields").style.display="none";
    	document.getElementById("modifyFields").style.display="none";
    	clearFieldsAdd();
    	clearFieldsDelete();
    	clearFieldsModify();
    }

    function openAddForm()
    {
    	hideForms();
		document.getElementById("addFields").style.display="block";
    }

    function openDeleteForm()
    {
    	hideForms();
		document.getElementById("deleteFields").style.display="block";
    }

    function openModifyForm()
    {
    	hideForms();
		document.getElementById("modifyFields").style.display="block";
    }

    function searchAccountToModify()
    {
    	let code=document.getElementById("codeSearchModify").value;
    	let account=getAccount(code);

    	document.getElementById("lastNameModify").value=account.lastName;
    	document.getElementById("firstNameModify").value=account.firstName;
    	document.getElementById("fathersFirstLetterModify").value=account.fathersFirstLetter;
    	document.getElementById("cnpModify").value=account.cnp;
    	document.getElementById("codeModify").value=account.code;
    	document.getElementById("usernameModify").value=account.username;
    	document.getElementById("passwordModify").value=account.password;
    }

    function getAccount(code)
    {
    	return JSON.parse('{"firstName":"David","lastName":"Cole","fathersFirstLetter":"D","cnp":"1234567890123","code":"M123","username":"cdir2242","password":"1234567"}');
    }

    function clearFieldsAdd()
    {
    	document.getElementById("lastNameAdd").value="";
    	document.getElementById("firstNameAdd").value="";
    	document.getElementById("fathersFirstLetterAdd").value="";
    	document.getElementById("cnpAdd").value="";
    	document.getElementById("codeAdd").value="";
    	document.getElementById("usernameAdd").value="";
    	document.getElementById("passwordAdd").value="";
    }

    function clearFieldsDelete()
    {
		document.getElementById("codeDelete").value="";
    }

    function clearFieldsModify()
    {
    	document.getElementById("codeSearchModify").value="";
    	document.getElementById("lastNameModify").value="";
    	document.getElementById("firstNameModify").value="";
    	document.getElementById("fathersFirstLetterModify").value="";
    	document.getElementById("cnpModify").value="";
    	document.getElementById("codeModify").value="";
    	document.getElementById("usernameModify").value="";
    	document.getElementById("passwordModify").value="";
    }
}