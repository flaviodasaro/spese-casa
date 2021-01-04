import { createSelector } from "reselect";

export const usersSlice = state => state.usersReducer;

export const getUsername = createSelector(usersSlice, state => state.username);
export const getAddGroupWithSingleUser = createSelector(
  usersSlice,
  state => state.addGroupWithSingleUser
);
export const getCreateUserResponse = createSelector(
  usersSlice,
  state => state.createUserResponse
);

export const getUserList = createSelector(usersSlice, state => state.userList);

export const getGroupName = createSelector(
  usersSlice,
  state => state.groupName
);

export const getGroupNotes = createSelector(
  usersSlice,
  state => state.groupNotes
);

export const getGroupListRaw = createSelector(
  usersSlice,
  state => state.groupList
);

export const getSelectedGroupId = createSelector(
  usersSlice,
  state => state.selectedGroupId
);

export const getSelectedUserIds = createSelector(
  usersSlice,
  state => state.selectedUserIds
);

export const getAssociationByGroup = createSelector(
  usersSlice,
  state => state.associationByGroup
);

export const getGroupList = createSelector(getGroupListRaw, list => {
  return list
    ? list.map(gr => ({ ...gr, value: gr.idGruppo, text: gr.nomeGruppo }))
    : [];
});

export const getUtentiNonAncoraAssociati = createSelector(
  getAssociationByGroup,
  getUserList,
  (associazioni, utenti) =>
    utenti
      ? utenti.filter(
          ut => !associazioni.find(ass => ass.utente.idUtente === ut.idUtente)
        )
      : []
);
