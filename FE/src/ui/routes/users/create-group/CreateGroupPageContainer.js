import { connect } from "react-redux";
import { CreateGroupPage } from "./CreateGroupPage";
import { getAllUsers, changeGroupName, createGroupByNameAndUSers, changeGroupNotes } from "../../../../redux/users/actions";
import { getUserList, getGroupName, getGroupNotes } from "../../../../redux/users/selectors";

const mapStateToProps = state => ({
    userList:getUserList(state),
    groupName:getGroupName(state),
    groupNotes:getGroupNotes(state)
});

const mapDispatchToProps = {
    getAllUsers,
    changeGroupName, 
    changeGroupNotes,
    createGroupByNameAndUSers
};

export const CreateGroupPageContainer = connect(mapStateToProps,
    mapDispatchToProps)(CreateGroupPage);