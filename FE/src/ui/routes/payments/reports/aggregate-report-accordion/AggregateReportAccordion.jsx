import { Button } from "../../../../common/components/form/button/Button";
import { CommonReportAccordion } from "../common-report-accordion/CommonReportAccordion";
import "./AggregateReportAccordion.scss";

const getClassNameByAmount = amount => {
  let classAggregate = "amount";
  if (amount > 0) {
    classAggregate += " positive";
  }
  if (amount < 0) {
    classAggregate += " negative";
  }
  return classAggregate;
};

const OutputRow = ({ element }) => {
  const { username, amount } = element;
  return (
    <li className="output-list-item">
      <div className="output-item-content">
        <span className="user-txt">
          {username}
          {": "}
        </span>
        <span className={getClassNameByAmount(amount)}>
          {amount}
          {" €"}
        </span>
      </div>
    </li>
  );
};

export const AggregateReportAccordion = ({
  userList,
  getReportAggregateByUser,
  selectedUserIdList,
  selectUserIds,
  dataStructureForAggregateReport,
  goToArchive
}) => {
  return (
    <CommonReportAccordion
      accordionTextKey={"REPORTS.AGGREGATE_ALL"}
      userList={userList}
      onSubmit={() => getReportAggregateByUser(selectedUserIdList)}
      infoTooltipLabelKey={"REPORTS.AGGREGATE_ALL_INFO_INNER_HTML"}
      selectedUserIds={selectedUserIdList}
      selectUserIds={selectUserIds}
    >
      <div className="accordion-content">
        <ul className="unordered-list">
          {dataStructureForAggregateReport.map(el => (
            <OutputRow element={el} />
          ))}
        </ul>
        {dataStructureForAggregateReport &&
          dataStructureForAggregateReport.length > 0 && (
            <div className="btn-container">
              <Button onClick={goToArchive} labelKey={"REPORTS.GO_TO_ARCHIVE"}></Button>
            </div>
          )}
      </div>
    </CommonReportAccordion>
  );
};
