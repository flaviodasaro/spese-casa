import {
  USERNAME_CHANGED,
  ADD_GROUP_WITH_SINGLE_USER_CHANGED,
  CREATE_USER_SUBMITTED,
  CREATE_USER_FORM_RESET,
  USER_LIST_FETCHED
} from "./actionTypes";

const initialState = {
  username: "",
  addGroupWithSingleUser: true,
  createUserResponse: null,
  userList:[]
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
    default: {
      return state;
    }
  }
};
