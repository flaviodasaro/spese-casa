import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import testReducer from "./test/reducer";
import { menuReducer } from "./menu/reducer";
import { settingsReducer } from "./settings/reducer";
import { feedbackManagerReducer } from "./feedback-manager/reducer";

export const createRootReducer = history => combineReducers({
  testReducer,
  menuReducer,
  settingsReducer,
  feedbackManagerReducer,
  connectedRouterReducer:connectRouter(history)
})