import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { HomeContainer } from "../routes/home/HomeContainer";
import { AddUserPageContainer, CreateGroupPageContainer, ManageUsersPageContainer } from "../routes/users";
import { AddPaymentPageContainer, ReportsPageContainer } from "../routes/payments";
import { SettingsPageContainer } from "../routes/settings/SettingsPageContainer";
import { SpendingCategoriesContainer } from "../routes/spending-categories/SpendingCategoriesContainer";
import { NotesPageContainer } from "../routes/notes/NotesPageContainer";
import {
  ADD_USER_ROUTE,
  CREATE_GROUP_ROUTE,
  MANAGE_USER_ROUTE,
  ADD_PAYMENT_ROUTE,
  REPORTS_ROUTE,
  SETTINGS_ROUTE,
  HOME_ROUTE,
  SPENDING_CATEGORIES_ROUTE,
  NOTES_ROUTE
} from "../common/constants";
import { history } from "../../redux/store";

export const AppRouter = props => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={ADD_USER_ROUTE}>
            <AddUserPageContainer />
          </Route>
          <Route path={CREATE_GROUP_ROUTE}>
            <CreateGroupPageContainer />
          </Route>
          <Route path={MANAGE_USER_ROUTE}>
            <ManageUsersPageContainer />
          </Route>
          <Route path={ADD_PAYMENT_ROUTE}>
            <AddPaymentPageContainer />
          </Route>
          <Route path={REPORTS_ROUTE}>
            <ReportsPageContainer />
          </Route>
          <Route path={SETTINGS_ROUTE}>
            <SettingsPageContainer />
          </Route>
          <Route path={SPENDING_CATEGORIES_ROUTE}>
            <SpendingCategoriesContainer />
          </Route>
          <Route path={NOTES_ROUTE}>
            <NotesPageContainer />
          </Route>
          <Route path={HOME_ROUTE}>
            <HomeContainer />
          </Route>
        </Switch>
      </ConnectedRouter>
    </>
  );
};
