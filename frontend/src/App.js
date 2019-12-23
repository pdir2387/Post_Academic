import { withRouter, Switch, Route} from "react-router-dom";
import HomePage from './js/HomePage';
import LoginPage from './js/LoginPage';
import NotFound from './js/404';
import GradesPage from './js/GradesPage';
import AttendancePage from './js/AttendancePage';
import AttendancePageProfessor from './js/AttendancePageProfessor'
import AdminAdministrateAccountsPage from './js/AdminAdministrateAccountsPage'
import React from 'react'

function App() {	
	return (
	    <Switch>
	    	<Route path="/admin_accounts" component={AdminAdministrateAccountsPage} />
	    	<Route path="/prezentaP" component={AttendancePageProfessor} />
			<Route path="/prezenta" component={AttendancePage} />
			<Route path="/note" component={GradesPage} />
			<Route path="/home" component={HomePage} />
			<Route path="/" component={LoginPage} />
			<Route component={NotFound} />
		</Switch>
	);
}


export default withRouter(App);