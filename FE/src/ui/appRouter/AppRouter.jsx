import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Tutorial } from "../routes/tutorial/Tutorial";
import { Home } from "../routes/home/Home";

export const AppRouter = props => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/tutorial">
            <Tutorial />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
