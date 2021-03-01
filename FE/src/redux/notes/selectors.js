import { createSelector } from "reselect";

const notesSlice = state => state.notesReducer;

export const getNotes = createSelector(notesSlice, state => state.notes);
