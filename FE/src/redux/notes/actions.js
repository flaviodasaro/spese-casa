import { API_VERBS, genericApiCall } from "../api/utils";
import { NOTES_FETCHED } from "./actionTypes";

const DYNAMIC_RESOURCES_URL = "dynamic-resources";
const GET_TXT_CONTENT_URL = `${DYNAMIC_RESOURCES_URL}/get-txt-content`;
const WRITE_TXT_CONTENT_URL = `${DYNAMIC_RESOURCES_URL}/write-txt-content`;
const NOTES_FILENAME = "note.txt";

export const writeNotes = notes => ({
  type: NOTES_FETCHED,
  payload: { notes }
});

export const getNotesFromApi = () => dispatch => {
  dispatch(writeNotes("")); //reset
  return dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: GET_TXT_CONTENT_URL,
      queryParams: { fileName: NOTES_FILENAME },
      onSuccess: response => {
        dispatch(writeNotes(response.data));
      }
    })
  );
};

const writeNotesWithApi = newNotes => dispatch => {
  return dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: WRITE_TXT_CONTENT_URL,
      body: { fileContent: newNotes, fileName: NOTES_FILENAME }
    })
  );
};

export const onSubmitWriteNotes = (event, oldValue) => dispatch => {
  const { originalEvent } = event;
  const newValue =
    (originalEvent &&
      originalEvent.target &&
      originalEvent.target.notesTextArea &&
      originalEvent.target.notesTextArea.value) ??
    "";
  if (oldValue !== newValue) {
    return dispatch(writeNotesWithApi(newValue));
  }
};
