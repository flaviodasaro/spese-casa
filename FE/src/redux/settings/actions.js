import { CUSTOM_HOSTNAME_CHANGED, HOSTNAME_CHANGED, HOSTNAME_SELECTED } from "./actionTypes";
import {
  getHostname as getHostNameSelector,
  MAP_TYPE_TO_HOSTNAME
} from "./selectors";

export const getHostname = () => (dispatch, getState) =>
  getHostNameSelector(getState());

const changeHostname = hostname => ({
  type: HOSTNAME_CHANGED,
  payload: { hostname }
});

export const changeCustomHostname = customHostname => ({
  type: CUSTOM_HOSTNAME_CHANGED,
  payload: { customHostname }
});

export const selectHostname = selectedHostname => ({
  type: HOSTNAME_SELECTED,
  payload: { selectedHostname }
});

export const setHostnameByType = (selectedHostname, customHostname) => dispatch => {
  const newHostname = MAP_TYPE_TO_HOSTNAME[selectedHostname] || customHostname;
  newHostname && dispatch(changeHostname(newHostname));
};