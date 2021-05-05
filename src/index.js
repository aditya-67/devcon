import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./pages/App";
import Event from "./pages/event";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/event/:id" component={Event} />
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
