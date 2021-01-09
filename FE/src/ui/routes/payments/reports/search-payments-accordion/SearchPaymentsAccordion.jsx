import { Accordion } from "../../../../common/components/accordion/Accordion";
import { SearchPaymentsForm } from "./search-payments-form/SearchPaymentsForm";
import { SearchPaymentsResult } from "./search-payments-result/SearchPaymentsResult";

export const SearchPaymentsAccordion = ({
  userList,
  selectedUserId,
  selectUserIds,
  groupList,
  selectedGroupId,
  selectGroupId,
  categoryList,
  onSubmit,
  payments,
  fetched,
  aggregateAmount,
  markPaymentsAsPaid,
  lastFetchRequest
}) => {
  return (
    <Accordion textKey="REPORTS.PAYMENTS_SEARCH">
      <SearchPaymentsForm
        userList={userList}
        selectedUserId={selectedUserId}
        selectUserIds={selectUserIds}
        groupList={groupList}
        selectedGroupId={selectedGroupId}
        selectGroupId={selectGroupId}
        categoryList={categoryList}
        onSubmit={onSubmit}
      />

      <SearchPaymentsResult
        payments={payments}
        fetched={fetched}
        aggregateAmount={aggregateAmount}
        markPaymentsAsPaid={markPaymentsAsPaid}
        lastFetchRequest={lastFetchRequest}
      />
    </Accordion>
  );
};
