import {
  showSuccessAlert,
  showErrorAlert,
  showInfoAlert
} from "../feedback-manager/actions";

import { increaseLoader, decreaseLoader } from "../loader/actions";
import { LOADER_KEYS } from "../loader/loaderKeys";

import {
  USERNAME_CHANGED,
  ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  CREATE_USER_SUBMITTED,
  CREATE_USER_FORM_RESET
} from "./actionTypes";

export const mockSuccess = input => dispatch => {
  debugger;
  dispatch(increaseLoader(LOADER_KEYS.GLOBAL));
  setTimeout(() => {
    dispatch(decreaseLoader(LOADER_KEYS.GLOBAL));
    switch (input) {
      case 1: {
        dispatch(showSuccessAlert());
        break;
      }
      case 2: {
        dispatch(showErrorAlert());
        break;
      }
      default: {
        dispatch(showInfoAlert());
        break;
      }
    }
  }, 2000);
};

export const changeUserName = username => ({
  type: USERNAME_CHANGED,
  payload: { username }
});

export const changeAddGroupWithSingleUser = addGroupWithSingleUser => ({
  type: ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  payload: { addGroupWithSingleUser }
});

export const submitCreateUSer = createUserResponse => ({
  type: CREATE_USER_SUBMITTED,
  payload: { createUserResponse }
});

export const resetCreateUserForm = () => ({ type: CREATE_USER_FORM_RESET });
