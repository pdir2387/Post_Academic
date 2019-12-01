import mainLogo from '../img/logo_facultate.png';
import '../css/main.css';

const React = require('react');

function LoginPage() {
	    return (
	      <div className="App">
	        <div className="parent-container">

	          <header className="logo-header">
	            <img src={mainLogo} className="logo" alt="logo" id="ubb-logo"/>
	          </header>

	          <div className="login-form-container">
	            <form method="post" action="/api/login">
	              <div className="input-container">
	                <i className="input-icon user-icon"/>
	                <input className="input-field" type="text" placeholder="Username" name="username" id="username"/>
	              </div>

	              <div className="input-container">
	                <i className="input-icon pass-icon"/>
	                <input className="input-field" type="password" placeholder="*********" name="password" id="password"/>
	              </div>

	              <div className="input-container">
	                <label className="checkbox-container uppercase semi-bold" id="text_temp">Remember Me
	                  <input type="checkbox" value="remember"/>
	                  <span className="checkmark"/>
	                </label>
	              </div>

	              <button type="submit" className="login-button uppercase bold">Login</button>
	            </form>
	          </div>

	        </div>
	      </div>
	    );
}

export default LoginPage;