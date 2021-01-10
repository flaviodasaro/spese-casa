import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommonReportAccordion } from "../common-report-accordion/CommonReportAccordion";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./DiffReportAccordion.scss";
import { SIDEBAR_COLOR_EX } from "../../../../common/constants";

const OutputRow = ({ element }) => {
  const { leftArrowUser, rightArrowUser, amount } = element;
  return (
    <li onClick={() => console.log(element)}>
      <div className="output-item-content">
        <span className="user-txt">{leftArrowUser}</span>
        <span className="icon">
          <FontAwesomeIcon
            icon={faArrowRight}
            size={"3x"}
            color={SIDEBAR_COLOR_EX}
          />
        </span>
        <span className="user-txt">{rightArrowUser}{": "}</span>
        <span className="amount">
          {amount}
          {" €"}
        </span>
      </div>
    </li>
  );
};

export const DiffReportAccordion = ({
  userList,
  getReportDiffByUsers,
  selectedUserIdList,
  selectUserIds,
  dataStructureForDiffReport,
  shouldShowMinnicuImg
}) => {
  return (
    <CommonReportAccordion
      accordionTextKey={"REPORTS.CALCULATE_DIFFS"}
      userList={userList}
      onSubmit={() => getReportDiffByUsers(selectedUserIdList)}
      infoTooltipLabelKey={"REPORTS.CALCULATE_DIFFS_INFO_INNER_HTML"}
      selectedUserIds={selectedUserIdList}
      selectUserIds={selectUserIds}
    >
      <ul className="unordered-list">
        {dataStructureForDiffReport.map(el => (
          <OutputRow element={el} />
        ))}
      </ul>
      {shouldShowMinnicuImg && "MINNICU"}
    </CommonReportAccordion>
  );
};
