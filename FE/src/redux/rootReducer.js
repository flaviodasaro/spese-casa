import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { menuReducer } from "./menu/reducer";
import { settingsReducer } from "./settings/reducer";
import { feedbackManagerReducer } from "./feedback-manager/reducer";
import { loaderReducer } from "./loader/reducer";
import { usersReducer } from "./users/reducer";
import { spendingCategoriesReducer } from "./spending-categories/reducer";
import { homeReducer } from "./home/reducer";
import { paymentsReducer } from "./payments/reducer";
import { notesReducer } from "./notes/reducer";

export const createRootReducer = history =>
  combineReducers({
    feedbackManagerReducer,
    homeReducer,
    loaderReducer,
    menuReducer,
    paymentsReducer,
    settingsReducer,
    spendingCategoriesReducer,
    notesReducer,
    usersReducer,
    router: connectRouter(history)
  });
