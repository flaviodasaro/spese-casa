import {
  MOCK_HOST_NAME_TOGGLED,
  TEST_API_CALL_RESPONSE_SAVED
} from "./actionTypes";
import { performGet } from "../api/utils";
import { getHostName as getHostNameSelector } from "./selectors";

export const getHostName = () => (dispatch, getState) =>
  getHostNameSelector(getState());

export const toggleMockHostName = () => ({
  type: MOCK_HOST_NAME_TOGGLED
});

export const saveTestApiCall = testResponse => ({
  type: TEST_API_CALL_RESPONSE_SAVED,
  payload: { testResponse }
});

export const doTestGet = () => dispatch => {
  const url = `${dispatch(getHostName())}/user`;
  performGet(
    url,
    null,
    response => {
      dispatch(saveTestApiCall(response));
    },
    console.log
  );
};

export const testGetUserById = (id) => dispatch => {
  const url = `${dispatch(getHostName())}/utente/${id}`;
  performGet(
    url,
    null,
    response => {
      console.log(response);
    },
    console.log
  );
}
