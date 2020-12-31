import { createSelector } from "reselect";

export const loaderSlice = state => state.loaderReducer;

export const getOldValueByDotNotation = (state, parts) => {
  return parts.reduce(
    (accumulatedState, currentKey) =>
      accumulatedState && accumulatedState[currentKey],
    state
  );
};

export const isLoadingByKey = key =>
  createSelector(loaderSlice, state =>
    getOldValueByDotNotation(state, key.split("."))
  );
