import { connect } from "react-redux";
import { ArchivePage } from "./ArchivePage";
import { handleArchiveInit, handleArchiveSubmit } from "../../../../redux/payments/actions";
import { getUserList } from "../../../../redux/users/selectors";
import { getDataStructureForAggregateReport } from "../../../../redux/payments/selectors";

const mapStateToProps = state => ({
  userList: getUserList(state),
  aggregateData: getDataStructureForAggregateReport(state)
});

const mapDispatchToProps = { handleArchiveInit, handleArchiveSubmit };

export const ArchiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivePage);
