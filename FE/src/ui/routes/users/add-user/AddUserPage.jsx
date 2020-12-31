import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import "./AddUserPage.scss";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";

const AddUserPageComponent = ({
  username,
  addGroupWithSingleUser,
  changeUserName,
  changeAddGroupWithSingleUser,
  submitCreateUSer,
  resetCreateUserForm
}) => {
  const handleSubmit = ({ formDataEntries }) => {
    for (let el of formDataEntries) {
      console.log(el);
      console.log(el[0]);
      console.log(el[1]);
    }
    //mockSuccess(1);
  };
  return (
    <div>
      <h1 className="h1-txt">Aggiungi utente</h1>
      <div className="form-wrapper">
        <GenericForm
          
          onSubmit={handleSubmit}
          onClearForm={resetCreateUserForm}
        >
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
      </div>
    </div>
  );
};

export const AddUserPage = withChangeIconOnInit(USERS_KEY)(
  AddUserPageComponent
);
