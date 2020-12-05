import React from "react";
import App from "./App";
import Home from "./container/Home";
import Login from "./container/Login";
import Signup from "./container/Signup";
import Dashboard from "./container/Dashboard";
import { Route, Router, IndexRoute, browserHistory } from "react-router";

export default function Main() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} history={browserHistory}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>
  );
}
