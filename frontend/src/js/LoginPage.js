import mainLogo from '../img/logo_facultate.png';
import React from 'react'

import main from '../css/main.module.css';

function LoginPage() {
	return (
		<div className={main.App}>
			<div className={main.parentContainer}>

				<header className="logo-header">
					<img src={mainLogo} className={main.logo} alt="logo" id={main.ubbLogo}/>
				</header>

				<div className={main.loginFormContainer}>
					<form method="post" action="/api/login">
						<div className={main.inputContainer}>
						<i className={`${main.inputIcon} ${main.userIcon}`}/>
						<input className={main.inputField} type="text" placeholder="Username" name="username" id="username"/>
						</div>

						<div className={main.inputContainer}>
						<i className={`${main.inputIcon} ${main.passIcon}`}/>
						<input className={main.inputField} type="password" placeholder="*********" name="password" id="password"/>
						</div>

						<div className={main.inputContainer}>
						{/* <label className={`${main.checkboxContainer} ${main.uppercase} ${main.semiBold}`} id="text_temp">Remember Me
							<input type="checkbox" value="remember"/>
							<span className={main.checkmark}/>
						</label> */}
						</div>
						
						<button type="submit" className={`${main.loginButton} ${main.uppercase} ${main.bold}`}>Login</button>
					</form>
				</div>

			</div>
		</div>
	);
}

export default LoginPage;