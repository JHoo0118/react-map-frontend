import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../Routes/Main";
import PropTypes from "prop-types";
import Splash from "../Routes/Splash";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Splash} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
