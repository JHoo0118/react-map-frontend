import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Routes/Main";
import Splash from "./Routes/Splash";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Splash} />
      </Switch>
    </Router>
  );
};
