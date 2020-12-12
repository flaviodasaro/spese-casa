import { createSelector } from "reselect";

import { LOCAL_BE_HOST_NAME, MOCKED_HOST_NAME } from "../common/constants";

export const getSettingsSlice = state => state.settingsReducer;

export const getIsMockHostName = createSelector(
  getSettingsSlice,
  state => state.isMockHostName
);

export const getHostName = createSelector(getIsMockHostName, isMockHostName =>
  isMockHostName ? MOCKED_HOST_NAME : LOCAL_BE_HOST_NAME
);

export const getTestResponse = createSelector(
  getSettingsSlice,
  state => state.testResponse
);
