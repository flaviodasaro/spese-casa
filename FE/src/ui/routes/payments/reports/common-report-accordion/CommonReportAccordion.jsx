import { Accordion } from "../../../../common/components/accordion/Accordion";
import { GenericForm } from "../../../../common/components/form/generic-form/GenericForm";
import { Input } from "../../../../common/components/form/input/Input";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { IconWithTooltip } from "../../../../common/components/icon-with-tooltip/IconWithTooltip";
import { withNamespaces } from "react-i18next";
import { InputRow } from "../../../../common/components/form/input-row/InputRow";
import "./CommonReportAccordion.scss";

export const CommonReportAccordion = withNamespaces()(
  ({
    accordionTextKey,
    userList,
    onSubmit,
    infoTooltipLabelKey,
    selectedUserIds,
    selectUserIds,
    t,
    children
  }) => {
    return (
      <Accordion textKey={accordionTextKey} className="common-report-accordion">
        <div className="info-icon-row">
            <span className="txt">
                {t("COMMON.INFO")}
            </span>
          <IconWithTooltip
            tootlipMessage={
              <div
                dangerouslySetInnerHTML={{
                  __html: t(infoTooltipLabelKey)
                }}
              ></div>
            }
            fontAwesomeIconProps={{
              icon: faInfoCircle,
              size: "3x"
            }}
            otherTooltipSpanProps={{
              style: {
                minWidth: "1000px"
              }
            }}
          />
        </div>
        <GenericForm
          onSubmit={onSubmit}
          withClearButton={false}
          disableSubmitBtn={!selectedUserIds || selectedUserIds.length === 0}
        >
          <InputRow
            Component1={
              <Input
                type="multiple-select"
                name="GROUPS.USER_LIST"
                labelKey="GROUPS.USER_LIST"
                valueOptionProp="idUtente"
                textOptionProp="username"
                optionList={userList}
                value={selectedUserIds}
                onChangeByValue={selectUserIds}
              />
            }
          />
        </GenericForm>
        <div className="children-container">
            {children}
        </div>
      </Accordion>
    );
  }
);

CommonReportAccordion.defaultProps = {
  accordionTextKey: "",
  userList: [],
  infoTooltipLabelKey: ""
};
