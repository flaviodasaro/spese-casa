import { AddPaymentPage } from "./AddPaymentPage";
import { connect } from "react-redux";
import { commonInit, selectGroupId } from "../../../../redux/users/actions";
import {
  getUserList,
  getGroupListRaw,
  getSelectedGroupId,
  getAssociationByGroup
} from "../../../../redux/users/selectors";
import {
  onOpenAssociationListModal,
  closeAssociationsModal
} from "../../../../redux/payments/actions";
import { isAssociationsModalOpen } from "../../../../redux/payments/selectors";

const mapStateToProps = state => ({
  userList: getUserList(state),
  groupList: getGroupListRaw(state),
  selectedGroupId: getSelectedGroupId(state),
  isAssociationsModalOpen:isAssociationsModalOpen(state),
  associationsByGroup:getAssociationByGroup(state)
});
const mapDispatchToProps = {
  commonInit,
  selectGroupId,
  onOpenAssociationListModal,
  closeAssociationsModal
};

export const AddPaymentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentPage);
