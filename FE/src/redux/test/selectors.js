import { createSelector } from "reselect";

export const testReducerSlice = state => state.testReducer;

export const getTestInput = createSelector(
    testReducerSlice,
    state => state.input
);