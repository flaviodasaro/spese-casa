import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Tutorial } from "../routes/tutorial/Tutorial";
import { Home } from "../routes/home/Home";
import { AddUserPage, CreateGroupPage, ManageUsersPage } from "../routes/users";
import { AddPaymentPage, ReportsPage } from "../routes/payments";
import { SettingsPage } from "../routes/settings/SettingsPage";
import {
  ADD_USER_ROUTE,
  CREATE_GROUP_ROUTE,
  MANAGE_USER_ROUTE,
  ADD_PAYMENT_ROUTE,
  REPORTS_ROUTE,
  SETTINGS_ROUTE,
  TUTORIAL_ROUTE,
  HOME_ROUTE
} from "../common/constants";
import { history } from "../../redux/store";

export const AppRouter = props => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path={ADD_USER_ROUTE}>
            <AddUserPage />
          </Route>
          <Route path={CREATE_GROUP_ROUTE}>
            <CreateGroupPage />
          </Route>
          <Route path={MANAGE_USER_ROUTE}>
            <ManageUsersPage />
          </Route>
          <Route path={ADD_PAYMENT_ROUTE}>
            <AddPaymentPage />
          </Route>
          <Route path={REPORTS_ROUTE}>
            <ReportsPage />
          </Route>
          <Route path={SETTINGS_ROUTE}>
            <SettingsPage />
          </Route>
          <Route path={TUTORIAL_ROUTE}>
            <Tutorial />
          </Route>
          <Route path={HOME_ROUTE}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};