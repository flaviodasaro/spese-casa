import { AddPaymentPage } from "./AddPaymentPage";
import { connect } from "react-redux";
import {
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
  resetAddPayments,
  handleSubmitInputPayments
} from "../../../../redux/payments/actions";
import {
  isAssociationsModalOpen,
  getDataColumns,
  getInputPayments,
  getDisabledAddPaymentsForm
} from "../../../../redux/payments/selectors";
import { commonMapDispatchToProps, commonMapStateToProps } from "../commons";

const mapStateToProps = state => ({
  ...commonMapStateToProps(state),
  selectedGroupName: getSelectedGroupName(state),
  isAssociationsModalOpen: isAssociationsModalOpen(state),
  associationsByGroup: getAssociationByGroup(state),
  payments: getInputPayments(state),
  dataColumns: getDataColumns(state),
  disabledForm:getDisabledAddPaymentsForm(state)
});
const mapDispatchToProps = {
  ...commonMapDispatchToProps,
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
