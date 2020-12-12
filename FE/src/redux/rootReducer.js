import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import testReducer from "./test/reducer";
import { menuReducer } from "./menu/reducer";
import { settingsReducer } from "./settings/reducer";

export const createRootReducer = history => combineReducers({
  testReducer,
  menuReducer,
  settingsReducer,
  connectedRouterReducer:connectRouter(history)
})