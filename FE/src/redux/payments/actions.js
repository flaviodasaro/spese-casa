import {
  ASSOCIATIONS_MODAL_OPENED,
  ASSOCIATIONS_MODAL_CLOSED,
  INPUT_PAYMENT_ROW_ADDED,
  INPUT_PAYMENT_ROW_DELETED,
  INPUT_PAYMENT_ROW_CLONED,
  INPUT_PAYMENT_CHANGED,
  ADD_PAYMENTS_RESET,
  INPUT_PAYMENT_SUBMITTED,
  PAYMENTS_BY_FILTERS_FETCHED,
  PAYMENTS_STATE_RESET,
  FETCH_PAYMENTS_BY_FILTERS_STARTED
} from "./actionTypes";
import { fetchAssociationByGroup, commonInit } from "../users/actions";
import { fetchAllSpendingCategories } from "../spending-categories/actions";
import { API_VERBS, genericApiCall } from "../api/utils";
import { isFalsyExceptZero } from "../common/utils";

const PAYMENT_CONTROLLER_SUB_URL = "pagamento";
const MASSIVE_SAVE_PAYMENT_URL = `${PAYMENT_CONTROLLER_SUB_URL}/massive-save-by-ids`;
const FETCH_PAYMENTS_WITH_FILTERS_URL = `${PAYMENT_CONTROLLER_SUB_URL}/by-filters`;
const PAYMENTS_MASSIVE_UPDATE_URL = `${PAYMENT_CONTROLLER_SUB_URL}/massive-update`;

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

export const resetPaymentsState = () => ({ type: PAYMENTS_STATE_RESET });

export const init = () => dispatch => {
  dispatch(commonInit());
  dispatch(resetPaymentsState());
  dispatch(fetchAllSpendingCategories());
};

export const resetAddPayments = () => ({ type: ADD_PAYMENTS_RESET });

const submitInputPayments = massiveSaveResponse => ({
  type: INPUT_PAYMENT_SUBMITTED,
  payload: { massiveSaveResponse }
});

export const handleSubmitInputPayments = (
  idUtentePagante,
  idGruppoPartecipante,
  rawPayments
) => dispatch => {
  const payments = rawPayments.map(pay =>
    Object.entries(pay).reduce(
      (acc, current) => ({ ...acc, [current[0]]: current[1].value }),
      {}
    )
  );
  return dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: MASSIVE_SAVE_PAYMENT_URL,
      body: {
        idUtentePagante,
        idGruppoPartecipante,
        payments
      },
      onSuccess: resp => dispatch(submitInputPayments(resp))
    })
  );
};

const fetchPaymentsByFilterAction = fetchByFiltersResponse => ({
  type: PAYMENTS_BY_FILTERS_FETCHED,
  payload: { fetchByFiltersResponse }
});

const startFetchPaymentsByFilter = fetchByFiltersRequest => ({
  type: FETCH_PAYMENTS_BY_FILTERS_STARTED,
  payload: { fetchByFiltersRequest }
});

const fetchPaymentsByFiltersFromBody = body => dispatch => {
  dispatch(startFetchPaymentsByFilter(body));

  return dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: FETCH_PAYMENTS_WITH_FILTERS_URL,
      body,
      onSuccess: resp => {
        dispatch(fetchPaymentsByFilterAction(resp.data));
      }
    })
  );
}

export const fetchPaymentsByFilters = rawBody => dispatch => {
  const body = Object.entries(rawBody)
    .filter(entry => !["", null, undefined].includes(entry[1]))
    .reduce((acc, current) => ({ ...acc, [current[0]]: current[1] }), {});

  return dispatch(fetchPaymentsByFiltersFromBody(body));
};

export const markPaymentsAsPaid = (
  paymentIds,
  lastFetchRequest
) => dispatch => {
  const list = paymentIds.map(id => ({
    idPagamento: id,
    flgPagato: true
  }));
  return dispatch(
    genericApiCall(API_VERBS.PUT, {
      endpoint: PAYMENTS_MASSIVE_UPDATE_URL,
      body: { list },
      onSuccess: resp => {
        dispatch(fetchPaymentsByFiltersFromBody(lastFetchRequest));
      }
    })
  );
};
