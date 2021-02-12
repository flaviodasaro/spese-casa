import {
  CUSTOM_HOSTNAME_CHANGED,
  HOSTNAME_CHANGED,
  HOSTNAME_SELECTED
} from "./actionTypes";
import {
  getHostname as getHostNameSelector,
  MAP_TYPE_TO_HOSTNAME
} from "./selectors";
import { showSuccessAlert } from "../feedback-manager/actions";
import {
  SESSION_STORAGE_HOST_TYPE_KEY,
  SESSION_STORAGE_HOSTNAME_KEY
} from "../common/constants";
import { HOME_ROUTE } from "../../ui/common/constants";
import { push } from "connected-react-router";

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

export const setHostnameByType = (
  selectedHostname,
  customHostname
) => dispatch => {
  const newHostname = MAP_TYPE_TO_HOSTNAME[selectedHostname] || customHostname;
  if (newHostname) {
    sessionStorage.setItem(SESSION_STORAGE_HOST_TYPE_KEY, selectedHostname);
    sessionStorage.setItem(SESSION_STORAGE_HOSTNAME_KEY, newHostname);
    dispatch(changeHostname(newHostname));
  }
};

export const handleSubmit = (selectedHostname, customHostname) => dispatch => {
  dispatch(setHostnameByType(selectedHostname, customHostname));
  dispatch(showSuccessAlert());
  setTimeout(() => dispatch(push(HOME_ROUTE)), 500);
};
