import { genericApiCall, API_VERBS } from "../api/utils";
import {
  SPENDING_CATEGORIES_FETCHED,
  SPENDING_CATEGORY_SELECTED,
  SPENDING_CATEGORY_NAME_CHANGED,
  SPENDING_CATEGORY_NOTES_CHANGED
} from "./actionTypes";

const CONTROLLER_SUB_URL = "categoria-spesa";

const FETCH_ALL_URL = `${CONTROLLER_SUB_URL}/all`;
const ADD_CATEGORY_URL = `${CONTROLLER_SUB_URL}/save`;

const fetchSpendingCategories = categoryList => ({
  type: SPENDING_CATEGORIES_FETCHED,
  payload: { categoryList }
});

export const selectSpendingCategory = selectedCategoryId => ({
  type: SPENDING_CATEGORY_SELECTED,
  payload: { selectedCategoryId }
});

export const changeSpendingCategoryName = nomeCategoria => ({
  type: SPENDING_CATEGORY_NAME_CHANGED,
  payload: { nomeCategoria }
});

export const changeSpendingCategoryNotes = noteCategoria => ({
  type: SPENDING_CATEGORY_NOTES_CHANGED,
  payload: { noteCategoria }
});

export const fetchAllSpendingCategories = () => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: FETCH_ALL_URL,
      onSuccess: res =>
        dispatch(
          fetchSpendingCategories(
            res.data.map(el => ({ ...el, id: el.idCategoriaSpesa }))
          )
        )
    })
  );

export const insertSpendingCategory = (
  nomeCategoria,
  noteCategoria
) => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.POST, {
      endpoint: ADD_CATEGORY_URL,
      body: { nomeCategoria, noteCategoria }
    })
  );
