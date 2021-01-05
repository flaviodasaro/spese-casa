import { connect } from "react-redux";
import { ManageUsersPage } from "./ManageUsersPage";
import {
  commonInit,
  fetchAssociationByGroup,
  handleSaveAssociations,
  deleteAssociationList,
  onChangeSelectedGroup,
  selectUserIds,
  resetAssociaUtenteGruppi
} from "../../../../redux/users/actions";
import {
  getGroupList,
  getAssociationByGroup,
  getSelectedGroupId,
  getSelectedUserIds,
  getUtentiNonAncoraAssociati
} from "../../../../redux/users/selectors";

const mapStateToProps = state => ({
  userList: getUtentiNonAncoraAssociati(state),
  groupList: getGroupList(state),
  associationByGroup: getAssociationByGroup(state),
  selectedGroupId: getSelectedGroupId(state),
  selectedUserIds: getSelectedUserIds(state)
});

const mapDispatchToProps = {
  commonInit,
  fetchAssociationByGroup,
  handleSaveAssociations,
  deleteAssociationList,
  onChangeSelectedGroup,
  selectUserIds,
  resetAssociaUtenteGruppi
};

export const ManageUsersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsersPage);
