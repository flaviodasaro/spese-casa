import rootReducer from './rootReducer';
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState.getState(), composedEnhancers);

  return store
}

const store = createStore(rootReducer);

export default configureStore(store);