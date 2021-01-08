import {
  ASSOCIATIONS_MODAL_OPENED,
  ASSOCIATIONS_MODAL_CLOSED,
  INPUT_PAYMENT_ROW_ADDED,
  INPUT_PAYMENT_ROW_DELETED,
  INPUT_PAYMENT_ROW_CLONED,
  INPUT_PAYMENT_CHANGED,
  ADD_PAYMENTS_RESET,
  INPUT_PAYMENT_SUBMITTED
} from "./actionTypes";

const emptyPayment = {
  descrizione: { value: "" },
  idCategoriaSpesa: { value: "" },
  importo: { value: "" }
};

const initialState = {
  associationModalOpen: false,
  inputPayments: [emptyPayment],
  massiveSaveResponse:null
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSOCIATIONS_MODAL_OPENED: {
      return { ...state, associationModalOpen: true };
    }
    case ASSOCIATIONS_MODAL_CLOSED: {
      return { ...state, associationModalOpen: false };
    }
    case INPUT_PAYMENT_ROW_ADDED: {
      const inputPayments = state.inputPayments.concat(emptyPayment);

      return {
        ...state,
        inputPayments
      };
    }
    case INPUT_PAYMENT_ROW_DELETED: {
      const { paymentIndex } = action.payload;
      const partOne = state.inputPayments.slice(0, paymentIndex);
      const partTwo = state.inputPayments.slice(paymentIndex + 1);
      const inputPayments = partOne.concat(partTwo);

      return { ...state, inputPayments };
    }
    case INPUT_PAYMENT_ROW_CLONED: {
      const inputPayments = state.inputPayments.concat(
        state.inputPayments[action.payload.paymentIndex]
      );
      return {
        ...state,
        inputPayments
      };
    }
    case INPUT_PAYMENT_CHANGED: {
      const { paymentIndex, paymentKey, value } = action.payload;

      const partOne = state.inputPayments.slice(0, paymentIndex);
      const partThree = state.inputPayments.slice(paymentIndex + 1);

      const newPayments = partOne
        .concat([
          {
            ...state.inputPayments[paymentIndex],
            [paymentKey]: {
              ...state.inputPayments[paymentIndex][paymentKey],
              value
            }
          }
        ])
        .concat(partThree);

      return { ...state, inputPayments: newPayments };
    }
    case ADD_PAYMENTS_RESET: {
      return {
        ...state,
        associationModalOpen: false,
        inputPayments: [emptyPayment]
      };
    }
    case INPUT_PAYMENT_SUBMITTED: {
      return { ...state, massiveSaveResponse: action.payload.massiveSaveResponse };
    }
    default: {
      return state;
    }
  }
};
