import { useState, useEffect } from "react";
import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";
import { GroupListSelect } from "./group-list-select/GroupListSelect";
import { PaymentsTable } from "../payments-table/PaymentsTable";
import { faClone, faEraser, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddPaymentPage.scss";
import { IconWithTooltip } from "../../../common/components/icon-with-tooltip/IconWithTooltip";

const staticActionColumns = [
  {
    actionKey: "cloneRow",
    headerLabelKey: "PAYMENTS.CLONE_ROW",
    iconName: faClone,
    additionalClassname: "theme-color",
    additionalCellProps: { align: "center" },
    additionalHeadCellProps: { align: "center" }
  },
  {
    actionKey: "deleteRow",
    headerLabelKey: "PAYMENTS.DELETE_ROW",
    iconName: faEraser,
    additionalClassname: "make-red",
    additionalCellProps: { align: "center" },
    additionalHeadCellProps: { align: "center" }
  }
];

const AddPaymentPageComponent = ({
  init,
  resetAddPayments,
  userList,
  groupList,
  selectedUserId,
  selectUserIds,
  selectedGroupId,
  selectedGroupName,
  selectGroupId,
  associationsByGroup,
  isAssociationsModalOpen,
  onOpenAssociationListModal,
  closeAssociationsModal,
  payments,
  dataColumns,
  addPaymentRow,
  deletePaymentRow,
  clonePaymentRow,
  changePaymentInput,
  disabledForm
}) => {
  const [actionColumns, setActionColumns] = useState(staticActionColumns);

  useEffect(() => {
    setActionColumns(
      staticActionColumns.map(el => ({
        ...el,
        handleClick: index => {
          if (el.actionKey === "cloneRow") {
            return clonePaymentRow(index);
          } else {
            return deletePaymentRow(index);
          }
        }
      }))
    );
  }, [payments]);

  return (
    <SinglePageTemplate onInit={init} h1LabelKey={"PAYMENTS.TITLE"}>
      <GenericForm
        onClearForm={resetAddPayments}
        disableSubmitBtn={disabledForm}
        onSubmit={() => {
          console.log(selectedUserId, selectedGroupId, payments);
        }}
      >
        <InputRow
          Component1={
            <Input
              type="select"
              name="GROUPS.USER_LIST"
              labelKey="PAYMENTS.PAY_USER"
              optionList={userList}
              value={selectedUserId}
              onChange={event => selectUserIds([event.target.value])}
              valueOptionProp="idUtente"
              textOptionProp="username"
            />
          }
          Component2={
            <GroupListSelect
              groupList={groupList}
              selectedGroupId={selectedGroupId}
              selectGroupId={selectGroupId}
              selectedGroupName={selectedGroupName}
              associationList={associationsByGroup}
              isAssociationsModalOpen={isAssociationsModalOpen}
              onOpenAssociationListModal={onOpenAssociationListModal}
              closeAssociationsModal={closeAssociationsModal}
            />
          }
        />
        <div className="table-wrapper">
          <PaymentsTable
            dataColumns={dataColumns}
            actionColumns={actionColumns}
            payments={payments}
            handleInputChange={changePaymentInput}
          />
        </div>
        <div className="add-icon-wrapper">
          <span>
            <IconWithTooltip
              tooltipMessageI18nKey="PAYMENTS.ADD_ROW"
              fontAwesomeIconProps={{
                icon: faPlus,
                size: "3x",
                onClick: addPaymentRow
              }}
            />
          </span>
        </div>
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const AddPaymentPage = withChangeIconOnInit(PAYMENTS_KEY)(
  AddPaymentPageComponent
);
