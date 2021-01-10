import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { SearchPaymentsAccordion } from "./search-payments-accordion/SearchPaymentsAccordion";
import { DiffReportAccordion } from "./diff-report-accordion/DiffReportAccordion";
import { AggregateReportAccordion } from "./aggregate-report-accordion/AggregateReportAccordion";
import { MinnicuModal } from "./minnicu-modal/MinnicuModal";

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
  lastFetchRequest,
  selectedUserIdList,
  getReportDiffByUsers,
  getReportAggregateByUser,
  dataStructureForDiffReport,
  shouldShowMinnicuImg,
  dataStructureForAggregateReport
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
      <DiffReportAccordion
        userList={userList}
        getReportDiffByUsers={getReportDiffByUsers}
        selectedUserIdList={selectedUserIdList}
        selectUserIds={selectUserIds}
        dataStructureForDiffReport={dataStructureForDiffReport}
        //shouldShowMinnicuImg={shouldShowMinnicuImg}
      />
      <AggregateReportAccordion
        userList={userList}
        getReportAggregateByUser={getReportAggregateByUser}
        selectedUserIds={selectedUserIdList}
        selectUserIds={selectUserIds}
        dataStructureForAggregateReport={dataStructureForAggregateReport}
      />
      <MinnicuModal shouldShowMinnicuModal={shouldShowMinnicuImg} />
    </SinglePageTemplate>
  );
};

export const ReportsPage = withChangeIconOnInit(PAYMENTS_KEY)(
  ReportsPageComponent
);
