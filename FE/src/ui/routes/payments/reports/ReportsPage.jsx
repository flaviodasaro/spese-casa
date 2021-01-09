import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { SearchPaymentsAccordion } from "./search-payments-accordion/SearchPaymentsAccordion";

const ReportsPageComponent = ({
  init,
  changePaymentId,
  paymentId,
  userList,
  selectedUserId,
  selectUserIds,
  groupList,
  selectedGroupId,
  selectGroupId,
  categoryList,
  fetchPaymentsByFilters,
  payments,
  fetched,
  aggregateAmount,
  markPaymentsAsPaid,
  lastFetchRequest
}) => {
  return (
    <SinglePageTemplate onInit={init} h1LabelKey={"REPORTS.TITLE"}>
      <SearchPaymentsAccordion
        changePaymentId={changePaymentId}
        paymentId={paymentId}
        userList={userList}
        selectedUserId={selectedUserId}
        selectUserIds={selectUserIds}
        groupList={groupList}
        selectedGroupId={selectedGroupId}
        selectGroupId={selectGroupId}
        categoryList={categoryList}
        onSubmit={fetchPaymentsByFilters}
        payments={payments}
        fetched={fetched}
        aggregateAmount={aggregateAmount}
        markPaymentsAsPaid={markPaymentsAsPaid}
        lastFetchRequest={lastFetchRequest}
      />
    </SinglePageTemplate>
  );
};

export const ReportsPage = withChangeIconOnInit(PAYMENTS_KEY)(
  ReportsPageComponent
);
