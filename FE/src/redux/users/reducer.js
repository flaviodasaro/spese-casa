import {
  USERNAME_CHANGED,
  ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  CREATE_USER_SUBMITTED,
  CREATE_USER_FORM_RESET,
  USER_LIST_FETCHED,
  GROUP_NAME_CHANGED,
  GROUP_NOTES_CHANGED
} from "./actionTypes";

const initialState = {
  username: "",
  addGroupWithSingleUser: true,
  createUserResponse: null,
  userList:[],
  groupName:"",
  groupNotes:""
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
    case USER_LIST_FETCHED:{
      return { ...state, userList:action.payload.userList };
    }
    case GROUP_NAME_CHANGED:{
      return { ...state, groupName:action.payload.groupName };
    }
    case GROUP_NOTES_CHANGED:{
      return { ...state, groupNotes:action.payload.groupNotes };
    }
    default: {
      return state;
    }
  }
};
