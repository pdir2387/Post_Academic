import { withRouter, Switch, Route} from "react-router-dom";
import HomePage from './js/HomePage';
import LoginPage from './js/LoginPage';
import NotFound from './js/404';
import React from 'react'

function App() {	
	return (
	    <Switch>
			<Route path="/home" component={HomePage} />
			<Route path="/" component={LoginPage} />
			<Route component={NotFound} />
		</Switch>
	);
}


export default withRouter(App);