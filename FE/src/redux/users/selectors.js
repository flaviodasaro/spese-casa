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
