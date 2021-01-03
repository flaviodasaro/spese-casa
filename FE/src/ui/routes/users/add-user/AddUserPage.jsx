import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import "./AddUserPage.scss";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";

const AddUserPageComponent = ({
  username,
  addGroupWithSingleUser,
  changeUserName,
  changeAddGroupWithSingleUser,
  createUserAndGroup,
  resetCreateUserForm
}) => {
  const handleSubmit = ({ formDataEntries }) => {
    createUserAndGroup(username, addGroupWithSingleUser);
  };
  return (
    <SinglePageTemplate h1LabelKey="USERS.TITLE">
      <GenericForm onSubmit={handleSubmit} onClearForm={resetCreateUserForm}>
        <InputRow
          Component1={
            <Input
              name={"username"}
              labelKey={"USERS.USERNAME_LABEL"}
              value={username}
              onChange={event => changeUserName(event.target.value)}
            />
          }
          Component2={
            <Input
              labelKey={"USERS.ADD_GROUP_WITH_SINGLE_USER_LABEL"}
              name={"addGroup"}
              type="checkbox"
              checked={addGroupWithSingleUser}
              onChange={event =>
                changeAddGroupWithSingleUser(event.target.checked)
              }
            />
          }
        />
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const AddUserPage = withChangeIconOnInit(USERS_KEY)(
  AddUserPageComponent
);
