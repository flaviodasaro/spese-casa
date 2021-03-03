import { selectGroupId, selectUserIds } from "../../../redux/users/actions";
import {
  getUserList,
  getSelectedSingleUserId,
  getGroupListRaw,
  getSelectedGroupId,
  getSelectedUserIds
} from "../../../redux/users/selectors";
import { init } from "../../../redux/payments/actions";
import { faClone, faEraser } from "@fortawesome/free-solid-svg-icons";

export const commonMapStateToProps = state => ({
  userList: getUserList(state),
  groupList: getGroupListRaw(state),
  selectedUserIdList: getSelectedUserIds(state),
  selectedUserId: getSelectedSingleUserId(state),
  selectedGroupId: getSelectedGroupId(state)
});
export const commonMapDispatchToProps = {
  init,
  selectUserIds,
  selectGroupId
};

export const commonStaticColumns = [
  {
    actionKey: "deleteRow",
    headerLabelKey: "PAYMENTS.DELETE_ROW",
    iconName: faEraser,
    additionalClassname: "make-red",
    additionalCellProps: { align: "center" },
    additionalHeadCellProps: { align: "center" }
  }
];

export const staticActionColumns = [
  {
    actionKey: "cloneRow",
    headerLabelKey: "PAYMENTS.CLONE_ROW",
    iconName: faClone,
    additionalClassname: "theme-color",
    additionalCellProps: { align: "center" },
    additionalHeadCellProps: { align: "center" }
  }
].concat(commonStaticColumns);
