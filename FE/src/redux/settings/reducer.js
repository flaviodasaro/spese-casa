import {
  MOCK_HOST_NAME_TOGGLED,
  TEST_API_CALL_RESPONSE_SAVED
} from "./actionTypes";

const initialState = {
  isMockHostName:false,
  testResponse:null
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOCK_HOST_NAME_TOGGLED: {
      return { ...state, isMockHostName:!state.isMockHostName };
    }
    case TEST_API_CALL_RESPONSE_SAVED: {
      return { ...state, testResponse:action.payload.testResponse };
    }
    default: {
      return state;
    }
  }
};
