import { useEffect, useState } from "react";
import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../../common/components/form/input-row/InputRow";
import { Input } from "../../../common/components/form/input/Input";

const CreateGroupPageComponent = ({ getAllUsers, userList }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      {"CreateGroupPage"}
      <GenericForm onSubmit={() => console.log("UserList: ", users)}>
        <InputRow
          Component1={
            <Input
              type="multiple-select"
              labelKey="USERS.USER_LIST"
              name="USERS.USER_LIST"
              optionList={userList}
              onChange={event => {
                console.log(event.target);
                setUsers(event.target.value)
              }}
              value={users}
              valueOptionProp="idUtente"
              textOptionProp="username"
            ></Input>
          }
        />
      </GenericForm>
    </>
  );
};

export const CreateGroupPage = withChangeIconOnInit(USERS_KEY)(
  CreateGroupPageComponent
);
