import {
  PASSPARTOUT_HOSTNAME,
  HOSTNAME_VALUES,
  SESSION_STORAGE_HOSTNAME_KEY,
  SESSION_STORAGE_HOST_TYPE_KEY
} from "../common/constants";
import {
  CUSTOM_HOSTNAME_CHANGED,
  HOSTNAME_CHANGED,
  HOSTNAME_SELECTED
} from "./actionTypes";

const initialState = {
  hostname: PASSPARTOUT_HOSTNAME,
  selectedHostname: HOSTNAME_VALUES.PASSPARTOUT,
  customHostname: ""
};

const calculateInitialStateOnReload = () => {
  const initialHostType = window.sessionStorage.getItem(
    SESSION_STORAGE_HOST_TYPE_KEY
  );
  const initialHostname = window.sessionStorage.getItem(
    SESSION_STORAGE_HOSTNAME_KEY
  );

  if (initialHostType && initialHostname) {
    return {
      ...initialState,
      selectedHostname: initialHostType,
      hostname: initialHostname
    };
  } else {
    return initialState;
  }
};

export const settingsReducer = (state = calculateInitialStateOnReload(), action) => {
  switch (action.type) {
    case HOSTNAME_CHANGED: {
      return { ...state, hostname: action.payload.hostname };
    }
    case HOSTNAME_SELECTED: {
      const selectedHostname = action.payload.selectedHostname;
      const newState = { ...state, selectedHostname };
      if (selectedHostname !== HOSTNAME_VALUES.CUSTOM) {
        newState.customHostname = "";
      }
      return { ...newState };
    }
    case CUSTOM_HOSTNAME_CHANGED: {
      return { ...state, customHostname: action.payload.customHostname };
    }
    default: {
      return state;
    }
  }
};
