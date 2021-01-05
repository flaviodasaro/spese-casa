import { createSelector } from "reselect";

const spendingCategorySlice = state => state.spendingCategoriesReducer;

export const getCategoryList = createSelector(
  spendingCategorySlice,
  state => state.categoryList
);
export const getSelectedCategoryId = createSelector(
  spendingCategorySlice,
  state => state.selectedCategoryId
);
export const getNomeCategoria = createSelector(
  spendingCategorySlice,
  state => state.nomeCategoria
);
export const getNoteCategoria = createSelector(
  spendingCategorySlice,
  state => state.noteCategoria
);
