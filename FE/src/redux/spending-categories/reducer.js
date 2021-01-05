import {
  SPENDING_CATEGORIES_FETCHED,
  SPENDING_CATEGORY_SELECTED,
  SPENDING_CATEGORY_NAME_CHANGED,
  SPENDING_CATEGORY_NOTES_CHANGED
} from "./actionTypes";

const initialState = {
  categoryList: [],
  selectedCategoryId: "",
  nomeCategoria: "",
  noteCategoria: ""
};

export const spendingCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPENDING_CATEGORIES_FETCHED: {
      return { ...state, categoryList: action.payload.categoryList };
    }
    case SPENDING_CATEGORY_SELECTED: {
      return {
        ...state,
        selectedCategoryId: action.payload.selectedCategoryId
      };
    }
    case SPENDING_CATEGORY_NAME_CHANGED: {
      return {
        ...state,
        nomeCategoria: action.payload.nomeCategoria
      };
    }
    case SPENDING_CATEGORY_NOTES_CHANGED: {
      return {
        ...state,
        noteCategoria: action.payload.noteCategoria
      };
    }
    default: {
      return state;
    }
  }
};
