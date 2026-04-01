import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { isSignedIn } from "./services/security";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/home"
          render={() =>
            isSignedIn() ? <Home /> : <Redirect to="/" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
