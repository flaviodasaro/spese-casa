import { ReportsPage } from "./ReportsPage";
import { connect } from "react-redux";
import {
  getByFiltersList,
  listFetchedAtLeastOnce,
  aggregateAmountByFiltyers,
  getFetchByFiltersRequest
} from "../../../../redux/payments/selectors";
import { fetchPaymentsByFilters, markPaymentsAsPaid } from "../../../../redux/payments/actions";

import { getCategoryList } from "../../../../redux/spending-categories/selectors";

import { commonMapDispatchToProps, commonMapStateToProps } from "../commons";

const mapStateToProps = state => ({
  ...commonMapStateToProps(state),
  categoryList: getCategoryList(state),
  payments: getByFiltersList(state),
  fetched: listFetchedAtLeastOnce(state),
  aggregateAmount: aggregateAmountByFiltyers(state),
  lastFetchRequest:getFetchByFiltersRequest(state)
});
const mapDispatchToProps = {
  ...commonMapDispatchToProps,
  fetchPaymentsByFilters,
  markPaymentsAsPaid
};

export const ReportsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsPage);
