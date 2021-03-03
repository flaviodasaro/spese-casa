import { connect } from "react-redux";
import { ArchivePage } from "./ArchivePage";
import { handleArchiveInit } from "../../../../redux/archive/actions";
import { getUserList } from "../../../../redux/users/selectors";
import { getDataStructureForAggregateReport } from "../../../../redux/payments/selectors";

const mapStateToProps = state => ({
  userList: getUserList(state),
  aggregateData: getDataStructureForAggregateReport(state)
});

const mapDispatchToProps = { handleArchiveInit };

export const ArchiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivePage);
