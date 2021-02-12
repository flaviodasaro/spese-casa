import { LOCAL_BE_HOST_NAME, HOSTNAME_VALUES } from "../common/constants";
import {
  CUSTOM_HOSTNAME_CHANGED,
  HOSTNAME_CHANGED,
  HOSTNAME_SELECTED
} from "./actionTypes";

const initialState = {
  hostname:LOCAL_BE_HOST_NAME,
  selectedHostname:HOSTNAME_VALUES.LOCAL_BE,
  customHostname:""
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOSTNAME_CHANGED: {
      return { ...state, hostname:action.payload.hostname };
    }
    case HOSTNAME_SELECTED: {
      const selectedHostname = action.payload.selectedHostname;
      const newState = { ...state, selectedHostname };
      if(selectedHostname !== HOSTNAME_VALUES.CUSTOM){
        newState.customHostname = "";
      }
      return { ...newState };
    }
    case CUSTOM_HOSTNAME_CHANGED: {
      return { ...state, customHostname:action.payload.customHostname };
    }
    default: {
      return state;
    }
  }
};