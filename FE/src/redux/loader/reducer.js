import { LOADER_INCREASED, LOADER_DECREASED } from "./actionTypes";
import { getOldValueByDotNotation } from "./selectors";

const initialState = {
    GLOBAL:0,
    USER:{
        TEST_SUB_KEY:0
    }
};

const getNewStateByDotNotation = (state, key, add) => {
  const parts = key.split(".");
  const subState = parts.reduce((accumulatedState, currentKey, index) => {
    if (index < parts.length - 1) {
      return { ...accumulatedState, [currentKey]: {} };
    } else {
      const currentCounter = getOldValueByDotNotation(state, parts);
      const secondAddend = add ? 1 : -1;
      return {
        ...accumulatedState,
        [currentKey]: currentCounter + secondAddend
      };
    }
  }, {});
  return { ...state, ...subState };
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_INCREASED: {
      return getNewStateByDotNotation(state, action.payload.key, true);
    }
    case LOADER_DECREASED: {
      return getNewStateByDotNotation(state, action.payload.key, false);
    }
    default: {
      return state;
    }
  }
};
