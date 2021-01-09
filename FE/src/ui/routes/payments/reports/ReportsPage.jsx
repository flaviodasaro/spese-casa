import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { SearchPaymentsAccordion } from "./search-payments-accordion/SearchPaymentsAccordion";
import { Accordion } from "../../../common/components/accordion/Accordion";

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
      <Accordion textKey="REPORTS.CALCULATE_DIFFS">
        In questo report verranno calcolate le differenze dei debiti data una lista di utenti in input.
        L'output sarà qualcosa del tipo:
        <p>{"-Daniel -> Flavio: 35€ "}</p>
        <p>{"-Daniel -> Gero: 15€ "}</p>
        <p>{"-Flavio -> Gero: 20€ "}</p>
      </Accordion>
      <Accordion textKey="REPORTS.AGGREGATE_ALL">
        In questo report, data una lista di utenti in input, verrà calcolata l'ottimizzazione finale di quanto ognuno di questi utenti tra di loro deve dare/avere.
        L'output sarà qualcosa del tipo:
        <p>{"-Daniel: -50€ "}</p>
        <p>{"-Gero: 35€ "}</p>
        <p>{"-Flavio: 15€ "}</p>
        <p>{"NB: la somma algebrica deve dare 0 "}</p>
      </Accordion>
    </SinglePageTemplate>
  );
};

export const ReportsPage = withChangeIconOnInit(PAYMENTS_KEY)(
  ReportsPageComponent
);
