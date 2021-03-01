import { fromUnixTime } from "date-fns";
import { NOTES_FETCHED, NOTES_WRITTEN } from "./actionTypes";

const initialState = {
  notes: ""
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_FETCHED: {
      return { ...state, notes: action.payload.notes };
    }
    default: {
      return state;
    }
  }
};
