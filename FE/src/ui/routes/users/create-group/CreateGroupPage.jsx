import { useEffect, useState } from "react";
import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";

const CreateGroupPageComponent = ({
  getAllUsers,
  userList,
  groupName,
  groupNotes,
  changeGroupName,
  changeGroupNotes,
  createGroupByNameAndUSers
}) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <SinglePageTemplate h1LabelKey="GROUPS.CREATE_TITLE">
      <GenericForm
        onSubmit={() => createGroupByNameAndUSers(groupName, groupNotes, users)}
        disableSubmitBtn={!userList || userList.length === 0}
        withClearButton={false}
      >
        <InputRow
          Component1={
            <Input
              labelKey="GROUPS.GROUP_NAME"
              name="GROUPS.GROUP_NAME"
              value={groupName}
              onChange={event => changeGroupName(event.target.value)}
              required
            />
          }
          Component2={
            <Input
              type="multiple-select"
              labelKey="GROUPS.USER_LIST"
              name="GROUPS.USER_LIST"
              optionList={userList}
              onChange={event => {
                console.log(event.target);
                setUsers(event.target.value);
              }}
              value={users}
              valueOptionProp="idUtente"
              textOptionProp="username"
              required
            ></Input>
          }
        />
        <InputRow
          Component1={
            <Input
              labelKey="GROUPS.GROUP_NOTES"
              name="GROUPS.GROUP_NOTES"
              value={groupNotes}
              onChange={event => changeGroupNotes(event.target.value)}
            />
          }
        />
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const CreateGroupPage = withChangeIconOnInit(USERS_KEY)(
  CreateGroupPageComponent
);
