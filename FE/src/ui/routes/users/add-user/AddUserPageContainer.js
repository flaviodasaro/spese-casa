import { connect } from "react-redux";
import { AddUserPage } from "./AddUserPage";
import {
  changeUserName,
  changeAddGroupWithSingleUser,
  submitCreateUSer,
  resetCreateUserForm
} from "../../../../redux/users/actions";
import {
  getUsername,
  getAddGroupWithSingleUser
} from "../../../../redux/users/selectors";

const mapStateToProps = state => ({
  username: getUsername(state),
  addGroupWithSingleUser: getAddGroupWithSingleUser(state)
});

const mapDispatchToProps = {
  changeUserName,
  changeAddGroupWithSingleUser,
  submitCreateUSer,
  resetCreateUserForm
};

export const AddUserPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserPage);
