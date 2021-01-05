import { ASSOCIATIONS_MODAL_OPENED, ASSOCIATIONS_MODAL_CLOSED } from "./actionTypes";

const initialState = {
  associationModalOpen: false
};

export const paymentsReducer = (state = { initialState }, action) => {
    debugger
  switch (action.type) {
    case ASSOCIATIONS_MODAL_OPENED: {
      return { ...state, associationModalOpen: true };
    }
    case ASSOCIATIONS_MODAL_CLOSED: {
      return { ...state, associationModalOpen: false };
    }
    default: {
      return state;
    }
  }
};
