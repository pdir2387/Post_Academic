// tag::vars[]

import { withRouter, Switch, Route} from "react-router-dom";
import HomePage from './js/home';
import LoginPage from './js/login';
import NotFound from './js/404';

const React = require('react');

// end::vars[]

// tag::app[]
class App extends React.Component {
	// handleClick() {
	// 	var input = document.getElementById("username").value;

	// 	fetch('/api/login/' + input)
	// 	.then(response => response.json())
	// 	.then(data => alert(JSON.stringify(data)));
	// }

	render() {	
	    return (
	      <Switch>
			  <Route path="/login" component={LoginPage} />
			  <Route path="/home" component={HomePage} />
			  <Route component={NotFound} />
		  </Switch>
	    );
	}
}


export default withRouter(App);