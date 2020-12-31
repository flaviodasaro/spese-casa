import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import testReducer from "./test/reducer";
import { menuReducer } from "./menu/reducer";
import { settingsReducer } from "./settings/reducer";
import { feedbackManagerReducer } from "./feedback-manager/reducer";
import { loaderReducer } from "./loader/reducer";
import { usersReducer } from "./users/reducer";

export const createRootReducer = history => combineReducers({
  testReducer,
  menuReducer,
  settingsReducer,
  feedbackManagerReducer,
  loaderReducer,
  usersReducer,
  connectedRouterReducer:connectRouter(history)
})