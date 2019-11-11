'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

// import mainLogo from '/img/logo_facultate.png';
// import '/App.css';
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
	}


	// handleChange(e) {
	// 	this.setState({ input: e.target.value });
	// }

	handleClick() {
		var input = document.getElementById("username").value;
		client({method: 'GET', path: '/api/login/' + input}).done(response => {
			//this.setState({employees: response.entity._embedded.employees});
			alert(response.entity.data);
		});
	}

	render() {
	    return (
	      <div className="App">
	        <div className="parent-container">

	          {/*<header className="logo-header">*/}
	          {/*  <img src={mainLogo} className="logo" alt="logo" id="ubb-logo"/>*/}
	          {/*</header>*/}

	          <div className="login-form-container">
	            <form method="get" action="">
	              <div className="input-container">
	                <i className="input-icon user-icon"></i>
	                <input className="input-field" type="text" placeholder="Username" name="username" id="username"/>
	              </div>

	              <div className="input-container">
	                <i className="input-icon pass-icon"></i>
	                <input className="input-field" type="password" placeholder="*********" name="password" id="password"/>
	              </div>

	              <div className="input-container">
	                <label className="checkbox-container uppercase semi-bold" id="text_temp">Remember Me
	                  <input type="checkbox" value="remember"/>
	                  <span className="checkmark"></span>
	                </label>
	              </div>

	              <button type="button" className="login-button uppercase bold" onClick={this.handleClick}>Login</button>
	            </form>
	          </div>

	        </div>
	      </div>
	    );
	}
}


// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]