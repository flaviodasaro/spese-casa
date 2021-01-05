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

const initialState = {
  username: "",
  addGroupWithSingleUser: true,
  createUserResponse: null,
  userList: [],
  groupName: "",
  groupNotes: "",
  groupList: [],
  selectedGroupId: "",
  selectedUserIds: [],
  associationByGroup: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_CHANGED: {
      return { ...state, username: action.payload.username };
    }
    case ADD_GROUP_WITH_SINGLE_USER_CHANGED: {
      return {
        ...state,
        addGroupWithSingleUser: action.payload.addGroupWithSingleUser
      };
    }
    case CREATE_USER_SUBMITTED: {
      return {
        ...state,
        createUserResponse: action.payload.createUserResponse
      };
    }
    case CREATE_USER_FORM_RESET: {
      return {
        ...state,
        username: "",
        addGroupWithSingleUser: true,
        createUserResponse: null
      };
    }
    case USER_LIST_FETCHED: {
      return { ...state, userList: action.payload.userList };
    }
    case GROUP_NAME_CHANGED: {
      return { ...state, groupName: action.payload.groupName };
    }
    case GROUP_NOTES_CHANGED: {
      return { ...state, groupNotes: action.payload.groupNotes };
    }
    case GROUP_LIST_FETCHED: {
      return { ...state, groupList: action.payload.groupList };
    }
    case GROUP_SELECTED: {
      return { ...state, selectedGroupId: action.payload.selectedGroupId };
    }
    case USER_SELECTED: {
      return { ...state, selectedUserIds: action.payload.selectedUserIds };
    }
    case ASSOCIATION_BY_GROUP_FETCHED: {
      return {
        ...state,
        associationByGroup: action.payload.associationByGroup
      };
    }
    case USERS_STATE_RESET: {
      return { ...initialState };
    }
    case RESET_ASSOCIATIONS: {
      return {
        ...state,
        selectedGroupId: "",
        selectedUserIds: [],
        associationByGroup: []
      };
    }
    default: {
      return state;
    }
  }
};
