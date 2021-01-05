import { genericApiCall, API_VERBS } from "../api/utils";

import {
  USERNAME_CHANGED,
  ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  CREATE_USER_SUBMITTED,
  CREATE_USER_FORM_RESET,
  USER_LIST_FETCHED,
  GROUP_NAME_CHANGED,
  GROUP_NOTES_CHANGED,
  GROUP_LIST_FETCHED,
  ASSOCIATION_BY_GROUP_FETCHED,
  GROUP_SELECTED,
  USER_SELECTED,
  RESET_ASSOCIATIONS,
  USERS_STATE_RESET
} from "./actionTypes";

const COMMON_PATH_PARAMS = {
  id: "{:id}"
};

const USERS_SUB_URL = "utente";
const GRUPPO_SUB_URL = "gruppo";
const ASSOCIAZIONE_SUB_URL = "associazione-utente-gruppo";

const GET_ALL_USERS_ENDPOINT = `${USERS_SUB_URL}/all`;
const GET_ALL_GROUPS_ENDPOIINT = `${GRUPPO_SUB_URL}/all`;
const ADD_USER_AND_GROUP_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/add-user-and-group`;
const ADD_GROUP_AND_ASSOCIATIONS_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/add-group-and-associations`;
const GET_ASSOCIATION_BY_GROUP_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/get-by-gruppo`;
const SAVE_ASSOCIATION_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/save-by-utente-gruppo`;
const DELETE_ASSOCIATION_ENDPOINT = `${ASSOCIAZIONE_SUB_URL}/${COMMON_PATH_PARAMS.id}`;

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

export const changeGroupName = groupName => ({
  type: GROUP_NAME_CHANGED,
  payload: { groupName }
});

export const changeGroupNotes = groupNotes => ({
  type: GROUP_NOTES_CHANGED,
  payload: { groupNotes }
});

export const resetCreateUserForm = () => ({ type: CREATE_USER_FORM_RESET });

export const getAllUsers = () => dispatch => {
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: GET_ALL_USERS_ENDPOINT,
      queryParams: {},
      onSuccess: resp => {
        dispatch(fetchUserList(resp.data));
      }
    })
  );
};

export const createUserAndGroup = (
  username,
  addGroupWithSingleUser
) => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: ADD_USER_AND_GROUP_ENDPOINT,
      body: { username, addGroupWithSingleUser },
      onSuccess: resp => dispatch(submitCreateUSer(resp))
    })
  );

export const createGroupByNameAndUSers = (
  groupName,
  groupNotes,
  users
) => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: ADD_GROUP_AND_ASSOCIATIONS_ENDPOINT,
      body: { groupName, groupNotes, users }
    })
  );

export const fetchGroupList = groupList => ({
  type: GROUP_LIST_FETCHED,
  payload: { groupList }
});

export const fetchAssociationByGroupAction = associationByGroup => ({
  type: ASSOCIATION_BY_GROUP_FETCHED,
  payload: { associationByGroup }
});

export const fetchAllGroups = () => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: GET_ALL_GROUPS_ENDPOIINT,
      queryParams: {},
      onSuccess: resp => {
        dispatch(fetchGroupList(resp.data));
      }
    })
  );

export const fetchAssociationByGroup = idGruppo => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: GET_ASSOCIATION_BY_GROUP_ENDPOINT,
      queryParams: { idGruppo },
      onSuccess: resp => {
        dispatch(
          fetchAssociationByGroupAction(
            resp.data.map(el => ({ ...el, id: el.idAssociazioneUtenteGruppo }))
          )
        );
      }
    })
  );

const saveAssociation = (idsUtente, idGruppo) => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: SAVE_ASSOCIATION_ENDPOINT,
      body: { idsUtente, idGruppo }
    })
  );

export const deleteAssociation = id => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.DELETE, {
      endpoint: DELETE_ASSOCIATION_ENDPOINT.replace(COMMON_PATH_PARAMS.id, id),
      queryParams: {}
    })
  );

export const deleteAssociationList = (ids, idGruppo) => dispatch =>
  Promise.all(ids.map(el => dispatch(deleteAssociation(el)))).then(res =>
    dispatch(fetchAssociationByGroup(idGruppo))
  );

export const selectGroupId = selectedGroupId => ({
  type: GROUP_SELECTED,
  payload: { selectedGroupId }
});

export const onChangeSelectedGroup = event => dispatch => {
  const idGruppo = event.target.value;
  dispatch(selectGroupId(idGruppo));
  dispatch(fetchAssociationByGroup(idGruppo));
};

export const selectUserIds = selectedUserIds => ({
  type: USER_SELECTED,
  payload: { selectedUserIds }
});

export const resetAssociaUtenteGruppi = () => ({ type: RESET_ASSOCIATIONS });

export const handleSaveAssociations = (idsUtente, idGruppo) => dispatch =>
  dispatch(saveAssociation(idsUtente, idGruppo)).then(input =>
    dispatch(fetchAssociationByGroup(idGruppo))
  );

export const resetUsersState = () => ({ type: USERS_STATE_RESET });

export const commonInit = (returnAsPromiseAll) => dispatch => {
  dispatch(resetUsersState());
  if (returnAsPromiseAll) {
    return Promise.all(dispatch(getAllUsers()), dispatch(fetchAllGroups()));
  } else {
    dispatch(getAllUsers());
    dispatch(fetchAllGroups());
  }
};
