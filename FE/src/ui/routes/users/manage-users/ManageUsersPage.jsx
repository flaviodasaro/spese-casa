import { useState } from "react";
import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { Input } from "../../../common/components/form/input/Input";
import "./ManageUsers.scss";
import { IconWithTooltip } from "../../../common/components/icon-with-tooltip/IconWithTooltip";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Button } from "../../../common/components/form/button/Button";
import { AssociationsTable } from "./associations-table/AssociationsTable";

const ManageUsersPageComponent = ({
  userList,
  groupList,
  associationByGroup,
  commonInit,
  handleSaveAssociations,
  resetAssociaUtenteGruppi,
  deleteAssociationList,
  selectedGroupId,
  onChangeSelectedGroup,
  selectedUserIds,
  selectUserIds
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  return (
    <SinglePageTemplate h1LabelKey="GROUPS.ASSOCIATE_TITLE" onInit={commonInit}>
      <GenericForm
        disableSubmitBtn={!selectedUserIds || selectedUserIds.length === 0}
        onClearForm={resetAssociaUtenteGruppi}
        onSubmit={() => {
          handleSaveAssociations(selectedUserIds, selectedGroupId);
        }}
      >
        <InputRow
          Component1={
            <Input
              type="select"
              name="GROUPS.GROUP_LIST"
              labelKey="GROUPS.GROUP_LIST"
              optionList={groupList}
              value={selectedGroupId}
              onChange={onChangeSelectedGroup}
            />
          }
        />

        <div className="table-wrapper">
          <div className="icon-row">
            <span>
              <Button
                onClick={() => {
                  deleteAssociationList(selectedRows, selectedGroupId);
                }}
                width="100px"
              >
                <IconWithTooltip
                  fontAwesomeIconProps={{ icon: faTrash, size: "lg" }}
                  tooltipMessageI18nKey="GROUPS.DELETE_SELECTIONS"
                />
              </Button>
            </span>
          </div>
          <AssociationsTable 
            rows={associationByGroup}
            checkboxSelection
            onSelectionChange={event => setSelectedRows(event.rowIds)}
          />
        </div>
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
              onChange={event => selectUserIds(event.target.value)}
            />
          }
        />
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const ManageUsersPage = withChangeIconOnInit(USERS_KEY)(
  ManageUsersPageComponent
);
