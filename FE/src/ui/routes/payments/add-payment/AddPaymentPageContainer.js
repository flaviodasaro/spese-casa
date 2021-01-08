import { AddPaymentPage } from "./AddPaymentPage";
import { connect } from "react-redux";
import { selectGroupId, selectUserIds } from "../../../../redux/users/actions";
import {
  getUserList,
  getSelectedSingleUserId,
  getGroupListRaw,
  getSelectedGroupId,
  getSelectedGroupName,
  getAssociationByGroup
} from "../../../../redux/users/selectors";
import {
  onOpenAssociationListModal,
  closeAssociationsModal,
  addPaymentRow,
  deletePaymentRow,
  clonePaymentRow,
  changePaymentInput,
  init,
  resetAddPayments,
  handleSubmitInputPayments
} from "../../../../redux/payments/actions";
import {
  isAssociationsModalOpen,
  getDataColumns,
  getInputPayments,
  getDisabledAddPaymentsForm
} from "../../../../redux/payments/selectors";

const mapStateToProps = state => ({
  userList: getUserList(state),
  groupList: getGroupListRaw(state),
  selectedUserId:getSelectedSingleUserId(state),
  selectedGroupId: getSelectedGroupId(state),
  selectedGroupName: getSelectedGroupName(state),
  isAssociationsModalOpen: isAssociationsModalOpen(state),
  associationsByGroup: getAssociationByGroup(state),
  payments: getInputPayments(state),
  dataColumns: getDataColumns(state),
  disabledForm:getDisabledAddPaymentsForm(state)
});
const mapDispatchToProps = {
  init,
  selectUserIds,
  selectGroupId,
  onOpenAssociationListModal,
  closeAssociationsModal,
  addPaymentRow,
  deletePaymentRow,
  clonePaymentRow,
  changePaymentInput,
  resetAddPayments,
  handleSubmitInputPayments
};

export const AddPaymentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentPage);
