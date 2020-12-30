import { connect } from "react-redux";
import { AddUserPage } from "./AddUserPage";
import { mockSuccess } from "../../../../redux/users/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = { mockSuccess };

export const AddUserPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddUserPage);