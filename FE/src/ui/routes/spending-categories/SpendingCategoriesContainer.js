import { SpendingCategories } from "./SpendingCategories";
import { connect } from "react-redux";
import {
  changeSpendingCategoryName,
  changeSpendingCategoryNotes,
  fetchAllSpendingCategories,
  insertSpendingCategory
} from "../../../redux/spending-categories/actions";
import {
  getCategoryList,
  getNomeCategoria,
  getNoteCategoria
} from "../../../redux/spending-categories/selectors";

const mapStateToProps = state => ({
  categoryList: getCategoryList(state),
  nomeCategoria: getNomeCategoria(state),
  noteCategoria: getNoteCategoria(state)
});
const mapDispatchToProps = {
  changeSpendingCategoryName,
  changeSpendingCategoryNotes,
  fetchAllSpendingCategories,
  insertSpendingCategory
};

export const SpendingCategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingCategories);
