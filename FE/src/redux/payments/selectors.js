import { createSelector } from "reselect";
import { isFalsyExceptZero } from "../common/utils";
import { getCategoryList } from "../spending-categories/selectors";
import {
  getSelectedGroupId,
  getSelectedSingleUserId
} from "../users/selectors";

const paymentsSlice = state => state.paymentsReducer;

export const isAssociationsModalOpen = createSelector(
  paymentsSlice,
  state => state.associationModalOpen
);

export const getInputPayments = createSelector(
  paymentsSlice,
  state => state.inputPayments
);

export const getFetchByFiltersRequest = createSelector(
  paymentsSlice,
  state => state.fetchByFiltersRequest
);

export const getFetchByFiltersResponse = createSelector(
  paymentsSlice,
  state => state.fetchByFiltersResponse
);

export const getByFiltersList = createSelector(
  getFetchByFiltersResponse,
  response => response && response.list
);

export const listFetchedAtLeastOnce = createSelector(
  getByFiltersList,
  list => !!list
);

export const aggregateAmountByFiltyers = createSelector(
  listFetchedAtLeastOnce,
  getByFiltersList,
  (fetched, list) => fetched && list.reduce((total, current) => total + current.importo, 0)
);

export const getDataColumns = createSelector(getCategoryList, categoryList => {
  return [
    {
      paymentKey: "descrizione",
      headerLabelKey: "PAYMENTS.DESCRIPTION",
      inputType: "text",
      additionalCellProps: {}
    },
    {
      paymentKey: "idCategoriaSpesa",
      headerLabelKey: "PAYMENTS.INPUT_CATEGORY",
      inputType: "select",
      optionList: categoryList,
      valueOptionProp: "idCategoriaSpesa",
      textOptionProp: "nomeCategoria",
      additionalCellProps: {}
    },
    {
      paymentKey: "importo",
      headerLabelKey: "PAYMENTS.INPUT_AMOUNT",
      inputType: "number",
      additionalCellProps: {}
    }
  ];
});

export const getDisabledAddPaymentsForm = createSelector(
  getSelectedSingleUserId,
  getSelectedGroupId,
  getInputPayments,
  (selectedUserId, selectedGroupId, inputPayments) => {

    return (
      isFalsyExceptZero(selectedUserId) ||
      isFalsyExceptZero(selectedGroupId) ||
      !inputPayments || 
      inputPayments.length === 0 || 
      inputPayments.some(payment => {
        const vals = Object.values(payment);
        return vals.some(payObj =>
          isFalsyExceptZero(payObj.value)
        );
      })
    );
  }
);
