import { selectGroupId, selectUserIds } from "../../../redux/users/actions";
import {
  getUserList,
  getSelectedSingleUserId,
  getGroupListRaw,
  getSelectedGroupId,
  getSelectedUserIds
} from "../../../redux/users/selectors";
import { init } from "../../../redux/payments/actions";

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
