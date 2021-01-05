import { createSelector } from "reselect";

const paymentsSlice = state => state.paymentsReducer;

export const isAssociationsModalOpen = createSelector(
  paymentsSlice,
  state => state.associationModalOpen
);
