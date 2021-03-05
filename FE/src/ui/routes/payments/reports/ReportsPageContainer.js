import { ReportsPage } from "./ReportsPage";
import { connect } from "react-redux";
import {
  getByFiltersList,
  listFetchedAtLeastOnce,
  aggregateAmountByFiltyers,
  getFetchByFiltersRequest,
  getDataStructureForDiffReport,
  showMinnicuImg,
  getDataStructureForAggregateReport
} from "../../../../redux/payments/selectors";
import {
  fetchPaymentsByFilters,
  markPaymentsAsPaid,
  getReportDiffByUsers,
  getReportAggregateByUser
} from "../../../../redux/payments/actions";

import { getCategoryList } from "../../../../redux/spending-categories/selectors";

import { commonMapDispatchToProps, commonMapStateToProps } from "../commons";
import { push } from "connected-react-router";
import { ARCHIVE_ROUTE } from "../../../common/constants";

const mapStateToProps = state => ({
  ...commonMapStateToProps(state),
  categoryList: getCategoryList(state),
  payments: getByFiltersList(state),
  fetched: listFetchedAtLeastOnce(state),
  aggregateAmount: aggregateAmountByFiltyers(state),
  lastFetchRequest: getFetchByFiltersRequest(state),
  dataStructureForDiffReport:getDataStructureForDiffReport(state),
  shouldShowMinnicuImg:showMinnicuImg(state),
  dataStructureForAggregateReport:getDataStructureForAggregateReport(state)
});
const mapDispatchToProps = {
  ...commonMapDispatchToProps,
  fetchPaymentsByFilters,
  markPaymentsAsPaid,
  getReportDiffByUsers,
  getReportAggregateByUser,
  goToArchive: () => push(ARCHIVE_ROUTE)
};

export const ReportsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsPage);
