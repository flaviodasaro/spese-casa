import {
  ASSOCIATIONS_MODAL_OPENED,
  ASSOCIATIONS_MODAL_CLOSED,
  INPUT_PAYMENT_ROW_ADDED,
  INPUT_PAYMENT_ROW_DELETED,
  INPUT_PAYMENT_ROW_CLONED,
  INPUT_PAYMENT_CHANGED,
  ADD_PAYMENTS_RESET
} from "./actionTypes";
import { fetchAssociationByGroup, commonInit } from "../users/actions";
import { fetchAllSpendingCategories } from "../spending-categories/actions";

const openAssociationModal = () => ({ type: ASSOCIATIONS_MODAL_OPENED });

export const onOpenAssociationListModal = idGruppo => dispatch => {
  dispatch(fetchAssociationByGroup(idGruppo)).then(res =>
    dispatch(openAssociationModal())
  );
};

export const closeAssociationsModal = () => ({
  type: ASSOCIATIONS_MODAL_CLOSED
});

export const addPaymentRow = () => ({ type: INPUT_PAYMENT_ROW_ADDED });

export const deletePaymentRow = paymentIndex => ({
  type: INPUT_PAYMENT_ROW_DELETED,
  payload: { paymentIndex }
});

export const clonePaymentRow = paymentIndex => ({
  type: INPUT_PAYMENT_ROW_CLONED,
  payload: { paymentIndex }
});

export const changePaymentInput = (paymentIndex, paymentKey, value) => ({
  type: INPUT_PAYMENT_CHANGED,
  payload: { paymentIndex, paymentKey, value }
});

export const init = () => dispatch => {
  dispatch(commonInit());
  dispatch(fetchAllSpendingCategories());
};

export const resetAddPayments = () => ({ type: ADD_PAYMENTS_RESET });
