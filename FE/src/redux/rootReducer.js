import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import testReducer from "./test/reducer";
import { menuReducer } from "./menu/reducer";

export const createRootReducer = history => combineReducers({
  testReducer,
  menuReducer,
  connectedRouterReducer:connectRouter(history)
})