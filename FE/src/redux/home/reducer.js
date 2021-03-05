import {
  HOME_INIT_FETCHED,
  HOME_RESET,
  HOME_FORBIDDEN_DETECTED
} from "./actionTypes";

const initialState = {
  initResponse: null,
  forbiddenDetected: false
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_INIT_FETCHED: {
      return { ...state, initResponse: action.payload.initResponse };
    }
    case HOME_FORBIDDEN_DETECTED: {
      return { ...state, forbiddenDetected: true };
    }
    case HOME_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
