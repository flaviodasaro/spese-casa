import {
  HOSTNAME_VALUES,
  LOCAL_BE_HOST_NAME,
  MOCKED_HOST_NAME,
  PASSPARTOUT_HOSTNAME
} from "../common/constants";
import { createSelector } from "reselect";

export const MAP_TYPE_TO_HOSTNAME = {
  [HOSTNAME_VALUES.PASSPARTOUT]: PASSPARTOUT_HOSTNAME,
  [HOSTNAME_VALUES.LOCAL_BE]: LOCAL_BE_HOST_NAME,
  [HOSTNAME_VALUES.LOCAL_MOCK_BE]: MOCKED_HOST_NAME
};

export const getSettingsSlice = state => state.settingsReducer;

export const getHostname = createSelector(
  getSettingsSlice,
  state => state.hostname
);

export const getSelectedHostname = createSelector(
  getSettingsSlice,
  state => state.selectedHostname
);

export const getCustomHostname = createSelector(
  getSettingsSlice,
  state => state.customHostname
);

export const isLocalBeHostname = createSelector(
  getHostname,
  hostname => hostname === LOCAL_BE_HOST_NAME
);
export const isLocalMockBeHostname = createSelector(
  getHostname,
  hostname => hostname === MOCKED_HOST_NAME
);

export const isCustomHostname = createSelector(
  isLocalBeHostname,
  isLocalMockBeHostname,
  (isLocal, isLocalMock) => !isLocal && !isLocalMock
);

export const isCustomHostnameSelected = createSelector(
  getSelectedHostname,
  selectedHostname => selectedHostname === HOSTNAME_VALUES.CUSTOM
);

export const isSelectHostnameFormDisabled = createSelector(
  getSelectedHostname,
  isCustomHostnameSelected,
  getCustomHostname,
  (selectedHostname, isCustom, customHostname) =>
    !selectedHostname || (isCustom && !customHostname)
);
