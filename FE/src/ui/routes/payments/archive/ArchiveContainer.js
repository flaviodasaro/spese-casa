import { connect } from "react-redux";
import { ArchivePage } from "./ArchivePage";
import { handleArchiveInit } from "../../../../redux/payments/actions";
import { getUserList } from "../../../../redux/users/selectors";
import { getDataStructureForAggregateReport } from "../../../../redux/payments/selectors";

const mapStateToProps = state => ({
  userList: getUserList(state),
  aggregateData: getDataStructureForAggregateReport(state)
  /* aggregateData: [
    { amount: 12, userId:1, username:"Mario" },
    { amount: -12, userId:2, username:"Mario2" },
    { amount: 1, userId:3, username:"Mario3" },
    { amount: -1, userId:4, username:"Mario4" }
  ] */
});

const mapDispatchToProps = { handleArchiveInit };

export const ArchiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivePage);
