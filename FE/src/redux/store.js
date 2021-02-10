import { createRootReducer } from "./rootReducer";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { createHashHistory } from "history";
import { logger } from "./logger";

export const history = createHashHistory();

function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, routerMiddleware(history), logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  );

  return store;
}

export default configureStore();
