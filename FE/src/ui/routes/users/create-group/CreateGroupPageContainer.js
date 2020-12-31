import { connect } from "react-redux";
import { CreateGroupPage } from "./CreateGroupPage";
import { getAllUsers } from "../../../../redux/users/actions";
import { getUserList } from "../../../../redux/users/selectors";

const mapStateToProps = state => ({
    userList:getUserList(state)
});

const mapDispatchToProps = {
    getAllUsers
};

export const CreateGroupPageContainer = connect(mapStateToProps,
    mapDispatchToProps)(CreateGroupPage);