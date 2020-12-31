import { genericApiCall, API_VERBS } from "../api/utils";

import {
  USERNAME_CHANGED,
  ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  CREATE_USER_SUBMITTED,
  CREATE_USER_FORM_RESET,
  USER_LIST_FETCHED
} from "./actionTypes";

const USERS_SUB_URL = "utente";
const GRUPPO_SUB_URL = "gruppo";
const ASSOCIAZIONE_SUB_URL = "associazione-utente-gruppo";

const GET_ALL_USERS_ENDPOINT = `${USERS_SUB_URL}/all`;
const ADD_USER_AND_GROUP_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/add-user-and-group`;

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

const fetchUserList = userList => ({
  type: USER_LIST_FETCHED,
  payload: { userList }
});

export const resetCreateUserForm = () => ({ type: CREATE_USER_FORM_RESET });

export const getAllUsers = () => dispatch => {
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: GET_ALL_USERS_ENDPOINT,
      queryParans: {},
      onSuccess: resp => {
        dispatch(fetchUserList(resp.data))}
    })
  );
};

export const createUserAndGroup = (
  username,
  addGroupWithSingleUser
) => dispatch => {
  dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: ADD_USER_AND_GROUP_ENDPOINT,
      body: { username, addGroupWithSingleUser },
      onSuccess: resp => dispatch(submitCreateUSer(resp))
    })
  );
};
