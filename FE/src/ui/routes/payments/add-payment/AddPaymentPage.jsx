import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";
import { GroupListSelect } from "./group-list-select/GroupListSelect";

const AddPaymentPageComponent = ({
  commonInit,
  userList,
  groupList,
  selectedGroupId,
  selectGroupId,
  associationsByGroup,
  isAssociationsModalOpen,
  onOpenAssociationListModal,
  closeAssociationsModal
}) => {
  return (
    <SinglePageTemplate onInit={commonInit} h1LabelKey={"PAYMENTS.TITLE"}>
      <GenericForm withClearButton={false}>
        <InputRow
          Component1={
            <Input
              type="select"
              valueOptionProp="idUtente"
              textOptionProp="username"
              optionList={userList}
              labelKey="PAYMENTS.PAY_USER"
              name="GROUPS.USER_LIST"
            />
          }
          Component2={
            <GroupListSelect
              groupList={groupList}
              selectedGroupId={selectedGroupId}
              selectGroupId={selectGroupId}
              associationList={associationsByGroup}
              isAssociationsModalOpen={isAssociationsModalOpen}
              onOpenAssociationListModal={onOpenAssociationListModal}
              closeAssociationsModal={closeAssociationsModal}
            />
          }
        />
      </GenericForm>
    </SinglePageTemplate>
  );
};

/* <Input
  type="select"
  valueOptionProp="idGruppo"
  textOptionProp="nomeGruppo"
  optionList={groupList}
  name="GROUPS.GROUP_LIST"
  labelKey="PAYMENTS.PARTECIPATION_GROUP"
  value={selectedGroupId}
  onChange={event => selectGroupId(event.target.value)}
/> */
export const AddPaymentPage = withChangeIconOnInit(PAYMENTS_KEY)(
  AddPaymentPageComponent
);
