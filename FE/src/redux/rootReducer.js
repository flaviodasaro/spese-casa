import { combineReducers } from 'redux';

import testReducer from "./test/reducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  testReducer
})

export default rootReducer;