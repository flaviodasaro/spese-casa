import { createSelector } from "reselect";
import { isFalsyExceptZero } from "../common/utils";
import { getCategoryList } from "../spending-categories/selectors";
import {
  getSelectedGroupId,
  getSelectedSingleUserId,
  getUserList,
  getUserById
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

export const getDiffReportResponse = createSelector(
  paymentsSlice,
  state => state.diffReportResponse
);

export const getAggregateReportResponse = createSelector(
  paymentsSlice,
  state => state.aggregateReportResponse
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
  (fetched, list) =>
    fetched && list.reduce((total, current) => total + current.importo, 0)
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
        return vals.some(payObj => isFalsyExceptZero(payObj.value));
      })
    );
  }
);

export const getDataStructureForDiffReport = createSelector(
  getUserList,
  getDiffReportResponse,
  (userList, diffResponse) => {
    if (diffResponse 
      && userList && userList.length > 0) {
      return diffResponse.map(diff => {
        const { utente1, utente2, getTotAvereDto } = diff;
        const userObj1 = getUserById(utente1, userList);
        const userObj2 = getUserById(utente2, userList);
        return {
          leftArrowUser: userObj2.username,
          rightArrowUser: userObj1.username,
          amount: getTotAvereDto.totAvere || 0
        };
      });
    }
    return [];
  }
);

const CONSTANTS = {
  MINNICU_THRESHOLD: 10
};


export const getDataStructureForAggregateReport = createSelector(
  getUserList,
  getAggregateReportResponse,
  (userList, aggregateReponse) => {
    if (aggregateReponse 
      && userList && userList.length > 0) {
      return Object.entries(aggregateReponse).map(currentEntry => {
        const userId = currentEntry[0];
        const amount = currentEntry[1] || 0;
        const userObj = getUserById(userId, userList);
        if (userObj) {
          return { username: userObj.username, amount };
        }
        return null;
      });
    }
    return [];
  }
);


export const showMinnicuImg = createSelector(
  getDataStructureForDiffReport,
  getDataStructureForAggregateReport,
  (data1, data2) => data1.concat(data2).some(el => el.amount < CONSTANTS.MINNICU_THRESHOLD)
);